import { Upload } from "lucide-react";

export const Topbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Left - Project Name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-r from-blue-500 to-blue-800 flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">ForgeUpload</h1>
        </div>

        {/* Right - Upload Button */}
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
          <Upload size={18} />
          <span>Upload</span>
        </button>
      </div>
    </header>
  );
};
