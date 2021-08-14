import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { current_semester } = req.query

  try {
    const results = await query(`
      SELECT grade_weight_type, grade_weight, grade_weight_id, course.course_name, course.course_id
      FROM weight
      INNER JOIN course
      ON weight.course_id = course.course_id
      INNER JOIN semester
      ON course.semester_id = semester.semester_id
      INNER JOIN users
      ON semester.user_id = users.user_id
      WHERE course.semester_id = ${current_semester}`
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler