import Link from 'next/link'
import Layout from 'pages/layout'
import GradeWeight from '@/components/add-grade-weight'
import { withRouter } from 'next/router';

function AddGradeWeight( { router: { query } } ) {
  const object = JSON.parse(query.object);
  
  return (
      <Layout>
      <>
        <div className="page-container w-full grid justify-items-center">
          <div className="small-container py-4 px-6">  
            {object && <GradeWeight object={object} course_id={object.course_id} />}
            <div className="w-full my-4 flex justify-end">
              <Link href={{ pathname: '/school/settings/class', query: { object: JSON.stringify(object) } }}>
                <button className="border-2 border-black font-bold py-1 px-2 rounded">Back</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
} 

export default withRouter(AddGradeWeight)