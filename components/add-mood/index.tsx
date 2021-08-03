import { useState } from "react";
import Router from "next/router";
import Button from '@/components/button'

function AddMood( { user_id} ) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var current_date = yyyy + "-" + mm + '-' + dd;
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    const [date, setDate] = useState(current_date)
    const [mood_label, setMood] = useState("")
    const [submitting, setSubmitting] = useState(false)

    async function submitHandler(e) {
        setSubmitting(true)
        setMood('')
        e.preventDefault()
        try {
            const res = await fetch('/api/add-mood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                date,
                time,
                mood_label
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
            <div className="w-full mb-3">
                <div className="py-2">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="activity-date" name="activity-date"></input>
                </div>
                <div className="flex flex-row justify-between">
                    <select name="semester" value={mood_label} onChange={(e) => setMood(e.target.value)} className="select1 bg-gray-200 rounded px-2">
                        <option value="none">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
            </div>
            <Button disabled={submitting} type="submit">
                    {submitting ? 'Entering ...' : 'Enter'}
            </Button> 
        </form>
    )
}

    
export default AddMood