import Link from 'next/link'
import Layout from "pages/layout"

function Health() {

  
    return (
      <Layout>
          <>         
            <div className="page-container flex flex-row h-full w-full">
                <div className="topBar w-full h-20 flex flex-row justify-items-start space-x-4 ">
                  <div></div>
                  {/* <Link href='/school/settings/choose-semester' ><img src="/gear-icon.svg" style={{ height: 80, width: 50, cursor: 'pointer' }}/></Link> */}
                  <Link href='/health/add'><img src="/add-icon.svg" style={{ height: 80, width: 50, cursor: 'pointer'}}/></Link>
                </div>
            </div>
          </>
      </Layout>
    )
} 

export default Health