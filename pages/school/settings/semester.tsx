import ClassesSection from '@/components/classes-section'
import Layout from 'pages/layout'
import { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { useClass } from '@/lib/swr-hooks'
import { useDayTime } from '@/lib/swr-hooks';
import { useSession } from 'next-auth/client'
import { useCurrentSem } from '@/lib/swr-hooks';
import Link from 'next/link';
import Router from 'next/router'

function Semester( { router: { query } } ) {
  const object = JSON.parse(query.object);
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const { course } = useClass(userEmail);
  const [checked, setChecked] = useState(object.semester_id === object.current_semester); 
  const [targetGpa, setTargetGpa] = useState(false);
  const [gpa, setGpa] = useState(object?.target_gpa)
  const [cur_semester, setCurSemester] = useState(object?.current_semester)
  const { current_semester } = useCurrentSem(userEmail)

  const object2 = {
    course_name: object.course_name,
    course_id: object.course_id,
    season: object.season,
    year: object.year,
    semester_id: object.semester_id,
    current_semester: current_semester,
    target_gpa: gpa,
    user_id: userEmail
  }


  function setTheSemester(semesterNum) {
    setCurSemester(semesterNum)
  }

  async function updateSemester(checkedBool) {
    if(checkedBool){
      setChecked(true)
      object.current_semester = object.semester_id 
      var current_semester_id = object.current_semester;
      setTheSemester(object.semester_id)
      try {
        const res = await fetch('/api/add-current-semester', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            current_semester_id,
            userEmail
          }),
        })
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
        Router.push({ pathname: '/school/settings/semester',  query: { object: JSON.stringify(object) }})
      } catch (e) {
        throw Error(e.message)
      }
    } else {
      setChecked(false)
      current_semester_id = 125 ///////// for home screen, if current semester === 125, display message saying choose current semester in settings
      try {
        const res = await fetch('/api/add-current-semester', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            current_semester_id,
            userEmail
          }),
        })
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
        Router.push({ pathname: '/school/settings/semester',  query: { object: JSON.stringify(object2) }})
      } catch (e) {
        throw Error(e.message)
      }
    }
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  async function gpaTargetHandler(semester_id) {
    if(isNumeric(gpa)){
      document.getElementById('gpa').style.backgroundColor = 'white';
      setTargetGpa(false)
      let res = await fetch(`/api/add-target-gpa?semester_id=${semester_id}&gpa=${gpa}`, { method: 'POST' })
      let json = await res.json()
      if (!res.ok) throw Error(json.message)
    } else {
      document.getElementById('gpa').style.backgroundColor = '#FF9494';
    }
  }

  function toggleSetGpa(toggle_delete) {
    if(!toggle_delete){
        setTargetGpa(true)
    } else {
        setTargetGpa(false)
    }
  }

    return (
      <Layout>
        <>         
          <div className="page-container w-full grid justify-items-center">
              <div className="small-container">
                  <div className="py-4 px-6 w-full">
                    <h3 className="font-bold text-4xl">{object.season} {object.year}</h3> 
                    <div className="flex flex-row text-2xl justify-between items-center">
                      <h3>Current Semester:</h3>
                      <input 
                        type="checkbox" 
                        name="current_semester" 
                        value="yes" 
                        checked={checked} 
                        onChange={(e) => updateSemester(e.target.checked)}
                      />
                    </div>
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
                        <a className="mt-2" onClick={() => gpaTargetHandler(object.semester_id)}>
                          { targetGpa &&
                            <img src="/check.svg" style={{ height: 29, width: 24, cursor: 'pointer'}}/>
                          }
                        </a>
                      </div>
                    </div>
                    {current_semester && <ClassesSection season={object.season} year={object.year} semester_id={object.semester_id} course={course} object2={object2} current_semester={current_semester[0].current_semester} user_id={userEmail}/>}
                    <div className="py-6">
                    <div className="w-full flex justify-end">
                      {/* <Link href='/school/settings/choose-semester'>
                            <button className="border-2 border-black font-bold py-1 px-2 rounded">Back</button>
                      </Link>  */}
                      <Link href='/school/home'>
                        <button className="border-2 border-black font-bold py-1 px-2 rounded">Back</button>
                      </Link>
                    </div>
                     
                    </div>
                  </div> 
              </div>
          </div>
        </>
      </Layout>
    )
  } 

export default withRouter(Semester);

//semester
//semester?object=%7B%22season%22%3A%22Fall%22%2C%22year%22%3A2021%2C%22semester_id%22%3A45%2C%22current_semester%22%3A55%2C%22target_gpa%22%3A3.7%2C%22user_id%22%3A%22james.mckinnon95%40gmail.com%22%7D
//add class
//add-class?object=%7B%22season%22%3A%22Fall%22%2C%22year%22%3A2021%2C%22semester_id%22%3A45%2C%22current_semester%22%3A55%2C%22target_gpa%22%3A3.7%2C%22user_id%22%3A%22james.mckinnon95%40gmail.com%22%7D
//back to semester
//semester?object=%7B%22season%22%3A%22Fall%22%2C%22year%22%3A2021%2C%22semester_id%22%3A45%2C%22current_semester%22%3A55%2C%22target_gpa%22%3A3.7%7D