import { useState, useEffect } from "react";
import { useDayTime } from "@/lib/swr-hooks";
import Router from "next/router";
import Link from "next/link";
import Button from '@/components/button'


function CourseTime( { object, semester_id, course_id, course_day_time} ) {
    const [time_in, setTimeIn] = useState("08:00")
    const [time_out, setTimeOut] = useState("08:50")
    const [day_of_week, setDay] =useState("")
    const [submitting, setSubmitting] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [deleteBool, setDelete] = useState(false)
    

    async function deleteHandler(schedule_id) {
        document.getElementById(`${schedule_id}`).style.display = "none";
        let res = await fetch(`/api/delete-course-time?schedule_id=${schedule_id}`, { method: 'DELETE' })
        let json = await res.json()
        if (!res.ok) throw Error(json.message)
    }

    function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }

    function toggleDelete(toggle_delete) {
        if(!toggle_delete){
            setDelete(true)
        } else {
            setDelete(false)
        }
    }


    return (
        <>
            <div className="pb-2 pt-4 pr-0 mt-3 flex flex-row justify-between items-center">
                <div className="border-4 rounded-lg border-customYellow px-2 pb-3px">
                    <h3 className="font-bold text-2xl">Course Times</h3>
                </div>
                <div className="flex flex-row">
                    <a className="mr-4" onClick={() => toggleDelete(deleteBool)}>
                        <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                    </a>
                    <Link href={{ pathname: '/school/settings/add-course-times', query: { object: JSON.stringify(object) } }}>
                        <img src="/add-icon.svg" style={{ height: 28, width: 24, cursor: 'pointer'}}/>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col my-1">
                {course_day_time && course_day_time.map((e) => (
                    <div id={e.schedule_id} className="py-1 w-full flex flex-row justify-between">
                        <h3 key={day_of_week} >{e.day_of_week.charAt(0).toUpperCase() + e.day_of_week.slice(1)}</h3>
                        <div className="endCont flex flex-row">
                            <h3 className='font-bold mr-2'>{tConvert (e.time_in)} {(e.time_out === null) ? "" : ("- " + tConvert (e.time_out)) }</h3>
                            { deleteBool &&
                                <a onClick={() => deleteHandler(e.schedule_id)} className="deleteEntry">
                                    <img src="/delete-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                                </a> 
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

    
export default CourseTime