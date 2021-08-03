import GradeWeighting from '@/components/grade-weighting'
import Grades from '@/components/grades'
import CourseTime from '@/components/course-time';
import Layout from 'pages/layout'
import { withRouter } from 'next/router';
import { useDayTime } from '@/lib/swr-hooks';
import Link from 'next/link';

function Class( { router: { query } } ) {
  const object = JSON.parse(query.object);
  const { course_day_time } = useDayTime(object.semester_id, object.course_id )

    return (
      <Layout>
        <>         
          <div className="page-container h-full w-full grid justify-items-center">
              <div className="small-container">
                  <div className="py-4 px-6 w-full">
                      <h3 className="font-bold text-4xl">{object.course_name}</h3> 
                      <div className="flex flex-row justify-between text-2xl items-center">
                          <h3>Target GPA: </h3>
                          <div className="flex flex-row justify-between items-center">
                              <h3 className="mr-4">3.7</h3>
                              <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                          </div>
                      </div>
                      <GradeWeighting season={object.season} year={object.year} semester_id={object.semester_id} course_name={object.course_name} course_id={object.course_id}/>
                      <Grades/>
                      {course_day_time && <CourseTime object={object} semester_id={object.semester_id} course_id={object.course_id} course_day_time={course_day_time}/>}
                      <div className="w-full flex justify-end">
                        <Link href={{ pathname: '/school/settings/semester', query: { object: JSON.stringify(object) } }}>
                          <button className="border-2  border-black font-bold py-1 px-2 rounded">Back</button>
                        </Link>
                      </div>  
                  </div> 
              </div>
          </div>
        </>
      </Layout>
    )
  } 

export default withRouter(Class);