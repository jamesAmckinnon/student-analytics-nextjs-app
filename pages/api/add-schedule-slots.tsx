import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
const {       day,
            current_semester,
            course1, 
            course2, 
            course3, 
            course4, 
            course5, 
            course6, 
            course7, 
            course8, 
            course9, 
            course10,
            time1, 
            time2, 
            time3, 
            time4, 
            time5, 
            time6, 
            time7, 
            time8, 
            time9, 
            time10} = req.body
  
  try {
    const results = await query(
    `
        INSERT INTO schedule ( semester_id, course_id, day_of_week, time )
        VALUES ( ?, ?, ?, ? ),
               ( ?, ?, ?, ? ),
               ( ?, ?, ?, ? ),
               ( ?, ?, ?, ? ),
               ( ?, ?, ?, ? ),
               ( ?, ?, ?, ? ),
               ( ?, ?, ?, ? ),
               ( ?, ?, ?, ? ),
               ( ?, ?, ?, ? ),
               ( ?, ?, ?, ? )
        WHERE semester_id = ${current_semester}`
               , 
               [current_semester, course1, day, time1,
                current_semester, course2, day, time2,
                current_semester, course3, day, time3,
                current_semester, course4, day, time4,
                current_semester, course5, day, time5,
                current_semester, course6, day, time6,
                current_semester, course7, day, time7,
                current_semester, course8, day, time8,
                current_semester, course9, day, time9,
                current_semester, course10, day, time10]
                            )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}


export default handler