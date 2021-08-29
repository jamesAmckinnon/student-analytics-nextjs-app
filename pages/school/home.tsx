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
          <div className="page-container w-full grid justify-items-center">
              <div className="small-container py-4 px-6">
                <div className="">
                  <SemesterChoices semester = {semester} /> 
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