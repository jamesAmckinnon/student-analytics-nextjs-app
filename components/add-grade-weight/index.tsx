import Router from 'next/router'
import SemesterButton from '@/components/semester-button'
import { useState } from 'react'

function GradeWeight( {object, course_id} ) {
    const [grade_weight, setGradeWeight] = useState('')
    const [grade_weight_type, setGradeWeightType] = useState('')
    const [submitting, setSubmitting] = useState(false)


    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        try {
          const res = await fetch('/api/add-grade-weight', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grade_weight_type,
              grade_weight,
              course_id,
            }),
          })
          setSubmitting(false)
          const json = await res.json()
          if (!res.ok) throw Error(json.message)  
          const url = '/school/settings/class?object=%7B%22season%22%3A%22' + object.season + '%22%2C%22year%22%3A' + object.year + '%2C%22semester_id%22%3A' + object.semester_id + '%2C%22course_name%22%3A%22' + object.course_name + '%22%2C%22course_id%22%3A' + object.course_id + '%7D';        
          Router.push(url)
          Router.push(url)
        } catch (e) {
          throw Error(e.message)
        }
    }

    return (      
        <>
            <div className="py-5 pr-0 w-full flex flex-row justify-between items-center">
                <div className="border-4 rounded-lg border-customBlue2 px-2 pb-3px">
                    <h3 className="font-bold text-3xl">Add Grade Weight</h3>
                </div>
            </div>
            <form onSubmit= {submitHandler}>
                <div className="py-2 flex flex-row justify-between">
                    <div className="flex flex-row justify between">
                        <input 
                                id="grade_weight_type" 
                                type="text" 
                                className="border-b-2 border-black mx-5 w-120px text-center" 
                                placeholder="WEIGHT TYPE"
                                maxLength={30} 
                                name="grade_weight_type"
                                value={grade_weight_type}
                                onChange={ (e) => setGradeWeightType(e.target.value)}
                            />
                        <input 
                            id="grade_weight" 
                            type="number" 
                            className="border-b-2 border-black mx-5 w-50px text-center" 
                            placeholder="( % )"
                            maxLength={3} 
                            name="grade_weight"
                            value={grade_weight}
                            onChange={ (e) => setGradeWeight(e.target.value)}
                        />
                    </div>
                    <SemesterButton disabled={submitting} type="submit">
                        {submitting ? 'Adding ...' : 'Add'}
                    </SemesterButton>
                </div>
            </form>
        </>
    )
  } 

export default GradeWeight