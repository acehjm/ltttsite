import type { ReactNode } from "react";

export function ImageUpload({ onImageSelect }: { onImageSelect: (file: File) => void }) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative group"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="aspect-square rounded-lg border-2 border-dashed border-gray-700 
        bg-zinc-900/50 hover:bg-zinc-900/70 transition-colors
        flex items-center justify-center text-center p-4">
        <div className="space-y-2">
          <p className="text-gray-400">
            Drag and drop an image here, or click to select
          </p>
          <p className="text-sm text-gray-500">
            Supports: JPG, PNG, WebP, GIF
          </p>
        </div>
      </div>
    </div>
  );
}
