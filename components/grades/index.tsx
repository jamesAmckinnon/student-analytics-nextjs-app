import { useGrades } from "@/lib/swr-hooks";

function Grades( {object } ) {
  const { grades } = useGrades(object.course_id);

  if (grades) {
    return (
      <div>
        <div className="pt-4 pb-2 pr-0 mt-3 w-full flex flex-row justify-between items-center">
            <div className="border-4 rounded-lg border-customGreen px-2 pb-3px">
                <h3 className="font-bold text-2xl">Grades</h3>
            </div>
            <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
        </div> 
        <div className="my-1">
          {grades.map((e) => (
            <div className="py-1 flex flex-row justify-between">
              <div className="">
                {e.grade_description}
              </div>
              <div className="">
                {e.grade_received}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
      return null
  } 
}
    export default Grades