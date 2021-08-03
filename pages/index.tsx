import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from "next-auth/client";
import Link from 'next/link';
import { useEntries } from '@/lib/swr-hooks';

function Page({ ctx }) {
  const router = useRouter()

  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/dashboard/home');
    return; 
  }
}

Page.getInitialProps = ctx => {
  // We check for ctx.res to make sure we're on the server.
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: '/dashboard/home' });
    ctx.res.end();
  }
  return { };
}

export default Page