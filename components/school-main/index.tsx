import Link from 'next/link'
import Layout from "pages/layout"
import DisplayGrades from '@/components/display-grades'
import UpcomingGrades from '@/components/upcomingGrades'
import GradeCalculator from '@/components/gradeCalculator'
import { useCurrentGrades, useDueDates, useUpcomingGrades } from '@/lib/swr-hooks'
import { useSession } from 'next-auth/client'

function SchoolMain( {current_semester, user_id} ) {
  const { current_grades } = useCurrentGrades(current_semester)
  const { upcoming_grades } = useUpcomingGrades(current_semester)

  return (
      <>         
        <div className="page-container flex flex-col h-full w-full p-4">
            <div className="topBar w-full h-20 flex flex-row justify-items-start space-x-4 ">
                <Link href='/school/settings/choose-semester' ><img src="/gear-icon.svg" style={{ height: 80, width: 50, cursor: 'pointer' }}/></Link>
                <Link href='/school/settings/add'><img src="/add-icon.svg" style={{ height: 80, width: 50, cursor: 'pointer'}}/></Link>
            </div>
            <div className="flex flex-col items-center w-full">
                <div className="contentCont">
                    <DisplayGrades current_grades = {current_grades}/>
                    {upcoming_grades && <UpcomingGrades upcoming_grades={upcoming_grades}/>}
                    {/* <GradeCalculator /> */}
                </div>
            </div>
        </div>
      </>

  )
} 

export default SchoolMain