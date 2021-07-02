import Link from 'next/link'
import Container from '@/components/container'
import { signIn, signOut, useSession } from "next-auth/client";

export default function Nav({ title = 'Student Analytics' }) {
  const [session] = useSession();

  return (
    <Container className="py-4 px-6">
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold text-3xl">{title}</a>
          </Link>
          {session.user.email}
          <button onClick={() => { signOut() }}>Sign Out</button>
        </div>
      </nav>
    </Container>
  )
}
