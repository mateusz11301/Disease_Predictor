import {useEffect, useState} from "react";
import axios from "axios";

import Header1 from "../Header1.jsx";

function ResultScreen({result}) {
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [labelsAll, setLabelsAll] = useState({})

    useEffect(() => {
        axios.get("/api/labelsPl/")
            .then(res => setLabelsAll(res.data))
            .catch(err => console.error("Błąd ładowania labels-pl:", err))
    }, [])

    const polishLabel = labelsAll[result] || result

    useEffect(() => {
        async function fetchDescription() {
            if (!result || result === "Brak diagnozy" || result.toLowerCase().includes("błąd")) {
                setLoading(false)
                return
            }

            try {
                const resultPL = await axios.get(`https://pl.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(polishLabel)}`)
                if (resultPL.data.extract) {
                    setDescription(resultPL.data.extract)
                } else {
                    throw new Error("Brak opisu po polsku")
                }
            } catch {
                try {
                    const resultEN = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(result)}`)
                    setDescription(resultEN.data.extract || "Brak opisu")
                } catch {
                    setDescription("Brak opisu")
                }
            } finally {
                setLoading(false)
            }
        }

        if (Object.keys(labelsAll).length > 0) {
            fetchDescription();
        }
    }, [result, polishLabel, labelsAll])

    return (
        <div className="result-screen max-w-3xl bg-white p-8 rounded-2xl shadow-2xl text-center transition-all animate-fade-in">
            <Header1 title="Wynik diagnozy"/>

            <div className="text-2xl font-semibold text-gray-800 mb-6">{polishLabel}</div>

            {loading && <p className="text-gray-500">Ładowanie opisu choroby...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="text-gray-700 text-md leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                    {description}
                </div>
            )}

            <button onClick={() => window.location.reload()} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer">
                Wróć do wyboru objawów
            </button>
        </div>
    )
}

export default ResultScreen