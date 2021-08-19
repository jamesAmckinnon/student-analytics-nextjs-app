import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { current_semester } = req.query

  try {
    const results = await query(`
      SELECT grade_received, grade_weight, grade_weight_type, weight.grade_weight_id,
             course.course_id, course_code, course_name, target_course_gpa, 
             target_gpa, semester_season, semester_year
      FROM users
      INNER JOIN semester
      ON users.user_id = semester.user_id
      INNER JOIN course
      ON semester.semester_id = course.semester_id
      INNER JOIN grade
      ON course.course_id = grade.course_id
      INNER JOIN weight 
      ON grade.grade_weight_id = weight.grade_weight_id
      WHERE semester.semester_id = ${current_semester}`
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler