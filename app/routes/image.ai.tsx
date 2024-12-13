import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageLayout, ImageUpload } from "./image._index";
import {
  ArrowRightIcon,
  DownloadIcon,
  ResetIcon,
  MagicWandIcon,
  ImageIcon,
  BackpackIcon,
  ColorWheelIcon,
  ShadowIcon,
} from "@radix-ui/react-icons";

interface AIFeature {
  id: string;
  label: string;
  description: string;
  icon: JSX.Element;
  hasLevel: boolean;
}

interface AIConfig {
  [key: string]: number;
}

const AI_FEATURES: AIFeature[] = [
  {
    id: "enhance",
    label: "AI Enhancement",
    description: "Enhance image quality and details",
    icon: <MagicWandIcon className="w-4 h-4" />,
    hasLevel: true,
  },
  {
    id: "restore",
    label: "Photo Restoration",
    description: "Restore old or damaged photos",
    icon: <ImageIcon className="w-4 h-4" />,
    hasLevel: true,
  },
  {
    id: "colorize",
    label: "Colorization",
    description: "Add color to black and white photos",
    icon: <ColorWheelIcon className="w-4 h-4" />,
    hasLevel: true,
  },
  {
    id: "retouch",
    label: "Portrait Retouch",
    description: "Enhance portrait photos",
    icon: <BackpackIcon className="w-4 h-4" />,
    hasLevel: true,
  }
];

export default function AIPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [config, setConfig] = useState<AIConfig>({});

  const handleImageSelect = async (file: File) => {
    setIsProcessing(true);
    setSelectedImage(file);
    
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setPreviewUrl(base64);
        setIsProcessing(false);
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing file:", error);
      setIsProcessing(false);
    }
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  };

  const handleLevelChange = (featureId: string, level: number) => {
    setConfig((prev) => ({
      ...prev,
      [`${featureId}Level`]: level,
    }));
  };

  const processImage = async () => {
    if (!selectedImage || selectedFeatures.size === 0) return;
    
    setIsProcessing(true);
    
    try {
      // TODO: Implement actual AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProcessedImageUrl(previewUrl);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center">
          <MagicWandIcon className="w-6 h-6 mr-3" />
          AI Image Processing
        </h1>
        <p className="text-gray-400 mb-8">
          Enhance your images with advanced AI-powered features
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="space-y-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              className="border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 
                        bg-purple-500/5 hover:bg-purple-500/10 transition-all duration-200"
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

          {/* Features Selection */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AI_FEATURES.map((feature) => (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    p-4 rounded-xl cursor-pointer transition-all duration-200
                    ${
                      selectedFeatures.has(feature.id)
                        ? "bg-purple-500/20 border-purple-500/50"
                        : "bg-white/5 border-white/10"
                    }
                    border backdrop-blur-lg
                  `}
                  onClick={() => toggleFeature(feature.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      ${selectedFeatures.has(feature.id) ? "text-purple-400" : "text-gray-400"}
                    `}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{feature.label}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  {feature.hasLevel && selectedFeatures.has(feature.id) && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      className="mt-4"
                    >
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={config[`${feature.id}Level`] || 50}
                        onChange={(e) => handleLevelChange(feature.id, parseInt(e.target.value))}
                        className="w-full accent-purple-500"
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 
                         text-white font-medium flex items-center space-x-2 disabled:opacity-50"
                onClick={processImage}
                disabled={!selectedImage || selectedFeatures.size === 0 || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <ResetIcon className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <MagicWandIcon className="w-5 h-5" />
                    <span>Process Image</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {processedImageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Processed Result</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {previewUrl && (
                <img src={previewUrl} alt="Original" className="w-full rounded-lg" />
              )}
              {processedImageUrl && (
                <img src={processedImageUrl} alt="Processed" className="w-full rounded-lg" />
              )}
            </div>
            <div className="flex justify-end mt-4">
              {processedImageUrl && (
                <motion.a
                  href={processedImageUrl}
                  download="processed-image.jpg"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                           flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
