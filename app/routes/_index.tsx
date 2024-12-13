import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { NavBar } from "~/components/nav-bar";
import { projects } from "~/routes/projects";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "lttt.dev - Software Engineer" },
    { name: "description", content: "Personal portfolio of a software engineer passionate about creating beautiful and functional web experiences." }
  ];
};

export default function Index() {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden">
        {/* 基础渐变层 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,0,182,0.08),transparent_50%)]" />
        </div>

        {/* 动态光效层 */}
        <div className="absolute inset-0">
          {/* 主光晕 */}
          <motion.div
            className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, 20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 新增的光效元素 */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-[300px] h-[300px]"
            style={{
              background: "conic-gradient(from 0deg at 50% 50%, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05), rgba(139, 92, 246, 0.05))",
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            }}
            animate={{
              rotate: [0, 360],
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "70% 30% 30% 70% / 70% 70% 30% 30%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* 网格层 */}
        <div className="absolute inset-0">
          {/* 基础网格 */}
          <div 
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
            }}
          />
          
          {/* 动态点阵 */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0.5px, transparent 0.5px)',
              backgroundSize: '32px 32px'
            }}
            animate={{
              backgroundPosition: ['0% 0%', '50% 50%', '0% 0%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </div>

        {/* 浮动元素层 */}
        <div className="absolute inset-0">
          {/* 随机浮动粒子 */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `rgba(${Math.random() > 0.5 ? '139, 92, 246' : '236, 72, 153'}, 0.3)`
              }}
              animate={{
                y: [0, -30 * (Math.random() + 0.5), 0],
                x: [0, 20 * (Math.random() + 0.5), 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
            />
          ))}

          {/* 装饰性几何图形 */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                border: '1px solid rgba(139, 92, 246, 0.1)',
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: i * 4
              }}
            />
          ))}
        </div>

        {/* 噪点纹理 */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px'
          }} 
        />

        {/* 最终叠加层 */}
        <div className="absolute inset-0 bg-zinc-950/10 backdrop-blur-[0.5px]" />
      </div>

      {/* 内容区域 */}
      <div className="relative">
        <NavBar />
        
        <main className="relative">
          {/* Hero Section */}
          <section className="container mx-auto px-4 pt-32 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto space-y-8"
            >
              <div className="space-y-4">
                <motion.div 
                  className="inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Available for hire
                  </span>
                </motion.div>
                
                <motion.h1 
                  className="text-6xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">lttt</span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-zinc-400 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  A software engineer passionate about creating beautiful and functional web experiences.
                </motion.p>

                <motion.div
                  className="flex gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition-colors"
                  >
                    GitHub Profile
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
                  >
                    Download Resume
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Featured Projects */}
          <section className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-5xl mx-auto space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-zinc-100">Featured Projects</h2>
                <Link 
                  to="/projects"
                  className="text-sm text-zinc-400 hover:text-pink-400 transition-colors"
                >
                  View all projects →
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {projects.filter(project => project.featured).map((project, index) => (
                  <Link
                    key={index}
                    to={project.link}
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900 md:aspect-[3/2]"
                  >
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-zinc-900/30" />
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-4">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-white md:text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-purple-400">
                          {project.title}
                        </h3>
                        <p className="text-sm text-zinc-400">{project.subtitle}</p>
                        <p className="text-xs text-zinc-500 line-clamp-2 mt-1">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}
