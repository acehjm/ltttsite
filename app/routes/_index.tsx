import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { NavBar } from "~/components/nav-bar";
import { projects } from "~/data/projects";
import { contacts } from "~/data/contacts";
import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [
    { title: "lttt.dev - Software Engineer" },
    {
      name: "description",
      content:
        "Personal portfolio of a software engineer passionate about creating beautiful and functional web experiences.",
    },
    {
      name: "fonts",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap",
      rel: "stylesheet",
    },
  ];
};

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0F]">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden">
        {/* 基础渐变层 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F]/95 via-[#141420]/80 to-[#1A1A2E]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,166,158,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(186,135,255,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(92,205,207,0.12),transparent_50%)]" />
        </div>

        {/* 动态光效层 */}
        <div className="absolute inset-0">
          {/* 主光晕 */}
          <motion.div
            className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, rgba(186,135,255, 0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
              y: [0, -30, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,166,158, 0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, 30, 0],
              y: [0, 30, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 新增的动态元素 */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] opacity-30"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, rgba(186,135,255, 0.15), rgba(255,166,158, 0.15), rgba(92,205,207, 0.15))",
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              filter: "blur(40px)",
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1, 0.8],
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

          {/* 流动粒子效果 */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-[#BA87FF] to-[#5CCCCF]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.4,
                scale: Math.random() * 0.5 + 0.5,
                filter: "blur(1px)",
              }}
              animate={{
                y: [-20, -40, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* 网格层 */}
        <div className="absolute inset-0">
          {/* 基础网格 */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(circle at 50% 50%, black, transparent 70%)",
            }}
          />

          {/* 动态点阵 */}
          <motion.div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.1) 0.5px, transparent 0.5px)",
              backgroundSize: "24px 24px",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.07, 0.05, 0.07],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* 噪点纹理 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* 最终叠加层 */}
        <div className="absolute inset-0 bg-[#0A0A0F]/5 backdrop-blur-[1px]" />
      </div>

      {/* 内容区域 */}
      <div className="relative font-['Outfit']">
        <NavBar />

        <main className="relative">
          {/* Hero Section */}
          <section className="container mx-auto px-4 pt-40 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto space-y-12"
            >
              <div className="space-y-6">
                <motion.div
                  className="inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="group px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#BA87FF]/20 to-[#5CCCCF]/20 text-[#BA87FF] border border-[#BA87FF]/30 hover:border-[#BA87FF]/40 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                    <span className="mr-2">✨</span>
                    {t("home.hire")}
                    <span className="inline-block transition-transform group-hover:translate-x-1">↓</span>
                  </span>
                </motion.div>

                <motion.h1
                  className="text-7xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Hi, I'm{" "}
                  <span className="relative">
                    <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-[#BA87FF] via-[#FFA69E] to-[#5CCCCF] opacity-20"></span>
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[#BA87FF] via-[#FFA69E] to-[#5CCCCF] hover:from-[#C69FFF] hover:via-[#FFB8B2] hover:to-[#6EDEE1] transition-all duration-300">
                      lttt
                    </span>
                  </span>
                </motion.h1>

                <motion.p
                  className="text-2xl text-[#E1E1E8]/90 max-w-2xl leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {t("home.description")}
                </motion.p>

                <motion.div
                  className="flex gap-5 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <a
                    href="https://github.com/acehjm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6]/80 via-[#A78BFA]/70 to-[#C4B5FD]/60 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      GitHub Profile
                    </span>
                    <span className="absolute inset-0 bg-white/20 blur-2xl scale-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="inline-block transition-transform group-hover:translate-x-1 relative z-10">→</span>
                  </a>
                  {/* <div className="relative group">
                    <button
                      disabled
                      className="px-6 py-3 rounded-full bg-[#1A1A2E]/30 backdrop-blur-sm text-[#E1E1E8]/40 border border-[#BA87FF]/5 cursor-not-allowed transition-all duration-300"
                      title={t("home.buttons.comingSoon")}
                    >
                      {t("home.buttons.downloadResume")}
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1A1A2E] text-[#E1E1E8]/60 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {t("home.buttons.comingSoon")}
                    </span>
                  </div> */}
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Featured Projects */}
          <section className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              {/* 标题和查看全部链接 */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#E1E1E8]">
                    {t("home.projects.title")}
                  </h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-[#BA87FF] to-[#5CCCCF] rounded-full mt-2"></div>
                </div>
                <Link
                  to="/projects"
                  className="group flex items-center gap-2 text-sm text-[#E1E1E8]/60 hover:text-[#5CCCCF] transition-colors"
                >
                  {t("home.buttons.viewAllProjects")}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* 项目卡片网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects
                  .filter((project) => project.featured)
                  .map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="group relative overflow-hidden rounded-2xl"
                    >
                      {/* 背景图片 */}
                      <div className="absolute inset-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* 玻璃遮罩效果 - 应用于整个卡片 */}
                      <div className="absolute inset-0 bg-[#0A0A0F]/30 backdrop-blur-[2px] group-hover:bg-[#0A0A0F]/60 transition-all duration-300"></div>

                      {/* 渐变遮罩 - 增强文本可读性 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/90 to-transparent"></div>

                      {/* 项目信息 - 位于遮罩上层 */}
                      <div className="relative h-full p-5 flex flex-col justify-end z-10">
                        <h3 className="text-base font-medium text-[#E1E1E8] mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#BA87FF] group-hover:to-[#5CCCCF] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[#E1E1E8]/70 mb-2">
                          {project.subtitle}
                        </p>
                        <p className="text-xs text-[#E1E1E8]/60 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs rounded-full bg-[#BA87FF]/10 text-[#BA87FF] border border-[#BA87FF]/10 backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 链接覆盖 */}
                      <Link
                        to={project.link}
                        className="absolute inset-0 z-20"
                        aria-label={`View ${project.title} project`}
                      />
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </section>

          {/* Footer Section */}
          <footer className="relative w-full mt-32">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-xl"></div>
            <div className="relative max-w-3xl mx-auto px-4 py-12">
              <div className="grid grid-cols-2 gap-8">
                {/* Connect Column */}
                <div className="space-y-4">
                  <h3 className="text-[#E1E1E8] text-sm font-medium">Connect</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {contacts.map((contact) => (
                      <a
                        key={contact.platform}
                        href={contact.link}
                        target={contact.link.startsWith("mailto:") ? undefined : "_blank"}
                        rel={contact.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="flex items-center gap-2 text-[#E1E1E8]/60 hover:text-[#E1E1E8] text-sm transition-colors duration-200"
                      >
                        <span className="w-4 h-4">{contact.icon}</span>
                        <span>{contact.platform}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Subscribe Column */}
                <div className="space-y-4">
                  <h3 className="text-[#E1E1E8] text-sm font-medium">Subscribe to my newsletter</h3>
                  <p className="text-[#E1E1E8]/60 text-sm">
                    Stay updated on new projects and tech articles.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-[#E1E1E8] placeholder-[#E1E1E8]/40 focus:outline-none focus:border-white/20 transition-colors duration-200"
                    />
                    <button className="px-4 py-1.5 bg-[#8585af] text-black rounded-md text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}