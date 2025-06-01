function PredictButton({selectedSymptoms, handlePredict}) {
    return (
        <button onClick={() => handlePredict(selectedSymptoms)} disabled={selectedSymptoms === 0} className={`w-full mt-4 py-3 px-6 rounded-xl text-white font-semibold transition ${selectedSymptoms.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}>
            Wykryj chorobę
        </button>
    )
}

export default PredictButton