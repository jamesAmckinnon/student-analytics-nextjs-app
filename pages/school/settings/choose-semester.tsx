import Link from 'next/link'
import Layout from 'pages/layout'
import SemesterChoices from '@/components/semester-choices'
import { useSemester } from '@/lib/swr-hooks'
import { useSession } from 'next-auth/client'
import { useCurrentSem } from '@/lib/swr-hooks'
import { useState } from 'react'

function ChooseSemester() {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const { semester } = useSemester(userEmail);
  const { current_semester } = useCurrentSem(userEmail)
  
  if(current_semester){
    return (
      <Layout>
        <>         
          <div className="page-container h-full w-full grid justify-items-center">
              <div className="small-container py-4 px-6">
                  <SemesterChoices semester = {semester} />
                  <div className="w-full flex justify-end">
                    <Link href='/school/home'>
                      <button className="border-2 border-black font-bold py-1 px-2 rounded">Done</button>
                    </Link>
                  </div>
              </div>
          </div>
        </>
      </Layout>
    )
  } else {
    return null
  }
  } 

export default ChooseSemester