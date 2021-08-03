import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { userEmail } = req.body
  try {
    if (!userEmail) {
      return res
        .status(400)
        .json({ message: '`userEmail` required' })
    }

    const results = await query(
      `
      INSERT INTO users (user_id)
      VALUES (?)
      `,
      [filter.clean(userEmail)]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler