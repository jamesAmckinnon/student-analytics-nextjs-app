import Calendar from "@/components/calendar";
import DueDates from "@/components/due-dates";
import SchoolDashboard from "@/components/school-dashboard";
import UpcomingGrades from "@/components/upcoming-grades";
import UpcomingGradesWrapper from "@/components/upcoming-grades-wrapper";
import { useCurrentGrades, useCurrentSem, useSemester, useUpcomingGrades } from "@/lib/swr-hooks";
import { useSession } from "next-auth/client";
import Link from "next/link";
import Layout from "pages/layout"
import React from "react";

function MainDashboard() {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const { current_semester } = useCurrentSem(userEmail)
  const { semester } = useSemester(userEmail)

  
  if(current_semester) {
    return (
      <Layout>
        <>
          <div className="flex flex-col w-full px-6 mt-8 pb-12">
            <div className="addDashboard flex flex-row">
              <Link href='/dashboard/add-grade'>
                <div className="flex flex-row items-center px-12px py-3px border-2 border-customGrey5 rounded cursor-pointer">
                  <img src="/add-icon-simple.svg" style={{ height: 28, width: 17, cursor: 'pointer'}}/>
                  <h3 className="ml-12px text-lg text-customGrey3 font-bold">Grades</h3>
                </div>
              </Link>
              <Link href='/dashboard/add-due-date'>
                <div className="flex flex-row items-center ml-4 px-12px py-3px border-2 border-customGrey5 rounded cursor-pointer">
                  <img src="/add-icon-simple.svg" style={{ height: 28, width: 17, cursor: 'pointer'}}/>
                  <h3 className="ml-12px text-lg text-customGrey3 font-bold">Schedule</h3>
                </div>
              </Link> 
            </div>
            <div className="my-16 flex justify-center w-full">
              { current_semester.length != 0 && <Calendar user_id={userEmail} current_semester={current_semester[0].current_semester} />}
            </div>
            { current_semester.length != 0 && <SchoolDashboard current_semester = {current_semester[0].current_semester} user_id={userEmail} semester={semester}/>}
            { current_semester.length != 0 && <UpcomingGradesWrapper  current_semester = {current_semester[0].current_semester} user_id={userEmail}/>}
            <div className="flex flex-col w-full items-center mt-12">
              <div className="dueDateCont">
                <div className="page-container justify-items-center w-full">
                  { current_semester.length != 0 && <DueDates user_id={userEmail} current_semester={current_semester[0].current_semester} />}
                </div>
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

export default MainDashboard