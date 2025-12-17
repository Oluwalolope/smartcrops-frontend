const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3 bg-white">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
};

export default Loader;