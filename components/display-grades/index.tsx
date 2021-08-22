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


    // var dict = {};

    // dict['key'] = "testing";
    
    // console.log(dict);

    //current_grades contains grade entries with grade weights and grade received for every entry
    //this loop set calculates the weighted grades for all of the entries for each course
    //need to calculate grade received * grade weight
    //if there is more than one of the same grade weight then the grades received for that weight need to be averaged before the above calculation
    // add up weighted grades ------------

    //

    
    // //for each course that has grade entries
    // for ( var j = 0 ; j < coursesWithGrades.length ; j++ ){
    //   //for every grade entry in the course
    //   var weights = [[], [], []]
    //   var dict = {};
    //   for ( var grade_item of current_grades ){
    //     if ( grade_item.course_id === coursesWithGrades[j] && !weights[2].includes(grade_item.grade_weight_id) ){
    //       //add weight to list
    //       weights[0].push(grade_item.grade_weight)
    //       weights[1].push(grade_item.grade_weight_type)
    //       weights[2].push(grade_item.grade_weight_id)

    //       //create dictionary entry for weight
    //       dict[grade_item.grade_weight_id] = grade_item.grade_received;
    //       gradeWeightVals[j][2].push(grade_item.course_id)
    //     } else if ( grade_item.course_id === coursesWithGrades[j] && weights[2].includes(grade_item.grade_weight_id) ){
    //       //get average of weight thats already in list and this new one
    //       // console.log(grade_item.course_id, dict[grade_item.grade_weight_id]," + ", grade_item.grade_received, "/", 2, " = ", ( dict[grade_item.grade_weight_id] + grade_item.grade_received ) / 2)
    //       dict[grade_item.grade_weight_id] = ( dict[grade_item.grade_weight_id] + grade_item.grade_received ) / 2;
    //     }
    //   }

    //   for(var i = 0 ; i < weights[0].length ; i++){
    //     // console.log( dict[weights[2][i]], " * ", weights[2][i], " * " , ".01" ) 
    //     gradeWeightVals[j][0].push( ( dict[weights[2][i]] * (weights[0][i] * .01) ) )
    //   }
    // }

    var weightedGrades = new Array(gradeWeightVals.length)

    for ( var j = 0 ; j < coursesWithGrades.length ; j++ ){
      //for each course that has grade entries
      var weighted_grades = 0;
      var weight_percents = 0;
      var weighted_course_grades = []
      for ( var grade_item of current_grades ){
        //for every grade entry in the course
        if ( grade_item.course_id === coursesWithGrades[j]){
          weighted_grades += ( grade_item.grade_weight * grade_item.grade_received )
          weight_percents += grade_item.grade_weight
          //create dictionary entry for weight
        }
        
      }

      weightedGrades[j] = [(weighted_grades / weight_percents), coursesWithGrades[j]]
      updateGrades(weightedGrades[j][0], weightedGrades[j][1])
    }

    // for ( var j = 0 ; j < coursesWithGrades.length ; j++ ){
    //   //use the newly calculated grade weights with the average grade entries
    //   for ( var grade_item of current_grades ){
    //     gradeWeightVals[j][0].push(( grade_item.grade_received * (grade_item.grade_weight * .01) ))
        
    //   }
    // }
    



    // for ( var j = 0 ; j < coursesWithGrades.length ; j++ ){
    //   for ( var grade_item of current_grades ){
    //     if ( grade_item.course_id === coursesWithGrades[j]){
    //       gradeWeightVals[j][0].push(( grade_item.grade_received * (grade_item.grade_weight * .01) ))
    //       gradeWeightVals[j][2].push(grade_item.course_id)
    //     }

    //   }
    // }

    // //add up grade percentages -------
    // for ( var k = 0 ; k < coursesWithGrades.length ; k++ ){
    //   var weights = [[], [], []]
    //   for ( var grade_item2 of current_grades ){
    //     if ( grade_item2.course_id === coursesWithGrades[k] && !weights[2].includes(grade_item2.grade_weight_id) ){
    //       // weights[0].push(grade_item2.grade_weight)
    //       // weights[1].push(grade_item2.grade_weight_type)
    //       weights[2].push(grade_item2.grade_weight_id)
    //       gradeWeightVals[k][1].push( grade_item2.grade_weight )
    //     }

    //   }
    //   // console.log(weights, "<--- weights")
    // }


    
    // var weightedGrades = new Array(gradeWeightVals.length)
    // // console.log(weightedGrades)
    // for ( var a = 0 ; a < gradeWeightVals.length ; a++){
    //   var weighted_grades = 0;
    //   var weight_percents = 0;
    //   for (var b = 0 ; b < gradeWeightVals[a][0].length ; b++){
    //     weighted_grades += gradeWeightVals[a][0][b]
    //     weight_percents += gradeWeightVals[a][1][b]
    //     // console.log("weighted grades: ", weighted_grades, "+", gradeWeightVals[a][0][b] , "weighted percents: ", weight_percents, weighted_grades, "+", gradeWeightVals[a][1][b])
    //   }
    //   // console.log(weighted_grades, "/", weight_percents, " * 100", "course: ", gradeWeightVals[a][2][0] )
    //   weightedGrades[a] = [(weighted_grades / weight_percents) * 100, gradeWeightVals[a][2][0]]
    //   // console.log("weighted grade: ", weightedGrades[a])
    //   updateGrades(weightedGrades[a][0], weightedGrades[a][1])
    // }
  


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
          <div className="border-4 rounded-lg border-customGreen mt-6 px-2 pb-3px">
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
        { current_grades.length === 0 &&
          <div className="flex w-full shadow h-50px rounded-xl mt-2 items-center justify-center">
            <h3>No course information added</h3>
          </div>
        }
      </div>
    ) 
  }

  if(current_grades ){
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