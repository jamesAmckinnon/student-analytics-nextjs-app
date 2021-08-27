import GradeWeighting from '@/components/grade-weighting'
import Grades from '@/components/grades'
import CourseTime from '@/components/course-time';
import Layout from 'pages/layout'
import { withRouter } from 'next/router';
import { useDayTime } from '@/lib/swr-hooks';
import Link from 'next/link';
import { useState } from 'react';

function Class( { router: { query } } ) {
  const object = JSON.parse(query.object);
  const { course_day_time } = useDayTime(object.semester_id, object.course_id )
  const [targetGpa, setTargetGpa] = useState(false)
  const [gpa, setGpa] = useState(object.target_course_gpa)

  function toggleSetGpa(toggle_delete) {
    if(!toggle_delete){
        setTargetGpa(true)
    } else {
        setTargetGpa(false)
    }
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  async function gpaTargetHandler() {
    if(isNumeric(gpa)){
      document.getElementById('gpa').style.backgroundColor = 'white';
      setTargetGpa(false)
      let res = await fetch(`/api/add-target-course-gpa?course_id=${object.course_id}&gpa=${gpa}`, { method: 'POST' })
      let json = await res.json()
      if (!res.ok) throw Error(json.message)
    } else {
      document.getElementById('gpa').style.backgroundColor = '#FF9494';
    }
  }

  return (
    <Layout>
      <>         
        <div className="page-container w-full grid justify-items-center">
            <div className="small-container">
                <div className="py-4 px-6 w-full">
                    <h3 className="font-bold text-4xl">{object.course_name}</h3> 
                    <div className="flex flex-row justify-between text-2xl items-center">
                        <h3>Target Grade: </h3>
                        <div className="flex flex-row justify-between items-center">
                        {!targetGpa && 
                          <h3 className="mr-4">{gpa}</h3>
                        } {targetGpa &&
                            <input
                              id="gpa"
                              autoComplete="off"
                              className="border-b border-black text-center pl-1 pr-1 w-50px mr-4"
                              name="gpa"
                              type="text"
                              placeholder={gpa === 0 ? "%" : gpa}
                              onChange={(e) => setGpa(e.target.value)}
                            />
                          } 
                          <a className="" onClick={() => toggleSetGpa(targetGpa)}>
                            {!targetGpa &&
                              <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/> 
                            } 
                          </a>
                          <a className="mt-2" onClick={() => gpaTargetHandler()}>
                            { targetGpa &&
                              <img src="/check.svg" style={{ height: 29, width: 24, cursor: 'pointer'}}/>
                            }
                          </a>
                        </div>
                    </div>
                    {course_day_time && <CourseTime object={object} semester_id={object.semester_id} course_id={object.course_id} course_day_time={course_day_time}/>}
                    { object && <GradeWeighting object= {object}/>}
                    { object && <Grades object= {object} title="Grades"/>}
                    <div className="w-full mt-6 flex justify-between">
                      <Link href={{ pathname: '/school/settings/semester', query: { object: JSON.stringify(object) } }}>
                        <button className="border-2  border-black font-bold py-1 px-2 rounded">Back</button>
                      </Link>
                      <Link href='/school/home'>
                        <button className="border-2 border-black font-bold py-1 px-2 rounded">Done</button>
                      </Link> 
                    </div>  
                </div> 
            </div>
        </div>
      </>
    </Layout>
  )
  } 

export default withRouter(Class);