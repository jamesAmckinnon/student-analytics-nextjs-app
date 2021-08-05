import Link from "next/link"
import { useGradeWeight } from "@/lib/swr-hooks";

export default function GradeWeighting( { object } ) {
  const { gradeWeight } = useGradeWeight(object.course_id);

  if (gradeWeight) {
    return (
      <div>
        <div className="pt-4 pb-2 pr-0 mt-3 w-full flex flex-row justify-between items-center">
            <div className="border-4 rounded-lg border-customBlue px-2 pb-3px">
                <h3 className="font-bold text-2xl">Grade Weighting</h3>
            </div>
            <Link href={{ pathname: '/school/settings/add-grade-weight', query: { object: JSON.stringify(object) } }}>
                <img src="/add-icon.svg" style={{ height: 28, width: 24, cursor: 'pointer'}}/>
            </Link>
        </div> 
        <div className='flex flex-col w-full my-1'>
          {gradeWeight.map((e) => (
            <div className="py-1 w-full flex flex-row justify-between">
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