import Skeleton from 'react-loading-skeleton'

import Nav from '@/components/nav'
import Container from '@/components/container'
import SignIn from '@/components/sign-in'

import { useEntries } from '@/lib/swr-hooks'

export default function IndexPage() {
  const { isLoading } = useEntries()

  if (isLoading) {
    return (
      <div>
        <Nav />
        <Container>
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
        </Container>
      </div>
    )
  }

  return (
    <div>
      {/* <Nav /> */}
      <Container>
        <SignIn signIn={SignIn} />
      </Container>
    </div>
  )
}
