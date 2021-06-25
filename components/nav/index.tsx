import Link from 'next/link'
import Container from '@/components/container'
import ButtonLink from '@/components/button-link'

export default function Nav({ title = 'Student Analytics' }) {
  return (
    <Container className="py-4 px-6">
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold text-3xl">{title}</a>
          </Link>
        </div>
      </nav>
    </Container>
  )
}
