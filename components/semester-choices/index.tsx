import Link from "next/link"
import { useState } from "react"

function SemesterChoices( {semester} ) {
    const [deleteBool, setDelete] = useState(false)

    function toggleDelete(toggle_delete) {
        if(!toggle_delete){
            setDelete(true)
        } else {
            setDelete(false)
        }
    }

    async function deleteHandler(semester_id, season, year) {
        if(userConfirmation(season, year)){
            document.getElementById(`${semester_id}`).style.display = "none";
            document.getElementById(`${(semester_id * -1).toString()}`).style.display = "none";
            let res = await fetch(`/api/delete-semester?semester_id=${semester_id}`, { method: 'DELETE' })
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
        } else {
            return
        }
    }

    function userConfirmation(season, year) {
        return confirm(`All semester and course information for ${season} ${year} will be permanently deleted`)
    }

    if (semester) {
        try{
            return (
            <>
                <div className="w-full flex flex-row justify-between h-36px">
                    <h3 className="font-bold text-2xl h-36px">Choose Semester</h3>
                    <div className="flex flex-row h-36px">
                        <a className="flex items-center mr-4" onClick={() => toggleDelete(deleteBool)}>
                            <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                        </a>
                        <Link href='/school/settings/add-semester'>
                            <img src="/add-icon.svg" style={{ height: "auto", width: 30, cursor: 'pointer'}}/>
                        </Link>
                    </div>
                </div> 
                <div className="py-4">
                    <div className="flex flex-col">
                        {semester.map((e) => {
                            if(e.semester_season != null){
                                const object = {
                                    season: e.semester_season,
                                    year: e.semester_year,
                                    semester_id: e.semester_id,
                                    current_semester: e.current_semester,
                                    target_gpa: e.target_gpa,
                                    user_id: e.user_id,
                                };
                                return (
                                    <div className="flex flex-row">
                                        <Link href={{ pathname: '/school/settings/semester', query: { object: JSON.stringify(object) } }}>
                                            <div id={e.semester_id} className="semesterSelectCont flex flex-row w-full items-center  justify-between cursor-pointer">
                                                <a className="">{e.semester_season} {e.semester_year}</a>
                                                {!deleteBool && 
                                                    <h3 id="" className="classArrow text-customGrey font-bold text-xl mr-2"> {">"} </h3>
                                                }
                                            </div>
                                        </Link>
                                        { deleteBool &&
                                            <a onClick={() => deleteHandler(e.semester_id, e.semester_season, e.semester_year)} className="deleteEntry h-31px flex items-center ml-2">
                                                <img id={(e.semester_id * -1).toString()} src="/delete-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                                            </a> 
                                        }
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </>
            )
        } catch {
            return null;
        }
    } else {
        return null
    }
}

    
    export default SemesterChoices