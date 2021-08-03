import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { semester_id, course_id, day_of_week, time_in, time_out} = req.body
  
  try {
    const results = await query(
      `
      INSERT INTO schedule ( semester_id, course_id, day_of_week, time_in, time_out )
      VALUES (?, ?, ?, ?, ?) `, [ semester_id, course_id, day_of_week, time_in, time_out ]
      )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler