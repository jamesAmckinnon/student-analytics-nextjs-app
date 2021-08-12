import { signIn, signOut, useSession } from "next-auth/client";

export default function Logic ({children}) {
    const [session, loading] = useSession();

    if(!loading) {
        return (
            <>     
                {session && (
                    <>
                        <div className="childCont h-full">
                            {children}
                        </div>
                    </>
                )} 
                {!session && (
                    <div className="w-full h-full">          
                        <div className="signInWrapper">
                            <div className="signInTile">
                                <div className="signIn">
                                    <h3 className="">Not Signed In</h3>
                                    <button className="font-bold " onClick={() => signIn( 'auth0', { callbackUrl: 'http://localhost:3000/dashboard/home' } )}>Sign in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
  }