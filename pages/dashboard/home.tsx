import Calendar from "@/components/calendar";
import DueDates from "@/components/due-dates";
import SchoolDashboard from "@/components/school-dashboard";
import { useCurrentSem } from "@/lib/swr-hooks";
import { useSession } from "next-auth/client";
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
            <div className="page-container flex justify-center w-full">
              { current_semester && <Calendar user_id={userEmail} current_semester={current_semester[0].current_semester} />}
            </div>
            <SchoolDashboard current_semester = {current_semester[0].current_semester} user_id={userEmail}/>
            <div className="flex flex-col w-full items-center">
              <div className="dueDateCont">
                <div className="flex flex-start w-full mb-2">
                  <div className="border-4 rounded-lg border-customBlue mt-6 px-2 pb-3px">
                      <h3 className="font-bold text-2xl">Due Dates</h3>
                  </div>
                </div>
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