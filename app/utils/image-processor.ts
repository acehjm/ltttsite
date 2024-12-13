interface ProcessOptions {
  format: string;
  quality: number;
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
  enhance: boolean;
}

interface CodeSnippet {
  language: string;
  code: string;
}

interface AIProcessOptions {
  feature: 'enhance' | 'restore' | 'retouch' | 'background' | 'style';
  config: {
    enhanceLevel?: number;
    restoreLevel?: number;
    retouchLevel?: number;
    bgColor?: string;
    stylePreset?: string;
  }
}

export class ImageProcessor {
  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  static async base64ToFile(base64: string, filename: string): Promise<File> {
    const res = await fetch(base64);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  }

  static async processImage(
    input: File | string,
    options: ProcessOptions
  ): Promise<{ processedImage: Blob; base64: string }> {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Load the image
    const image = await createImageBitmap(
      input instanceof File ? input : await this.base64ToFile(input, 'input.png')
    );

    // Calculate dimensions
    let targetWidth = options.width || image.width;
    let targetHeight = options.height || image.height;

    if (options.maintainAspectRatio && (options.width || options.height)) {
      const ratio = image.width / image.height;
      if (options.width) {
        targetHeight = Math.round(options.width / ratio);
      } else if (options.height) {
        targetWidth = Math.round(options.height * ratio);
      }
    }

    // Set canvas dimensions
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Draw image on canvas
    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

    // Apply enhancement if requested
    if (options.enhance) {
      // Apply basic sharpening
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      this.enhanceImage(imageData);
      ctx.putImageData(imageData, 0, 0);
    }

    // Convert to desired format
    const mimeType = `image/${options.format === 'jpg' ? 'jpeg' : options.format}`;
    const quality = options.quality / 100;

    // Get both blob and base64
    const base64 = canvas.toDataURL(mimeType, quality);
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), mimeType, quality);
    });

    return { processedImage: blob, base64 };
  }

  private static enhanceImage(imageData: ImageData): void {
    const sharpenKernel = [
      0, -1, 0,
      -1, 5, -1,
      0, -1, 0
    ];
    
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const temp = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        
        for (let c = 0; c < 3; c++) {
          let val = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const kidx = ((y + ky) * width + (x + kx)) * 4;
              val += temp[kidx + c] * sharpenKernel[(ky + 1) * 3 + (kx + 1)];
            }
          }
          data[idx + c] = Math.max(0, Math.min(255, val));
        }
      }
    }
  }

  static async processAIImage(
    input: File | string,
    feature: 'enhance' | 'restore' | 'retouch' | 'background' | 'style',
    config: {
      enhanceLevel?: number;
      restoreLevel?: number;
      retouchLevel?: number;
      bgColor?: string;
      stylePreset?: string;
    }
  ): Promise<{ processedImage: Blob; base64: string }> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // 加载图片
    const image = await createImageBitmap(
      input instanceof File ? input : await this.base64ToFile(input, 'input.png')
    );

    // 设置画布尺寸
    canvas.width = image.width;
    canvas.height = image.height;

    // 绘制原始图片
    ctx.drawImage(image, 0, 0);

    // 获取图像数据
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    switch (feature) {
      case 'enhance':
        this.applyEnhancement(imageData, config.enhanceLevel || 50);
        break;
      case 'restore':
        this.applyRestore(imageData, config.restoreLevel || 50);
        break;
      case 'retouch':
        this.applyRetouch(imageData, config.retouchLevel || 50);
        break;
      case 'background':
        if (config.bgColor) {
          this.applyBackgroundChange(imageData, config.bgColor);
        }
        break;
      case 'style':
        if (config.stylePreset) {
          this.applyStyle(imageData, config.stylePreset);
        }
        break;
    }

    // 将处理后的图像数据放回画布
    ctx.putImageData(imageData, 0, 0);

    // 转换为blob和base64
    const base64 = canvas.toDataURL('image/png');
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/png');
    });

    return { processedImage: blob, base64 };
  }

  // 增强效果
  private static applyEnhancement(imageData: ImageData, level: number): void {
    const data = imageData.data;
    const factor = level / 50; // 将0-100的级别转换为0-2的因子

    for (let i = 0; i < data.length; i += 4) {
      // 增加对比度
      data[i] = Math.min(255, Math.max(0, ((data[i] - 128) * factor) + 128));     // R
      data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] - 128) * factor) + 128)); // G
      data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] - 128) * factor) + 128)); // B

      // 增加饱和度
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = Math.min(255, Math.max(0, data[i] + (data[i] - avg) * (factor - 1)));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + (data[i + 1] - avg) * (factor - 1)));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + (data[i + 2] - avg) * (factor - 1)));
    }
  }

  // 修复效果
  private static applyRestore(imageData: ImageData, level: number): void {
    const data = imageData.data;
    const factor = level / 100;
    const width = imageData.width;
    const height = imageData.height;
    const temp = new Uint8ClampedArray(data);

    // 使用高斯模糊进行降噪
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        
        for (let c = 0; c < 3; c++) { // 对RGB通道分别处理
          let sum = 0;
          let count = 0;
          
          // 3x3高斯核
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const currentIdx = ((y + dy) * width + (x + dx)) * 4 + c;
              if (currentIdx >= 0 && currentIdx < temp.length) {
                // 中心点权重更大
                const weight = (dx === 0 && dy === 0) ? 4 : 1;
                sum += temp[currentIdx] * weight;
                count += weight;
              }
            }
          }
          
          // 根据level混合原始值和降噪后的值
          const denoised = sum / count;
          data[idx + c] = Math.round(temp[idx + c] * (1 - factor) + denoised * factor);
        }

        // 增强边缘
        if (factor > 0.5) {
          const edgeFactor = (factor - 0.5) * 2;
          for (let c = 0; c < 3; c++) {
            const center = data[idx + c];
            let edgeSum = 0;
            
            // 计算与周围像素的差异
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const currentIdx = ((y + dy) * width + (x + dx)) * 4 + c;
                if (currentIdx >= 0 && currentIdx < data.length) {
                  edgeSum += Math.abs(center - data[currentIdx]);
                }
              }
            }
            
            // 根据差异增强对比度
            const edge = edgeSum / 8;
            if (edge > 20) { // 阈值，避免过度增强噪点
              data[idx + c] = Math.min(255, Math.max(0, 
                center + (center < 128 ? -1 : 1) * edge * edgeFactor
              ));
            }
          }
        }
      }
    }
  }

  // 美颜效果
  private static applyRetouch(imageData: ImageData, level: number): void {
    const data = imageData.data;
    const factor = level / 100;
    const width = imageData.width;
    const height = imageData.height;
    const temp = new Uint8ClampedArray(data);

    // 磨皮算法
    const radius = Math.max(1, Math.floor(factor * 4)); // 根据level调整磨皮范围
    
    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        const idx = (y * width + x) * 4;
        
        for (let c = 0; c < 3; c++) { // 对RGB通道分别处理
          let sum = 0;
          let count = 0;
          let variance = 0;
          
          // 计算局部区域的均值和方差
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const currentIdx = ((y + dy) * width + (x + dx)) * 4 + c;
              if (currentIdx >= 0 && currentIdx < temp.length) {
                sum += temp[currentIdx];
                count++;
              }
            }
          }
          
          const mean = sum / count;
          
          // 计算方差
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const currentIdx = ((y + dy) * width + (x + dx)) * 4 + c;
              if (currentIdx >= 0 && currentIdx < temp.length) {
                variance += Math.pow(temp[currentIdx] - mean, 2);
              }
            }
          }
          variance /= count;
          
          // 根据方差调整磨皮强度
          // 方差大说明是边缘区域，减少磨皮强度
          const varianceFactor = Math.max(0, 1 - Math.sqrt(variance) / 128);
          const blendFactor = factor * varianceFactor;
          
          data[idx + c] = Math.round(
            temp[idx + c] * (1 - blendFactor) + mean * blendFactor
          );
        }
        
        // 保持一定的对比度
        if (factor > 0.3) {
          const contrastFactor = (factor - 0.3) * 1.4;
          for (let c = 0; c < 3; c++) {
            const value = data[idx + c];
            data[idx + c] = Math.min(255, Math.max(0,
              value + (value - 128) * contrastFactor
            ));
          }
        }
      }
    }
  }

  // 背景更改
  private static applyBackgroundChange(imageData: ImageData, bgColor: string): void {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // 将十六进制颜色转换为RGB
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    // 创建临时数组存储边缘检测结果
    const edges = new Uint8Array(width * height);
    
    // Sobel边缘检测
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0;
        let gy = 0;
        
        // 计算梯度
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const idx = ((y + i) * width + (x + j)) * 4;
            const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
            
            const kernelIdx = (i + 1) * 3 + (j + 1);
            gx += gray * sobelX[kernelIdx];
            gy += gray * sobelY[kernelIdx];
          }
        }
        
        // 计算梯度幅度
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        edges[y * width + x] = magnitude > 30 ? 255 : 0; // 阈值化
      }
    }
    
    // 背景替换
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        // 检查是否是边缘或前景
        if (edges[y * width + x] === 0) {
          // 检查颜色是否接近白色（背景）
          const isBackground = 
            data[idx] > 240 && 
            data[idx + 1] > 240 && 
            data[idx + 2] > 240;
          
          if (isBackground) {
            data[idx] = r;     // R
            data[idx + 1] = g; // G
            data[idx + 2] = b; // B
          }
        }
      }
    }
    
    // 平滑过渡
    const temp = new Uint8ClampedArray(data);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        
        if (edges[y * width + x] === 255) {
          for (let c = 0; c < 3; c++) {
            let sum = 0;
            let count = 0;
            
            // 3x3均值滤波
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                const currentIdx = ((y + dy) * width + (x + dx)) * 4 + c;
                if (currentIdx >= 0 && currentIdx < temp.length) {
                  sum += temp[currentIdx];
                  count++;
                }
              }
            }
            
            data[idx + c] = Math.round(sum / count);
          }
        }
      }
    }
  }

  // 风格转换
  private static applyStyle(imageData: ImageData, style: string): void {
    const data = imageData.data;

    switch (style) {
      case 'natural':
        // 增加自然饱和度和对比度
        this.applyEnhancement(imageData, 30);
        break;
      
      case 'anime':
        // 动漫风格：增加对比度，减少颜色数量
        for (let i = 0; i < data.length; i += 4) {
          for (let j = 0; j < 3; j++) {
            data[i + j] = Math.round(data[i + j] / 32) * 32;
          }
        }
        break;
      
      case 'sketch':
        // 素描效果：转换为灰度并增加对比度
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const gray = avg > 128 ? 255 : 0;
          data[i] = data[i + 1] = data[i + 2] = gray;
        }
        break;
      
      case 'oil':
        // 油画效果：局部颜色量化
        const temp = new Uint8ClampedArray(data);
        const width = imageData.width;
        const radius = 2;
        
        for (let i = 0; i < data.length; i += 4) {
          const x = (i / 4) % width;
          const y = Math.floor((i / 4) / width);
          
          if (x > radius && x < width - radius) {
            const colors: number[][] = [];
            for (let dx = -radius; dx <= radius; dx++) {
              const idx = i + dx * 4;
              colors.push([temp[idx], temp[idx + 1], temp[idx + 2]]);
            }
            
            // 选择最常见的颜色
            const mainColor = colors[Math.floor(colors.length / 2)];
            data[i] = mainColor[0];
            data[i + 1] = mainColor[1];
            data[i + 2] = mainColor[2];
          }
        }
        break;
    }
  }

  static generateCode(base64: string, format: string): CodeSnippet[] {
    return [
      {
        language: 'JavaScript',
        code: `
// Convert Base64 to Image
const img = new Image();
img.src = "${base64}";

// Convert Image to Base64
function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}`
      },
      {
        language: 'Python',
        code: `
import base64
from PIL import Image
from io import BytesIO

# Convert Base64 to Image
img_data = base64.b64decode("${base64.split(',')[1]}")
img = Image.open(BytesIO(img_data))

# Convert Image to Base64
def image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode()`
      },
      {
        language: 'Java',
        code: `
import java.util.Base64;
import javax.imageio.ImageIO;
import java.io.ByteArrayInputStream;
import java.awt.image.BufferedImage;

// Convert Base64 to Image
byte[] imgData = Base64.getDecoder().decode("${base64.split(',')[1]}");
BufferedImage img = ImageIO.read(new ByteArrayInputStream(imgData));

// Convert Image to Base64
public String imageToBase64(String imagePath) throws IOException {
    BufferedImage img = ImageIO.read(new File(imagePath));
    ByteArrayOutputStream output = new ByteArrayOutputStream();
    ImageIO.write(img, "${format}", output);
    return Base64.getEncoder().encodeToString(output.toByteArray());
}`
      }
    ];
  }
}
