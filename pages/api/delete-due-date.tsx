import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { due_date_id } = req.query
  try {
    const results = await query(
      `
      DELETE FROM due_date
      WHERE due_date_id = ${due_date_id}
  `
      
    )
    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler