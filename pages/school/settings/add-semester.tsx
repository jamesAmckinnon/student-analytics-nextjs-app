import Link from 'next/link'

function AddSemester() {
    return (
      <>         
        <div className="page-container h-full w-full grid justify-items-center">
            <div className="small-container">
                <div className="py-4 px-6 w-full flex flex-col">
                    <h3 className="font-bold text-2xl">Add Semester</h3>
                    <div className="py-2 flex flex-row justify-between">
                        <div className="flex flex-row justify between">
                            <select name="semester" className="bg-gray-200 rounded px-2">
                                <option value="none">Select</option>
                                <option value="fall">Fall</option>
                                <option value="winter">Winter</option>
                                <option value="spring">Spring</option>
                                <option value="summer">Summer</option>
                                <option value="other">Other</option>
                            </select>
                            <input type="text" className="border-b-2 border-black mx-5 w-50px text-center" placeholder="YEAR"maxLength={4}></input>
                        </div>
                        <button className="bg-green-400 px-2 py-1 rounded font-bold">Add</button>
                    </div>
                </div>            
            </div>
        </div>
      </>
    )
  } 

export default AddSemester