import Router from 'next/router'
import SemesterButton from '@/components/semester-button'
import { useState } from 'react'
import { useGradeWeight } from '@/lib/swr-hooks'

function AddDates({ current_courses, current_semester, user_id }) {
    const [due_date, setDueDate] = useState("")
    const [date, setDate] = useState('')
    const [course, setCourse] = useState('')
    const [course_id, setCourseId] = useState(0)
    const { gradeWeight } = useGradeWeight( course_id )
    const [grade_weight_id, setGradeType] = useState(0)
    const [due_date_description, setDueDateDescription] = useState("")
    const [course_name, setCourseName] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [addAnother, setAddAnother] = useState('Add')


    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        try {
            const res = await fetch('/api/add-due-date', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    current_semester,
                    course_id,
                    due_date_description,
                    due_date,
                    grade_weight_id,
                }),
            })
            setSubmitting(false)
            setDueDate('')
            setDueDateDescription('')
            setCourseName('')
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
        } catch (e) {
            throw Error(e.message)
        }
    }

    function dateConvert(date){
        var year = date.substring(0,4);
        var month = date.substring(5,7);
        var day = date.substring(8,10);
  
        return month + "/" + day + "/" + year ;
    }

    function getCourseId ( courseName ) {
        for(let courses of current_courses){
            if(courses.course_name == courseName){
                setCourseId(courses.course_id);
            }
        }
    }

    function setGradeWeight( weightId ){
        setGradeType(parseInt(weightId))
    }

    if (current_courses && gradeWeight) {
        
        return (
            <>
                <div className="py-5 pr-0 w-full flex flex-row justify-between items-center">
                    <div className="border-4 rounded-lg border-customBlue2 px-2 pb-3px">
                        <h3 className="font-bold text-3xl">Add Due Date</h3>
                    </div>
                </div>
                <form onSubmit={submitHandler} autoComplete="off">
                    <div className="mt-2 mb-2">
                        <div className="flex flex-col">
                            <div className="py-2 flex flex-row">
                                <h3 className="font-bold">Due Date: </h3>
                                <input 
                                type="date" 
                                className="ml-4"
                                value={date} 
                                onChange={(e) => {setDate(e.target.value); setDueDate(dateConvert(e.target.value))} } 
                                id="due-date" 
                                name="due-date"/>
                            </div>
                            <div className="py-2 flex flex-row">
                                <h3 className="font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course}
                                    onChange={(e) => { setCourse(e.target.value); getCourseId(e.target.value);}}
                                >
                                    <option value="115">Select</option> 
                                    {current_courses.map((e) => (
                                        <option value={e.course_name}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            { (gradeWeight.length != 0) &&
                                <div className="flex flex-row my-4">
                                    <label htmlFor="grade_type">
                                    <h3 className="font-bold">Grade Type:</h3>
                                    </label>
                                    <select
                                    id="grade_type"
                                    className="ml-2 shadow border rounded"
                                    name="grade_type"
                                    value={grade_weight_id}
                                    onChange={(e) => setGradeWeight(e.target.value)}
                                    >
                                        <option value="none">Select</option>
                                        {gradeWeight.map((e) => (
                                            <option value={e.grade_weight_id}>({e.grade_weight}%)&nbsp;&nbsp;{e.grade_weight_type}</option>
                                        ))}
                                    </select>
                                </div>
                            }
                            <div className="py-2  flex flex-row font-bold">
                                <h3>Description: </h3>
                                <input
                                    id="description"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-200px pl-1 pr-1 my-1 ml-2"
                                    name="description"
                                    type="text"
                                    placeholder="eg.  PMCOL 371 Midterm"
                                    value={due_date_description}
                                    onChange={(e) => setDueDateDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <SemesterButton disabled={submitting} type="submit">
                        {submitting ? 'Adding ...' : addAnother}
                    </SemesterButton>
                </form>
            </>
        )
    } else {
        return null
    }
}

export default AddDates