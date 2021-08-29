import Link from 'next/link'
import Layout from "pages/layout"
import DisplayGrades from '@/components/display-grades'
import UpcomingGrades from '@/components/upcoming-grades'
import GradeCalculator from '@/components/grade-calculator'
import { useCurrentGrades, useCurrentSem } from '@/lib/swr-hooks'
import { useSession } from 'next-auth/client'
import SchoolMain from '@/components/school-main'

function School() {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const { current_semester } = useCurrentSem(userEmail)

  if(current_semester) {
    return (
      <Layout>
        {/* <>         
          {current_semester[0] && <SchoolMain current_semester = {current_semester[0].current_semester} user_id={userEmail}/>}
        </> */}
      </Layout>
    )
  } else {
    return null
  }

  } 

export default School