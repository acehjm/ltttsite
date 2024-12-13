import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "~/components/nav-bar";
import {
  ShadowIcon,
  ImageIcon,
  MagicWandIcon,
  FileIcon,
  ClipboardIcon,
} from "@radix-ui/react-icons";
import type { ReactNode, ChangeEvent } from "react";

// ImageUpload Component
interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  accept?: string;
  className?: string;
  maxSize?: number;
}

interface ImageLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    id: "base64",
    label: "Base64",
    description: "Convert images to/from Base64",
    icon: <ClipboardIcon className="w-4 h-4" />,
  },
  {
    id: "format",
    label: "Format",
    description: "Convert between image formats",
    icon: <FileIcon className="w-4 h-4" />,
  },
  {
    id: "ai",
    label: "AI Tools",
    description: "Enhance images with AI",
    icon: <MagicWandIcon className="w-4 h-4" />,
  },
];

export function ImageUpload({
  onImageSelect,
  accept = "image/*",
  className = "",
  maxSize = 10,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);
    
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return false;
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size should be less than ${maxSize}MB`);
      return false;
    }
    
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`
          relative rounded-lg cursor-pointer
          ${isDragging ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : ''}
          ${className}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="p-8 text-center">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Drag and drop your image here, or click to select
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            Supported formats: JPG, PNG, GIF, WebP
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ImageLayout({ children }: ImageLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <NavBar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

interface MenuItem {
  id: string;
  label: string;
  description: string;
  icon: JSX.Element;
}

export default function ImagePage() {
  const [activeTab, setActiveTab] = useState<string>(menuItems[0].id);

  return (
    <ImageLayout>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <div className="p-6 sticky top-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
                <ShadowIcon className="w-6 h-6 mr-2" />
                Image Tools
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Professional image processing tools
              </p>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex flex-col p-4 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-1">
                    <div className={`${activeTab === item.id ? "text-purple-500" : "text-gray-400"}`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-left">
                    {item.description}
                  </span>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {/* Content will be rendered by the router */}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ImageLayout>
  );
}
