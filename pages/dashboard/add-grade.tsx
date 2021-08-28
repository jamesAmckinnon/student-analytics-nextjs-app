import Layout from 'pages/layout'
import AddGrade from '@/components/add-grade'
import { useCurrentCourse } from '@/lib/swr-hooks'
import Link from 'next/link'
import { useSession } from 'next-auth/client'

function Add() {
  const [ session ] = useSession()
  const { current_courses } = useCurrentCourse(session.user.email)
  
  console.log(current_courses)
    return (
      <Layout>
        <>
          <div className="page-container w-full grid justify-items-center">
            <div className="small-container py-4 px-6">  
              <AddGrade current_courses={current_courses}/>
              <div className="w-full flex justify-end">
                <Link href='/dashboard/home'>
                  <button className="border-2 border-black font-bold py-1 px-2 rounded">Done</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      </Layout>
    )
} 
 
export default Add