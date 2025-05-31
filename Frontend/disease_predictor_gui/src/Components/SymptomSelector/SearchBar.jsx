function SearchBar() {
    return (
        <div className="selector mb-4">
            <input
                type="text"
                placeholder="Wpisz nazwę objawu..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    )
}

export default SearchBar