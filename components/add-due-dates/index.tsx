import Router from 'next/router'
import SemesterButton from '@/components/semester-button'
import { useState } from 'react'
import { useGradeWeights } from '@/lib/swr-hooks'

function AddDates({ current_courses, current_semester, user_id }) {
    const [due_date, setDueDate] = useState('')
    const [date, setDate] = useState('')
    const [course, setCourse] = useState('')
    const [course_id, setCourseId] = useState(0)
    const { grade_weights } = useGradeWeights( current_semester )
    const [grade_weight_id, setGradeType] = useState(0)
    const [due_date_description, setDueDateDescription] = useState('')
    const [course_name, setCourseName] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [display_grade_type, setDisplayGradeType] = useState(false)
    const [addAnother, setAddAnother] = useState('Add')
    var weights = []

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        if(course_id != 0 && due_date_description != '' && due_date != '' && grade_weight_id !=0){
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
                setCourse('')
                setDisplayGradeType(false)
                const json = await res.json()
                if (!res.ok) throw Error(json.message)
            } catch (e) {
                throw Error(e.message)
            }
        } else {

            if(course_id === 0){
                document.getElementById("course").style.backgroundColor = "#FF9494";
            } else if(grade_weight_id === 0){
                document.getElementById("grade_type").style.backgroundColor = "#FF9494";
            } 
  
            if(due_date_description === ''){
                document.getElementById("description").style.backgroundColor = "#FF9494";
            } 

            if(due_date === ''){
                document.getElementById("due-date").style.backgroundColor = "#FF9494";
            } 
            
            setSubmitting(false)
        }
    }

    function dateConvert(date){
        var year = date.substring(0,4);
        var month = date.substring(5,7);
        var day = date.substring(8,10);
  
        return month + "/" + day + "/" + year ;
    }


    function setGradeWeight( weightId ){
        setGradeType(parseInt(weightId))
    }

    function sortGradeWeights(){
        for(var i = 0 ; i < grade_weights.length ; i++){
            if(!weights.includes(grade_weights[i].grade_weight) && grade_weights[i].course_name === course){
                weights[i] = [grade_weights[i].grade_weight,grade_weights[i].grade_weight_type ]
            }
        }
    }

    function getCourseInfo ( courseName ) {
        setDate('')
        setDueDateDescription('')
        weights = []
        

        for(let i = 0; i < current_courses.length ; i++){
            if(current_courses[i].course_name == courseName){
                setCourseId(current_courses[i].course_id);

            }
        }
    }

    // function setDisplayType (){


    //     if(grade_weights.length != 0){
    //         setDisplayGradeType(true)
    //     } else {
    //         setDisplayGradeType(false)
    //     }
    // }

    if (current_courses && grade_weights) {
        
        return (
            <>
                <div className="py-5 pr-0 w-full flex flex-row justify-between items-center">
                    <div className="border-4 rounded-lg border-customBlue px-2 pb-3px">
                        <h3 className="font-bold text-3xl">Add Due Date</h3>
                    </div>
                </div>
                <form onSubmit={submitHandler} autoComplete="off">
                    <div className="mt-2 mb-2">
                        <div className="flex flex-col">
                            <div className="py-2 flex flex-row items-center">
                                <h3 className="font-bold">Due Date: </h3>
                                <input 
                                type="date" 
                                className="selectDate ml-4"
                                value={date} 
                                onChange={(e) => {setDate(e.target.value); setDueDate(dateConvert(e.target.value))} } 
                                id="due-date" 
                                name="due-date"/>
                            </div>
                            <div className="py-2 flex flex-row items-center">
                                <h3 className="font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="select shadow border rounded ml-4"
                                    name="course"
                                    value={course}
                                    onChange={(e) => { setCourse(e.target.value);  getCourseInfo(e.target.value); }}
                                >
                                    <option value="115">Select</option> 
                                    {current_courses.map((e) => (
                                        <option value={e.course_name}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            { grade_weights && sortGradeWeights()}
                            { (weights.length != 0) &&
                                <div className="flex flex-row my-2 items-center">
                                    <label htmlFor="grade_type">
                                    <h3 className="font-bold">Grade Type:</h3>
                                    </label>
                                    <select
                                    id="grade_type"
                                    className="select ml-2 shadow border rounded"
                                    name="grade_type"
                                    onChange={(e) => setGradeWeight(e.target.value)}
                                    >
                                        <option value="none">Select</option>
                                        {weights.map((e) => (
                                            <option value={e[0]}>({e[0]}%)&nbsp;&nbsp;{e[1]}</option>
                                        ))}
                                    </select>
                                </div>
                            }
                            <div className="py-2 items-center flex flex-row font-bold">
                                <h3>Description: </h3>
                                <input
                                    id="description"
                                    autoComplete="off"
                                    className="input border-b border-black text-center w-200px pl-1 pr-1 my-1 ml-2"
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