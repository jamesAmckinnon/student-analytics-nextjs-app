import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { user_id, date, time, sleep_time } = req.body
  
  try {
    const results = await query(
      `
      INSERT INTO sleep ( user_id, date, time, sleep_time )
      VALUES (?, ?, ?, ?) `, [ user_id, date, time, sleep_time ]
      )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler