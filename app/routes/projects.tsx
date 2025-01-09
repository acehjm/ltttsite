import { motion } from "framer-motion";
import { NavBar } from "~/components/nav-bar";
import { Link } from "@remix-run/react";
import { projects } from "~/data/projects";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 主渐变背景 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(79,70,229,0.08),transparent_50%)] opacity-20" />

        {/* 网格背景 */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          }}
        />

        {/* 动态光斑效果 */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-sky-500/5 rounded-full mix-blend-multiply filter blur-xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-500/5 rounded-full mix-blend-multiply filter blur-xl animate-[pulse_9s_ease-in-out_infinite]" />
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
              <motion.span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-sky-400/10 text-sky-300/60"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {t("projects.badge")}
              </motion.span>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                <motion.p variants={item} className="text-lg text-zinc-300">
                  {t("projects.welcome")}
                </motion.p>
                <motion.p variants={item} className="text-zinc-400">
                  {t("projects.description")}
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
                className="group relative bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 hover:bg-zinc-900/50 border border-sky-500/10 hover:border-rose-300/20 transition-all duration-300"
              >
                {/* 高亮效果 */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-sky-500/10 to-rose-300/10 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                <div className="relative flex flex-col h-full">
                  {/* 右上角链接 */}
                  <div className="absolute top-0 right-0">
                    <Link
                      to={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-zinc-500 hover:text-sky-300/50 group/link"
                    >
                      {t("projects.viewProject")}
                      <svg
                        className="ml-0.5 w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform"
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

                  <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-sky-300/80 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors duration-300">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-zinc-400 line-clamp-3 group-hover:text-zinc-300 transition-colors duration-300">
                      {project.description}
                    </p>

                    {/* 标签上移 */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-300 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
