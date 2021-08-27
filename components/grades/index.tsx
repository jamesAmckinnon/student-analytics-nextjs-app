import { useGrades } from "@/lib/swr-hooks";
import { useState } from "react";

function Grades( {object, title } ) {
  const { grades } = useGrades(object.course_id);
  const [deleteBool, setDelete] = useState(false)

  async function deleteHandler(grade_id) {
    document.getElementById(`${grade_id}`).style.display = "none";
    let res = await fetch(`/api/delete-grade?grade_id=${grade_id}`, { method: 'DELETE' })
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

  if (grades) {
    console.log(grades)
    return (
      <div>
        <div className="pt-4 pb-2 pr-0 mt-3 w-full flex flex-row justify-between items-center">
            <div className="border-4 rounded-lg border-customGreen px-2 pb-3px">
                <h3 className="font-bold text-2xl">{title}</h3>
            </div>
            <a className="" onClick={() => toggleDelete(deleteBool)}>
              <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
            </a>
        </div> 
        <div className="my-1">
          {grades.map((e) => (
            <div id={e.grade_id} className="py-1 flex flex-row justify-between">
              <div className="">
                {e.grade_description}
              </div>
              <div className="flex flex-row">
                {e.grade_received}
                { deleteBool &&
                  <a onClick={() => deleteHandler(e.grade_id)} className="ml-2 deleteEntry">
                      <img src="/delete-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                  </a> 
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
      return null
  } 
}
    export default Grades