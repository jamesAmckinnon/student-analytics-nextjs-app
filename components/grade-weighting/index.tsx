import Link from "next/link"
import { useGradeWeight } from "@/lib/swr-hooks";

export default function GradeWeighting( {season, year, semester_id, course_name, course_id} ) {
  const { gradeWeight } = useGradeWeight(course_id);

  const object = {
    season: season,
    year: year,
    semester_id: semester_id,
    course_name: course_name,
    course_id: course_id,
  }

  if (gradeWeight) {
    return (
      <div>
        <div className="py-4 pr-0 my-3 w-full flex flex-row justify-between items-center">
            <div className="border-4 rounded-lg border-customBlue px-2 pb-3px">
                <h3 className="font-bold text-2xl">Grade Weighting</h3>
            </div>
            <Link href={{pathname: '/school/settings/add-grade-weight' , query: { object: JSON.stringify(object) } }}>
              <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
            </Link>
        </div> 
        <div className='flex flex-col w-full'>
          {gradeWeight.map((e) => (
            <div className="py-2 w-full flex flex-row justify-between">
              <p >{e.grade_weight_type}</p>
              <p className='font-bold mr-2'>{e.grade_weight}%</p>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return null
  }
}