import { Provider } from 'next-auth/client'

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </Provider>
  )
}

export default MyApp
