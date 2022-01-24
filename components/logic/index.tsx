import { signIn, signOut, useSession } from "next-auth/client";
import Head from 'next/head';

export default function Logic ({children}) {
    const [session, loading] = useSession();

    if(!loading){
        return (
            <>     
                {session && (
                    <>
                        <Head>
                            <title>Student Dashboard</title>
                            <meta 
                                property="og:title"
                                content="Student Dashboard" 
                                />
                                <meta 
                                name="og:image"
                                property="og:image"
                                content="https://www.studentdashboard.ca/logo.png"
                                />
                                <meta 
                                name="og:author" 
                                content="James McKinnon" 
                                />
                                <meta 
                                property="og:description" 
                                content="Student Dashboard App"
                                />
                                <meta 
                                property="og:url"
                                content="https://www.studentdashboard.ca/"
                                />
                        </Head>
                        <div className="childCont h-full">
                            {children}
                        </div>
                    </>
                )} 
                {!session && (
                    <>
                        <Head>
                            <title>Student Dashboard</title>
                            <meta 
                                property="title"
                                content="Student Dashboard" 
                                />
                                <meta 
                                name="image"
                                property="image"
                                content="%../../public/logo.png%"
                                />
                                <meta 
                                name="author" 
                                content="James McKinnon" 
                                />
                                <meta 
                                property="description" 
                                content="Student Dashboard App"
                                />
                                <meta 
                                property="url"
                                content="https://www.studentdashboard.ca/"
                                />
                        </Head>
                        <div className="w-full h-full">          
                            <div className="signInWrapper">
                                <div className="shadow-lg border-4 border-customBlue rounded-md h-230px w-340px flex p-4 justify-center">
                                    <div className="flex flex-col items-center ">
                                        <h1 className="text-3xl font-bold">Student Dashboard</h1>
                                        <div className="signIn mt-10">
                                            <button className="font-bold border border-black px-2 py-2px rounded-sm" onClick={() => signIn( 'auth0', { callbackUrl: 'http://localhost:3000/dashboard/home' } )}>Log In / Sign up {' >'}</button>
                                        </div>
                                        <h3 className="mt-10 text-sm text-center text-customGrey3"> By creating an account, you are agreeing to our <a className="underline text-blue-700" href="https://www.freeprivacypolicy.com/live/70d73ab9-fa50-43c7-970e-e9ad1e939012">Privacy Policy.</a></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
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
