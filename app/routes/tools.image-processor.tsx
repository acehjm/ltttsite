import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type ProcessMode = 'convert' | 'adjust' | 'advanced';

interface Adjustment {
  brightness: number;
  contrast: number;
  saturation: number;
}

interface Filter {
  id: string;
  name: string;
  apply: (ctx: CanvasRenderingContext2D, imageData: ImageData) => ImageData;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ImageProcessor() {
  // 基础状态
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [mode, setMode] = useState<ProcessMode>('convert');
  
  // 画布相关
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  
  // 转换相关状态
  const [base64Output, setBase64Output] = useState<string>("");
  
  // 调整相关状态
  const [adjustments, setAdjustments] = useState<Adjustment>({
    brightness: 100,
    contrast: 100,
    saturation: 100
  });
  const [currentFilter, setCurrentFilter] = useState<string>("none");
  
  // 高级处理相关状态
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);
  const [removeBackground, setRemoveBackground] = useState(false);

  // 模式定义
  const modes: Array<{ id: ProcessMode; name: string; description: string }> = [
    { 
      id: 'convert', 
      name: '格式转换', 
      description: '图片与Base64编码互相转换'
    },
    { 
      id: 'adjust', 
      name: '基础调整', 
      description: '调整图片的基本参数和滤镜效果'
    },
    { 
      id: 'advanced', 
      name: '高级处理', 
      description: '旋转、缩放、背景移除等高级功能'
    }
  ];

