import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { user_id } = req.query
  try {
    const results = await query(`
      SELECT course.course_name, semester.semester_id, course.course_id, course.target_course_gpa
      FROM semester
      INNER JOIN course
      ON semester.semester_id = course.semester_id
      WHERE user_id = ?`,
      user_id
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler