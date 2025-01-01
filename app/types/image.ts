export interface ImageFilter {
  id: string;
  name: string;
  intensity: number;
}

export interface ImageAdjustment {
  brightness: number;
  contrast: number;
  saturation: number;
}

export interface ImageProcessingOptions {
  filter?: ImageFilter;
  adjustment?: ImageAdjustment;
}

export interface ImageConversionOptions {
  format: 'jpeg' | 'png' | 'webp' | 'gif';
  quality?: number;
}

export interface AIImageOptions {
  model: string;
  prompt?: string;
  negativePrompt?: string;
  strength?: number;
  steps?: number;
}

export interface Base64Options {
  prefix?: boolean;
  compression?: number;
}
