import Link from 'next/link'
import Layout from 'pages/layout'
import Router from 'next/router'
import SemesterButton from '@/components/semester-button'
import { useState } from 'react'

function FeedbackForm( {user_id} ) {
    const [feedback_text, setFeedback] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [thankYou, setThankYou] = useState('Submit')

    async function submitHandler(e) {

        if(feedback_text != ''){
            e.preventDefault()
            setSubmitting(true)
            console.log(feedback_text)
            try {
            const res = await fetch('/api/add-feedback', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                feedback_text,
                user_id,
                }),
            })
            setSubmitting(false)
            setThankYou('Thank You!')
            setFeedback('')
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            } catch (e) {
            throw Error(e.message)
            }
        } else {

            if(feedback_text === ''){
                document.getElementById("feedback_text").style.backgroundColor = "#FF9494";
            }            
        }
    }
    
    if (user_id) {
        return (      
            <>
                <div className="pt-5 pb-4 pr-0 w-full flex flex-row justify-between items-center">
                    <div className="border-4 rounded-lg border-customBlue px-2 pb-3px">
                        <h3 className="font-bold text-3xl">Feedback</h3>
                    </div>
                </div>
                <h3 className="mt-2">What about this web app could be improved? </h3>
                <form onSubmit= {submitHandler}>
                    <div className="py-2 flex flex-col mt-4">
                        <div className="flex flex-row w-full">
                            <textarea 
                                id="feedback_text" 
                                className="input2 border-2 border-black rounded-lg w-full resize-y overflow-auto" 
                                name="feedback_text" 
                                value={feedback_text}
                                maxLength={70000}
                                onChange={ (e) => setFeedback(e.target.value)}
                                >
                            </textarea>
                        </div>
                        <div className="flex flex-row justify-end w-full mt-8">
                            <SemesterButton disabled={submitting} type="submit">
                                {submitting ? 'Submitting ...' : thankYou}
                            </SemesterButton>
                        </div>
                    </div>
                </form>
            </>
        )
    } else {
        return null
    }
  } 

export default FeedbackForm