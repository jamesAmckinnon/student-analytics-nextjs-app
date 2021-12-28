import { useRouter, Router } from 'next/router'
import { signIn, signOut, useSession } from "next-auth/client";
import Link from 'next/link';
import { useEntries } from '@/lib/swr-hooks';
import React from 'react';


// D:\Desktop\student-analytics> npm run dev <--- make sure Desktop has capital d
// git push origin main

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