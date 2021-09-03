import { signIn, signOut, useSession } from "next-auth/client";

export default function Logic ({children}) {
    const [session, loading] = useSession();


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
                        <div className="shadow-lg border-4 border-customBlue rounded-md h-200px w-340px flex p-6 justify-center">
                            <div className="flex flex-col items-center justify-center">
                                <h3 className="text-3xl font-bold">Student Dashboard</h3>
                                <div className="signIn mt-12">
                                    <button className="font-bold border border-black px-2 py-2px rounded-sm" onClick={() => signIn( 'auth0', { callbackUrl: 'http://localhost:3000/dashboard/home' } )}>Log In {'>'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
