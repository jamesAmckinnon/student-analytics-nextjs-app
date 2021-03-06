import Link from 'next/link'
import Container from '@/components/container'
import React from 'react'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { signOut, useSession } from "next-auth/client";
import { useBetaTest } from '@/lib/swr-hooks'



export default function Nav( {users} ) {
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

  if(users) { 
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
            <div className="flex w-full justify-between items-center">
              {width > 870 &&
                <div className="flex flex-row w-full justify-between">
                  <h3 className="text-4xl text-customGrey3 font-bold">Student Dashboard</h3>
                  <div className="px-2 flex items-center">
                    <button className="px-2 py-5px" onClick={() => { signOut() }}>
                      Sign Out
                    </button>
                  </div>
                </div>
              } {width < 870 && 
                <div className="flex flex-row w-full justify-end items-center">
                  <button onClick={ menuOpen }><img src="/menu.svg" style={{ height: 35, width: 29, cursor: 'pointer'}}></img></button>                
                </div>
              }
            </div>
          </nav>
        </div>}
        {menu && <div className="flex flex-col p-6 h-screen w-full absolute bg-white">
            <div className="flex flex-row w-full justify-between">
              <button className="border-2 border-customBlue font-bold text-customGrey2 px-2 rounded pb-1px" onClick={() => { signOut() }}>
                <div className="">
                  Sign Out
                </div>
              </button>
              <button onClick={ menuClose }>
                <img src="/delete-icon.svg" style={{ height: 35, width: 29, cursor: 'pointer'}}></img>
              </button>
            </div>
            <div className="flex flex-col mt-8">
              <Link href="/dashboard/home">
                <div className="flex flex-row w-full  items-center justify-between cursor-pointer">
                  <a onClick={ menuClose } className="font-bold text-3xl">Dashboard</a>
                  { path.substring(1,10) === "dashboard" &&
                    <span className="dot"></span>
                  }
                </div>
              </Link>
              <Link href="/school/home">
                <div className="flex flex-row items-center justify-between cursor-pointer">
                  <a onClick={ menuClose } className="font-bold text-3xl">School</a>
                  { path.substring(1,7) === "school" &&
                    <span className="dot"></span>
                  }
                </div>
              </Link>
              <Link href="/scheduling/home">
                <div className="flex flex-row items-center justify-between cursor-pointer">
                  <a onClick={ menuClose } className="font-bold text-3xl">Scheduling</a>
                  { path.substring(1,11) === "scheduling" &&
                    <span className="dot"></span>
                  }
                </div>
              </Link>
              <Link href="/feedback/home">
                <div className="flex flex-row items-center justify-between cursor-pointer">
                  <a onClick={ menuClose } className="font-bold text-3xl">Feedback</a>
                  { path.substring(1,9) === "feedback" &&
                    <span className="dot"></span>
                  }
                </div>
              </Link>
            </div>
        </div>}
      </>
    )
  } 
