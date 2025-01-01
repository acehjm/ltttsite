import { useState } from "react";
import { Link, Outlet, useLocation } from "@remix-run/react";
import { motion } from "framer-motion";
import { NavBar } from "~/components/nav-bar";

// 导入子组件
import { Base64Page } from "./image.base64";
import { FormatPage } from "./image.format";
import { AIPage } from "./image.ai";
import { ImageUpload } from "./image.upload";

const tools = [
  {
    id: "base64",
    name: "Base64 Converter",
    description: "Convert images to and from Base64 format",
    component: Base64Page,
  },
  {
    id: "format",
    name: "Format Converter",
    description: "Convert between different image formats",
    component: FormatPage,
  },
  {
    id: "ai",
    name: "AI Tools",
    description: "Enhance and transform images using AI",
    component: AIPage,
  },
  {
    id: "upload",
    name: "Image Upload",
    description: "Upload an image",
    component: ImageUpload,
  },
];

export default function ImagePage() {
  const [activeTool, setActiveTool] = useState(tools[0]);

  const ActiveComponent = activeTool.component;

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 max-w-5xl pt-16">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-white">Image Tools</h1>
            <p className="text-gray-400">
              A collection of tools to help you work with images.
              Convert formats, generate Base64, and apply AI transformations.
            </p>
          </motion.div>

          <div className="flex gap-8">
            {/* 左侧菜单 */}
            <div className="w-64 shrink-0">
              <div className="space-y-2">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      tool.id === activeTool.id
                        ? "border-violet-500/50 bg-violet-500/10 text-violet-400"
                        : "border-gray-800 bg-zinc-900/50 text-gray-400 hover:border-violet-500/30 hover:bg-zinc-900/70"
                    }`}
                  >
                    <h2 className="font-medium mb-1">{tool.name}</h2>
                    <p className="text-sm text-gray-500">{tool.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 右侧内容 */}
            <div className="flex-1 min-h-[500px]">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
