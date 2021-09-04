import Link from 'next/link'
import Layout from "pages/layout"
import DisplayGrades from '@/components/display-grades'
import UpcomingGrades from '@/components/upcoming-grades'
import GradeCalculator from '@/components/grade-calculator'
import { useCurrentCourse, useCurrentGrades, useDueDates, useUpcomingGrades, useGradeWeights } from '@/lib/swr-hooks'
import { useSession } from 'next-auth/client'

function SchoolDashboard( { current_semester, user_id, semester } ) {
  const { current_grades } = useCurrentGrades( current_semester )
  const { upcoming_grades } = useUpcomingGrades( current_semester )
  const { current_courses } = useCurrentCourse( user_id )
  const { grade_weights } = useGradeWeights( current_semester )

 


  return (
      <>         
        <div className="flex flex-col w-full">
            <div className="flex flex-col items-center w-full">
                <div className="contentCont">
                    <DisplayGrades current_grades = {current_grades}/>
                    <GradeCalculator current_courses={current_courses} gradeWeight={grade_weights} current_grades = {current_grades}/>
                </div>
            </div>
        </div>
      </>

  )
} 

export default SchoolDashboard