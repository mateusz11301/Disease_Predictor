import { useEffect, useState } from "react";
import axios from "axios";

function ResultScreen({ result }) {
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchDescription() {
            try {
                const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(result)}`)
                setDescription(response.data.extract || "Brak opisu")
            } catch (err) {
                setError("Nie udało się pobrać opisu choroby")
            } finally {
                setLoading(false)
            }
        }

        if (result && result !== "Brak diagnozy" && !result.toLowerCase().includes("błąd")) {
            fetchDescription()
        } else {
            setLoading(false)
        }
    }, [result])

    return (
        <div className="result-screen max-w-3xl bg-white p-8 rounded-2xl shadow-2xl text-center transition-all animate-fade-in">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Wynik diagnozy</h1>

            <div className="text-2xl font-semibold text-gray-800 mb-6">{ result }</div>

            {loading && <p className="text-gray-500">Ładowanie opisu choroby...</p>}
            {error && <p className="text-red-500">{ error }</p>}
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
