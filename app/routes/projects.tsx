import { NavBar } from "~/components/nav-bar";
import { Link } from "@remix-run/react";
import { projects } from "~/data/projects";
import { useTranslation } from "react-i18next";

export default function Projects() {
    const { t } = useTranslation();

    return (
        <div className="relative min-h-screen w-full bg-[#0A0A0F] font-['PixelBody']">
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
                <div
                    className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full opacity-40"
                    style={{
                        background:
                            "radial-gradient(circle at center, rgba(186,135,255, 0.15) 0%, transparent 70%)",
                        filter: "blur(40px)",
                    }}
                />

                {/* 网格背景 */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
                    style={{
                        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
                    }}
                />
            </div>

            <NavBar />

            <div className="relative container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* 介绍部分 */}
                    <div className="max-w-2xl space-y-6">
                        <span className="inline-block px-4 py-1.5 rounded-lg text-sm font-['PixelFont'] bg-violet-500/10 text-violet-300">
                            {t("projects.badge")}
                        </span>

                        <div className="space-y-4">
                            <h1 className="text-4xl font-['PixelFont'] leading-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300">
                                {t("projects.welcome")}
                            </h1>
                            <p className="text-lg text-zinc-400 leading-relaxed">
                                {t("projects.description")}
                            </p>
                        </div>
                    </div>

                    {/* 项目卡片部分 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={project.title}
                                className="group relative bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05] hover:border-violet-500/10 transition-all duration-500 overflow-hidden"
                            >
                                {/* 光晕效果 */}
                                <div className="absolute -inset-[1px] rounded-xl bg-violet-400/[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* 背景装饰 */}
                                <div className="absolute inset-0 bg-violet-400/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative p-6 flex flex-col h-full">
                                    {/* 标题和链接 */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="space-y-1.5">
                                            <h3 className="text-lg font-semibold text-zinc-200 group-hover:text-violet-300/70 transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-zinc-500 font-medium group-hover:text-zinc-400/90 transition-colors duration-300">
                                                {project.subtitle}
                                            </p>
                                        </div>
                                        <Link
                                            to={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs text-zinc-500 hover:text-violet-300/50 group/link"
                                        >
                                            {t("projects.viewProject")}
                                            <svg
                                                className="ml-0.5 w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                                role="img"
                                                aria-label={t("projects.arrowIcon")}
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

                                    {/* 描述 */}
                                    <p className="text-sm text-zinc-400 line-clamp-3 mb-4 group-hover:text-zinc-300 transition-colors duration-300">
                                        {project.description}
                                    </p>

                                    {/* 标签 */}
                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.03] text-zinc-400 border border-white/[0.05] hover:border-violet-500/10 hover:text-violet-300/50 transition-all duration-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
