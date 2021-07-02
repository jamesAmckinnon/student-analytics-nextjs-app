import Link from 'next/link'
import Container from '@/components/container'
import { signIn, signOut, useSession } from "next-auth/client";

export default function Nav({ title = 'Student Analytics' }) {
  const [session] = useSession();

  if (session) {
    return (  
    <Container className="py-4 px-6">
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold text-3xl">{title}</a>
          </Link>
          {/* <p>Signed in as {session.user.email}</p> */}
          <button onClick={() => { signOut() }}>Sign Out</button>
        </div>
      </nav>
    </Container>
    )
  }
}
