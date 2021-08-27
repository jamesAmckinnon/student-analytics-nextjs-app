import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { course_id } = req.query

  try {
    const results = await query(`
      SELECT grade_description, grade_weight_type, grade_received, grade_id
      FROM grade
      INNER JOIN weight
      ON grade.grade_weight_id = weight.grade_weight_id
      WHERE grade.course_id = ${course_id}`
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler