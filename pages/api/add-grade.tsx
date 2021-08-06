import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { grade_type, grade, course_id, description } = req.body
  
  try {
    const results = await query(
      `
      INSERT INTO grade (grade_weight_id, grade_received, course_id, grade_description)
      VALUES (?, ?, ?, ?) `, [grade_type, grade, course_id, description]
      )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler