import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { semester_id, course_name, course_code} = req.body
  try {
    if (!semester_id || !course_name) {
      return res
        .status(400)
        .json({ message: '`semester_id` and `course_name` are both required' })
    }

    const results = await query(
      `
      INSERT INTO course (semester_id, course_name, course_code)
      VALUES (?, ?, ?)
      `,
      [semester_id, course_name, course_code]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler