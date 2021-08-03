import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { title, content, grade } = req.body
  try {
    if (!title || !content || !grade) {
      return res
        .status(400)
        .json({ message: '`title`, `content` and `grade` are both required' })
    }

    const results = await query(
      `
      INSERT INTO entries (title, content, grade)
      VALUES (?, ?, ?)
      `,
      [filter.clean(title), filter.clean(content), filter.clean(grade)]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
