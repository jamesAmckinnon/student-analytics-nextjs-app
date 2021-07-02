import Head from "next/head";
import Skeleton from 'react-loading-skeleton'
import Container from '@/components/container'
import React from "react";
import Link from "next/link";
import Layout from '../components/layout'
import { signIn, signOut, useSession } from "next-auth/client";
import { useEntries } from '@/lib/swr-hooks'

export default function Home() {
  const [session, loading] = useSession();
  const { isLoading } = useEntries();

  if (!isLoading) {
    return (
      <div>
        <Head>
          <title>Auth Examples</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <div>
          {!session && (
            <>            
              <div className= "signIn-frame">
                  <div className="signIn-wrapper">
                      <div className="signIn-body">
                          <div className="signIn-heading">
                              <div className="heading">
                                  <div className="">
                                      <h3>Not signed in</h3>
                                      <button className="" onClick={() => signIn()}>Sign in</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </>
          )}
          {session && (
            <>
            <p>{session.user.email}</p>
              {/* <Layout>
              </Layout>             */}
            </>
          )}
        </div>
      </div> 
    );
  }

  return(
    <div>
    </div>
  )
}
