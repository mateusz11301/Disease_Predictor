function ClearButton({setSelectedSymptoms}) {
    return (
        <button onClick={() => setSelectedSymptoms([])} className="text-sm px-4 py-2 bg-red-100 text-red-600 rounded-xl shadow-sm hover:bg-red-200 transition duration-200 m-3 cursor-pointer">
            Odznacz wszystkie
        </button>
    )
}

export default ClearButton