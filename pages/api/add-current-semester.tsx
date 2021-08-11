import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { current_semester_id, userEmail } = req.body
  
  try {
    if (!current_semester_id) {
      return res
        .status(400)
        .json({ message: '`current_semester` is required' })
    }

    const results = await query(
      `
      UPDATE users SET current_semester = ? WHERE users.user_id = ?
      `, [current_semester_id, userEmail]  
    )
    
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message }) 
  }
}

export default handler