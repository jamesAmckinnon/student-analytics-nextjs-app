import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const {semester_id, course_id} = req.query

  try {
    const results = await query(`
      SELECT schedule.day_of_week, schedule.time_in, schedule.time_out, schedule.schedule_id
      FROM schedule 
      WHERE schedule.course_id = ${course_id} 
      AND schedule.semester_id = ${semester_id} `
      )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler