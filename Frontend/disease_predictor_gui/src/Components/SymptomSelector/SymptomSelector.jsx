import {useEffect, useState} from "react";
import axios from "axios";

import SearchBar from "./SearchBar.jsx";
import SymptomDisplay from "./SymptomDisplay.jsx";
import SelectedSymptoms from "./SelectedSymptoms.jsx";
import PredictButton from "./PredictButton.jsx";
import ClearButton from "./ClearButton.jsx";

function SymptomSelector({handlePredict}) {
    const [selectedSymptoms, setSelectedSymptoms] = useState([])
    const [searchedSymptoms, setSearchedSymptoms] = useState("")

    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchFeatures() {
            try {
                const response = await axios.get("api/features/")
                setFeatures(response.data)
            }
            catch (err) {
                setError(`Błąd przy ładowaniu objawów. ${err}`)
            }
            finally {
                setLoading(false)
            }
        }

        fetchFeatures()
    }, [])

    const symptomVector = features.map((symptom) =>
        selectedSymptoms.includes(symptom) ? 1 : 0
    )

    return (
        <>
            <div className="selector w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
                        Wybierz objawy
                    </h1>
                    <SearchBar searchedSymptoms={searchedSymptoms} setSearchedSymptoms={setSearchedSymptoms}/>
                    <SymptomDisplay selectedSymptoms={selectedSymptoms} setSelectedSymptoms={setSelectedSymptoms} searchedSymptoms={searchedSymptoms} features={features} loading={loading} error={error}/>
                    { selectedSymptoms.length > 0 && <ClearButton setSelectedSymptoms={setSelectedSymptoms}/> }
                    <SelectedSymptoms selectedSymptoms={selectedSymptoms} setSymptoms={setSelectedSymptoms}/>
                </div>
                <PredictButton selectedSymptoms={selectedSymptoms} handlePredict={() => handlePredict(symptomVector)}/>
            </div>
        </>
    )
}

export default SymptomSelector