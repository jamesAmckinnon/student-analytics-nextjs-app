import ClassesSection from '@/components/classes-section'

function Semester() {
    return (
      <>         
        <div className="page-container h-full w-full grid justify-items-center">
            <div className="small-container">
                <div className="py-4 px-6 w-full">
                  <h3 className="font-bold text-4xl">Fall 2021</h3> 
                  <div className="flex flex-row justify-between text-2xl items-center">
                    <h3>Target GPA: </h3>
                    <div className="flex flex-row justify-between items-center">
                      <h3>3.7</h3>
                      <img src="/edit-icon.svg" style={{ height: 24, width: 50, cursor: 'pointer'}}/>
                    </div>
                  </div>
                  <ClassesSection/>
                </div> 
            </div>
        </div>
      </>
    )
  } 

export default Semester