import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

import SymptomSelector from "./Components/SymptomSelector/SymptomSelector.jsx";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen.jsx";
import ResultScreen from "./Components/ResultScreen/ResultScreen.jsx";

function App() {
    const [screen, setScreen] = useState("selector")
    const [result, setResult] = useState("")

    const [fadeOut, setFadeOut] = useState(false)

    const mutation = useMutation({
        mutationFn: (symptomVector) => axios.post("/api/predict/", {symptoms: symptomVector}, { headers: { 'Content-Type': 'application/json' } }),
        onSuccess: (response) => {
            setTimeout(() => {
                setResult(response.data.disease || "Brak diagnozy")
                setScreen("result")
            }, 2000)
        },
        onError: (error) => {
            console.error("Błąd predykcji:", error)
            setTimeout(() => {
                setResult("Błąd podczas wykrywania choroby")
                setScreen("result")
            }, 2000)
        }
    })

    const handlePredict = (symptomVector) => {
        setFadeOut(true)

        setTimeout(() => {
            setScreen("loading")
            mutation.mutate(symptomVector)
        }, 350)
    }

    return (
        <div className="app min-h-screen bg-gradient-to-br from-blue-200 to-white flex items-center justify-center">
            {screen === "selector" &&
                <div className={`transition-all duration-400 ease-in-out ${fadeOut ? "opacity-0 scale-30" : "opacity-100 scale-100"}`}>
                    <SymptomSelector handlePredict={handlePredict}/>
                </div>
            }
            {screen === "loading" && <LoadingScreen/>}
            {screen === "result" && <ResultScreen result={result}/>}
        </div>
    )
}

export default App