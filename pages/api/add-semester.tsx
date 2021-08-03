import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { semester_season, semester_year, user_id} = req.body
  try {
    if (!semester_season || !semester_year) {
      return res
        .status(400)
        .json({ message: '`season` and `year` are both required' })
    }

    const results = await query(
      `
      INSERT INTO semester (semester_season, semester_year, user_id)
      VALUES (?, ?, ?)
      `,
      [semester_season, semester_year, user_id]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler