import { Provider } from 'next-auth/client'
import Logic from '@/components/logic'
import '../styles/index.css'

function MyApp( { Component, pageProps } ) {

  return(
    <Provider session={pageProps.session}>
      <Logic>
        <Component {...pageProps}/>
      </Logic>
    </Provider>
  )
}
export default MyApp
