import {useState} from "react"
import features from "../../../../../Models_Files/features.json"

function SymptomDisplay({selectedSymptoms, setSelectedSymptoms, searchedSymptoms}) {
    function toggleSymptom(symptom) {
        const updateSelected = selectedSymptoms.includes(symptom) ? selectedSymptoms.filter((s) => s !== symptom) : [...selectedSymptoms, symptom]

        setSelectedSymptoms(updateSelected)
    }

    const filteredSymptoms = features.filter((f) => f.toLowerCase().trim().includes(searchedSymptoms.toLowerCase().trim()))

    return (
        <div
            className="symptoms max-h-80 overflow-y-auto border border-gray-200 rounded-lg p-4 shadow-inner grid grid-cols-2 md:grid-cols-3 gap-3">
            { filteredSymptoms.map((el, index) =>
                <div key={index} onClick={() => toggleSymptom(el)} className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm border 
                ${selectedSymptoms.includes(el) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"}`}>
                    { el }
                </div>
            )}
        </div>
    )
}

export default SymptomDisplay