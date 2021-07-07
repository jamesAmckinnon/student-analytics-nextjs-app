import { useRouter } from 'next/router'

function RedirectPage({ ctx }) {
  const router = useRouter()
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/dashboard/home');
    return; 
  }
}


var axios = require("axios").default;

var options2 = {
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

axios.request(options2).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

RedirectPage.getInitialProps = ctx => {
  // We check for ctx.res to make sure we're on the server.
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: '/dashboard/home' });
    ctx.res.end();
  }
  return { };
}

export default RedirectPage



        