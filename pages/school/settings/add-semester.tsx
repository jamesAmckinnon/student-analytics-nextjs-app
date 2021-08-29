import Link from 'next/link'
import Layout from 'pages/layout'
import AddSemester from '@/components/add-semester'
import { useEntries } from '@/lib/swr-hooks'
import { useSession } from 'next-auth/client'

function Semester() {
    const { entries } = useEntries()
    const [session] = useSession();
    const user_id = session?.user?.email;

    return (
        <Layout>
        <>
          <div className="page-container w-full grid justify-items-center">
            <div className="small-container py-4 px-6">  
              <AddSemester title="Add Semester" entries={entries} user_id= {user_id}/>
              <div className="w-full my-4 flex justify-end">
                <Link href='/school/home'>
                  <button className="border-2 border-black font-bold py-1 px-2 rounded">Back</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      </Layout>
    )
  } 

export default Semester