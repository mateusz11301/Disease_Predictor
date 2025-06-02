import {useEffect, useState} from "react";
import axios from "axios";

import SearchBar from "./SearchBar.jsx";
import SymptomDisplay from "./SymptomDisplay.jsx";
import SelectedSymptoms from "./SelectedSymptoms.jsx";
import PredictButton from "./PredictButton.jsx";
import ClearButton from "./ClearButton.jsx";
import Header1 from "../Header1.jsx";

function SymptomSelector({handlePredict}) {
    const [selectedSymptoms, setSelectedSymptoms] = useState([])
    const [searchedSymptoms, setSearchedSymptoms] = useState("")

    const [featuresAll, setFeaturesAll] = useState([])
    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchFeatures() {
            try {
                const response = await axios.get("api/featuresPl/")
                setFeaturesAll(response.data)
                setFeatures(Object.keys(response.data))
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
            <div className="selector w-full min-w-4xl max-w-4xl bg-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                    <Header1 title="Wybierz objawy"/>
                    <SearchBar searchedSymptoms={searchedSymptoms} setSearchedSymptoms={setSearchedSymptoms}/>
                    <SymptomDisplay selectedSymptoms={selectedSymptoms} setSelectedSymptoms={setSelectedSymptoms} searchedSymptoms={searchedSymptoms} features={features} featuresAll={featuresAll} loading={loading} error={error}/>
                    { selectedSymptoms.length > 0 && <ClearButton setSelectedSymptoms={setSelectedSymptoms}/> }
                    <SelectedSymptoms selectedSymptoms={selectedSymptoms} setSymptoms={setSelectedSymptoms} featuresAll={featuresAll}/>
                </div>
                <PredictButton selectedSymptoms={selectedSymptoms} handlePredict={() => handlePredict(symptomVector)}/>
            </div>
        </>
    )
}

export default SymptomSelector