import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { course_id, grade } = req.body
  
  try {
    const results = await query(
        `
        UPDATE course SET grade_total = ? WHERE course.course_id = ?
        `, [grade, course_id]  
      )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler