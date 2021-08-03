import { useState } from "react";
import Router from "next/router";
import Button from '@/components/button'

function AddSleep( { user_id } ) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var current_date = yyyy + "-" + mm + '-' + dd;
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    const [date, setDate] = useState(current_date)
    const [sleep_time, setSleepTime] = useState("")
    const [submitting, setSubmitting] = useState(false)

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        try {
            const res = await fetch('/api/add-sleep-time', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                date,
                time,
                sleep_time
            }),
            })
            setSubmitting(false)
            setSleepTime('')
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            Router.push('/health/add')
        } catch (e) {
            throw Error(e.message)
        }
    }

    return (
        <form onSubmit={submitHandler} autoComplete="off">
            <div className="w-full mb-3">
                <div className="py-2">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="activity-date" name="activity-date"></input>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row w-20">
                        <h4>hrs.</h4>
                        <input type="text" maxLength={4} value={sleep_time} onChange={(e) => setSleepTime(e.target.value)} className="border-b w-10 ml-1 pl-1 border-black"></input>
                    </div>
                </div>
            </div>
            <Button disabled={submitting} type="submit">
                    {submitting ? 'Entering ...' : 'Enter'}
            </Button> 
        </form>
    )
}

    
export default AddSleep