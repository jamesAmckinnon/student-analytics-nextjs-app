import Router from 'next/router'
import Button from '@/components/button'
import { useState } from 'react'
import { useEntries } from '@/lib/swr-hooks'

function AddDates({ current_courses, current_semester, user_id }) {
    const [due_date, setDueDate] = useState("")
    const [date, setDate] = useState('')
    const [due_date_description, setDueDateDescription] = useState("")
    const [course_name, setCourseName] = useState("")
    const [submitting, setSubmitting] = useState(false)
    console.log(current_semester)

    async function submitHandler(e) {
        setSubmitting(true)
        try {
            const res = await fetch('/api/add-due-date', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    current_semester,
                    course_name,
                    due_date_description,
                    due_date,
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

    if (current_courses) {
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
                                    value={course_name}
                                    onChange={(e) => { setCourseName(e.target.value) }}
                                >
                                    <option value="115">Select</option> 
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
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
                    <Button disabled={submitting} type="submit">
                        {submitting ? 'Entering ...' : 'Enter'}
                    </Button>
                </form>
            </>
        )
    } else {
        return null
    }
}

export default AddDates