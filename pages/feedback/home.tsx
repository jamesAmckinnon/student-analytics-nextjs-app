import Link from 'next/link'
import Layout from 'pages/layout'
import AddDates from '@/components/add-due-dates'
import { useCurrentCourse, useCurrentSem } from '@/lib/swr-hooks'
import { withRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import FeedbackForm from '@/components/feedback-form';

function Feedback() {
    const [session] = useSession()
    const userEmail = session.user.email;


    if(session){

    return (
        <Layout>
        <>
          <div className="page-container  w-full grid justify-items-center">
            <div className="small-container py-4 px-6">  
                <FeedbackForm user_id={userEmail}/>
            </div>
          </div>
        </>
      </Layout>
    )
    } else {
        return null
    }
  } 

export default Feedback