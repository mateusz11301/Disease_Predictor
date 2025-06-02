import heart from "./heart.svg"

function LoadingScreen() {
    return (
        <div className="flex items-center justify-center">
            <img src={heart} alt="heart" className="w-74 h-74 animate-[heartbeat_3s_ease-in-out]"/>
        </div>
    )
}

export default LoadingScreen