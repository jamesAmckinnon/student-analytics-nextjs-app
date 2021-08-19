import AddActivity from '@/components/add-activity'
import AddMood from '@/components/add-mood'
import AddDiet from '@/components/add-diet'
import AddSleep from '@/components/add-sleep'
import { useSession } from 'next-auth/client'
import { useActivity } from '@/lib/swr-hooks'
import Link from 'next/link'
import Layout from 'pages/layout'

function Add() {
  const [ session ] = useSession()
  const { activities } = useActivity(session.user.email)

    return (
      <Layout>
        <>
          <div className="page-container w-full grid justify-items-center">
            <div className="small-container py-4 px-6">  
              <div className="flex flex-row items-center justify-between pt-2">
                <h3 className="font-bold text-2xl">Activity</h3>
                <Link href='/health/new-activity'>
                    <img src="/add-icon.svg" style={{ height: 28, width: 24, cursor: 'pointer'}}/>
                </Link>
              </div>
              <div className="flex flex-row justify-between">
                <AddActivity activities={ activities } user_id={ session.user.email} /> 
              </div>   

              <h3 className="font-bold text-2xl pt-8">Mood</h3>
              <div className="flex flex-col w-full">
                <AddMood user_id={ session.user.email}/>
              </div>

              <h3 className="font-bold text-2xl pt-8">Diet</h3>
              <div className="flex flex-col w-full">
                <AddDiet user_id={ session.user.email}/>
              </div>

              <h3 className="font-bold text-2xl pt-8">Sleep</h3>
              <div className="flex flex-col w-full">
                <AddSleep user_id={ session.user.email}/>
              </div>

              <div className="w-full flex justify-end">
                <Link href='/health/home'>
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