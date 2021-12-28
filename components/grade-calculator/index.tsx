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
        //for each course that has grade entries
        // var weighted_grades = 0;
        // var weight_percents = 0;
        // var unknown_grade;

        // if(current_grades.length != 0){
        //     for ( var grade_item of current_grades ){
        //         //for every grade entry in the course
        //         if ( grade_item.course_id === course_id){
        //             weighted_grades += ( grade_item.grade_weight * grade_item.grade_received )
        //             weight_percents += grade_item.grade_weight
        //         }       
        //     }
        //     weight_percents += grade_type//
        //     unknown_grade = ( (parseFloat(desired_grade) * weight_percents) -  weighted_grades) / grade_type;

        // } else {
        //     unknown_grade = ( (parseFloat(desired_grade) * grade_type) -  0) / grade_type;
        // }

        
            // for ( var grade_item of current_grades ){
            //     //for every grade entry in the course
            //     if ( grade_item.course_id === course_id){
            //         weighted_grades += ( grade_item.grade_weight * grade_item.grade_received )
            //         weight_percents += grade_item.grade_weight
            //     }       
            // }
            // weight_sum += grade_type//
            // unknown_grade = ( (parseFloat(desired_grade) * weight_sum) -  weighted_av_sum) / grade_type;

      

        var coursesWithGrades = []
        var modified_current_grades = current_grades
        var courseNames = []
        var courseCodes = []
        var targetCourseGrade = []
        var targetGrade = []
        var unknown_grade;
    
        // modified_current_grades.push({"course_id": course_id, })

        if(current_grades.length != 0){
            for ( var grade of current_grades ){
                if(!coursesWithGrades.includes(grade.course_id)){
                    coursesWithGrades.push(grade.course_id)
                    courseNames.push(grade.course_name)
                    targetCourseGrade.push(grade.target_course_gpa)
                    targetGrade.push(grade.target_gpa)
                    courseCodes.push(grade.course_code)
                }
            }
        
            var gradeWeightVals = new Array(coursesWithGrades.length)
            for (var i = 0; i < gradeWeightVals.length; i++) {
            gradeWeightVals[i] = [[],[],[]];
            }
        
        
        
            var weightedGrade = 0
            

            //for each course that has grade entries
            var weight_sum = 0;
            var weighted_av_sum = 0;
            var grade_type_average = []
            var grade_types = [[],[]]

            for ( var k = 0 ; k < current_grades.length ; k++  ){
                if (grade_types[0].includes(current_grades[k].grade_weight_id) === false && current_grades[k].course_id === course_id){
                    console.log("here")
                    grade_types[0].push(current_grades[k].grade_weight_id)
                    grade_types[1].push(current_grades[k].grade_weight)
                } 
            }

            var sums_of_grades = new Array(grade_types[0].length).fill(0)
            var number_of_grades = new Array(grade_types[0].length).fill(0)

            for (var l = 0 ; l < current_grades.length ; l++  ){
                if(current_grades[l].course_id ===  course_id && grade_types[0].includes(current_grades[l].grade_weight_id) ){
                    sums_of_grades[grade_types[0].indexOf(current_grades[l].grade_weight_id)] += current_grades[l].grade_received
                    number_of_grades[grade_types[0].indexOf(current_grades[l].grade_weight_id)] += 1
                }
            }

            for (var m = 0 ; m < sums_of_grades.length ; m++){
                grade_type_average[m] = sums_of_grades[m] / number_of_grades[m]
            }

            for (var n = 0 ; n < grade_type_average.length ; n++){
                console.log(grade_types)
                weighted_av_sum += (grade_type_average[n] * grade_types[1][n])
                weight_sum += grade_types[1][n]
            }

            weightedGrade = (weighted_av_sum / weight_sum)
            console.log(desired_grade, "  -  ", grade_type, "  - ", weightedGrade)
            // console.log(parseFloat(desired_grade) * weight_sum, "  -  " , weighted_av_sum, "  / " , grade_type )
            unknown_grade = ( parseFloat(desired_grade) - ((100 - grade_type)*(1/100) *  weightedGrade)) / (grade_type*(1/100));
        } else {
            unknown_grade = ( (parseFloat(desired_grade) * grade_type) -  0) / grade_type;
        }


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
        <div className="mt-12">
            <div className="flex flex-start w-full mb-4">
                <div className="border-4 rounded-lg border-customYellow px-2 pb-3px">
                    <h3 className="font-bold text-2xl">Grade Calculator</h3>
                </div>
            </div>
            <form onSubmit={gradeNeed} autoComplete="off">
                <div className="flex flex-row w-full mt-4">
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
                    <div className="flex flex-row w-full mt-4">
                        <label  className="flex items-center "  htmlFor="grade_type">
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
                    <div className="flex flex-row font-bold mt-4">
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
                {desired_grade != '' && grade_type != 0 && course != '' && (weights.length != 0) &&
                    <div className="flex flex-row mt-4">
                        <h3 className="font-bold">Grade Needed:</h3>
                        <h3 className="ml-2">{Number.isNaN(Math.round( gradeNeed() * 100 + Number.EPSILON ) / 100)  ? '' :
                                            (Math.round( gradeNeed() * 100 + Number.EPSILON ) / 100)}</h3>
                    </div>
                }
            </form>
        </div>
    </>
)
}

export default GradeCalculator