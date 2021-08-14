import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const {user_id} = req.query

  try {
    const results = await query(`
      SELECT users.current_semester, semester.semester_id, course.course_name, course.course_id, 
             course.target_course_gpa, semester.target_gpa, course.grade_total
      FROM users
      INNER JOIN semester
      ON users.user_id = semester.user_id
      INNER JOIN course
      ON semester.semester_id = course.semester_id
      WHERE users.user_id = ? 
      AND semester.semester_id = users.current_semester`,
      user_id
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler