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


  if(current_semester){
    return (
      <Layout>
        <>
          <div className="w-full">
            <Link href='/scheduling/settings/add-due-dates'><img src="/add-icon.svg" style={{ height: 80, width: 50, cursor: 'pointer'}}/></Link> 
          </div>     
          <div className="page-container flex justify-center w-full">
            { current_semester && <Calendar user_id={userEmail} current_semester={current_semester[0].current_semester} />}
          </div>
          <div className="page-container justify-items-center w-full">
            { current_semester && <DueDates user_id={userEmail} current_semester={current_semester[0].current_semester} />}
          </div>
        </>
      </Layout>
    )
  } else {
    return null
  }
} 

export default Scheduling