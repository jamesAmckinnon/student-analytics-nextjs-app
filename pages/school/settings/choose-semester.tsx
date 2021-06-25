import Link from 'next/link'

function ChooseSemester() {
    return (
      <>         
        <div className="page-container h-full w-full grid justify-items-center">
            <div className="small-container">
                <div className="py-4 px-6 w-full flex flex-row justify-between">
                    <h3 className="font-bold text-2xl">Choose Semester</h3>
                    <Link href='/school/settings/add-semester'><img src="/add-icon.svg" style={{ height: "auto", width: 30, cursor: 'pointer'}}/></Link>
                </div>            
            </div>
        </div>
      </>
    )
  } 

export default ChooseSemester