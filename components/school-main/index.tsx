import Link from 'next/link'
import Layout from "pages/layout"
import DisplayGrades from '@/components/display-grades'
import UpcomingGrades from '@/components/upcoming-grades'
import GradeCalculator from '@/components/grade-calculator'
import { useCurrentCourse, useCurrentGrades, useDueDates, useUpcomingGrades, useGradeWeights } from '@/lib/swr-hooks'
import { useSession } from 'next-auth/client'

function SchoolMain( { current_semester, user_id } ) {
  const { current_grades } = useCurrentGrades( current_semester )
  const { upcoming_grades } = useUpcomingGrades( current_semester )
  const { current_courses } = useCurrentCourse( user_id )
  const { grade_weights } = useGradeWeights( current_semester )

  return (
      <>         
        <div className="flex flex-col w-full px-4 pt-4 pb-12">
            <div className="topBar w-full h-20 flex flex-row justify-items-start space-x-4 mb-8">
                <Link href='/school/settings/choose-semester' ><img src="/gear-icon.svg" style={{ height: 80, width: 50, cursor: 'pointer' }}/></Link>
                <Link href='/school/settings/add'><img src="/add-icon.svg" style={{ height: 80, width: 50, cursor: 'pointer'}}/></Link>
            </div>
            <div className="flex flex-col items-center w-full">
                <div className="contentCont">
                    <DisplayGrades current_grades = {current_grades}/>
                    <GradeCalculator current_courses={current_courses} gradeWeight={grade_weights} current_grades = {current_grades}/>
                    {upcoming_grades && <UpcomingGrades upcoming_grades={upcoming_grades} current_grades={current_grades}/>}
                </div>
            </div>
        </div>
      </>

  )
} 

export default SchoolMain