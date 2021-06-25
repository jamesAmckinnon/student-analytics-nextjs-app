import GradeWeighting from '@/components/grade-weighting'
import Grades from '@/components/grades'

function Class() {
    return (
      <>         
        <div className="page-container h-full w-full grid justify-items-center">
            <div className="small-container">
                <div className="py-4 px-6 w-full">
                    <h3 className="font-bold text-4xl">CMPUT 267</h3> 
                    <div className="flex flex-row justify-between text-2xl items-center">
                        <h3>Target GPA: </h3>
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="mr-4">3.7</h3>
                            <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                        </div>
                    </div>
                    <GradeWeighting/>
                    <Grades/>
                </div> 
            </div>
        </div>
      </>
    )
  } 

export default Class