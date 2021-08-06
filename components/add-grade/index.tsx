import { useState } from 'react'
import { useGradeWeight } from '@/lib/swr-hooks'
import Router from 'next/router'

import Button from '@/components/button'

function AddGrades( {current_courses} ) {
    const [course, setCourse] = useState('')
    const [course_id, setCourseId] = useState(0)
    const [grade_type, setGradeType] = useState(0)
    const [grade, setGrade] = useState('')
    const [description, setDescription] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [enterAnother, setEnterAnother] = useState('Enter')
    const { gradeWeight } = useGradeWeight( course_id )
  
    
    async function submitHandler(e) {
      setSubmitting(true)
      e.preventDefault()
        try {
            const res = await fetch('/api/add-grade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grade_type,
                grade,
                course_id,
                description
            }),
            })
            setSubmitting(false)
            setCourse('')
            setGradeType(0)
            setGrade('')
            setDescription('')
            setEnterAnother('Enter Another')
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            setCourse("")
            Router.push('/school/add')
        } catch (e) {
            throw Error(e.message)
        }
      }

    function getCourseId ( courseName ) {
        for(let i = 0; i < current_courses.length ; i++){
            if(current_courses[i].course_name == courseName){
                setCourseId(current_courses[i].course_id);
            }
        }
    }

    function setGradeWeight( weightId ){
        setGradeType(parseInt(weightId))
    }

    if (current_courses && gradeWeight) {
        return (
            <>
                <div className="py-2 pr-0 w-full flex flex-row justify-between items-center">
                    <div className="border-4 rounded-lg border-green-500 px-2 pb-3px">
                       <h3 className="font-bold text-3xl">Grades</h3>
                    </div>
                </div>
                <form onSubmit={submitHandler} autoComplete="off">
                    <div className="flex flex-row my-4">
                        <label htmlFor="course">
                        <h3 className="font-bold">Course: </h3>
                        </label>
                        <select
                        id="course"
                        className="shadow border rounded ml-2"
                        name="course"
                        value={course}
                        onChange={(e) => {setCourse(e.target.value); getCourseId(e.target.value);}}
                        >
                            <option value="none">Select</option>
                                {current_courses.map((e) => (
                            <option value={e.course_name}>{e.course_name}</option>
                        ))}
                        </select>
                    </div>
                    <div className="flex flex-row font-bold my-4">
                        <h3>Description: </h3>
                        <input
                            id="description"
                            autoComplete="off"
                            className="border-b border-black text-center pl-1 pr-1 w-230px mb-1 ml-2"
                            name="description"
                            type="text"
                            placeholder="Assignment 4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
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
                            value={grade_type}
                            onChange={(e) => setGradeWeight(e.target.value)}
                            >
                                <option value="none">Select</option>
                                {gradeWeight.map((e) => (
                                    <option value={e.grade_weight_id}>({e.grade_weight}%)&nbsp;&nbsp;{e.grade_weight_type}</option>
                                ))}
                            </select>
                        </div>
                    }
                    <div className="flex flex-row font-bold my-4">
                        <h3>Grade: </h3>
                        <input
                            id="grade"
                            autoComplete="off"
                            className="border-b border-black text-center pl-1 pr-1 w-35px mb-1 ml-2"
                            name="grade"
                            type="text"
                            placeholder="%"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            />
                    </div>
                    <Button disabled={submitting} type="submit">
                        {submitting ? 'Entering ...' : enterAnother}
                    </Button>
                </form>
            </>
        )
    } else {
        return null
    }
}
    
export default AddGrades