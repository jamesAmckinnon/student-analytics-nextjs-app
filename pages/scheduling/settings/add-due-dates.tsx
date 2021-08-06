import Link from 'next/link'
import Layout from 'pages/layout'
import AddDates from '@/components/add-due-dates'
import { useCurrentCourse, useCurrentSem } from '@/lib/swr-hooks'
import { withRouter } from 'next/router';
import { useSession } from 'next-auth/client';

function AddDueDates() {
    const [session] = useSession()


    if(session){
      const { current_courses } = useCurrentCourse(session.user.email)
      const { current_semester } = useCurrentSem(session.user.email)

    return (
        <Layout>
        <>
          <div className="page-container h-full w-full grid justify-items-center">
            <div className="small-container py-4 px-6">  
            {current_courses && current_semester &&
              <AddDates current_courses={current_courses} current_semester={current_semester[0].current_semester} user_id={session.user.email}  /> 
            }
              <div className="w-full my-4 flex justify-end">
                <Link href= '/scheduling/home'>
                  <button className="border-2 border-black font-bold py-1 px-2 rounded">Done</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      </Layout>
    )
    } else {
        return null
    }
  } 

export default AddDueDates