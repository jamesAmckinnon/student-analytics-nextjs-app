import Link from 'next/link'

function School() {
    return (
      <>         
        <div className="page-container flex flex-row h-full w-full">
            <div className="topBar w-full h-20 flex flex-row justify-items-start space-x-4 ">
              <div></div>
              <Link href='/school/settings/choose-semester' ><img src="/gear-icon.svg" style={{ height: 80, width: 50, cursor: 'pointer' }}/></Link>
              <Link href='/school/add'><img src="/add-icon.svg" style={{ height: 80, width: 50, cursor: 'pointer'}}/></Link>
              
            </div>
        </div>
      </>
    )
  } 

export default School