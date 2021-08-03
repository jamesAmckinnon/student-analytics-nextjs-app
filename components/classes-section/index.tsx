import Link from 'next/link'
import { useDayTime } from '@/lib/swr-hooks';

function ClassesSection( {season, year, semester_id, course} ) {
  
    const object = {
      season: season,
      year: year,
      semester_id: semester_id,
  };

  if (course) {
    return (
      <div>
        <div className="py-4 pr-4 my-3 w-full flex flex-row justify-between">
            <div className="border-4 rounded-lg border-green-500 px-2 pb-3px">
                <h3 className="font-bold text-2xl">Classes</h3>
            </div>
            <Link href={{ pathname: '/school/settings/add-class', query: { object: JSON.stringify(object) } }}>
              <img src="/add-icon.svg" style={{ height: "auto", width: 25, cursor: 'pointer'}}/>
            </Link>
        </div>  
        <div className="flex flex-col">
                {course.map((e) => {
                    if(e.course_name != null && e.semester_id === semester_id){
                      const object = {
                        course_name: e.course_name,
                        course_id: e.course_id,
                        season: season,
                        year: year,
                        semester_id: semester_id,
                        
                      };
                      return (
                      <>
                        <Link href={{ pathname: '/school/settings/class', query: { object: JSON.stringify(object) } }}>
                            <a>{e.course_name}</a>
                        </Link>
                      </>
                      )
                    }
                })}
        </div>
      </div>
    )
  } else {
      return null
  }
}

export default ClassesSection