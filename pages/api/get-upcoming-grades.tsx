import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { current_semester } = req.query
  

  try {
    const results = await query(`
      SELECT course_name, course.course_id, course_code, due_date, due_date_description, grade_total, grade_weight, target_course_gpa
      FROM users
      INNER JOIN semester
      ON users.current_semester = semester.semester_id
      INNER JOIN course
      ON semester.semester_id = course.semester_id
      INNER JOIN due_date
      ON course.course_id = due_date.course_id
      INNER JOIN weight
      ON due_date.grade_weight_id = weight.grade_weight_id
      WHERE users.current_semester = ${current_semester}`
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler