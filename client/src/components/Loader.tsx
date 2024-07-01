const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-900 text-white">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce animation-delay-200"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce animation-delay-400"></div>
      </div>
    </div>
  )
}
export default Loader
