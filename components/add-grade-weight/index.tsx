import Router from 'next/router'
import SemesterButton from '@/components/semester-button'
import { useState } from 'react'

function GradeWeight( {object, course_id} ) {
    const [grade_weight, setGradeWeight] = useState('')
    const [grade_weight_type, setGradeWeightType] = useState('')
    const [addAnother, setAddAnother] = useState('Add')
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
          setGradeWeightType('')
          setGradeWeight('') 
          setAddAnother('Add Another')
          const json = await res.json()
          if (!res.ok) throw Error(json.message)   
        } catch (e) {
          throw Error(e.message)
        }
    }

    return (      
        <>
            <div className="py-5 pr-0 w-full flex flex-row justify-between items-center">
                <div className="border-4 rounded-lg border-customOrange px-2 pb-3px">
                    <h3 className="font-bold text-3xl">Add Grade Weight</h3>
                </div>
            </div>
            <form onSubmit= {submitHandler}>
                <div className="py-2 flex flex-row justify-between">
                    <div className="flex flex-row justify between">
                        <input 
                                id="grade_weight_type" 
                                type="text" 
                                className="border-b-2 border-black mr-5 w-120px text-center" 
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
                        {submitting ? 'Adding ...' : addAnother}
                    </SemesterButton>
                </div>
            </form>
        </>
    )
  } 

export default GradeWeight