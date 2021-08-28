import { useState, useEffect } from "react";
import Router from "next/router";
import { useSchedule } from "@/lib/swr-hooks";


function Calendar( {user_id, current_semester} ) {
  const { schedule } = useSchedule(user_id, current_semester)
  const [width, setWidth] = useState(window.innerWidth)
  var today = (new Date().getDay() === 6 || new Date().getDay() === 0 ) ? 1 : new Date().getDay();
  const [ day, setDay ] = useState(getDayOfWeek(today))
  var todayNum = (new Date().getDay() === 6 || new Date().getDay() === 0 ) ? 1 : new Date().getDay();
  const [dayNum, setDayNum] = useState(todayNum)

  function getDayOfWeek(theDay){
    var dayOfWeek;
    
    switch (theDay) {
      case 0:
        dayOfWeek = "sunday"
        break;
      case 1:
        dayOfWeek = "monday"
        break;
      case 2:
        dayOfWeek = "tuesday"
        break;
      case 3:
        dayOfWeek = "wednesday"
        break;
      case 4:
        dayOfWeek = "thursday"
        break;
      case 5:
        dayOfWeek = "friday"
        break;
      case 6:
        dayOfWeek = "saturday"
        break;
    }
    return dayOfWeek;
  }

  function cycleDays(direction) {
    if(dayNum > 1 && direction === "left") {
      setDayNum(dayNum - 1)
      setDay(getDayOfWeek(dayNum - 1))
    } else if(dayNum === 1 && direction === "left"){
      setDayNum(5)
      setDay(getDayOfWeek(5))
    } else if(dayNum < 5 && direction === "right"){
      setDayNum(dayNum + 1)
      setDay(getDayOfWeek(dayNum + 1))
    } else if(dayNum === 5 && direction === "right"){
      setDayNum(1)
      setDay(getDayOfWeek(1))
    }
    return ""
  }

  useEffect(() => {
    setDay(getDayOfWeek(dayNum))
}, [dayNum])


  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  function orderDays(day){
    var ordered = [];
    var htmlDiv = [];

    for(let entry of schedule){
      if(entry.day_of_week === day){
        ordered.push([entry.day_of_week, entry.time_in ,entry.time_out, entry.course_code])
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

    for (let cols of ordered) {
      htmlDiv.push( <div className="schedule-cols flex flex-col">
                      <div className="font-bold">{cols[3]}</div>
                      <div className="schedule-times">{tConvert(cols[1]) + " - " + tConvert(cols[2])}</div>
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

    
    function tConvert (time) {
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) { 
        time = time.slice (1);  
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; 
        time[0] = +time[0] % 12 || 12;
      }
      if(time[2] === "00"){
        time[1] = ""
        time[2] = ""
      }
      return time.join (''); 
    }

    return (
        <>    
        { width > 630 && 
          <div className="flex flex-row"> 
            <div className="flex flex-col ">
              <div className="w-full border-customGrey  text-lg bg-customGrey4 text-center">Monday</div>  
              <div className="flex flex-col w-full h-full border-r">
                {schedule && orderDays("monday")}
              </div> 
            </div>
            <div className="flex flex-col">
              <div className="w-full border-customGrey bg-customGrey4 text-lg text-center">Tuesday</div>
              <div className="flex flex-col w-full h-full border-r"> 
                {schedule && orderDays("tuesday")}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-full border-customGrey bg-customGrey4 text-lg text-center">Wednesday</div>
              <div className="flex flex-col w-full h-full border-r"> 
                {schedule && orderDays("wednesday")}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-full border-customGrey bg-customGrey4 text-lg text-center">Thursday</div>
              <div className="flex flex-col w-full h-full border-r"> 
                {schedule && orderDays("thursday")}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-full border-customGrey bg-customGrey4 text-lg text-center">Friday</div>
              <div className="flex flex-col w-full h-full "> 
                {schedule && orderDays("friday")}
              </div>
            </div>
          </div>} 
        { width < 630 && schedule && schedule.length != 0 &&
          <div className="flex flex-row">
              <button className="mr-4" onClick={ () => { cycleDays("left") }}> <img src="/leftArrow.svg" style={{ height: 21, width: 13, cursor: 'pointer'}}/> </button>
                <div className="flex flex-col w-full">
                  <div className="w-full border-customGrey  text-lg bg-customGrey4 text-center">{day.charAt(0).toUpperCase() + day.slice(1)}</div> 
                  <div className="text-center">
                    {schedule && orderDays(day)}
                  </div>
                </div>
              <button className="ml-4" onClick={() => {  cycleDays("right") }}><img src="/rightArrow.svg" style={{ height: 21, width: 13, cursor: 'pointer'}}/></button>
          </div>
        } 
        { schedule && schedule.length === 0 &&
          <div className="flex flex-col w-full items-center ">
            <div className="contentCont flex flex-start w-full mb-4">
              <div className="border-4 rounded-lg border-customOrange mt-6 px-2 pb-3px">
                  <h3 className="font-bold text-2xl">Schedule</h3>
              </div>
            </div>
            <div className="contentCont items-center flex justify-center w-full shadow h-100px rounded-xl mt-2">
              <h3 className="flex text-lg justify-center">No course times entered</h3> 
            </div>
          </div>
        }
        </>
    )
  } 

export default Calendar