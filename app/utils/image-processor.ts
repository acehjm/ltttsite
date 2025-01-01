import type { ImageProcessingOptions, ImageConversionOptions, Base64Options } from '~/types/image';

export class ImageProcessor {
  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  static async base64ToFile(base64: string, filename: string): Promise<File> {
    const res = await fetch(base64);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  }

  static async processImage(
    canvas: HTMLCanvasElement,
    options: ImageProcessingOptions
  ): Promise<void> {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Apply filters
    if (options.filter) {
      switch (options.filter.id) {
        case 'grayscale':
          this.applyGrayscale(ctx, canvas.width, canvas.height, options.filter.intensity);
          break;
        case 'sepia':
          this.applySepia(ctx, canvas.width, canvas.height, options.filter.intensity);
          break;
        case 'blur':
          this.applyBlur(ctx, canvas.width, canvas.height, options.filter.intensity);
          break;
      }
    }

    // Apply adjustments
    if (options.adjustment) {
      this.applyAdjustments(ctx, canvas.width, canvas.height, options.adjustment);
    }
  }

  private static applyGrayscale(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    intensity: number
  ): void {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const factor = intensity / 100;

    for (let i = 0; i < data.length; i += 4) {
      const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i] * (1 - factor) + gray * factor;
      data[i + 1] = data[i + 1] * (1 - factor) + gray * factor;
      data[i + 2] = data[i + 2] * (1 - factor) + gray * factor;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  private static applySepia(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    intensity: number
  ): void {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const factor = intensity / 100;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const tr = 0.393 * r + 0.769 * g + 0.189 * b;
      const tg = 0.349 * r + 0.686 * g + 0.168 * b;
      const tb = 0.272 * r + 0.534 * g + 0.131 * b;

      data[i] = r * (1 - factor) + tr * factor;
      data[i + 1] = g * (1 - factor) + tg * factor;
      data[i + 2] = b * (1 - factor) + tb * factor;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  private static applyBlur(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    intensity: number
  ): void {
    ctx.filter = `blur(${intensity / 10}px)`;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) throw new Error('Could not get temporary canvas context');

    tempCtx.drawImage(ctx.canvas, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.filter = 'none';
  }

  private static applyAdjustments(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    adjustment: ImageProcessingOptions['adjustment']
  ): void {
    if (!adjustment) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Brightness
      const brightness = 1 + adjustment.brightness / 100;
      data[i] *= brightness;
      data[i + 1] *= brightness;
      data[i + 2] *= brightness;

      // Contrast
      const contrast = 1 + adjustment.contrast / 100;
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      data[i] = factor * (data[i] - 128) + 128;
      data[i + 1] = factor * (data[i + 1] - 128) + 128;
      data[i + 2] = factor * (data[i + 2] - 128) + 128;

      // Saturation
      const saturation = 1 + adjustment.saturation / 100;
      const gray = 0.2989 * data[i] + 0.5870 * data[i + 1] + 0.1140 * data[i + 2];
      data[i] = gray * (1 - saturation) + data[i] * saturation;
      data[i + 1] = gray * (1 - saturation) + data[i + 1] * saturation;
      data[i + 2] = gray * (1 - saturation) + data[i + 2] * saturation;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  static async convertFormat(
    file: File,
    options: ImageConversionOptions
  ): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    const img = new Image();
    img.src = await this.fileToBase64(file);

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) throw new Error('Could not convert image');
          resolve(blob);
        },
        `image/${options.format}`,
        options.quality
      );
    });
  }

  static async toBase64(file: File, options?: Base64Options): Promise<string> {
    let base64 = await this.fileToBase64(file);
    
    if (options?.compression && options.compression < 100) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      const img = new Image();
      img.src = base64;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      base64 = canvas.toDataURL('image/jpeg', options.compression / 100);
    }

    if (!options?.prefix) {
      base64 = base64.replace(/^data:image\/[a-z]+;base64,/, '');
    }

    return base64;
  }
}
