import { useState } from "react";
import { ImageUpload } from "./image.upload";

export function Base64Page() {
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setOriginalImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    if (base64Image) {
      try {
        await navigator.clipboard.writeText(base64Image);
        alert("Base64 string copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Upload Image</h2>
          <ImageUpload onImageSelect={handleImageSelect} />
        </div>

        {base64Image && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Preview & Result</h2>
            <div className="aspect-square rounded-lg border border-gray-800 overflow-hidden bg-zinc-900/50">
              <img
                src={base64Image}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Base64 String:</span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 text-sm rounded-md bg-violet-500/10 text-violet-400 
                    hover:bg-violet-500/20 transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="p-3 rounded-md bg-zinc-900/50 border border-gray-800">
                <p className="text-gray-400 text-sm break-all">
                  {base64Image.substring(0, 100)}...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
