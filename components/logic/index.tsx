import { signIn, signOut, useSession } from "next-auth/client";
import { useState, useEffect } from 'react'

export default function Logic ({children}) {
    const [session, loading] = useSession();
    const [width, setWidth] = useState(window.innerWidth);

    
    useEffect(() => {
        function handleResize() {
        setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    if(!loading) {
        return (
            <>     

                {session && (width > 870) && (
                    <>
                        <div className="overflow-y-hidden h-full">
                            {children}
                        </div>
                    </>
                )}
                {!session && (width > 870) && (
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

                {session && (width < 870) && (
                    <>
                        <div className="h-full">
                            {children}
                        </div>
                    </>
                )}
                {!session && (width < 870) && (
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