import Link from 'next/link'
import Container from '@/components/container'
import { signIn, signOut, useSession } from "next-auth/client";

export default function Nav({ title = 'Student Analytics' }) {
  var axios = require("axios").default;
  const [session, loading] = useSession();

  if(session){
    var options = {
      method: 'POST',
      url: 'https://personal-portal.us.auth0.com/oauth/token',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: {
        grant_type: 'client_credentials',
        client_id: 'WRZQNo7nfg58nReIUeEIU4OfZVBRh37C',
        client_secret: 'VIRgfllEuFVxQPlwaO4PHZGHj1Oe2jFqF4QCrsQtFY-y4urZRaFxrO8TyHpFj2PC',
        audience: 'https://personal-portal.us.auth0.com/api/v2/'
      }
    };
    
    console.log("hiiiiiiiiiiiiiiiiiiiiii")
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }


  return (
    <Container className="py-4 px-6">
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold text-3xl">{title}</a>
          </Link>
          <button onClick={() => { signOut() }}>Sign Out</button>
        </div>
      </nav>
    </Container>
  )
}
