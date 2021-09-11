import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { feedback_text, user_id } = req.body
  
  try {
    const results = await query(
      `
      INSERT INTO feedback ( feedback, user_id )
      VALUES ( ?, ? ) 
      `, [ feedback_text, user_id ]
      )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler