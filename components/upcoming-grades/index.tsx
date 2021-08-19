import Link from 'next/link'
import { useDueDates } from '@/lib/swr-hooks';
import { useState, useEffect } from 'react';

function UpcomingGrades( { upcoming_grades } ) {
    const [width, setWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        function handleResize() {
        setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);
  
    function gradeNeeded(targ, weigh, cur){
        var target = targ
        var weight = weigh
        var current = cur
        var gradeNeeded = 0

        gradeNeeded = (target - ( (1 - weight) * (current) )) / weight;

        return gradeNeeded
    }

    function orderDueDates(dates, daysUntil){
        var ordered = [];
    
    
        for(let i = 0 ; i < dates.length; i++){
          ordered.push([
            dates[i].course_code, 
            dates[i].due_date_description, 
            dates[i].target_course_gpa,
            dates[i].grade_weight * .01,
            dates[i].grade_total,

            daysUntil[i]
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
              ordered[i][0] = ordered[i + 1][0];
              ordered[i][1] = ordered[i + 1][1];
              ordered[i][2] = ordered[i + 1][2];
              ordered[i][3] = ordered[i + 1][3];
              ordered[i][4] = ordered[i + 1][4];
              ordered[i][5] = ordered[i + 1][5];
              ordered[i + 1][0] = temp1;
              ordered[i + 1][1] = temp2;
              ordered[i + 1][2] = temp3;
              ordered[i + 1][3] = temp4;
              ordered[i + 1][4] = temp5;
              ordered[i + 1][5] = temp6;
            }
          }
        } while (count > 0)
    
        var htmlDiv = []
    
        if(width > 630){
          for (let dueDate of ordered) {
            if(dueDate[5] >= 0 && dueDate[3] >=0) {
            htmlDiv.push(                             
                        <div className="flex flex-col justify-between mb-4">
                            <h3 className="text-sm">{dueDate[5]} &nbsp; {dueDate[5] === 1 ? 'Day' : 'Days'}</h3> 
                            <div className="flex flex-row w-full justify-between">
                                <div className="flex flex-row">
                                    <h3 className="py-1 px-2 bg-bgBlue text-sm">{dueDate[0]}</h3>
                                    <h3 className="py-1 px-2 text-sm">{dueDate[1]}</h3>
                                </div>
                                <div className="flex items-center justify-center w-107px text-center">
                                    {(Math.round( ( gradeNeeded(dueDate[2], dueDate[3], dueDate[4]) ) * 100 + Number.EPSILON ) / 100)}%
                                </div>
                            </div>
                        </div>
                        )
            }
          }
        } else {
          for (let dueDate of ordered) {
            if(dueDate[5] >= 0 && dueDate[3] >=0) {
            htmlDiv.push(
                        <div className="flex flex-col justify-between mb-4">
                            <h3 className="text-sm">{dueDate[5]} {dueDate[5] === 1 ? 'Day' : 'Days'}</h3> 
                            <div className="flex flex-row w-full justify-between">
                                <div className="flex flex-row">
                                    <h3 className="py-1 px-2 bg-bgBlue text-sm">{dueDate[0]}</h3>
                                    <h3 className="py-1 px-2 text-sm">{dueDate[1]}</h3>
                                </div>
                                <div className="flex items-center justify-center w-107px text-center">
                                    {(Math.round( ( gradeNeeded(dueDate[2], dueDate[3], dueDate[4]) ) * 100 + Number.EPSILON ) / 100)}%
                                </div>
                            </div>
                        </div>
                        )
            }
          }
        }
    
        return (
          <>
          { width > 630 && 
            <div className="flex flex-col">
                <div className="flex flex-start w-full mt-2">
                    <div className="border-4 rounded-lg mt-6 border-customBlue px-2 pb-3px">
                        <h3 className="font-bold text-2xl">Upcoming</h3>
                    </div>
                </div>
                <div className="flex justify-end">
                    <h2 className="font-bold">Grade Needed</h2>
                </div>
                <div className="flex flex-col">
                {htmlDiv}
              </div>
            </div> } 
    
            { width < 630 && 
            <div className="flex flex-col">
                <div className="flex flex-start w-full mt-2">
                    <div className="border-4 rounded-lg mt-6 border-customBlue px-2 pb-3px">
                        <h3 className="font-bold text-2xl">Upcoming</h3>
                    </div>
                </div>
                <div className="flex justify-end">
                    <h2 className="font-bold">Grade Needed</h2>
                </div>
                <div className="flex flex-col">
                {htmlDiv}
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
        <div className="">  
          {upcoming_grades && orderDueDates(upcoming_grades, daysUntil(upcoming_grades))}
        </div>
            {/* { width < 500 &&
                <div className="flex flex-col">
                    <div className="flex flex-start w-full mt-2">
                        <div className="border-4 rounded-lg mt-6 border-customBlue px-2 pb-3px">
                            <h3 className="font-bold text-2xl">Upcoming</h3>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <h2 className="font-bold">Grade Needed</h2>
                    </div>
                    <div className="flex flex-col">
                        { upcoming_grades.map( (e) => (
                            <div className="flex flex-row justify-between my-2">
                                <div className="flex flex-col">
                                    <div className="flex w-full justify-start">
                                        <h3 className="py-1 px-2 bg-bgBlue text-sm">{e.course_code}</h3>
                                    </div>
                                    <h3>{e.due_date_description}</h3> 
                                </div>
                                <div className="flex items-center justify-center w-107px text-center">
                                    {(Math.round( ( gradeNeeded(e) ) * 100 + Number.EPSILON ) / 100)}%
                                </div>
                            </div>
                        ))}   
                    </div>
                </div>
            } 
            
            { width > 500 && 
                <div className="flex flex-col">
                    <div className="flex flex-start w-full mt-2">
                        <div className="border-4 rounded-lg mt-6 border-customBlue px-2 pb-3px">
                            <h3 className="font-bold text-2xl">Upcoming</h3>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <h2 className="font-bold">Grade Needed</h2>
                    </div>
                    <div className="flex flex-col">
                        { upcoming_grades.map( (e) => (
                            <div className="flex flex-row justify-between my-2">
                                <div className="flex flex-col">
                                    <div className="flex w-full justify-start">
                                        <h3 className="py-1 px-2 bg-bgBlue text-sm">{e.course_name}</h3>
                                    </div>
                                    <h3>{e.due_date_description}</h3> 
                                </div>
                                <div className="flex items-center justify-center w-107px text-center">
                                    {(Math.round( ( gradeNeeded(e) ) * 100 + Number.EPSILON ) / 100)}%
                                </div>
                            </div>
                        ))}   
                    </div>
                </div>
            } */}
        </>
        )
    } else {
        return null
    }
}

export default UpcomingGrades