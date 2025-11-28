export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}