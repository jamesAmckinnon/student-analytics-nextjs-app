import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/client";
import { useBetaTest } from '@/lib/swr-hooks';

function SideBar( {beta_test} ) {
  const [session, loading] = useSession();

  if(beta_test){
    return (
      <>
        <div className='flex flex-col'>
            <div className="dashboard"><Link href='/dashboard/home'>Dashboard</Link></div>
            <div className="school"><Link href='/school/home'>School</Link></div>
            {beta_test[0].health_beta != 0 && <div className="health"><Link href='/health/home'>Health</Link></div>}
            <div className="scheduling"><Link href='/scheduling/home'>Scheduling</Link></div>
            <div className="analytics"><Link href='/analytics/home'>Analytics</Link></div>
        </div>
      </>
    )
  } else {
    return null
    }
  }

  export default SideBar