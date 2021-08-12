import Link from 'next/link'
import Container from '@/components/container'
import React from 'react'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { signOut, useSession } from "next-auth/client";


export default function Nav( {users} ) {
  const [session] = useSession();
  const userEmail = session?.user?.email;
  const [width, setWidth] = useState(window.innerWidth);
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    width < 600 && handleSideNavToggle();
  },[width]);

  function handleSideNavToggle() {
    console.log("toggle it");
  }
  

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
                  <button onClick={ menuOpen }>Menu</button>
                </div>
            }
          </div>
        </nav>
      </div>}
      {menu && <div className="flex flex-col items-center pt-6 h-full w-full absolute bg-white">
          <button onClick={ menuClose }>Menu</button>
          <button onClick={() => { signOut() }}>Sign Out</button>
          <Link href="/dashboard/home"><a className="font-bold text-3xl">Dashboard</a></Link>
          <Link href="/school/home"><a className="font-bold text-3xl">School</a></Link>
          <Link href="/health/home"><a className="font-bold text-3xl">Health</a></Link>
          <Link href="/scheduling/home"><a className="font-bold text-3xl">Scheduling</a></Link>
      </div>}
    </>
  )
}
