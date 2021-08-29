import Link from 'next/link'
import Layout from "pages/layout"
import DisplayGrades from '@/components/display-grades'
import UpcomingGrades from '@/components/upcoming-grades'
import GradeCalculator from '@/components/grade-calculator'
import { useCurrentCourse, useCurrentGrades, useDueDates, useUpcomingGrades, useGradeWeights } from '@/lib/swr-hooks'
import { useSession } from 'next-auth/client'

function UpcomingGradesWrapper( { current_semester, user_id } ) {
  const { current_grades } = useCurrentGrades( current_semester )
  const { upcoming_grades } = useUpcomingGrades( current_semester )
  const { current_courses } = useCurrentCourse( user_id )
  const { grade_weights } = useGradeWeights( current_semester )

  return (
      <>         
        {upcoming_grades && <UpcomingGrades upcoming_grades={upcoming_grades} current_grades={current_grades}/>}
      </>

  )
} 

export default UpcomingGradesWrapper