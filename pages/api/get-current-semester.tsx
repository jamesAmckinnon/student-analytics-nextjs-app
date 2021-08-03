import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const {user_id} = req.query

  try {
    const results = await query(`
      SELECT users.current_semester FROM users WHERE users.user_id = ? `,
      user_id
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler