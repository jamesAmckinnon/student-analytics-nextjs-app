import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Auth Examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.email} <br />
            <div>You can now access our super secret pages</div>
            <button>
              <Link href="/secret">To the secret</Link>
            </button>
            <button onClick={() => signOut}>sign out</button>
            
          </>
        )}
      </main>
    </div>
  );
}

// export default function IndexPage() {
//   const { isLoading } = useEntries()

//   if (isLoading) {
//     return (
//       <div>
//         <Nav />
//         <Container>
//           <Skeleton width={180} height={24} />
//           <Skeleton height={48} />
//           <div className="my-4" />
//           <Skeleton width={180} height={24} />
//           <Skeleton height={48} />
//           <div className="my-4" />
//           <Skeleton width={180} height={24} />
//           <Skeleton height={48} />
//         </Container>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <Container>
//         <SignIn signIn={SignIn} />
//       </Container>
//     </div>
//   )
// }
