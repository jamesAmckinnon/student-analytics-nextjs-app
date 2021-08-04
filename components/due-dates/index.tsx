import { useState } from "react";
import Router from "next/router";
import { useDueDates } from "@/lib/swr-hooks";


function DueDates( {user_id, current_semester} ) {
const { due_dates } = useDueDates(user_id, current_semester)

  function orderDueDates(dates, daysUntil){
    var ordered = [];


    for(let i = 0 ; i < dates.length; i++){
      ordered.push([
        dates[i].course_name, 
        dates[i].due_date_description, 
        new Date(dates[i].due_date).toLocaleDateString('en-us', {  weekday: 'long', month: 'short', day: 'numeric'}),
        daysUntil[i]
      ])
    }

    do{
      var count = 0;
      for (let i = 0; i < ordered.length - 1 ; i++) {
        console.log(i)
        console.log(parseInt(ordered[i][1].substring(0,2)))
        if(ordered[i][3] > ordered[i+1][3]){
          count++;
          var temp1 = ordered[i][0];
          var temp2 = ordered[i][1];
          var temp3 = ordered[i][2];
          var temp4 = ordered[i][3];
          ordered[i][0] = ordered[i + 1][0];
          ordered[i][1] = ordered[i + 1][1];
          ordered[i][2] = ordered[i + 1][2];
          ordered[i][3] = ordered[i + 1][3];
          ordered[i + 1][0] = temp1;
          ordered[i + 1][1] = temp2;
          ordered[i + 1][2] = temp3;
          ordered[i + 1][3] = temp4;
        }
      }
    } while (count > 0)

    var htmlDiv = []

    for (let dueDate of ordered) {
      htmlDiv.push( <div className="dueDates mx-5 my-2">
                      <div className="font-bold">{dueDate[0]}</div>
                      <div className="ml-4">{dueDate[1]}</div>
                      <div className="ml-4">{dueDate[2]}</div>
                      <div className="font-bold ml-4">{dueDate[3] + " days"}</div>
                    </div>
                  )
    }

    return (
      <>
        <div className="class">
          {htmlDiv}
        </div>
      </>
    )
  }

if(due_dates){
  daysUntil(due_dates);
}

function daysUntil(dates){ 
  var days_until = [] 
  
  for(let date of dates){
    const start = new Date();
    const end = new Date(date.due_date);

    const daysBetween = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    days_until.push(Math.ceil(daysBetween))
  }
  return days_until
}
  

  // for(let j = 0 ; j < ordered.length; j++){
  //   if
  //   console.log(parseInt(ordered[j][1].substring(0,2)))

    return (
      <>    
        <div className="flex flex-row mt-6">  
          {due_dates && orderDueDates(due_dates, daysUntil(due_dates))}
        </div>
      </>
    )
  } 

export default DueDates