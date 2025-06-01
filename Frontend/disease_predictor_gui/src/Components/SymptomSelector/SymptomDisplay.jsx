import {useEffect, useState} from "react"
import axios from "axios";

function SymptomDisplay({selectedSymptoms, setSelectedSymptoms, searchedSymptoms}) {
    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    function toggleSymptom(symptom) {
        const updateSelected = selectedSymptoms.includes(symptom) ? selectedSymptoms.filter((s) => s !== symptom) : [...selectedSymptoms, symptom]

        setSelectedSymptoms(updateSelected)
    }

    const filteredSymptoms = features.filter((f) => f.toLowerCase().trim().includes(searchedSymptoms.toLowerCase().trim()))

    useEffect(() => {
        async function fetchFeatures() {
            try {
                const response = await axios.get("api/features/")
                setFeatures(response.data)
            }
            catch (err) {
                setError("Błąd przy ładowaniu objawów")
            }
            finally {
                setLoading(false)
            }
        }

        fetchFeatures()
    }, []);

    if (loading) return <div className="min-h-80 text-center text-gray-500">Ładowanie objawów...</div>;
    if (error) return <div className="min-h-80 text-center text-red-500">{error}</div>;

    return (
        <div className="symptoms max-h-80 overflow-y-auto border border-gray-200 rounded-lg p-4 shadow-inner grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredSymptoms.length === 0 && "Brak wyników"}
            {  filteredSymptoms.map((el, index) =>
                <div key={index} onClick={() => toggleSymptom(el)} className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm border 
                ${selectedSymptoms.includes(el) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"}`}>
                    { el }
                </div>
            )}
        </div>
    )
}

export default SymptomDisplay