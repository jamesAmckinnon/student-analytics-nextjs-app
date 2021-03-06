import Link from 'next/link'
import { useDueDates } from '@/lib/swr-hooks';
import { useState, useEffect } from 'react';

function UpcomingGrades( { upcoming_grades, current_grades } ) {
    const [width, setWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        function handleResize() {
        setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);
  
    function gradeNeeded(target, weight, course_id){

        //for each course that has grade entries
        var weighted_grades = 0;
        var weight_percents = 0;
        var unknown_grade;

        if(current_grades.length != 0){
            for ( var grade_item of current_grades ){
                //for every grade entry in the course
                if ( grade_item.course_id === course_id){
                    weighted_grades += ( grade_item.grade_weight * grade_item.grade_received )
                    weight_percents += grade_item.grade_weight
                    //create dictionary entry for weight
                }
        
            }
            weight_percents += weight
            unknown_grade = ( (parseFloat(target) * weight_percents) -  weighted_grades) / weight;
        } else {
            unknown_grade = ( (parseFloat(target) * weight) -  0) / weight;
        }

        
        return unknown_grade
    }

    function orderDueDates(dates, daysUntil){
        var ordered = [];
    
        for(let i = 0 ; i < dates.length; i++){
          ordered.push([
            dates[i].course_code, 
            dates[i].due_date_description, 
            dates[i].target_course_gpa,
            dates[i].grade_weight,
            dates[i].grade_total,
            daysUntil[i],
            dates[i].course_name,
            dates[i].course_id,
          ])
        }
    
        do{
          var count = 0;
          for (let i = 0; i < ordered.length - 1 ; i++) {
            if(ordered[i][5] > ordered[i+1][5]){
              count++;
              var temp1 = ordered[i][0];
              var temp2 = ordered[i][1];
              var temp3 = ordered[i][2];
              var temp4 = ordered[i][3];
              var temp5 = ordered[i][4];
              var temp6 = ordered[i][5];
              var temp7 = ordered[i][6];
              var temp8 = ordered[i][7];
              ordered[i][0] = ordered[i + 1][0];
              ordered[i][1] = ordered[i + 1][1];
              ordered[i][2] = ordered[i + 1][2];
              ordered[i][3] = ordered[i + 1][3];
              ordered[i][4] = ordered[i + 1][4];
              ordered[i][5] = ordered[i + 1][5];
              ordered[i][6] = ordered[i + 1][6];
              ordered[i][7] = ordered[i + 1][7];
              ordered[i + 1][0] = temp1;
              ordered[i + 1][1] = temp2;
              ordered[i + 1][2] = temp3;
              ordered[i + 1][3] = temp4;
              ordered[i + 1][4] = temp5;
              ordered[i + 1][5] = temp6;
              ordered[i + 1][6] = temp7;
              ordered[i + 1][7] = temp8;
            }
          }
        } while (count > 0)
    
        var htmlDiv = []
    
        if(width > 630){
            var count = 0;
            for (let dueDate of ordered) {
                if(dueDate[5] >= 0 && dueDate[3] >=0 && count < 5) {
                count ++
                var marginTop = `flex flex-row justify-between ${count === 1 ? "" : "mt-4"}`
                htmlDiv.push(                             
                            <div className= {marginTop}>
                                <div className="flex flex-col w-full justify-between">
                                    <div className="flex flex-row center-items">
                                        <div className="w-min whitespace-nowrap">
                                            <h3 className="py-1 px-2 h- bg-bgBlue text-sm inline-block">{dueDate[6]}</h3>
                                        </div>
                                        <h3 className="flex items-center ml-2 text-sm">&nbsp; ({dueDate[5]} {dueDate[5] === 1 ? 'Day' : 'Days'})</h3> 
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <h3 className="py-1 text-sm">{dueDate[1]}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center w-107px text-center">
                                    {(Math.round( ( gradeNeeded(dueDate[2], dueDate[3], dueDate[7]) ) * 100 + Number.EPSILON ) / 100)}%
                                </div>
                            </div>
                            )
                }
            }
        } else {
            var count = 0;
            for (let dueDate of ordered) {
                if(dueDate[5] >= 0 && dueDate[3] >=0 && count < 5) {
                count ++
                var marginTop = `flex flex-row justify-between ${count === 1 ? "" : "mt-4"}`
                htmlDiv.push(
                            <div className= {marginTop}>
                                <div className="flex flex-col w-full justify-between">
                                    <div className="flex flex-row center-items">
                                        <div className="w-min whitespace-nowrap">
                                            <h3 className="py-1 px-2 h- bg-bgBlue text-sm inline-block">{dueDate[0]}</h3>
                                        </div>
                                        <h3 className="flex items-center ml-2 text-xs">&nbsp; ({dueDate[5]} {dueDate[5] === 1 ? 'Day' : 'Days'})</h3> 
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <h3 className="py-1 text-sm">{dueDate[1]}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center w-107px text-center">
                                    {(Math.round( ( gradeNeeded(dueDate[2], dueDate[3], dueDate[7]) ) * 100 + Number.EPSILON ) / 100)}%
                                </div>
                            </div>
                            )
                }
            }
        }
        return (
          <>
          { width > 630 && 
            <div className="upcomingCont flex flex-col">
                <div className="flex flex-start w-full">
                    <div className="border-4 rounded-lg border-customBlue px-2 pb-3px">
                        <h3 className="font-bold text-2xl">Upcoming</h3>
                    </div>
                </div>
                <div className="flex justify-end">
                    <h2 className="font-bold">Grade Needed</h2>
                </div>
                <div className="flex flex-col">
                {htmlDiv}
                { upcoming_grades.length === 0 &&
                    <div className="flex w-full shadow h-100px text-lg rounded-xl mt-2 items-center justify-center">
                        <h3>No schedule information added</h3>
                    </div>
                }
              </div>
            </div> } 
    
            { width < 630 && 
            <div className="upcomingCont flex flex-col">
                <div className="flex flex-start w-full">
                    <div className="border-4 rounded-lg border-customBlue px-2 pb-3px">
                        <h3 className="font-bold text-2xl">Upcoming</h3>
                    </div>
                </div>
                <div className="flex justify-end">
                    <h2 className="font-bold">Grade Needed</h2>
                </div>
                <div className="flex flex-col">
                {htmlDiv}
                { upcoming_grades.length === 0 &&
                    <div className="flex w-full shadow h-100px rounded-xl mt-2 items-center justify-center">
                        <h3>No schedule information added</h3>
                    </div>
                }
                </div>
            </div> 
            }
          </>
        )
      }

    function daysUntil(dates){ 
        var days_until = [] 
        
        for (let date of dates){
          const start = new Date();
          const end = new Date(date.due_date);
    
          const daysBetween = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
          days_until.push(Math.ceil(daysBetween))
        }
        return days_until
      }

    if(upcoming_grades){
        return (
        <>
        <div className="flex items-center justify-center mt-12">  
          {upcoming_grades.length != 0 && orderDueDates(upcoming_grades, daysUntil(upcoming_grades))}
        </div>
        </>
        )
    } else {
        return null
    }
}

export default UpcomingGrades