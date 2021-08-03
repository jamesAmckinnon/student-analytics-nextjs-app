import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { user_id, activity_name } = req.body
  
  try {
    const results = await query(
      `
      INSERT INTO activity_type ( user_id, activity_name )
      VALUES (?, ?) `, [user_id, activity_name]
      )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler