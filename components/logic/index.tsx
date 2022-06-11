import { signIn, signOut, useSession } from "next-auth/client";
import {Head, Html} from 'next/document';


export default function Logic ({children}) {
    const [session, loading] = useSession();

    if(!loading){
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
                    <>
                        <div className="w-full h-full">          
                            <div className="signInWrapper">
                                <div className="shadow-lg border-4 border-customBlue rounded-md h-280px w-340px flex p-4 justify-center">
                                    <div className="flex flex-col items-center ">
                                        <h1 className="text-3xl font-bold">Student Dashboard</h1>
                                        <a className="flex flex-row mt-1" href="https://www.youtube.com/watch?v=HT8cGN-ggsA">
                                            <div className="w-40px h-30px">
                                                <img className="w-full h-full object-contain" src="/youtubeLogo.png" alt="youtube"></img>
                                            </div>
                                            <h3 className="ml-3 "><span className="border-b border-black hover:border-gray-600 pb-0">See how it works!</span></h3>
                                            <h3 className="ml-3 text-lg">{''}</h3>
                                        </a>
                                        <div className="signIn mt-10">
                                            <button className="font-bold border border-black px-2 py-2px hover:border-gray-600 rounded-sm" onClick={() => signIn( 'auth0', { callbackUrl: 'http://localhost:3000/dashboard/home' } )}>Log In / Sign up {' >'}</button>
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
