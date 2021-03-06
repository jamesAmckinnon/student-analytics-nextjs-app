import Link from 'next/link'
import { useDayTime } from '@/lib/swr-hooks';
import { useState, useEffect } from 'react';

function DisplayGrades( { current_grades } ) {
  const [width, setWidth] = useState(window.innerWidth)
  
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  
  function grades() {
    var coursesWithGrades = []
    var courseNames = []
    var courseCodes = []
    var targetCourseGrade = []
    var targetGrade = []

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

    var weightedGrades = new Array(gradeWeightVals.length)

    //weights grades and puts into array
    for ( var j = 0 ; j < coursesWithGrades.length ; j++ ){
      //for each course that has grade entries
      var weight_sum = 0;
      var weighted_av_sum = 0;
      var grade_type_average = []
      var grade_types = [[],[]]

      for ( var k = 0 ; k < current_grades.length ; k++  ){
        if (grade_types[0].includes(current_grades[k].grade_weight_id) === false && current_grades[k].course_id === coursesWithGrades[j]){
          grade_types[0].push(current_grades[k].grade_weight_id)
          grade_types[1].push(current_grades[k].grade_weight)
        } 
      }

      var sums_of_grades = new Array(grade_types[0].length).fill(0)
      var number_of_grades = new Array(grade_types[0].length).fill(0)

      for (var l = 0 ; l < current_grades.length ; l++  ){
        if(current_grades[l].course_id === coursesWithGrades[j] && grade_types[0].includes(current_grades[l].grade_weight_id) ){
          sums_of_grades[grade_types[0].indexOf(current_grades[l].grade_weight_id)] += current_grades[l].grade_received
          number_of_grades[grade_types[0].indexOf(current_grades[l].grade_weight_id)] += 1
        }
      }

      for (var m = 0 ; m < sums_of_grades.length ; m++){
        grade_type_average[m] = sums_of_grades[m] / number_of_grades[m]
      }

      for (var n = 0 ; n < grade_type_average.length ; n++){
        weighted_av_sum += (grade_type_average[n] * grade_types[1][n])
        weight_sum += grade_types[1][n]
      }

      weightedGrades[j] = [(weighted_av_sum / weight_sum), coursesWithGrades[j]]
      updateGrades(weightedGrades[j][0], weightedGrades[j][1])
    }


    async function updateGrades(grade, course_id) {
      try {
        const res = await fetch('/api/add-course-total', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            course_id,
            grade,
        }),
        })
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
      } catch (e) {
          throw Error(e.message)
      }
    }


    var semester_total = 0;

    if(current_grades.length != 0) {
      for(var grade_value of weightedGrades){
        semester_total = semester_total + grade_value[0]
      }
    }

    var htmlDiv = [];

    if (current_grades.length != 0) {
      if (width < 500) {
        for (var c = 0 ; c < weightedGrades.length ; c++){   
          htmlDiv.push(
            <>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between justify-center items-center">
                  <h3>{courseCodes[c]}</h3>
                  <div className="flex flex-row justify-center items-center">
                    <h3 className="w-50px text-center">{Math.round( weightedGrades[c][0] * 10 + Number.EPSILON ) / 10}</h3>
                    <div className="ml-4" id="target">
                      {(
                        (Math.round( weightedGrades[c][0] * 10 + Number.EPSILON ) / 10) - targetCourseGrade[c]) >= 0 
                        ? <h3 className="border-b font-bold text-customGreen my-2px w-50px text-center">
                            {`+${(Math.round( (weightedGrades[c][0] - targetCourseGrade[c])  * 10 + Number.EPSILON ) / 10) }`}
                          </h3> 
                        : <h3 className="border-b font-bold text-customRed my-2px w-50px text-center">
                            {`${(Math.round( (weightedGrades[c][0] - targetCourseGrade[c]) * 10 + Number.EPSILON ) / 10) }`}
                          </h3>
                      }
                    </div>
                  </div>
                </div>
            </div>
          </>
          )
        }
      } else {
        for (var c = 0 ; c < weightedGrades.length ; c++){   
          htmlDiv.push(
            <>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between justify-center items-center">
                  <h3 >{courseNames[c]}</h3>
                  <div className="flex flex-row justify-center items-center">
                    <h3 className="w-50px text-center">{Math.round( weightedGrades[c][0] * 10 + Number.EPSILON ) / 10}</h3>
                    <div className="ml-4" id="target">
                      {(
                        (Math.round( weightedGrades[c][0] * 10 + Number.EPSILON ) / 10) - targetCourseGrade[c]) >= 0 
                        ? <h3 className="border-b font-bold text-customGreen my-2px w-50px text-center">
                            {`+${(Math.round( (weightedGrades[c][0] - targetCourseGrade[c])  * 10 + Number.EPSILON ) / 10) }`}
                          </h3> 
                        : <h3 className="border-b font-bold text-customRed my-2px w-50px text-center">
                            {`${(Math.round( (weightedGrades[c][0] - targetCourseGrade[c]) * 10 + Number.EPSILON ) / 10) }`}
                          </h3>
                      }
                    </div>
                  </div>
                </div>
            </div>
          </>
          )
        }
      }
    } 
    return (
      <div className="flex flex-col">
        <div className="flex flex-start w-full mb-4">
          <div className="border-4 rounded-lg border-customGreen px-2 pb-3px">
              <h3 className="font-bold text-2xl">Weighted Grades</h3>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <div className="flex flex-row">
            <h2 className="font-bold">Grade</h2>
            <h2 className="font-bold ml-22px mr-1px">Target</h2>
          </div>
        </div>
        {htmlDiv}
        { current_grades.length != 0 &&
          <div className="flex flex-row justify-between mt-4 mt-2justify-center items-center">
            <h3 className="">{current_grades[0] && current_grades[0].semester_season} {current_grades[0] && current_grades[0].semester_year} Total </h3>
            <div className="flex flex-row justify-center items-center">
              <h3 className="w-50px text-center">{ Math.round( ( semester_total/(weightedGrades.length) ) * 10 + Number.EPSILON ) / 10}</h3>
              <div className="ml-4" id="target">
                {(
                  (Math.round( ( semester_total/(weightedGrades.length) ) * 10 + Number.EPSILON ) / 10) - targetGrade[0]) >= 0 
                  ? <h3 className="border-b font-bold text-customGreen my-2px w-50px text-center">
                      {`+${(Math.round( ( semester_total/(weightedGrades.length) - targetGrade[0] ) * 10 + Number.EPSILON ) / 10) }`}
                    </h3> 
                  : <h3 className="border-b font-bold text-customRed my-2px w-50px text-center">
                      {`${(Math.round( ( semester_total/(weightedGrades.length) - targetGrade[0] ) * 10 + Number.EPSILON ) / 10) }`}
                    </h3>
                }
              </div>
            </div>
          </div>
        }

      </div>
    ) 
  }
    return (
      <>
      {current_grades && current_grades.length != 0 ? grades() : 
          <>
            <div className="flex flex-start w-full mb-4">
              <div className="border-4 rounded-lg border-customGreen px-2 pb-3px">
                  <h3 className="font-bold text-2xl">Weighted Grades</h3>
              </div>
            </div>
            <div className="flex w-full shadow text-lg h-100px rounded-xl mt-2 items-center justify-center">
              <h3>No grades entered</h3>
            </div>
          </>
      }
      </>
    )
}

export default DisplayGrades