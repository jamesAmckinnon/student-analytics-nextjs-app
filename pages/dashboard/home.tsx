import Calendar from "@/components/calendar";
import DueDates from "@/components/due-dates";
import SchoolDashboard from "@/components/school-dashboard";
import { useCurrentSem } from "@/lib/swr-hooks";
import { useSession } from "next-auth/client";
import Link from "next/link";
import Layout from "pages/layout"
import React from "react";

function MainDashboard() {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const { current_semester } = useCurrentSem(userEmail)
  
  if(current_semester) {
    return (
      <Layout>
        <>
          <div className="page-container flex flex-col w-full px-6 mt-8">
            <div className="addDashboard flex flex-row">
              <Link href='/school/settings/add'>
                <div className="flex flex-row items-center px-12px py-3px border-2 border-customGrey rounded-md cursor-pointer">
                  <img src="/add-icon-simple.svg" style={{ height: 28, width: 17, cursor: 'pointer'}}/>
                  <h3 className="ml-12px text-lg font-bold">Grades</h3>
                </div>
              </Link>
              <Link href='/scheduling/settings/add-due-dates'>
                <div className="flex flex-row items-center ml-4 px-12px py-3px border-2 border-customGrey rounded-md cursor-pointer">
                  <img src="/add-icon-simple.svg" style={{ height: 28, width: 17, cursor: 'pointer'}}/>
                  <h3 className="ml-12px text-lg font-bold">Schedule</h3>
                </div>
              </Link> 
            </div>
            <div className="mt-8 mb-2 flex justify-center w-full">
              { current_semester && <Calendar user_id={userEmail} current_semester={current_semester[0].current_semester} />}
            </div>
            <SchoolDashboard current_semester = {current_semester[0].current_semester} user_id={userEmail}/>
            <div className="flex flex-col w-full items-center">
              <div className="dueDateCont">
                <div className="page-container justify-items-center w-full">
                  { current_semester && <DueDates user_id={userEmail} current_semester={current_semester[0].current_semester} />}
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