import Link from 'next/link'
import { useDayTime } from '@/lib/swr-hooks';
import { useState } from 'react';

function ClassesSection( {season, year, semester_id, course, object2, current_semester, user_id} ) {
  const [deleteBool, setDelete] = useState(false)
  
  function toggleDelete(toggle_delete) {
    if(!toggle_delete){
        setDelete(true)
    } else {
        setDelete(false)
    }
  }

  async function deleteHandler(course_id) {
    document.getElementById(`${course_id}`).style.display = "none";
    let res = await fetch(`/api/delete-course?course_id=${course_id}`, { method: 'DELETE' })
    let json = await res.json()
    if (!res.ok) throw Error(json.message)
  }

  if (course) {
    const object = {
      course_name: course.course_name,
      course_id: course.course_id,
      season: season,
      year: year,
      semester_id: semester_id,
      current_semester: current_semester,
      target_course_gpa: course.target_course_gpa,
      target_gpa: object2.target_gpa,
      user_id: user_id,
    };



    console.log(object)
    return (
      <div>
        <div className="py-4 my-3 w-full h-80px flex flex-row justify-between">
            <div className="border-4 rounded-lg border-green-500 px-2 pb-3px">
                <h3 className="font-bold text-2xl">Classes</h3>
            </div>
            <div className="flex flex-row">
              <a className="flex items-center mr-4" onClick={() => toggleDelete(deleteBool)}>
                <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
              </a>
              <Link href={{ pathname: '/school/settings/add-class', query: { object: JSON.stringify(object) } }}>
                <img src="/add-icon.svg" style={{ height: "auto", width: 25, cursor: 'pointer'}}/>
              </Link>
            </div>
        </div>  
        {course && <div className="flex flex-col">
                {course.map((e) => {
                    if(e.course_name != null && e.semester_id === semester_id){
                      const object3 = {
                        course_name: e.course_name,
                        course_id: e.course_id,
                        season: season,
                        year: year,
                        semester_id: semester_id,
                        current_semester: current_semester,
                        target_course_gpa: e.target_course_gpa,
                        target_gpa: object2.target_gpa,
                      };
                      return (
                        <>
                        <div className="flex flex-row">
                          <Link href={{ pathname: '/school/settings/class', query: { object: JSON.stringify(object3) } }}>
                            <div id={e.course_id} className="courseSelectCont flex flex-row justify-between cursor-pointer w-full">
                                  <a className="flex items-center">{e.course_name}</a>
                              {!deleteBool && 
                                <h3 id="" className="classArrow text-customGrey font-bold text-xl mr-2"> {">"} </h3>
                              }
                            </div>
                          </Link>
                          { deleteBool &&
                            <a onClick={() => deleteHandler(e.course_id)} className="deleteEntry h-31px flex items-center ml-2">
                                <img src="/delete-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                            </a> 
                          }
                        </div>
                      </>

                      )
                    }
                })}
        </div> }
      </div>
    )
  } else {
      return null
  }
}

export default ClassesSection