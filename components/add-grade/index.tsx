function AddGrades( {entries} ) {
    if (entries) {
        return (
            <div className="py-4 px-6 w-full">
                <div className="py-2 pr-0 w-full flex flex-row justify-between items-center">
                    <div className="border-4 rounded-lg border-green-500 px-2 pb-3px">
                        <h3 className="font-bold text-3xl">Grades</h3>
                    </div>
                </div>
                <h3 className="font-bold text-2xl">Course</h3>
                <select name="semester" className="bg-gray-200 rounded px-2">
                    <option value="none">Select</option>
                    {entries.map((e) => (
                        <option value={e.id}>{e.title}</option>
                    ))}
                </select>
            </div> 
        )
    } else {
        return null
    }
}

    
    export default AddGrades