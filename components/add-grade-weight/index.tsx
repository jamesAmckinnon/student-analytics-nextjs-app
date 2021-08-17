import Router from 'next/router'
import SemesterButton from '@/components/semester-button'
import { useState } from 'react'

function GradeWeight( {object, course_id} ) {
    const [grade_weight_type, setGradeWeightType] = useState('')
    const [grade_weight, setGradeWeight] = useState('')
    const [addAnother, setAddAnother] = useState('Add')
    const [submitting, setSubmitting] = useState(false)


    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        if(grade_weight_type != '' && grade_weight != '' ){
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
        } else {

          if(grade_weight_type === ''){
              document.getElementById("grade_weight_type").style.backgroundColor = "#FF9494";
          }

          if(grade_weight === ''){
              document.getElementById("grade_weight").style.backgroundColor = "#FF9494";
          } 
          
          setSubmitting(false)
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
                <div className="py-2 flex flex-col justify-between">
                  <div className="flex flex-row items-center">
                      <h3 className="font-bold">Weight Type: </h3> 
                      <input 
                          id="grade_weight_type" 
                          type="text" 
                          className="border-b border-black ml-2 w-120px text-center" 
                          placeholder="Assignments"
                          maxLength={30} 
                          name="grade_weight_type"
                          value={grade_weight_type}
                          onChange={ (e) => setGradeWeightType(e.target.value)}
                      />
                  </div>
                  <div className="flex flex-row mt-4 items-center">
                    <h3 className="font-bold">Weight: </h3>
                    <input 
                        id="grade_weight" 
                        type="number" 
                        className="border-b border-black ml-2 w-50px text-center" 
                        placeholder="( % )"
                        maxLength={3} 
                        name="grade_weight"
                        value={grade_weight}
                        onChange={ (e) => setGradeWeight(e.target.value)}
                    />
                  </div>
                  <div className="w-full mt-4">
                    <SemesterButton disabled={submitting} type="submit">
                        {submitting ? 'Adding ...' : addAnother}
                    </SemesterButton>
                  </div>
                </div>
            </form>
        </>
    )
  } 

export default GradeWeight