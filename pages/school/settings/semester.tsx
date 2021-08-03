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
  const [checked, setChecked] = useState((object.semester_id === object.current_semester) ? true : false); 
  


  async function updateSemester(checked) {
    if(checked){
      setChecked(true)
      const current_semester = object.semester_id
      try {
        const res = await fetch('/api/add-current-semester', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            current_semester,
            userEmail
          }),
        })
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
      } catch (e) {
        throw Error(e.message)
      }
      console.log("Checked")
    } else {
      setChecked(false)
      console.log("unchecked")
    }
  }

    return (
      <Layout>
        <>         
          <div className="page-container h-full w-full grid justify-items-center">
              <div className="small-container">
                  <div className="py-4 px-6 w-full">
                    <h3 className="font-bold text-4xl">{object.season} {object.year}</h3> 
                    <div className="flex flex-row pr-4 text-2xl justify-between items-center">
                      <h3>Current Semester:</h3>
                      <input type="checkbox" name="current_semester" value="yes" checked={checked} onChange={(e) => updateSemester(e.target.checked)}/>
                    </div>
                    <div className="flex flex-row justify-between text-2xl items-center">
                      <h3>Target GPA: </h3>
                      <div className="flex flex-row justify-between items-center">
                        <h3>3.7</h3>
                        <img src="/edit-icon.svg" style={{ height: 24, width: 50, cursor: 'pointer'}}/>
                      </div>
                    </div>
                    <ClassesSection season={object.season} year={object.year} semester_id={object.semester_id} course={course} />
                    <div className="py-6">
                      <Link href='/school/settings/choose-semester'>
                          <button className="border-2 border-black font-bold py-1 px-2 rounded">Back</button>
                      </Link> 
                    </div>
                  </div> 
              </div>
          </div>
        </>
      </Layout>
    )
  } 

export default withRouter(Semester);