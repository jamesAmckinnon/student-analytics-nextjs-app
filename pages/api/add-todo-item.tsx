import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { u_id, item } = req.body

  try {
    const results = await query(
      `
      INSERT INTO todo (user_id, todo_item)
      VALUES (?, ?) `, [u_id, item]      
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler