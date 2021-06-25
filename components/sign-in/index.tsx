import Link from 'next/link'
import ButtonLink from '@/components/button-link'

function SignIn({ signIn, title = 'ballsak' }) {
    if (signIn) {
      return (
        <div>
            <div className= "signIn-frame">
                <div className="signIn-wrapper">
                    <div className="signIn-body">
                        <div className="signIn-heading">
                            <div className="heading">
                                <h1>Sign In</h1>
                                <div className="flex justify-between items-center">
                                    {/* <Link href="/">
                                        <a className="font-bold text-3xl">{title}</a>
                                    </Link> */}
                                    <ButtonLink href="/api/auth/login">Login</ButtonLink>
                                    <ButtonLink href="/api/auth/logout">Logout</ButtonLink>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
    } else {
      return null
    }
  }
  
  export default SignIn