export default function Skeleton() {
  return (
    <div className="min-w-[200px] bg-gray-900 rounded-lg overflow-hidden relative block animate-pulse">
      <div className="w-[200px] h-[300px] bg-gray-700" />
      <div className="p-2">
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-600 rounded w-1/2" />
      </div>
    </div>
  );
}

