import Link from 'next/link'
import Layout from 'pages/layout'
import AddClass from '@/components/add-class'
import { withRouter } from 'next/router';

function Class( { router: { query } } ) {
    const object = JSON.parse(query.object);

    return (
        <Layout>
        <>
          <div className="page-container w-full grid justify-items-center">
            <div className="small-container py-4 px-6">  
              <AddClass {...{router: { query }}} /> 
              <div className="w-full my-4 flex justify-end">
                <Link href={{ pathname: '/school/settings/semester', query: { object: JSON.stringify(object) } }}>
                  <button className="border-2 border-black font-bold py-1 px-2 rounded">Back</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      </Layout>
    )
  } 

export default withRouter(Class)