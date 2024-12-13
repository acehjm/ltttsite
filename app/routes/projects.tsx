import { motion } from "framer-motion";
import { NavBar } from "~/components/nav-bar";
import { Link } from "@remix-run/react";

export const projects = [
  {
    title: "lttt.dev",
    subtitle: "Personal Website",
    description: "A modern personal portfolio website built with Remix and Framer Motion. Features smooth animations and responsive design.",
    tags: ["Remix", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "/",
    image: "/images/girl.png",
    featured: true,
  },
  {
    title: "图片处理工具",
    subtitle: "网页应用",
    description: "图片处理应用，用于实现图片的各种功能：包含图片和BASE64互转、图片格式转换、图片压缩、图片修复等。",
    tags: ["图片工具", "转换", "压缩", "修复"],
    link: "/image",
    image: "/images/girl.png",
    featured: true,
  },
  {
    title: "Project Three",
    subtitle: "Mobile App",
    description: "Another amazing project description. Highlight the key features and technologies.",
    tags: ["Vue.js", "Express", "PostgreSQL"],
    link: "https://github.com/yourusername/project-three",
    image: "/images/girl.png",
    featured: true,
  },
];

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

export default function Projects() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 主渐变背景 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.12),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(20,184,166,0.12),transparent_50%)] opacity-40" />
        
        {/* 网格背景 - 使用 mask 实现渐变消失效果 */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{ 
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)'
          }}
        />
        
        {/* 交叉网格 - 添加旋转效果增加层次感 */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]"
          style={{ 
            transform: 'rotate(45deg) scale(1.5)',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
          }}
        />
        
        {/* 顶部渐变光晕 */}
        <div className="absolute top-0 left-0 right-0 h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-purple-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.08),transparent_50%)]" />
        </div>
        
        {/* 底部渐变光晕 */}
        <div className="absolute bottom-0 left-0 right-0 h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 via-teal-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(20,184,166,0.08),transparent_50%)]" />
        </div>
        
        {/* 动态光斑效果 */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
        
        {/* 底部渐变遮罩 */}
        <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      <NavBar />
      
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-16"
        >
          {/* 介绍部分 */}
          <div className="space-y-6">
            <div className="max-w-2xl space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-block"
              >
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  Projects
                </span>
              </motion.div>
              
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                <motion.p 
                  variants={item}
                  className="text-lg text-zinc-300"
                >
                  这里是我的项目集合，每个项目都代表着我学习和挑战的过程。
                </motion.p>
                <motion.p 
                  variants={item}
                  className="text-zinc-400"
                >
                  我专注于创建现代化、性能优异的应用程序，提供卓越的用户体验。我的技术栈通常包括 React/Remix、TypeScript 和现代 CSS 解决方案。
                </motion.p>
              </motion.div>
            </div>
          </div>
        
          {/* 项目卡片部分 */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={item}
                className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 hover:bg-zinc-900/60 border border-purple-500/20 hover:border-teal-500/20 transition-all duration-300"
              >
                {/* 高亮线圈 */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/15 to-teal-500/15 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="absolute -inset-[1px] rounded-xl bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),rgba(20,184,166,0.1)_70%)] opacity-0 group-hover:opacity-5 blur-[1px] transition-opacity duration-500" />
                
                <div className="relative flex flex-col h-full">
                  <div className="flex-1">
                    <div className="space-y-1 mb-3">
                      <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-purple-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors duration-300">
                        {project.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-3 group-hover:text-zinc-300 transition-colors duration-300">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end mt-auto">
                    <Link
                      to={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-zinc-400 hover:text-purple-400 group/link"
                    >
                      进入项目
                      <svg
                        className="ml-1 w-4 h-4 group-hover/link:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
