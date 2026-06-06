export default function ILY() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-pink-300 overflow-hidden gap-4 sm:gap-8 px-4">
            <div className="text-3xl sm:text-5xl font-bold text-rose-800 text-center">
                I Love You Too ❤️
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16 lg:gap-32">
                <img src="/kaoruko.jpg" alt="" className="w-48 h-64 sm:w-72 sm:h-96 lg:w-full lg:h-full rounded-md object-cover"/>
            </div>
        </div>
    )
}