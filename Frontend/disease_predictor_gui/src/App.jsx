import SymptomSelector from "./Components/SymptomSelector/SymptomSelector.jsx";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen.jsx";
import ResultScreen from "./Components/ResultScreen/ResultScreen.jsx";

function App() {
    return (
        <div className="app min-h-screen bg-gradient-to-br from-blue-200 to-white flex items-center justify-center">
            <SymptomSelector/>

        </div>
    )
}

export default App