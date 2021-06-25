function ClassesSection() {
//   if (entries) {
    return (
      <div>
        <div className="py-4 pr-4 my-3 w-full flex flex-row justify-between">
            <div className="border-4 rounded-lg border-green-500 px-2 pb-3px">
                <h3 className="font-bold text-2xl">Classes</h3>
            </div>
            <img src="/add-icon.svg" style={{ height: "auto", width: 25, cursor: 'pointer'}}/>
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

export default ClassesSection