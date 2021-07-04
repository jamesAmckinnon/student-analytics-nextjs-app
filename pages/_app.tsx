import { Provider } from 'next-auth/client'
import SideBar from '@/components/side-bar'
import Nav from '@/components/nav'

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <div className="wrapper">
          <div className="topNav border-b border-gray-900 col-span-full">
              <Nav/>
          </div>
          <div className="sideBar col-start-1 col-end-2 row-start-2 row-end-4">
              <SideBar />
          </div>
          <div className="mainContent">
            <Component {...pageProps} />
          </div>
      </div>
    </Provider>
  )
}

export default MyApp
