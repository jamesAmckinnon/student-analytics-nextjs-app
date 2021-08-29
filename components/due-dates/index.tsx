import { useState, useEffect } from "react";
import Router from "next/router";
import { useDueDates } from "@/lib/swr-hooks";


function DueDates( {user_id, current_semester} ) {
  const { due_dates } = useDueDates(user_id, current_semester)
  const [width, setWidth] = useState(window.innerWidth)
  const [deleteBool, setDelete] = useState(false)

  async function deleteHandler(due_date_id) {
    document.getElementById(`${due_date_id}`).style.display = "none";
    let res = await fetch(`/api/delete-due-date?due_date_id=${due_date_id}`, { method: 'DELETE' })
    let json = await res.json()
    if (!res.ok) throw Error(json.message)
  }

  function toggleDelete(toggle_delete) {
    if(!toggle_delete){
        setDelete(true)
    } else {
        setDelete(false)
    }
  }

  function orderDueDates(dates, daysUntil){
    var ordered = [];

    for(let i = 0 ; i < dates.length; i++){              
      ordered.push([
        dates[i].course_code, 
        dates[i].due_date_description, 
        new Date(dates[i].due_date).toLocaleDateString('en-us', {  weekday: 'short', month: 'short', day: 'numeric'}),
        daysUntil[i],
        dates[i].course_name,
        dates[i].due_date_id
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
          htmlDiv.push( 
                        <div id={dueDate[5]} className="flex flex-row justify-between mt-4">

                          <div className="flex flex-col">
                            <div className="py-1 px-2  bg-orange-200 text-sm ">
                              {dueDate[4]}
                            </div>
                            <div className="ml-1">{dueDate[1]}</div>
                          </div>


                          <div className="flex flex-row">
                            <div className="flex flex-col justify-between">
                              <div className="text-right font-bold">{dueDate[3] + " days"}</div>
                              <div className="text-sm text-right">{dueDate[2]}</div>
                            </div>
                            <div className="">
                              { deleteBool &&
                                <a onClick={() => deleteHandler(dueDate[5])} className="deleteEntry flex flex-col mt-4 ml-4 justify-center">
                                  <img src="/delete-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                                </a> 
                              }
                            </div>
                          </div>
                        </div>
                    )
        }
      }
    } else {
      for (let dueDate of ordered) {
        if(dueDate[3] >= 0) {
        htmlDiv.push( 
                    <div id={dueDate[5]} className="flex flex-row">
                      <div className="flex flex-col mt-4 w-full">
                        <div className="flex flex-row justify-between w-full items-center">
                          <div className="py-1 px-2  bg-orange-200 text-sm ">
                            {dueDate[0]}
                          </div>
                          <div className="text-center font-bold">{dueDate[3] + " days"}</div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="ml-1">{dueDate[1]}</div>
                          <div className="text-sm text-right">{dueDate[2]}</div>
                        </div>
                        <div className="dateGrid">
                          <div></div>
                          <div className="ml-2 text-sm">
                            
                          </div>
                        </div>
                      </div>
                      { deleteBool &&
                        <a onClick={() => deleteHandler(dueDate[5])} className="deleteEntry flex items-center mt-4 ml-2">
                            <img src="/delete-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                        </a> 
                      }
                    </div>
                    )
        }
      }
    }

    return (
      <>
      {/* { width > 630 &&  */}
      { due_dates && due_dates.length != 0 &&
        <div className="flex flex-col w-full">
          <div className="flex justify-start w-full mb-2">
            <div className="border-4 rounded-lg border-customOrange px-2 pb-3px">
                <h3 className="font-bold text-2xl">Due Dates</h3>
            </div>
          </div>
          <a className="flex w-full justify-end items-center mr-4" onClick={() => toggleDelete(deleteBool)}>
            <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
          </a>
          <div className="w-full max-w-3xl">
            {htmlDiv}
          </div>
        </div> 
      }
      { due_dates && due_dates.length === 0 &&
        <div className="flex flex-col w-full items-center p-1px">
          <div className="flex justify-start w-full mb-2">
            <div className="border-4 rounded-lg border-customOrange px-2 pb-3px">
                <h3 className="font-bold text-2xl">Due Dates</h3>
            </div>
          </div>
          <div className="flex w-full shadow h-100px rounded-xl mt-2 items-center justify-center">
            <h3 className="text-lg">No due dates added</h3>
          </div>
        </div>
      }
        {/* } */}

        {/* { width < 630 && 
          <div className="flex flex-col w-full max-w-3xl">
            <a className="flex w-full justify-end items-center mr-4" onClick={() => toggleDelete(deleteBool)}>
              <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
            </a>
            <div className="w-full">
              {htmlDiv}
            </div>
          </div>
        } */}
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
        <div className="flex flex-row justify-center pb-10">  
          {due_dates && orderDueDates(due_dates, daysUntil(due_dates))}
        </div>
      </>
    )
  } 

export default DueDates