import { useState, useEffect } from "react";
import { useDayTime } from "@/lib/swr-hooks";
import Router from "next/router";
import SemesterButton from '@/components/semester-button'
import Layout from "pages/layout";
import Link from "next/link";
import { withRouter } from 'next/router';


function AddCourseTime( { router: { query } } ) {
    const [time_in, setTimeIn] = useState("08:00")
    const [time_out, setTimeOut] = useState("08:50")
    const [time_in_temp, setTimeInTemp] = useState('')
    const [time_out_temp, setTimeOutTemp] = useState('')
    const [day_of_week, setDay] =useState('')
    const [submitting, setSubmitting] = useState(false)
    const [addAnother, setAddAnother] = useState('Add')
    const object = JSON.parse(query.object);
    

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        const semester_id = object.semester_id
        const course_id = object.course_id
        if(day_of_week != '' && time_in_temp != '' && time_out_temp != ''){
            try {
                const res = await fetch('/api/add-course-time', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    semester_id,
                    course_id,
                    day_of_week,
                    time_in,
                    time_out
                }),
                })
                setSubmitting(false)
                setDay("")
                setTimeIn("08:00")
                setTimeOut("08:50")
                setAddAnother('Add Another')
                const json = await res.json()
                if (!res.ok) throw Error(json.message)
            } catch (e) {
                throw Error(e.message)
            }
        } else {

            if(day_of_week === ''){
                document.getElementById("day").style.backgroundColor = "#FF9494";
            }

            if(time_in_temp === ''){
                document.getElementById("timeIn").style.backgroundColor = "#FF9494";
            } 

            if(time_out_temp === ''){
                document.getElementById("timeOut").style.backgroundColor = "#FF9494";
            }
            
            setSubmitting(false)
        }
    }


    return (
      <Layout>
        <>
          <div className="page-container w-full grid justify-items-center">
            <div className="small-container py-4 px-6"> 
              <div className="py-5 pr-0 w-full flex flex-row justify-between items-center">
                <div className="border-4 rounded-lg border-customBlue px-2 pb-3px">
                    <h3 className="font-bold text-3xl">Add Course Time</h3>
                </div>
              </div>
              <h3 className="font-bold mb-5 text-xl">{object.course_name}</h3>
              <form onSubmit={submitHandler} autoComplete="off">
                  <div className="flex flex-col w-full mb-3">
                      <div className="flex flex-row items-center">
                          <h3 className="font-bold">Day: </h3>
                          <select
                              id="day"
                              className="select2 shadow border rounded ml-4"
                              name="day"
                              value={day_of_week}
                              onChange={(e) => { setDay(e.target.value) }}
                          >
                              <option value="none">Select</option>
                              <option value="monday">Monday</option>
                              <option value="tuesday">Tuesday</option>
                              <option value="wednesday">Wednesday</option>
                              <option value="thursday">Thursday</option>
                              <option value="friday">Friday</option>
                          </select>
                      </div>
                      <div className="flex flex-row items-center mt-4">
                          <h3 className="font-bold">Start: </h3>
                          <input
                              id="timeIn"
                              type="time"
                              defaultValue="07:30"
                              className="selectTime ml-2"
                              value={time_in}
                              onChange={ (e) => {setTimeIn(e.target.value); setTimeInTemp(e.target.value);}}
                          />
                        </div>
                        <div className="flex flex-row items-center mt-4">
                          <h3 className="font-bold">End: </h3>
                          <input
                              id="timeOut"
                              type="time"
                              defaultValue="07:30"
                              className="selectTime ml-2"
                              value={time_out}
                              onChange={ (e) => { setTimeOut(e.target.value); setTimeOutTemp(e.target.value); }}
                          />
                        </div>
                      </div>
                  <SemesterButton disabled={submitting} type="submit">
                          {submitting ? 'Add ...' : addAnother}
                  </SemesterButton> 
              </form>
              <div className="w-full flex justify-end">
                <Link href={{ pathname: '/school/settings/class', query: { object: JSON.stringify(object) } }}>
                    <button className="border-2  border-black font-bold py-1 px-2 rounded">Back</button>
                </Link>
              </div>
            </div>
          </div>
        </> 
      </Layout>
    )
}

    
export default withRouter(AddCourseTime);