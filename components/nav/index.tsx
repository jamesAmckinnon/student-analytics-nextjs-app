import Link from 'next/link'
import Container from '@/components/container'
import React from 'react'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { signOut, useSession } from "next-auth/client";
import { useBetaTest } from '@/lib/swr-hooks'



export default function Nav( {users, beta_test} ) {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const [width, setWidth] = useState(window.innerWidth);
  const [menu, setMenu] = useState(false)
  const path = document.location.pathname

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    width < 600;
  },[width]);

  console.log(path)

  if(users) { ////////////////////// bad. more users == slower
    var isNewUser = true;
    users.map((u) => {
      if(u.user_id === userEmail){
        isNewUser = false
      }
    })
    if (isNewUser) {
      newUser();
    } 
  }

    async function newUser() {
      try {
        const res = await fetch('/api/new-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail,
          }),
        })
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
      } catch (e) {
        return;
      }
    }

    function menuOpen () {
      setMenu(true);
    }

    function menuClose () {
      setMenu(false)
    }
  
  if(beta_test) {
    return (
      <>
        {!menu && <div className="mainNav py-4 px-6">
          <nav>
            <div className="flex justify-between items-center">
              <Link href="/">
                <a className="font-bold text-3xl"></a>
              </Link>
              {width > 870 &&
                <button onClick={() => { signOut() }}>Sign Out</button>
              } {width < 870 && 
                  <div className="w-full flex justify-end">
                    <button onClick={ menuOpen }><img src="/menu.svg" style={{ height: 35, width: 29, cursor: 'pointer'}}></img></button>
                  </div>
              }
            </div>
          </nav>
        </div>}
        {menu && <div className="flex flex-col p-6 h-screen w-full absolute bg-white">
            <div className="flex flex-row w-full justify-between">
              <button className="border-2 border-customBlue font-bold text-customGrey2 px-2 rounded pb-1px" onClick={() => { signOut() }}>
                Sign Out
              </button>
              <button onClick={ menuClose }>
                <img src="/delete-icon.svg" style={{ height: 35, width: 29, cursor: 'pointer'}}></img>
              </button>
            </div>
            <div className="flex flex-col mt-8">
              <Link href="/dashboard/home">
                <div className="flex flex-row w-full  items-center justify-between">
                  <a onClick={ menuClose } className="font-bold text-3xl">Dashboard</a>
                  { path.substring(1,10) === "dashboard" &&
                    <span className="dot"></span>
                  }
                </div>
              </Link>
              <Link href="/school/home">
                <div className="flex flex-row items-center justify-between">
                  <a onClick={ menuClose } className="font-bold text-3xl">School</a>
                  { path.substring(1,7) === "school" &&
                    <span className="dot"></span>
                  }
                </div>
              </Link>
              <div className="flex flex-row items-center justify-between">
              {beta_test[0].health_beta != 0 && 
              <Link href="/health/home"><a onClick={ menuClose } className="font-bold text-3xl">Health</a></Link>}              </div>
              <Link href="/scheduling/home">
                <div className="flex flex-row items-center justify-between">
                  <a onClick={ menuClose } className="font-bold text-3xl">Scheduling</a>
                  { path.substring(1,11) === "scheduling" &&
                    <span className="dot"></span>
                  }
                </div>
              </Link>
            </div>
        </div>}
      </>
    )
  } else {
    return null
  }
}
