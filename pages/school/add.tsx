import AddGrade from '@/components/add-grade'
import { useEntries } from '@/lib/swr-hooks'

function Add() {
  const { entries } = useEntries()

    return (
      <>
        <div className="page-container h-full w-full grid justify-items-center">
          <div className="small-container">  
            <AddGrade entries={entries}/>
          </div>
        </div>
      </>
    )
} 

export default Add