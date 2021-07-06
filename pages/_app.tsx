import { Provider } from 'next-auth/client'
import SideBar from '@/components/side-bar'
import Nav from '@/components/nav'
import { signIn, signOut, useSession } from "next-auth/client";

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  const [session, loading] = useSession();

  if(!loading){
    return (
      <div className="w-full h-full">
      {!session && (
        <>            
          <div className="signInWrapper">
              <div className="signInTile">
                  <div className="signIn">
                      <h3 className="">Not Signed In</h3>
                      <button className="font-bold " onClick={() => signIn( 'auth0', { callbackUrl: 'https://student-analytics-next.js.herokuapp.com/dashboard/home' } )}>Sign in</button>
                  </div>
              </div>
          </div>
        </>
      )}
      {session && (
        <>     
          <div className="wrapper">
            <div className="topNav border-b border-gray-900 col-span-full">
                <Nav/>
            </div>
            <div className="sideBar col-start-1 col-end-2 row-start-2 row-end-4">
                <SideBar />
            </div>
            <div className="mainContent">
              <Provider session={pageProps.session}>
                <Component {...pageProps} />
              </Provider>
            </div>
          </div>  
  
        </>
      )}
    </div>
    )
  } else {
      return (
        <></>
      )
  }

}

export default MyApp
