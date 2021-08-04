import SideBar from '@/components/side-bar'
import Nav from '@/components/nav'
import { useUsers } from '@/lib/swr-hooks'

export default function Layout ({children}) {
  const { users } = useUsers()

    return (
        <>     
          <div className="wrapper ">
            <div className="topNav border-b-2 border-gray-600 col-span-full">
              <Nav users = {users}/>
            </div>
            <div className="sideBar border-r-2 border-gray-600 col-start-1 col-end-2 row-start-2 row-end-4">
              <SideBar />
            </div>
            <div className="mainContent overflow-y-scroll">
              {children}
            </div>
          </div>  
  
        </>
    )
  }