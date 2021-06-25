function Grades() {
    //   if (entries) {
        return (
          <div>
            <div className="py-4 pr-0 my-3 w-full flex flex-row justify-between items-center">
                <div className="border-4 rounded-lg border-customYellow px-2 pb-3px">
                    <h3 className="font-bold text-2xl">Grades</h3>
                </div>
                <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
            </div> 
            {/* {entries.map((e) => (
              <div key={e.id} className="py-2">
              </div>
            ))} */}
          </div>
        )
        }
    //   } else {
    //     return null
    //   }
    
    export default Grades