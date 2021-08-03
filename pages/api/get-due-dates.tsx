import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { user_id, current_semester } = req.query
  

  try {
    const results = await query(`
      SELECT *
      FROM due_date
      INNER JOIN course
      ON due_date.course_id = course.course_id
      WHERE due_date.semester_id = ${current_semester}`
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler