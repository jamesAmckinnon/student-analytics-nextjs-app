import { useState } from "react";
import { useSession } from "next-auth/client";
import Router from "next/router";
import Link from "next/link";
import AddButton from '@/components/add-button'

function NewActivity() {
    const [activity_name, setActivity] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [session] = useSession()
    const user_id = session?.user?.email

    console.log(user_id)

    async function submitHandler(e) {
        setSubmitting(true)
        setActivity('')
        e.preventDefault()
        try {
            const res = await fetch('/api/new-activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                activity_name
            }),
            })
            setSubmitting(false)
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            Router.push('/health/add')
        } catch (e) {
            throw Error(e.message)
        }
    }

    return (
        <form onSubmit={submitHandler} autoComplete="off">
              <div className="flex flex-row justify-between px-5 py-3">
                <input className="border px-2 rounded" value={activity_name} onChange={(e) => setActivity(e.target.value)} placeholder="Activity Name"></input> 
                <AddButton disabled={submitting} type="submit">
                    {submitting ? 'Adding ...' : 'Add'}
                </AddButton> 
              </div>
        </form>
    )
}

    
export default NewActivity