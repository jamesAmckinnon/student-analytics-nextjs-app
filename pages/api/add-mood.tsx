import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { user_id, date, time, mood_label } = req.body
  
  try {
    const results = await query(
      `
      INSERT INTO mood ( user_id, date, time, mood_label )
      VALUES (?, ?, ?, ?) `, [ user_id, date, time, mood_label ]
      )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler