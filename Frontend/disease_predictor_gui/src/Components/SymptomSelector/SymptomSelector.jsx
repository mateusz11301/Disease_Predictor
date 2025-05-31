import SearchBar from "./SearchBar.jsx";
import SymptomDisplay from "./SymptomDisplay.jsx";
import SelectedSymptoms from "./SelectedSymptoms.jsx";
import PredictButton from "./PredictButton.jsx";

function SymptomSelector() {
    return (
        <>
            <div className="selector w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
                        Wybierz objawy
                    </h1>
                    <SearchBar />
                    <SymptomDisplay />
                    <SelectedSymptoms />
                </div>
                <PredictButton />
            </div>
        </>
    )
}

export default SymptomSelector