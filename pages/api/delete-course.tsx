import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { course_id } = req.query
  try {
    const results = await query(
      `
      DELETE FROM course
      WHERE course_id = ${course_id}
  `
      
    )
    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler