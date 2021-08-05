import Router from 'next/router'
import SemesterButton from '@/components/semester-button'
import { useState } from 'react'
import { useEntries } from '@/lib/swr-hooks'

function AddClass( {router: { query }} ) {
    const [course_name, setCourseName] = useState('')
    const [course_code, setCourseCode] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [addAnother, setAddAnother] = useState('Add')
    const { entries } = useEntries()
    const object = JSON.parse(query.object);
    const[semester_id, setSemesterId] = useState(0)
    


    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        if(course_name != '' && course_code != ''){
            try {
            const res = await fetch('/api/add-course', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                semester_id,
                course_name,
                }),
            })
            setSubmitting(false)
            setAddAnother('Add Another')
            setCourseName('')
            setCourseCode('')
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            } catch (e) {
            throw Error(e.message)
            }
        } else {
            document.getElementById("course_name").style.backgroundColor = "#FF9494";
            document.getElementById("course_code").style.backgroundColor = "#FF9494";
            setSubmitting(false)
        }
    }
    
    if (entries) {
        return (      
            <>
                <div className="py-5 pr-0 w-full flex flex-row justify-between items-center">
                    <div className="border-4 rounded-lg border-customBlue2 px-2 pb-3px">
                        <h3 className="font-bold text-3xl">Add Class</h3>
                    </div>
                </div>
                <form onSubmit= {submitHandler}>
                    <div className="py-2 flex flex-row justify-between">
                        <div className="flex flex-col justify between">
                            <div className="flex flex-row mt-4">
                                <h3 className="font-bold">Course Name: </h3> 
                                <input 
                                    id="course_name" 
                                    type="text" 
                                    className="border-b-2 border-black mx-5 w-130px pl-2" 
                                    placeholder="Linear Algebra II"
                                    maxLength={35} 
                                    name="course_name"
                                    value={course_name}
                                    onChange={ (e) => {setCourseName(e.target.value), setSemesterId(object.semester_id)}}
                                />
                            </div>
                            <div className="flex flex-row mt-4">
                                <h3 className="font-bold">Course Code: </h3>
                                <input 
                                    id="course_code" 
                                    type="text" 
                                    className="border-b-2 border-black mx-5 w-90px pl-2" 
                                    placeholder="MATH 225"
                                    maxLength={10} 
                                    name="course_name"
                                    value={course_code}
                                    onChange={ (e) => {setCourseCode(e.target.value)}}
                                />
                            </div>
                            <div className="w-full mt-4">
                                <SemesterButton disabled={submitting} type="submit">
                                    {submitting ? 'Adding ...' : addAnother}
                                </SemesterButton>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    } else {
        return null
    }
  } 

export default AddClass