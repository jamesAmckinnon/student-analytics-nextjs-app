import Link from 'next/link'
import { useDueDates } from '@/lib/swr-hooks';
import { useState, useEffect } from 'react';

function UpcomingGrades( { upcoming_grades } ) {
    const [width, setWidth] = useState(window.innerWidth)
    
    console.log(upcoming_grades)

    useEffect(() => {
        function handleResize() {
        setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);
  
    function gradeNeeded(g){
        var target = g.target_course_gpa
        var weight = g.grade_weight * .01
        var current = g.grade_total
        var gradeNeeded = 0

        gradeNeeded = (target - ( (1 - weight) * (current) )) / weight;
        console.log(gradeNeeded)

        return gradeNeeded
    }

    if(upcoming_grades){
        return (
        <>
            { width < 500 &&
                <div className="flex flex-col">
                    <div className="flex flex-start w-full my-2">
                        <div className="mt-8 text-lg font-bold  border-2 border-customBlue rounded px-5px py-2px">
                            <h2>Upcoming</h2>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <h2 className="font-bold">Grade Needed</h2>
                    </div>
                    <div className="flex flex-col">
                        { upcoming_grades.map( (e) => (
                            <div className="flex flex-row justify-between my-2">
                                <div className="flex flex-col">
                                    <div className="flex w-full justify-start">
                                        <h3 className="py-1 px-2 bg-blue-200 text-sm">{e.course_code}</h3>
                                    </div>
                                    <h3>{e.due_date_description}</h3> 
                                </div>
                                <div className="flex items-center justify-center w-107px text-center">
                                    {(Math.round( ( gradeNeeded(e) ) * 100 + Number.EPSILON ) / 100)}%
                                </div>
                            </div>
                        ))}   
                    </div>
                </div>
            } 
            
            { width > 500 && 
                <div className="flex flex-col">
                    <div className="flex flex-start w-full my-2">
                        <div className="mt-2 text-lg font-bold  border-2 border-customYellow rounded px-5px py-2px">
                            <h2>Upcoming</h2>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <h2 className="font-bold">Grade Needed</h2>
                    </div>
                    <div className="flex flex-col">
                        { upcoming_grades.map( (e) => (
                            <div className="flex flex-row">
                                <h3>{e.course_code}</h3>
                            </div>
                        ))}   
                    </div>
                </div>
            }
        </>
        )
    } else {
        return null
    }
}

export default UpcomingGrades