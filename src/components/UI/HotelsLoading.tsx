export default function HotelsLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-14 h-14 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-700 text-lg font-medium animate-pulse">
                Загрузка...
            </p>
        </div>
    )
}
