import SideBar from '@/components/side-bar'
import Nav from '@/components/nav'
import { useBetaTest, useUsers } from '@/lib/swr-hooks'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'

export default function Layout ({children}) {
  const { users } = useUsers()
  const [width, setWidth] = useState(window.innerWidth);
  const [session, loading] = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);


    return (
        <>  
            {width > 870 &&
              <div className="wrapper h-screen overflow-y-hidden">
                <div className="topNav border-b-2 border-gray-600 auto-rows-max col-span-full overflow-y-hidden">
                  <Nav users = {users} />
                </div>
                <div className="sideBar border-r-2 border-gray-600 auto-rows-max col-start-1 col-end-2 row-start-2 row-end-4 overflow-y-hidden ">
                  <SideBar />
                </div>
                <div className="mainContent overflow-y-scroll">
                  {children}
                </div>
              </div>  
            }  
            
            
            {width < 870 &&
              <>
                <div className="topNav fixed w-full z-10 bg-white border-b-2 border-gray-600 ">
                  <Nav users = {users} />
                </div>
                <div className="mainContent overflow-y-scroll h-full w-full pt-54px">
                  {children}
                </div>
              </>
            }
        </>
    )

  }