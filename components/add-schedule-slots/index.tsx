import Router from 'next/router'
import Button from '@/components/button'
import { useState } from 'react'
import { useEntries } from '@/lib/swr-hooks'

function AddScheduleSlots({ current_courses, current_semester, user_id }) {
    const [course1, setCourse1] = useState("115")
    const [course2, setCourse2] = useState("115")
    const [course3, setCourse3] = useState("115")
    const [course4, setCourse4] = useState("115")
    const [course5, setCourse5] = useState("115")
    const [course6, setCourse6] = useState("115")
    const [course7, setCourse7] = useState("115")
    const [course8, setCourse8] = useState("115")
    const [course9, setCourse9] = useState("115")
    const [course10, setCourse10] = useState("115")
    const [time1, setTime1] = useState("")
    const [time2, setTime2] = useState("")
    const [time3, setTime3] = useState("")
    const [time4, setTime4] = useState("")
    const [time5, setTime5] = useState("")
    const [time6, setTime6] = useState("")
    const [time7, setTime7] = useState("")
    const [time8, setTime8] = useState("")
    const [time9, setTime9] = useState("")
    const [time10, setTime10] = useState("")
    const [day, setDay] = useState("")
    const [submitting, setSubmitting] = useState(false)
    console.log(current_semester)

    async function submitHandler(e) {
        setSubmitting(true)
        console.log(course1, "hi")
        e.preventDefault()
        try {
            console.log(course1, "hi")
            const res = await fetch('/api/add-schedule-slots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    day,
                    current_semester,
                    course1,
                    course2,
                    course3,
                    course4,
                    course5,
                    course6,
                    course7,
                    course8,
                    course9,
                    course10,
                    time1,
                    time2,
                    time3,
                    time4,
                    time5,
                    time6,
                    time7,
                    time8,
                    time9,
                    time10,
                    user_id
                }),
            })
            setSubmitting(false)
            setDay('')
            setCourse1("115")
            setCourse2("115")
            setCourse3("115")
            setCourse4("115")
            setCourse5("115")
            setCourse6("115")
            setCourse7("115")
            setCourse8("115")
            setCourse9("115")
            setCourse10("115")
            setTime1('')
            setTime2('')
            setTime3('')
            setTime4('')
            setTime5('')
            setTime6('')
            setTime7('')
            setTime8('')
            setTime9('')
            setTime10('')
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            const url = '/scheduling/settings/add-schedule';
            Router.push(url)
        } catch (e) {
            throw Error(e.message)
        }
    }

    if (current_courses) {
        return (
            <>
                <div className="py-5 pr-0 w-full flex flex-row justify-between items-center">
                    <div className="border-4 rounded-lg border-customBlue2 px-2 pb-3px">
                        <h3 className="font-bold text-3xl">Add Schedule</h3>
                    </div>
                </div>
                <form onSubmit={submitHandler} autoComplete="off">
                    <div className="my-4">
                        <label htmlFor="day">
                            <h3 className="font-bold mb-2">Day</h3>
                        </label>
                        <select
                            id="day"
                            className="shadow border rounded"
                            name="day"
                            value={day}
                            onChange={(e) => { setDay(e.target.value) }}
                        >
                            <option value="none">Select</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                        </select>
                    </div>
                    <h3 className="font-bold">Schedule Slots</h3>
                    <div className="mt-2 mb-2">
                        <label htmlFor="course">
                            <h3 className="font-bold">(1) </h3>
                        </label>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h3 className="ml-8 font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course1}
                                    onChange={(e) => { setCourse1(e.target.value) }}
                                >
                                    <option value="115">Select</option> 
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row font-bold ml-8">
                                <h3>Time Slot: </h3>
                                <input
                                    id="time"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-24 pl-1 pr-1 my-1 ml-2"
                                    name="time"
                                    type="text"
                                    placeholder="eg.  8 - 8:50"
                                    value={time1}
                                    onChange={(e) => setTime1(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="course">
                            <h3 className="font-bold">(2)  </h3>
                        </label>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h3 className="ml-8 font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course2}
                                    onChange={(e) => { setCourse2(e.target.value) }}
                                >
                                    <option value="115">Select</option>
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row font-bold ml-8">
                                <h3>Time Slot: </h3>
                                <input
                                    id="time"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-24 pl-1 pr-1 my-1 ml-2"
                                    name="time"
                                    type="text"
                                    placeholder="eg.  8 - 8:50"
                                    value={time2}
                                    onChange={(e) => setTime2(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="course">
                            <h3 className="font-bold">(3)</h3>
                        </label>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h3 className="ml-8 font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course3}
                                    onChange={(e) => { setCourse3(e.target.value) }}
                                >
                                    <option value="115">Select</option>
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row font-bold ml-8">
                                <h3>Time Slot: </h3>
                                <input
                                    id="time"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-24 pl-1 pr-1 my-1 ml-2"
                                    name="time"
                                    type="text"
                                    placeholder="eg.  8 - 8:50"
                                    value={time3}
                                    onChange={(e) => setTime3(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="course">
                            <h3 className="font-bold">(4)</h3>
                        </label>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h3 className="ml-8 font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course4}
                                    onChange={(e) => { setCourse4(e.target.value) }}
                                >
                                    <option value="115">Select</option>
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row font-bold ml-8">
                                <h3>Time Slot: </h3>
                                <input
                                    id="time"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-24 pl-1 pr-1 my-1 ml-2"
                                    name="time"
                                    type="text"
                                    placeholder="eg.  8 - 8:50"
                                    value={time4}
                                    onChange={(e) => setTime4(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="course">
                            <h3 className="font-bold">(5)</h3>
                        </label>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h3 className="ml-8 font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course5}
                                    onChange={(e) => { setCourse5(e.target.value) }}
                                >
                                    <option value="115">Select</option>
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row font-bold ml-8">
                                <h3>Time Slot: </h3>
                                <input
                                    id="time"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-24 pl-1 pr-1 my-1 ml-2"
                                    name="time"
                                    type="text"
                                    placeholder="eg.  8 - 8:50"
                                    value={time5}
                                    onChange={(e) => setTime5(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="course">
                            <h3 className="font-bold">(6)</h3>
                        </label>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h3 className="ml-8 font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course6}
                                    onChange={(e) => { setCourse6(e.target.value) }}
                                >
                                    <option value="115">Select</option>
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row font-bold ml-8">
                                <h3>Time Slot: </h3>
                                <input
                                    id="time"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-24 pl-1 pr-1 my-1 ml-2"
                                    name="time"
                                    type="text"
                                    placeholder="eg.  8 - 8:50"
                                    value={time6}
                                    onChange={(e) => setTime6(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="course">
                            <h3 className="font-bold">(7)</h3>
                        </label>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h3 className="ml-8 font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course7}
                                    onChange={(e) => { setCourse7(e.target.value) }}
                                >
                                    <option value="115">Select</option>
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row font-bold ml-8">
                                <h3>Time Slot: </h3>
                                <input
                                    id="time"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-24 pl-1 pr-1 my-1 ml-2"
                                    name="time"
                                    type="text"
                                    placeholder="eg.  8 - 8:50"
                                    value={time7}
                                    onChange={(e) => setTime7(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="course">
                            <h3 className="font-bold">(8)</h3>
                        </label>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h3 className="ml-8 font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course8}
                                    onChange={(e) => { setCourse8(e.target.value) }}
                                >
                                    <option value="115">Select</option>
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row font-bold ml-8">
                                <h3>Time Slot: </h3>
                                <input
                                    id="time"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-24 pl-1 pr-1 my-1 ml-2"
                                    name="time"
                                    type="text"
                                    placeholder="eg.  8 - 8:50"
                                    value={time8}
                                    onChange={(e) => setTime8(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="course">
                            <h3 className="font-bold">(9)</h3>
                        </label>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h3 className="ml-8 font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course9}
                                    onChange={(e) => { setCourse9(e.target.value) }}
                                >
                                    <option value="115">Select</option>
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row font-bold ml-8">
                                <h3>Time Slot: </h3>
                                <input
                                    id="time"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-24 pl-1 pr-1 my-1 ml-2"
                                    name="time"
                                    type="text"
                                    placeholder="eg.  8 - 8:50"
                                    value={time9}
                                    onChange={(e) => setTime9(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="course">
                            <h3 className="font-bold">(10)</h3>
                        </label>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h3 className="ml-10 font-bold">Course: </h3>
                                <select
                                    id="course"
                                    className="shadow border rounded ml-4"
                                    name="course"
                                    value={course10}
                                    onChange={(e) => { setCourse10(e.target.value) }}
                                >
                                    <option value="115">Select</option>
                                    {current_courses.map((e) => (
                                        <option value={e.course_id}>{e.course_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row font-bold ml-10">
                                <h3>Time Slot: </h3>
                                <input
                                    id="time"
                                    autoComplete="off"
                                    className="border-b border-black text-center w-24 pl-1 pr-1 my-1 ml-2"
                                    name="time"
                                    type="text"
                                    placeholder="eg.  8 - 8:50"
                                    value={time10}
                                    onChange={(e) => setTime10(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <Button disabled={submitting} type="submit">
                        {submitting ? 'Entering ...' : 'Enter'}
                    </Button>
                </form>
            </>
        )
    } else {
        return null
    }
}

export default AddScheduleSlots