import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { check, todo_id } = req.body
  
    const results = await query(
    `
    UPDATE todo SET complete = ? WHERE todo.todo_id = ?
    `, [check, todo_id]  
    )
    
    return res.json(results)

  }
  
  export default handler