  // 滤镜定义
  const filters: Filter[] = [
    {
      id: 'none',
      name: '原图',
      apply: (ctx, imageData) => imageData
    },
    {
      id: 'grayscale',
      name: '黑白',
      apply: (ctx, imageData) => {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = gray;
        }
        return imageData;
      }
    },
    {
      id: 'sepia',
      name: '复古',
      apply: (ctx, imageData) => {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
        return imageData;
      }
    },
    {
      id: 'warm',
      name: '暖色',
      apply: (ctx, imageData) => {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.1);
          data[i + 2] = Math.max(0, data[i + 2] * 0.9);
        }
        return imageData;
      }
    },
    {
      id: 'cool',
      name: '冷色',
      apply: (ctx, imageData) => {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.max(0, data[i] * 0.9);
          data[i + 2] = Math.min(255, data[i + 2] * 1.1);
        }
        return imageData;
      }
    }
  ];

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      setError("");
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
          setImage(e.target?.result as string);
          setLoading(false);
        };
        img.onerror = () => {
          setError("图片加载失败");
          setLoading(false);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        setError("文件读取失败");
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // 应用图片处理
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // 设置画布大小
      canvas.width = img.width;
      canvas.height = img.height;

      // 应用旋转和缩放
      if (mode === 'advanced') {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(scale / 100, scale / 100);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
      }

      // 绘制图片
      ctx.drawImage(img, 0, 0);

      if (mode === 'advanced') {
        ctx.restore();
      }

      // 应用滤镜
      if (currentFilter !== 'none') {
        const filter = filters.find(f => f.id === currentFilter);
        if (filter) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const processedData = filter.apply(ctx, imageData);
          ctx.putImageData(processedData, 0, 0);
        }
      }

      // 应用调整
      if (mode === 'adjust') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          // 亮度
          const brightnessRatio = adjustments.brightness / 100;
          data[i] *= brightnessRatio;
          data[i + 1] *= brightnessRatio;
          data[i + 2] *= brightnessRatio;

          // 对比度
          const contrastFactor = (adjustments.contrast + 100) / 100;
          data[i] = ((data[i] - 128) * contrastFactor) + 128;
          data[i + 1] = ((data[i + 1] - 128) * contrastFactor) + 128;
          data[i + 2] = ((data[i + 2] - 128) * contrastFactor) + 128;

          // 饱和度
          const saturationRatio = adjustments.saturation / 100;
          const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = gray + (data[i] - gray) * saturationRatio;
          data[i + 1] = gray + (data[i + 1] - gray) * saturationRatio;
          data[i + 2] = gray + (data[i + 2] - gray) * saturationRatio;

          // 确保值在 0-255 范围内
          data[i] = Math.max(0, Math.min(255, data[i]));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1]));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2]));
        }

        ctx.putImageData(imageData, 0, 0);
      }

      // 如果是转换模式，更新base64输出
      if (mode === 'convert') {
        setBase64Output(canvas.toDataURL('image/png'));
      }
    };
    img.src = image;
  }, [image, mode, currentFilter, adjustments, rotation, scale, removeBackground]);

  // 下载处理后的图片
  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'processed-image.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 主渐变背景 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.12),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(20,184,166,0.12),transparent_50%)] opacity-20" />

        {/* 网格背景 */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)",
          }}
        />

        {/* 动态光斑效果 */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 text-violet-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              图片工具
            </motion.span>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              <motion.h1 variants={item} className="text-3xl font-bold tracking-tight text-zinc-100">
                专业图片处理工具
              </motion.h1>
              <motion.p variants={item} className="text-zinc-400 max-w-2xl">
                提供专业的图片处理功能，支持格式转换、基础调整和高级处理。采用先进的图像处理算法，
                确保处理结果的质量和效率。
              </motion.p>
            </motion.div>
          </div>

          {/* Mode Selection */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4"
          >
            <motion.div variants={item} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {modes.map((m) => (
                  <motion.button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`group relative p-6 rounded-xl transition-all duration-300 ${
                      mode === m.id
                        ? "bg-zinc-900/80 border border-purple-500/20"
                        : "bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900/60 hover:border-teal-500/20"
                    }`}
                  >
                    {/* 高亮线圈 */}
                    <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/15 to-teal-500/15 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <div className="absolute -inset-[1px] rounded-xl bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),rgba(20,184,166,0.1)_70%)] opacity-0 group-hover:opacity-5 blur-[1px] transition-opacity duration-500" />
                    
                    <div className="relative">
                      <h3 className={`text-lg font-medium mb-2 ${
                        mode === m.id ? "text-violet-300" : "text-zinc-300"
                      }`}>
                        {m.name}
                      </h3>
                      <p className="text-sm text-zinc-500">{m.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left Panel - Image Upload and Preview */}
            <motion.div variants={item} className="space-y-6">
              <div className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 hover:border-purple-500/20 transition-all duration-300">
                {/* 高亮线圈 */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/15 to-teal-500/15 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="absolute -inset-[1px] rounded-xl bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),rgba(20,184,166,0.1)_70%)] opacity-0 group-hover:opacity-5 blur-[1px] transition-opacity duration-500" />

                <div className="relative p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-zinc-300">预览区域</h3>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="px-4 py-2 rounded-lg bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors cursor-pointer"
                    >
                      上传图片
                    </label>
                  </div>

                  <div className="relative aspect-[4/3] bg-zinc-800/50 rounded-lg overflow-hidden">
                    {loading ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-violet-500"></div>
                      </div>
                    ) : image ? (
                      <canvas
                        ref={canvasRef}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                        点击上方按钮上传图片
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {image && (
                    <button
                      onClick={handleDownload}
                      className="w-full px-4 py-2 rounded-lg bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors"
                    >
                      下载处理后的图片
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Controls */}
            <motion.div variants={item} className="space-y-6">
              <div className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 hover:border-teal-500/20 transition-all duration-300">
                {/* 高亮线圈 */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/15 to-teal-500/15 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="absolute -inset-[1px] rounded-xl bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),rgba(20,184,166,0.1)_70%)] opacity-0 group-hover:opacity-5 blur-[1px] transition-opacity duration-500" />

                <div className="relative p-6 space-y-6">
                  {mode === 'convert' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-zinc-300">Base64 输出</h3>
                      <textarea
                        value={base64Output}
                        readOnly
                        className="w-full h-[300px] bg-zinc-800/50 rounded-lg p-4 font-mono text-sm text-zinc-300 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        placeholder="转换后的 Base64 编码将显示在这里..."
                      />
                    </div>
                  )}

                  {mode === 'adjust' && (
                    <div className="space-y-6">
                      {/* Adjustments */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium text-zinc-300">参数调整</h3>
                        <div className="space-y-6">
                          {Object.entries(adjustments).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <div className="flex justify-between">
                                <label className="text-sm text-zinc-400">
                                  {key === 'brightness' ? '亮度' :
                                   key === 'contrast' ? '对比度' :
                                   key === 'saturation' ? '饱和度' : key}
                                </label>
                                <span className="text-sm text-zinc-400">{value}%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="200"
                                value={value}
                                onChange={(e) => setAdjustments(prev => ({
                                  ...prev,
                                  [key]: parseInt(e.target.value)
                                }))}
                                className="w-full accent-violet-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Filters */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-zinc-300">滤镜效果</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {filters.map((f) => (
                            <button
                              key={f.id}
                              onClick={() => setCurrentFilter(f.id)}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                currentFilter === f.id
                                  ? "bg-violet-500/20 text-violet-300"
                                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
                              }`}
                            >
                              {f.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === 'advanced' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-zinc-300">高级处理</h3>
                      
                      {/* Rotation */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm text-zinc-400">旋转角度</label>
                          <span className="text-sm text-zinc-400">{rotation}°</span>
                        </div>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          value={rotation}
                          onChange={(e) => setRotation(parseInt(e.target.value))}
                          className="w-full accent-violet-500"
                        />
                      </div>

                      {/* Scale */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm text-zinc-400">缩放比例</label>
                          <span className="text-sm text-zinc-400">{scale}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="200"
                          value={scale}
                          onChange={(e) => setScale(parseInt(e.target.value))}
                          className="w-full accent-violet-500"
                        />
                      </div>

                      {/* Background Removal */}
                      <button
                        onClick={() => setRemoveBackground(!removeBackground)}
                        className={`w-full px-4 py-3 rounded-lg transition-colors ${
                          removeBackground
                            ? "bg-violet-500/20 text-violet-300"
                            : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                        }`}
                      >
                        移除背景
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
