import Link from "next/link"

function SemesterChoices( {semester, current_semester } ) {
    if (semester) {
        try{
            return (
                <div className="flex flex-col">
                    {semester.map((e) => {
                        if(e.semester_season != null){
                            const object = {
                                season: e.semester_season,
                                year: e.semester_year,
                                semester_id: e.semester_id,
                                current_semester: current_semester,
                            };
                            return (
                            <>
                                <Link href={{ pathname: '/school/settings/semester', query: { object: JSON.stringify(object) } }}>
                                    <a>{e.semester_season} {e.semester_year}</a>
                                </Link>
                            </>
                            )
                        }
                    })}
                </div>
            )
        } catch {
            return null;
        }
    } else {
        return null
    }
}

    
    export default SemesterChoices