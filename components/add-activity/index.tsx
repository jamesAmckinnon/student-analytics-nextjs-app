import { useState } from "react";
import Router from "next/router";
import Button from '@/components/button'

function AddActivity( { activities, user_id} ) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var current_date = yyyy + "-" + mm + '-' + dd;
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    const [date, setDate] = useState(current_date)
    const [activity_type_id, setActivityTypeId] = useState("")
    const [time_spent, setTimeSpent] = useState("")
    const [submitting, setSubmitting] = useState(false)

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        console.log(date)
        console.log(time_spent)
        console.log(activity_type_id)
        try {
            const res = await fetch('/api/add-activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date,
                time,
                time_spent,
                activity_type_id,
                
            }),
            })
            setSubmitting(false)
            setActivityTypeId('')
            setTimeSpent('')
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            Router.push('/health/add')
        } catch (e) {
            throw Error(e.message)
        }
    }


    return (
        <form className="w-full" onSubmit={submitHandler} autoComplete="off">
            <div className="w-full mb-3">
                <div className="py-2">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="activity-date" name="activity-date"></input>
                </div>
                <div className=" cont flex flex-row justify-between">
                    <select name="semester" value={activity_type_id} onChange={(e) => setActivityTypeId(e.target.value)} className="select1 bg-gray-200 rounded px-2">
                        <option value="none">Select</option>
                        {activities && activities.map((e) => (
                            <option value={e.activity_type_id}>{e.activity_name}</option>
                        ))}
                    </select>
                    <div className="flex flex-row w-20">
                        <h4>hrs.</h4>
                        <input type="text" maxLength={3} value={time_spent} onChange={(e) => setTimeSpent(e.target.value)} className="border-b w-10 ml-1 pl-1 border-black"></input>
                    </div>
                </div>
            </div>
            <Button disabled={submitting} type="submit">
                    {submitting ? 'Entering ...' : 'Enter'}
            </Button> 
        </form>
    )
}

    
export default AddActivity