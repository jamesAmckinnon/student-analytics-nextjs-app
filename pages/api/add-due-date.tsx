import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { current_semester, course_id, due_date_description, due_date, grade_weight_id } = req.body
  
  try {
    const results = await query(
      `
      INSERT INTO due_date ( semester_id, course_id, due_date_description, due_date, grade_weight_id)
      VALUES (?, ?, ?, ?, ?) `, [ current_semester, course_id, due_date_description, due_date, grade_weight_id ]
      )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler