import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { course_id } = req.query
  console.log(course_id)
  try {
    const results = await query(`
      SELECT grade_weight_type, grade_weight, grade_weight_id
      FROM weight
      WHERE course_id = ${course_id}`
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler