import Link from 'next/link'
import { useDueDates, useGradeWeight, useGradeWeights } from '@/lib/swr-hooks';
import { useState, useEffect } from 'react';
import Button from '@/components/button'

function GradeCalculator( { current_courses, gradeWeight }) {
    const [width, setWidth] = useState(window.innerWidth)
    const [course, setCourse] = useState('')
    const [target_grade, setTargetGrade] = useState(0)
    const [course_grade, setCourseGrade] = useState(0.0)
    const [grade_type, setGradeType] = useState(0)
    const [grade_needed, setGradeNeeded] = useState(false)
    const [course_id, setCourseId] = useState(0)
    const [desired_grade, setDesiredGrade] = useState('')
    const [submitting, setSubmitting] = useState(false)
    var weights = []

    useEffect(() => {
        function handleResize() {
        setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);
  
    console.log(gradeWeight)
    console.log(current_courses, "<--- current")

    function sortGradeWeights(){
        for(var i = 0 ; i < gradeWeight.length ; i++){
            if(!weights.includes(gradeWeight[i].grade_weight) && gradeWeight[i].course_name === course){
                weights[i] = [gradeWeight[i].grade_weight, gradeWeight[i].grade_weight_type ]
            }
        }

        console.log(weights, "<--- weights")
    }


    function gradeNeed(){
        var target = parseInt(desired_grade);
        var weight = grade_type * .01;
        var current = course_grade;
        var gradeNeeded = 0

        console.log(target, weight, current)

        gradeNeeded = (target - ( (1 - weight) * (current) )) / weight;
        console.log(gradeNeeded)

        return gradeNeeded
    }

    function getCourseInfo ( courseName ) {
        setDesiredGrade('')
        weights = []
        setGradeType(0)

        for(let i = 0; i < current_courses.length ; i++){
            if(current_courses[i].course_name == courseName){
                setCourseId(current_courses[i].course_id);
                setTargetGrade(current_courses[i].target_course_gpa)
                console.log(current_courses[i].grade_total, "<----")
                setCourseGrade(current_courses[i].grade_total)
            }
        }
    }

    function setGradeWeight( weightId ){
        setGradeType(parseInt(weightId))
    }

    return (
    <>
        <div className="flex flex-start w-full my-2">
            <div className="mt-8 text-lg font-bold  border-2 border-customYellow rounded px-5px py-2px">
                <h2>Grade Calculator</h2>
            </div>
        </div>
        <form onSubmit={gradeNeed} autoComplete="off">
            <div className="flex flex-row my-4">
                <label htmlFor="course">
                <h3 className="font-bold">Course: </h3>
                </label>
                { current_courses && <select
                id="course"
                className="shadow border rounded ml-2"
                name="course"
                value={course}
                onChange={(e) => {setCourse(e.target.value); getCourseInfo(e.target.value);}}
                >
                    <option value="none">Select</option>
                        {current_courses.map((e) => (
                    <option value={e.course_name}>{e.course_name}</option>
                ))}
                </select>}
            </div>
            { gradeWeight && sortGradeWeights()}
            { (weights.length != 0) &&
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
                        {weights.map((e) => (
                            <option value={e[0]}>({e[0]}%)&nbsp;&nbsp;{e[1]}</option>
                        ))}
                    </select>
                </div>
            }
            { (weights.length != 0) &&
                <div className="flex flex-row font-bold my-4">
                    <h3>Desired Course Grade: </h3>
                    <input
                        id="description"
                        autoComplete="off"
                        className="border-b border-black text-center pl-1 pr-1 w-35px mb-1 ml-2"
                        name="description"
                        type="text"
                        placeholder="%"
                        value={desired_grade}
                        onChange={(e) => setDesiredGrade(e.target.value)}
                        />
                </div>
            }
            {desired_grade != '' && (weights.length != 0) &&
                <div className="flex flex-row my-4">
                    <h3 className="font-bold">Grade Needed:</h3>
                    <h3 className="ml-2">{Math.round( gradeNeed() * 100 + Number.EPSILON ) / 100}</h3>
                </div>
            }
        </form>
    </>
)
}

export default GradeCalculator