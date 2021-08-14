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

    // add up weighted grades
    for ( var j = 0 ; j < coursesWithGrades.length ; j++ ){
      for ( var grade_item of current_grades ){
        if ( grade_item.course_id === coursesWithGrades[j] ){
          gradeWeightVals[j][0].push(( grade_item.grade_received * (grade_item.grade_weight * .01) ))
          gradeWeightVals[j][2].push(grade_item.course_id)
        }
      }
    }

    //add up grade percentages
    for ( var k = 0 ; k < coursesWithGrades.length ; k++ ){
      for ( var grade_item2 of current_grades ){
        if ( grade_item2.course_id === coursesWithGrades[k] ){
          gradeWeightVals[k][1].push( grade_item2.grade_weight )
        }
      }
    }

    var weightedGrades = new Array(gradeWeightVals.length)

    for ( var a = 0 ; a < gradeWeightVals.length ; a++){
      var weighted_grades = 0;
      var weight_percents = 0;
      for (var b = 0 ; b < gradeWeightVals[a][0].length ; b++){
        weighted_grades += gradeWeightVals[a][0][b]
        weight_percents += gradeWeightVals[a][1][b]
      }
      weightedGrades[a] = [(weighted_grades / weight_percents) * 100, gradeWeightVals[a][2][0]]
      updateGrades(weightedGrades[a][0], weightedGrades[a][1])
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

    for(var grade_value of weightedGrades){
      semester_total = semester_total + grade_value[0]
    }

    var htmlDiv = [];

    if (width < 500) {
      for (var c = 0 ; c < weightedGrades.length ; c++){   
        htmlDiv.push(
          <>
          <div className="flex flex-col">
              <div className="flex flex-row justify-between justify-center items-center">
                <h3>{courseCodes[c]}</h3>
                <div className="flex flex-row justify-center items-center">
                  <h3 className="w-50px text-center">{Math.round( weightedGrades[c][0] * 10 + Number.EPSILON ) / 10}%</h3>
                  <div className="ml-4" id="target">
                    {(
                      (Math.round( weightedGrades[c][0] * 10 + Number.EPSILON ) / 10) - targetCourseGrade[c]) >= 0 
                      ? <h3 className="bg-green-300 my-2px w-50px text-center">
                          {`+${(Math.round( (weightedGrades[c][0] - targetCourseGrade[c])  * 10 + Number.EPSILON ) / 10) }`}
                        </h3> 
                      : <h3 className="bg-red-300 my-2px w-50px text-center">
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
      for (var d = 0 ; d < weightedGrades.length ; d++){   
        htmlDiv.push(
          <>
          <div className="flex flex-col">
              <div className="flex flex-row justify-between justify-center items-center">
                <h3>{courseNames[d]}</h3>
                <div className="flex flex-row justify-center items-center">
                  <h3 className="w-50px text-center">{Math.round( weightedGrades[d][0] * 10 + Number.EPSILON ) / 10}%</h3>
                  <div className="ml-4" id="target">
                    {(  
                      (Math.round( weightedGrades[d][0] * 10 + Number.EPSILON ) / 10) - targetCourseGrade[d]) >= 0 
                      ? <h3 className="bg-green-300 my-2px w-50px text-center">
                          {`+${(Math.round( (weightedGrades[d][0] - targetCourseGrade[d])  * 10 + Number.EPSILON ) / 10) }`}
                        </h3> 
                      : <h3 className="bg-red-300 my-2px w-50px text-center">
                          {`${(Math.round( (weightedGrades[d][0] - targetCourseGrade[d]) * 10 + Number.EPSILON ) / 10) }`}
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
    return (
      <div className="flex flex-col">
        <div className="flex flex-start w-full mb-2">
          <div className="mt-2 text-lg font-bold  border-2 border-customGreen rounded px-5px py-2px">
            <h2>Weighted Grades</h2>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <div className="flex flex-row">
            <h2 className="font-bold">Grade</h2>
            <h2 className="font-bold ml-22px mr-1px">Target</h2>
          </div>
        </div>
        {htmlDiv}
        <div className="flex flex-row justify-between mt-4 mt-2justify-center items-center">
          <h3 className="">{current_grades[0].semester_season} {current_grades[0].semester_year} Total </h3>
          <div className="flex flex-row justify-center items-center">
            <h3 className="w-50px text-center">{ Math.round( ( semester_total/(weightedGrades.length) ) * 10 + Number.EPSILON ) / 10}%</h3>
            <div className="ml-4" id="target">
              {(
                (Math.round( ( semester_total/(weightedGrades.length) ) * 10 + Number.EPSILON ) / 10) - targetGrade[0]) >= 0 
                ? <h3 className="bg-green-300 my-2px w-50px text-center">
                    {`+${(Math.round( ( semester_total/(weightedGrades.length) - targetGrade[0] ) * 10 + Number.EPSILON ) / 10) }`}
                  </h3> 
                : <h3 className="bg-red-300 my-2px w-50px text-center">
                    {`${(Math.round( ( semester_total/(weightedGrades.length) - targetGrade[0] ) * 10 + Number.EPSILON ) / 10) }`}
                  </h3>
              }
            </div>
          </div>
        </div>
      </div>
    ) 
  }

  if(current_grades){
    return (
      <>
      {grades()}
      </>
    )
  } else {
    return null
  }
}

export default DisplayGrades