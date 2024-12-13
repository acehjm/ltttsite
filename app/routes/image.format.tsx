import { useState } from "react";
import { motion } from "framer-motion";
import { ImageLayout, ImageUpload } from "./image._index";
import { ArrowRightIcon, DownloadIcon, ResetIcon } from "@radix-ui/react-icons";

interface ImageFormat {
  extension: string;
  name: string;
  description: string;
  bestFor?: string;
}

const IMAGE_FORMATS: ImageFormat[] = [
  {
    extension: "jpg",
    name: "JPEG",
    description: "Joint Photographic Experts Group format, best for photographs and complex images with many colors.",
    bestFor: "Photographs, complex images with gradients"
  },
  {
    extension: "png",
    name: "PNG",
    description: "Portable Network Graphics format, supports transparency and lossless compression.",
    bestFor: "Images with transparency, screenshots, logos"
  },
  {
    extension: "webp",
    name: "WebP",
    description: "Modern image format that provides superior compression for images on the web.",
    bestFor: "Web images, fast loading times"
  },
  {
    extension: "gif",
    name: "GIF",
    description: "Graphics Interchange Format, supports animation and limited colors.",
    bestFor: "Simple animations, icons"
  }
];

export default function FormatPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>(IMAGE_FORMATS[0]);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleImageSelect = async (file: File) => {
    setLoading(true);
    setSelectedFile(file);
    
    try {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
        setLoading(false);
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing file:", error);
      setLoading(false);
    }
  };

  const handleFormatChange = (format: ImageFormat) => {
    setSelectedFormat(format);
  };

  const handleDownload = async () => {
    if (!selectedFile || !previewUrl) return;

    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `converted-image.${selectedFormat.extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center">
          <ArrowRightIcon className="w-6 h-6 mr-3" />
          Image Format Converter
        </h1>
        <p className="text-gray-400 mb-8">
          Convert your images to different formats with ease
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              className="border-2 border-dashed border-blue-500/30 hover:border-blue-500/50 
                        bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-200"
            />
            {previewUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-lg overflow-hidden bg-gray-900/50 p-4"
              >
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            )}
          </div>

          {/* Format Selection */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {IMAGE_FORMATS.map((format) => (
                <motion.div
                  key={format.extension}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFormatChange(format)}
                  className={`
                    p-4 rounded-xl cursor-pointer transition-all duration-200
                    ${
                      selectedFormat.extension === format.extension
                        ? "bg-blue-500/20 border-blue-500/50"
                        : "bg-white/5 border-white/10"
                    }
                    border backdrop-blur-lg
                  `}
                >
                  <div className="text-center">
                    <div className={`
                      text-2xl font-bold mb-1
                      ${selectedFormat.extension === format.extension ? "text-blue-400" : "text-gray-400"}
                    `}>
                      .{format.extension}
                    </div>
                    <p className="text-sm text-gray-400">{format.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedFile && (
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 
                           text-white font-medium flex items-center space-x-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ResetIcon className="w-5 h-5 animate-spin" />
                      <span>Converting...</span>
                    </>
                  ) : (
                    <>
                      <DownloadIcon className="w-5 h-5" />
                      <span>Download as {selectedFormat.extension.toUpperCase()}</span>
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Format Information</h2>
          <div className="text-gray-400">
            <p className="mb-2">
              <strong className="text-blue-400">{selectedFormat.name}</strong> ({selectedFormat.extension.toUpperCase()})
            </p>
            <p>{selectedFormat.description}</p>
            {selectedFormat.bestFor && (
              <p className="mt-2">
                <strong className="text-gray-300">Best for:</strong> {selectedFormat.bestFor}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
