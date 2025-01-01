import { useState } from "react";
import { ImageUpload } from "./image.upload";

const formats = [
  { value: "image/jpeg", label: "JPEG", extension: ".jpg" },
  { value: "image/png", label: "PNG", extension: ".png" },
  { value: "image/webp", label: "WebP", extension: ".webp" },
];

export function FormatPage() {
  const [selectedFormat, setSelectedFormat] = useState(formats[0]);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setOriginalImage(file);
    convertImage(file);
  };

  const convertImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL(selectedFormat.value, 0.8);
        setConvertedImage(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!convertedImage || !originalImage) return;

    const link = document.createElement("a");
    link.href = convertedImage;
    const fileName = originalImage.name.split(".")[0] + selectedFormat.extension;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Upload Image</h2>
          <ImageUpload onImageSelect={handleImageSelect} />
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Output Format</label>
            <select
              value={selectedFormat.value}
              onChange={(e) => {
                const format = formats.find(f => f.value === e.target.value);
                if (format) {
                  setSelectedFormat(format);
                  if (originalImage) {
                    convertImage(originalImage);
                  }
                }
              }}
              className="w-full p-2 rounded-lg bg-zinc-900/50 border border-gray-800 
                text-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            >
              {formats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {convertedImage && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Preview</h2>
            <div className="aspect-square rounded-lg border border-gray-800 overflow-hidden bg-zinc-900/50">
              <img
                src={convertedImage}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={handleDownload}
              className="w-full py-2 rounded-lg bg-violet-500 text-white font-medium
                hover:bg-violet-600 transition-colors"
            >
              Download {selectedFormat.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
