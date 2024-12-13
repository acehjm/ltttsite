import { useState } from "react";
import { motion } from "framer-motion";
import { ImageLayout, ImageUpload } from "./image._index";
import { ArrowRightIcon, DownloadIcon, ClipboardIcon, CheckIcon } from "@radix-ui/react-icons";

export default function Base64Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64String, setBase64String] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = async (file: File) => {
    setLoading(true);
    setSelectedFile(file);
    
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setBase64String(base64);
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(base64String);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    element.setAttribute("href", base64String);
    element.setAttribute("download", selectedFile?.name || "image.png");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center">
          <ArrowRightIcon className="w-6 h-6 mr-3" />
          Base64 Image Converter
        </h1>
        <p className="text-gray-400 mb-8">
          Convert images to and from Base64 format
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              className="border-2 border-dashed border-green-500/30 hover:border-green-500/50 
                        bg-green-500/5 hover:bg-green-500/10 transition-all duration-200"
            />
            {base64String && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-lg overflow-hidden bg-gray-900/50 p-4"
              >
                <img
                  src={base64String}
                  alt="Preview"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            )}
          </div>

          {/* Base64 Output */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20 pointer-events-none rounded-xl" />
              <textarea
                value={base64String}
                readOnly
                className="w-full h-64 p-4 bg-black/20 border border-white/10 rounded-xl 
                         text-gray-300 font-mono text-sm resize-none focus:outline-none
                         focus:ring-2 focus:ring-green-500/50"
                placeholder="Base64 string will appear here..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 
                         text-white font-medium flex items-center space-x-2"
                disabled={!base64String || loading}
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-5 h-5 text-green-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="w-5 h-5" />
                    <span>Copy Base64</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 
                         text-white font-medium flex items-center space-x-2"
                disabled={!base64String || loading}
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Download Image</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">About Base64 Images</h2>
          <div className="text-gray-400 space-y-2">
            <p>
              Base64 encoding allows you to represent binary image data as ASCII text strings.
              This is useful for embedding images directly in HTML, CSS, or JSON.
            </p>
            <p>
              Note that Base64 encoded images are approximately 33% larger than their binary counterparts.
              Use them wisely!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
