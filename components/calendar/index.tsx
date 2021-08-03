import { useState } from "react";
import Router from "next/router";
import { useSchedule } from "@/lib/swr-hooks";


function Calendar( {user_id, current_semester} ) {
const { schedule } = useSchedule(user_id, current_semester)

function orderDays(day){
  var ordered = [];

  for(let i = 0 ; i < schedule.length; i++){
    if(schedule[i].day_of_week === day){
      ordered.push([schedule[i].day_of_week, schedule[i].time_in ,schedule[i].time_out, schedule[i].course_code])
    }
  }
  
  do{
    var count = 0;
    for (let i = 0; i < ordered.length - 1 ; i++) {
      if(parseInt(ordered[i][1].substring(0,2)) > parseInt(ordered[i+1][1].substring(0,2))){
        count++;
        var temp1 = ordered[i][1];
        var temp2 = ordered[i][2];
        var temp3 = ordered[i][3];
        ordered[i][1] = ordered[i + 1][1];
        ordered[i][2] = ordered[i + 1][2];
        ordered[i][3] = ordered[i + 1][3];
        ordered[i + 1][1] = temp1;
        ordered[i + 1][2] = temp2;
        ordered[i + 1][3] = temp3;
      }
    }
  } while (count > 0)

  var htmlDiv = []

  for (let i = 0; i < ordered.length ; i++) {
    htmlDiv.push( <div className="flex flex-col mx-5 my-2">
                    <div className="font-bold">{ordered[i][3]}</div>
                    <div>{tConvert(ordered[i][1]) + " - " + tConvert(ordered[i][2])}</div>
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
  };

  
  function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }


    if(time[2] === "00"){
      time[1] = ""
      time[2] = ""
    }

    return time.join (''); // return adjusted time or original string
  }

  // for(let j = 0 ; j < ordered.length; j++){
  //   if
  //   console.log(parseInt(ordered[j][1].substring(0,2)))

    return (
        <>    
        <div className="flex flex-row mt-6">  
          {schedule && orderDays("monday")}
          {schedule && orderDays("tuesday")}
          {schedule && orderDays("wednesday")}
          {schedule && orderDays("thursday")}
          {schedule && orderDays("friday")}
        </div>
        </>
    )
  } 

export default Calendar