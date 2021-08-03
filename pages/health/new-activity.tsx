import Layout from 'pages/layout'
import Link from 'next/link'
import NewActivity from '@/components/new-activity'
import { useSession } from 'next-auth/client'

function Activity() {
  const [session] = useSession()

    return (
      <Layout>
        <>
          <div className="page-container h-full w-full grid justify-items-center">
            <div className="small-container">  
              <div className="flex flex-row justify-between px-5 py-3">
                <h3 className="font-bold text-2xl">New Activity</h3>
              </div>
              <NewActivity />
              <div className="w-full flex justify-end px-5 py-10">
                <Link href='/health/add'>
                  <button className="border-2 border-black font-bold py-1 px-2 rounded">Done</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      </Layout>
    )
} 

export default Activity