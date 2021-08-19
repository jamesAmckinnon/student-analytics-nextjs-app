import { useState, useEffect } from "react";
import Router from "next/router";
import { useDueDates } from "@/lib/swr-hooks";


function DueDates( {user_id, current_semester} ) {
  const { due_dates } = useDueDates(user_id, current_semester)
  const [width, setWidth] = useState(window.innerWidth)

  function orderDueDates(dates, daysUntil){
    var ordered = [];

    for(let i = 0 ; i < dates.length; i++){
      ordered.push([
        dates[i].course_code, 
        dates[i].due_date_description, 
        new Date(dates[i].due_date).toLocaleDateString('en-us', {  weekday: 'short', month: 'short', day: 'numeric'}),
        daysUntil[i],
        dates[i].course_name
      ])
    }

    do{
      var count = 0;
      for (let i = 0; i < ordered.length - 1 ; i++) {
        if(ordered[i][3] > ordered[i+1][3]){
          count++;
          var temp1 = ordered[i][0];
          var temp2 = ordered[i][1];
          var temp3 = ordered[i][2];
          var temp4 = ordered[i][3];
          var temp5 = ordered[i][4];
          ordered[i][0] = ordered[i + 1][0];
          ordered[i][1] = ordered[i + 1][1];
          ordered[i][2] = ordered[i + 1][2];
          ordered[i][3] = ordered[i + 1][3];
          ordered[i][4] = ordered[i + 1][4];
          ordered[i + 1][0] = temp1;
          ordered[i + 1][1] = temp2;
          ordered[i + 1][2] = temp3;
          ordered[i + 1][3] = temp4;
          ordered[i + 1][4] = temp5;
        }
      }
    } while (count > 0)

    var htmlDiv = []

    if(width > 500){
      for (let dueDate of ordered) {
        if(dueDate[3] >= 0) {
          htmlDiv.push( <div className="flex flex-col mt-4">
                          <div className="flex flex-row justify-between w-full items-center">
                            <div className="py-1 px-2  bg-bgBlue text-sm ">
                              {dueDate[4]}
                            </div>
                            <div className="text-center font-bold">{dueDate[3] + " days"}</div>
                          </div>
                          <div className="dueDates">
                            <div className="ml-1">{dueDate[1]}</div>
                            <div className="text-sm text-right">{dueDate[2]}</div>
                          </div>
                          <div className="dateGrid">
                            <div></div>
                            <div className="ml-2 text-sm">
                              
                            </div>
                          </div>
                        </div>
                    )
        }
      }
    } else {
      for (let dueDate of ordered) {
        if(dueDate[3] >= 0) {
        htmlDiv.push( <div className="flex flex-col mt-4">
                        <div className="flex flex-row justify-between w-full items-center">
                          <div className="py-1 px-2  bg-bgBlue text-sm ">
                            {dueDate[0]}
                          </div>
                          <div className="text-center font-bold">{dueDate[3] + " days"}</div>
                        </div>
                        <div className="dueDates">
                          <div className="ml-1">{dueDate[1]}</div>
                          <div className="text-sm text-right">{dueDate[2]}</div>
                        </div>
                        <div className="dateGrid">
                          <div></div>
                          <div className="ml-2 text-sm">
                            
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
        <div className="flex flex-col w-full">
          {/* <div className="dueDates w-full border border-black">
            <div className="font-bold border-r border-black text-center">Course</div>
            <div className="font-bold border-r border-black ml-6">Description</div>
            <div className="font-bold text-center border-r border-black">Due Date</div>
            <div className="font-bold text-center">Due In</div>
          </div> */}
          <div className="w-full max-w-3xl">
            {htmlDiv}
          </div>
        </div> }

        { width < 630 && 
          <div className="flex flex-col w-full max-w-3xl">
            <div className="w-full">
              {htmlDiv}
            </div>
          </div>
        }
      </>
    )
  }

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);


  if(due_dates){
    daysUntil(due_dates);
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

  return (
      <>    
        <div className="flex flex-row justify-center">  
          {due_dates && orderDueDates(due_dates, daysUntil(due_dates))}
        </div>
      </>
    )
  } 

export default DueDates