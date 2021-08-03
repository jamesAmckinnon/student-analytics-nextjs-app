import Link from 'next/link'
import Layout from 'pages/layout'
import Router from 'next/router'
import SemesterButton from '@/components/semester-button'
import { useState } from 'react'

function AddSemester( {title, entries, user_id} ) {
    const [semester_season, setSeason] = useState('')
    const [semester_year, setYear] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        try {
          const res = await fetch('/api/add-semester', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              semester_season,
              semester_year,
              user_id,
            }),
          })
          setSubmitting(false)
          const json = await res.json()
          if (!res.ok) throw Error(json.message)
          Router.push('/school/settings/choose-semester')
        } catch (e) {
          throw Error(e.message)
        }
    }
    
    if (entries) {
        return (      
            <>
                <div className="py-5 pr-0 w-full flex flex-row justify-between items-center">
                    <div className="border-4 rounded-lg border-customBlue2 px-2 pb-3px">
                        <h3 className="font-bold text-3xl">{title}</h3>
                    </div>
                </div>
                <form onSubmit= {submitHandler}>
                    <div className="py-2 flex flex-row justify-between">
                        <div className="flex flex-row justify between">
                            {/* <label htmlFor="season"></label> */}
                            <select id="semester_season" 
                                className="bg-gray-200 rounded px-2"
                                name="semester_season" 
                                value={semester_season}
                                onChange={ (e) => setSeason(e.target.value)}
                                >
                                <option value=" ">Select</option>
                                <option value="Fall">Fall</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                            </select>
                            <input 
                                id="semester_year" 
                                type="text" 
                                className="border-b-2 border-black mx-5 w-50px text-center" 
                                placeholder="YEAR"
                                maxLength={4} 
                                name="semester_year"
                                value={semester_year}
                                onChange={ (e) => setYear(e.target.value)}
                            />
                        </div>
                        <SemesterButton disabled={submitting} type="submit">
                            {submitting ? 'Adding ...' : 'Add'}
                        </SemesterButton>
                    </div>
                </form>
            </>
        )
    } else {
        return null
    }
  } 

export default AddSemester