// src/components/common/PageSkeleton.jsx
export default function PageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 animate-pulse">
      <div className="h-16 bg-gray-800 rounded-lg mb-8"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="h-12 bg-gray-800 rounded-lg"></div>
          <div className="h-48 bg-gray-800 rounded-xl border-2 border-dashed border-gray-700"></div>
          <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl"></div>
        </div>

        <div className="lg:col-span-2">
          <div className="h-8 bg-gray-800 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-56 bg-gray-800 rounded-lg border-2 border-gray-700"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}