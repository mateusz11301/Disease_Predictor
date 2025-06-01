import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

import SymptomSelector from "./Components/SymptomSelector/SymptomSelector.jsx";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen.jsx";
import ResultScreen from "./Components/ResultScreen/ResultScreen.jsx";

function App() {
    const [screen, setScreen] = useState("selector")
    const [result, setResult] = useState("")

    const mutation = useMutation({
        mutationFn: (symptomVector) => axios.post("/api/predict/", {symptoms: symptomVector}),
        onSuccess: (response) => {
            setTimeout(() => {
                setResult(response.data.disease || "Brak diagnozy")
                setScreen("result")
            }, 2000)
        },
        onError: (error) => {
            console.error("Błąd predykcji:", error)
            setTimeout(() => {
                setResult("Wystąpił błąd podczas wykrywania choroby.")
                setScreen("result")
            }, 2000)
        }
    })

    const handlePredict = (symptomVector) => {
        setScreen("loading")
        mutation.mutate(symptomVector)
    }

    return (
        <div className="app min-h-screen bg-gradient-to-br from-blue-200 to-white flex items-center justify-center">
            {screen === "selector" && <SymptomSelector handlePredict={handlePredict}/>}
            {screen === "loading" && <LoadingScreen/>}
            {screen === "result" && <ResultScreen result={result}/>}
        </div>
    )
}

export default App