import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/client";

function SideBar() {
  const [session, loading] = useSession();

    return (
      <>
        <div className='flex flex-col'>
            <div className="dashboard"><Link href='/dashboard/home'>Dashboard</Link></div>
            <div className="school"><Link href='/school/home'>School</Link></div>
            <div className="health"><Link href='/health/home'>Health</Link></div>
            <div className="scheduling"><Link href='/scheduling/home'>Scheduling</Link></div>
            <div className="analytics"><Link href='/analytics/home'>Analytics</Link></div>
        </div>
      </>
    )
  }

  export default SideBar