import Nav from '@/components/nav'
import SideBar from '@/components/side-bar'
import { signIn, signOut, useSession } from "next-auth/client";


const Layout = ({children}) => {
    const [session, loading] = useSession();

    return (
        <div>
            <div className="wrapper">
                <div className="topNav border-b border-gray-900 col-span-full">
                    <Nav/>
                </div>
                <div className="sideBar col-start-1 col-end-2 row-start-2 row-end-4">
                    <SideBar />
                </div>
                <div className="mainContent">
                    {children}
                </div>
            </div>    
        </div>
    )
}

export default Layout