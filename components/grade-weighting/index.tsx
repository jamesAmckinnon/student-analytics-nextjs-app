import Link from "next/link"
import { useGradeWeight } from "@/lib/swr-hooks";
import { useState } from "react";

export default function GradeWeighting( { object } ) {
  const { gradeWeight } = useGradeWeight(object.course_id);
  const [deleteBool, setDelete] = useState(false)

  async function deleteHandler(grade_weight_id) {
    document.getElementById(`${grade_weight_id}`).style.display = "none";
    let res = await fetch(`/api/delete-grade-weight?grade_weight_id=${grade_weight_id}`, { method: 'DELETE' })
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

  if (gradeWeight) {
    return (
      <div>
        <div className="pt-4 pb-2 pr-0 mt-3 w-full flex flex-row justify-between items-center">
            <div className="border-4 rounded-lg border-customBlue px-2 pb-3px">
                <h3 className="font-bold text-2xl">Grade Weighting</h3>
            </div>
            <div className="flex flex-row">
              <a className="mr-4" onClick={() => toggleDelete(deleteBool)}>
                <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
              </a>
              <Link href={{ pathname: '/school/settings/add-grade-weight', query: { object: JSON.stringify(object) } }}>
                  <img src="/add-icon.svg" style={{ height: 28, width: 24, cursor: 'pointer'}}/>
              </Link>
            </div>
        </div> 
        <div className='flex flex-col w-full my-1' >
          {gradeWeight.map((e) => (
            <div className="py-1 w-full flex flex-row justify-between" id={e.grade_weight_id}>
              <p >{e.grade_weight_type}</p>
              <div className="flex flex-row">
                <p className='font-bold mr-2'>{e.grade_weight}%</p>
                { deleteBool &&
                  <a onClick={() => deleteHandler(e.grade_weight_id)} className="deleteEntry">
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