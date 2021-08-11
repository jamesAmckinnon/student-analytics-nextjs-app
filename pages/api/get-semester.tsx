import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { user_id } = req.query
  try {
    const results = await query(`
      SELECT semester.semester_season, semester.semester_year, semester.semester_id, semester.target_gpa, users.current_semester, users.user_id 
      FROM semester
      INNER JOIN users
      ON semester.user_id = users.user_id
      WHERE users.user_id = ?`,
      user_id
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler