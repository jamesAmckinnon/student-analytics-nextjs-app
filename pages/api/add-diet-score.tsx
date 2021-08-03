import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { user_id, date, time, diet_score } = req.body
  
  try {
    const results = await query(
      `
      INSERT INTO diet ( user_id, date, time, diet_score )
      VALUES (?, ?, ?, ?) `, [ user_id, date, time, diet_score ]
      )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler