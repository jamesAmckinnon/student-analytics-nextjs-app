import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { grade_weight_id } = req.query
  try {
    const results = await query(
      `
      DELETE FROM weight
      WHERE grade_weight_id = ${grade_weight_id}
  `
      
    )
    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler