import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const {grade_weight_type, grade_weight, course_id} = req.body
  
  try {
    if (!grade_weight) {
      return res
        .status(400)
        .json({ message: '`grade_weight` is required' })
    }

    const results = await query(
      `
      INSERT INTO weight (course_id, grade_weight_type, grade_weight) 
      VALUES (?, ?, ?) 
      `, 
      [course_id, grade_weight_type, grade_weight]
    )
    
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message }) 
  }
}

export default handler