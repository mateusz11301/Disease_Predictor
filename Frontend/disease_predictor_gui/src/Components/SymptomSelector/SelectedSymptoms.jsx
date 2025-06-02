function SelectedSymptoms({selectedSymptoms, setSymptoms, featuresAll}) {
    return (
        <div className="flex flex-wrap gap-2 mb-6 mt-2">
            { selectedSymptoms.map((el, index) =>
                <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm w-fit">
                    <span className="mr-2">{ featuresAll[el] || el }</span>
                    <button onClick={() => setSymptoms(selectedSymptoms.filter((e) => e !== el))} className="text-blue-500 hover:text-red-600 font-bold cursor-pointer">×</button>
                </div>
            )}
        </div>
    )
}

export default SelectedSymptoms