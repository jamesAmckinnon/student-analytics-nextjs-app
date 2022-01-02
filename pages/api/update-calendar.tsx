import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
const { courses1,  courses2,  courses3,  courses4,  courses5,
        courses6,  courses7,  courses8,  courses9,  courses10,
        courses11, courses12, courses13, courses14, courses15,
        courses16, courses17, courses18, courses19, courses20,
        courses21, courses22, courses23, courses24, courses25,
        courses26, courses27, courses28, courses29, courses30,
        courses31, courses32, courses33, courses34, courses35,
        courses36, courses37, courses38, courses39, courses40,
        courses41, courses42, courses43, courses44, courses45 } = req.body
  
  try {
    const results = await query(
      `
      INSERT INTO calendar ( courses1,  courses2,  courses3,  courses4,  courses5,
                             courses6,  courses7,  courses8,  courses9,  courses10,
                             courses11, courses12, courses13, courses14, courses15,
                             courses16, courses17, courses18, courses19, courses20,
                             courses21, courses22, courses23, courses24, courses25,
                             courses26, courses27, courses28, courses29, courses30,
                             courses31, courses32, courses33, courses34, courses35,
                             courses36, courses37, courses38, courses39, courses40,
                             courses41, courses42, courses43, courses44, courses45 )
                    VALUES (     ?,         ?,         ?,         ?,         ?,
                                 ?,         ?,         ?,         ?,         ?,
                                 ?,         ?,         ?,         ?,         ?,
                                 ?,         ?,         ?,         ?,         ?,
                                 ?,         ?,         ?,         ?,         ?,
                                 ?,         ?,         ?,         ?,         ?,
                                 ?,         ?,         ?,         ?,         ?,
                                 ?,         ?,         ?,         ?,         ?,
                                 ?,         ?,         ?,         ?,         ?      )`
                            , [courses1,  courses2,  courses3,  courses4,  courses5,
                               courses6,  courses7,  courses8,  courses9,  courses10,
                               courses11, courses12, courses13, courses14, courses15,
                               courses16, courses17, courses18, courses19, courses20,
                               courses21, courses22, courses23, courses24, courses25,
                               courses26, courses27, courses28, courses29, courses30,
                               courses31, courses32, courses33, courses34, courses35,
                               courses36, courses37, courses38, courses39, courses40,
                               courses41, courses42, courses43, courses44, courses45 ]
                            )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler