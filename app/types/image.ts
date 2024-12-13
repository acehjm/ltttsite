import { ReactNode } from "react";

export interface ImageSize {
  label: string;
  width: number;
  height: number;
  category: 'Social Media' | 'Desktop' | 'Mobile' | 'Custom';
}

export interface ImageFormat {
  extension: string;
  mimeType: string;
  label: string;
}

export interface ImageEditorConfig {
  quality: number;
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  enhance: boolean;
}

export interface AIConfig {
  feature: 'enhance' | 'restore' | 'colorize' | 'retouch' | 'background' | 'style';
  enhanceLevel?: number;
  restoreLevel?: number;
  colorizeLevel?: number;
  retouchLevel?: number;
  bgColor?: string;
  stylePreset?: string;
}

export interface AIFeature {
  id: AIConfig['feature'];
  label: string;
  description: string;
  icon: ReactNode;
  hasLevel?: boolean;
  hasColor?: boolean;
  hasPreset?: boolean;
}

export const IMAGE_FORMATS: ImageFormat[] = [
  { extension: 'png', mimeType: 'image/png', label: 'PNG' },
  { extension: 'jpeg', mimeType: 'image/jpeg', label: 'JPEG' },
  { extension: 'webp', mimeType: 'image/webp', label: 'WebP' },
  { extension: 'gif', mimeType: 'image/gif', label: 'GIF' },
  { extension: 'bmp', mimeType: 'image/bmp', label: 'BMP' },
];

export const PRESET_SIZES: ImageSize[] = [
  // Social Media
  { label: 'Instagram Post', width: 1080, height: 1080, category: 'Social Media' },
  { label: 'Instagram Story', width: 1080, height: 1920, category: 'Social Media' },
  { label: 'Facebook Post', width: 1200, height: 630, category: 'Social Media' },
  { label: 'Twitter Post', width: 1200, height: 675, category: 'Social Media' },
  { label: 'LinkedIn Cover', width: 1584, height: 396, category: 'Social Media' },
  
  // Desktop Wallpapers
  { label: 'HD (720p)', width: 1280, height: 720, category: 'Desktop' },
  { label: 'Full HD (1080p)', width: 1920, height: 1080, category: 'Desktop' },
  { label: '2K', width: 2560, height: 1440, category: 'Desktop' },
  { label: '4K', width: 3840, height: 2160, category: 'Desktop' },
  
  // Mobile
  { label: 'iPhone', width: 1170, height: 2532, category: 'Mobile' },
  { label: 'Android', width: 1080, height: 2400, category: 'Mobile' },
  { label: 'iPad', width: 2048, height: 2732, category: 'Mobile' },
];
