import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/client";
import { useBetaTest } from '@/lib/swr-hooks';

function SideBar( ) {
  const [session, loading] = useSession();
  const path = document.location.pathname


  return (
    <>
      <div className='flex flex-col text-customGrey3 text-xl font-bold'>
          <Link href='/dashboard/home'>
            <div className="dashboard border-b border-black cursor-pointer">
            {path.substring(1,10) != "dashboard" && 
              <div className="p-6">
                  Dashboard
              </div>
              } 
              {path.substring(1,10) === "dashboard" && 
                <div className="border-r-9px p-6 border-customBlue">
                  Dashboard
                </div>
              } 
            </div>
          </Link>
          <Link href='/school/home'>
            <div className="school border-b border-black cursor-pointer">
              { path.substring(1,7) != "school" && 
                  <div className="p-6">
                    School
                  </div>
                } 
                { path.substring(1,7) === "school" && 
                  <div className="border-r-9px p-6 border-customBlue">
                    School
                  </div>
                } 
            </div>
          </Link>
          <Link href='/scheduling/home'>
            <div className="scheduling border-b border-black cursor-pointer">
              {path.substring(1,11) != "scheduling" && 
              <div className="p-6">
                  Scheduling
              </div>
              } 
              {path.substring(1,11) === "scheduling" && 
                <div className="border-r-9px p-6 border-customBlue">
                  Scheduling
                </div>
              } 
            </div>
          </Link>
          <Link href='/feedback/home'>
            <div className="feedback border-b border-black cursor-pointer">
              {path.substring(1,9) != "feedback" && 
              <div className="p-6">
                  Feedback
              </div>
              } 
              {path.substring(1,9) === "feedback" && 
                <div className="border-r-9px p-6 border-customBlue">
                  Feedback
                </div>
              } 
            </div>
          </Link>
      </div>
    </>
  )
}

  export default SideBar