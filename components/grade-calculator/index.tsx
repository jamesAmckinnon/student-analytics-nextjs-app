import Link from 'next/link'
import { useDueDates, useGradeWeight, useGradeWeights } from '@/lib/swr-hooks';
import { useState, useEffect } from 'react';
import Button from '@/components/button'

function GradeCalculator( { current_courses, gradeWeight, current_grades  }) {
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

    function sortGradeWeights(){
        for(var i = 0 ; i < gradeWeight.length ; i++){
            if(!weights.includes(gradeWeight[i].grade_weight) && gradeWeight[i].course_name === course){
                weights[i] = [gradeWeight[i].grade_weight, gradeWeight[i].grade_weight_type ]
            }
        }
    }


    function gradeNeed(){

        // will need to use values from the select inputs in the calculations.
        // will only need to make the calculations with grade entries that 
        // have the same course_id as the select input that the user pressed
        // 
        //   0: Array(2)
        //     0: 93.0909090909091       weighted_grade of course 
        //     1: 5                      course_id




        //for each course that has grade entries
        var weighted_grades = 0;
        var weight_percents = 0;
        var weighted_course_grades = []
        for ( var grade_item of current_grades ){
            //for every grade entry in the course
            if ( grade_item.course_id === course_id){
                // console.log(grade_item.grade_weight)
                weighted_grades += ( grade_item.grade_weight * grade_item.grade_received )
                weight_percents += grade_item.grade_weight
                //create dictionary entry for weight
            }
            // console.log(grade_type, "<--- grade_type")        
        }

        weight_percents += grade_type//
        console.log( parseFloat(desired_grade), " * ", weight_percents, " - ",  weighted_grades,  "/", grade_type)
        var unknown_grade = ( (parseFloat(desired_grade) * weight_percents) -  weighted_grades) / grade_type;
    

        console.log(`${weighted_grades} / ${weight_percents}`)
        console.log(unknown_grade, "<--- the grades")

        return unknown_grade
    }

    function getCourseInfo ( courseName ) {
        setDesiredGrade('')
        setGradeType(0)
        setCourseGrade(0)
        weights = []
        

        for(let i = 0; i < current_courses.length ; i++){
            if(current_courses[i].course_name == courseName){
                setCourseId(current_courses[i].course_id);
                setTargetGrade(current_courses[i].target_course_gpa)
                setCourseGrade(current_courses[i].grade_total)
            }
        }
    }

    function setGradeWeight( weightId ){
        setGradeType(parseFloat(weightId))
    }

    return (
    <>
        <div className="flex flex-start w-full my-4">
            <div className="border-4 rounded-lg border-customYellow mt-6 px-2 pb-3px">
                <h3 className="font-bold text-2xl">Grade Calculator</h3>
            </div>
        </div>
        <form onSubmit={gradeNeed} autoComplete="off">
            <div className="flex flex-row w-full my-4">
                <label className="flex items-center " htmlFor="course">
                <h3 className="font-bold">Course: </h3>
                </label>
                { current_courses && current_courses.length != 0 && 
                <select
                id="course"
                className="select shadow border rounded ml-2"
                name="course"
                value={course}
                onChange={(e) => {setCourse(e.target.value); getCourseInfo(e.target.value);}}
                >
                    <option value=''>Select</option>
                        {current_courses.map((e) => (
                    <option value={e.course_name}>{e.course_name}</option>
                ))}
                </select>}
                { current_courses && current_courses.length === 0 && 
                <select
                id="course"
                className="select shadow border text-center rounded ml-2"
                name="course"
                value={course}
                onChange={(e) => {setCourse(e.target.value); getCourseInfo(e.target.value);}}
                >
                    <option value=''>Select</option>
                    <option className="" value=''>--- No Courses Added ---</option>
                </select>}
            </div>
            { gradeWeight && sortGradeWeights()}
            { (weights.length != 0) &&
                <div className="flex flex-row w-full my-4">
                    <label  className="flex items-center "  htmlFor="grade_type">
                    <h3 className="font-bold">Grade Type:</h3>
                    </label>
                    <select
                    id="grade_type"
                    className="select ml-2 shadow border rounded"
                    name="grade_type"
                    // value={grade_type}
                    onChange={(e) => setGradeWeight(e.target.value)}
                    >
                        <option value="none">Select</option>
                        {weights.map((e) => (
                            <option value={e[0]}>({e[0]}%)&nbsp;&nbsp;{e[1]}</option>
                        ))}
                    </select>
                </div>
            }
            { (weights.length === 0) && course != '' &&
                <>
                    <div className="flex flex-row w-full my-4 items-center">
                        <h3 className="font-bold">Grade Type:</h3>
                        <select className="select shadow border rounded ml-2">
                            <option>Select</option>
                            <option>--- No Weights Added ---</option>
                        </select>
                    </div>
                </>
            }
            { (weights.length != 0) &&
                <div className="flex flex-row font-bold my-4">
                    <h3>Desired Course Grade: </h3>
                    <input
                        id="desired"
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
            {desired_grade != '' && grade_type != 0 && course != '' && course_grade != 0 &&(weights.length != 0) &&
                <div className="flex flex-row my-4">
                    <h3 className="font-bold">Grade Needed:</h3>
                    <h3 className="ml-2">{Number.isNaN(Math.round( gradeNeed() * 100 + Number.EPSILON ) / 100)  ? '' :
                                          (Math.round( gradeNeed() * 100 + Number.EPSILON ) / 100)}</h3>
                </div>
            }
        </form>
    </>
)
}

export default GradeCalculator