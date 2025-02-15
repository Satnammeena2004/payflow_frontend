const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Loading Text */}
      </div>
    </div>
  );
};

 const LoadingPage = () => {
  return (
    <div className="min-h-screen dark:bg-black/90 flex items-center justify-center bg-gray-50">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingPage