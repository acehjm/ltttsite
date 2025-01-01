import { useState } from "react";
import { ImageUpload } from "./image.upload";

const filters = [
  { id: "enhance", name: "Enhance", description: "Improve image quality and details" },
  { id: "restore", name: "Restore", description: "Fix damaged or old photos" },
  { id: "colorize", name: "Colorize", description: "Add color to black and white images" },
  { id: "upscale", name: "Upscale", description: "Increase image resolution" },
  { id: "background", name: "Background", description: "Remove or replace background" },
  { id: "style", name: "Style Transfer", description: "Apply artistic styles" },
];

export function AIPage() {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = (file: File) => {
    setOriginalImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProcessedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Upload Image</h2>
          <ImageUpload onImageSelect={handleImageSelect} />
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Select Filter</label>
            <select
              value={selectedFilter.id}
              onChange={(e) => {
                const filter = filters.find(f => f.id === e.target.value);
                if (filter) setSelectedFilter(filter);
              }}
              className="w-full p-2 rounded-lg bg-zinc-900/50 border border-gray-800 
                text-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            >
              {filters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500">{selectedFilter.description}</p>
          </div>

          <button
            onClick={handleProcess}
            disabled={!originalImage || isProcessing}
            className="w-full py-2 rounded-lg bg-violet-500 text-white font-medium
              hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors"
          >
            {isProcessing ? "Processing..." : "Process Image"}
          </button>
        </div>

        {processedImage && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Preview</h2>
            <div className="aspect-square rounded-lg border border-gray-800 overflow-hidden bg-zinc-900/50">
              <img
                src={processedImage}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = processedImage;
                link.download = "processed-image.jpg";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-full py-2 rounded-lg bg-violet-500 text-white font-medium
                hover:bg-violet-600 transition-colors"
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
