import Layout from "pages/layout"
import Calendar from "@/components/calendar";
import DueDates from "@/components/due-dates";
import Link from "next/link";
import { useCurrentSem } from "@/lib/swr-hooks";
import { useSession } from "next-auth/client";


function Scheduling() {
  const [ session ] = useSession()
  const userEmail = session?.user?.email
  const { current_semester } = useCurrentSem(userEmail)

return (
    <Layout>
      <>
        <div className=" mx-6">
          <div className="scheduleCont w-full mt-2">
            <Link href='/scheduling/settings/add-due-dates'><img src="/add-icon.svg" style={{ height: 80, width: 50, cursor: 'pointer'}}/></Link> 
          </div>     
          <div className="flex justify-center w-full my-8">
            { current_semester && <Calendar user_id={userEmail} current_semester={current_semester[0].current_semester} />}
          </div>
          <div className="page-container flex justify-center items-center w-full mt-6">
            <div className="dueDateCont">
              { current_semester && <DueDates user_id={userEmail} current_semester={current_semester[0].current_semester} />}
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
} 

export default Scheduling