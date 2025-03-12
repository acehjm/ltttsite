import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { NavBar } from "~/components/nav-bar";
import { contacts } from "~/data/contacts";
import { projects } from "~/data/projects";

export const meta: MetaFunction = () => {
    return [
        { title: "lttt.dev" },
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
                <div className="absolute inset-0">
                    <div
                        className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full opacity-40"
                        style={{
                            background:
                                "radial-gradient(circle at center, rgba(186,135,255, 0.15) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                    />
                </div>
            </div>

            {/* 内容区域 */}
            <div className="relative">
                <NavBar />

                <main className="relative">
                    {/* Hero Section */}
                    <section className="container mx-auto px-4 pt-40 pb-20">
                        <div className="max-w-5xl mx-auto space-y-12">
                            <div className="space-y-6">
                                <div className="inline-block">
                                    <span className="group inline-block px-5 py-2.5 rounded-lg bg-white/[0.02] hover:bg-violet-500/[0.03] border border-white/[0.05] backdrop-blur-md transition-colors duration-300">
                                        <span className="mr-2">✨</span>
                                        <span className="text-violet-300/60 font-medium text-sm">
                                            {t("home.hire")}
                                        </span>
                                    </span>
                                </div>

                                <h1 className="text-6xl font-bold tracking-tight">
                                    {t("home.title")}, <span className="text-7xl">I'm </span>
                                    <span className="relative">
                                        <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-rose-400/40 via-sky-400 through-rose-400 to-indigo-400 opacity-20" />
                                        <span className="text-7xl relative bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-rose-300/40 through-purple-400 to-sky-400/30 hover:from-purple-300 hover:via-sky-300 hover:through-rose-300 hover:to-indigo-300 transition-all duration-300">
                                            lttt
                                        </span>
                                    </span>
                                </h1>

                                <p className="text-2xl text-[#E1E1E8]/90 max-w-2xl leading-relaxed font-light">
                                    {t("home.description")}
                                </p>

                                <div className="flex gap-5 pt-6">
                                    <a
                                        href="https://github.com/acehjm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500/60 to-indigo-500/60 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:scale-[1.02] relative overflow-hidden"
                                    >
                                        <span className="relative z-10">
                                            {t("home.buttons.viewGitHubProfile")}
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-sky-400/40 to-indigo-400/40 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <span className="inline-block transition-transform group-hover:translate-x-1 relative z-10">
                                            →
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Featured Projects */}
                    <section className="container mx-auto px-4 py-20">
                        <div className="max-w-5xl mx-auto">
                            {/* 标题和查看全部链接 */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#E1E1E8]">
                                        {t("home.projects.title")}
                                    </h2>
                                    <div className="h-1 w-16 bg-gradient-to-r from-sky-300/40 via-rose-300/40 to-indigo-300/40 rounded-full mt-2" />
                                </div>
                                <Link
                                    to="/projects"
                                    className="group flex items-center gap-2 text-sm text-[#E1E1E8]/60 hover:text-[#5CCCCF] transition-colors"
                                >
                                    {t("home.buttons.viewAllProjects")}
                                    <span className="inline-block transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </div>

                            {/* 项目卡片网格 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {projects
                                    .filter((project) => project.featured)
                                    .map((project, index) => (
                                        <div
                                            key={project.title}
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

                                            {/* 玻璃遮罩效果 */}
                                            <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px] group-hover:bg-zinc-900/50 transition-all duration-300" />

                                            {/* 渐变遮罩 */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/50 to-transparent" />

                                            {/* 项目信息 */}
                                            <div className="relative h-full p-5 flex flex-col justify-end z-10">
                                                <h3 className="text-base font-medium text-zinc-100 mb-1.5 group-hover:text-indigo-300/70 transition-colors duration-300">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-zinc-400 mb-2">
                                                    {project.subtitle}
                                                </p>
                                                <p className="text-xs text-zinc-500 mb-3 line-clamp-2">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                                    {project.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 text-xs rounded-full bg-indigo-300/[0.03] text-indigo-300/40 border border-indigo-300/[0.05] backdrop-blur-sm"
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
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </section>

                    {/* Footer Section */}
                    <footer className="relative w-full mt-24">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-xl" />
                        <div className="relative max-w-3xl mx-auto px-4 py-8">
                            <div className="grid grid-cols-2 gap-8">
                                {/* Connect Column */}
                                <div className="space-y-3">
                                    <h3 className="text-[#E1E1E8] text-sm font-medium">Connect</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {contacts.map((contact) => (
                                            <a
                                                key={contact.platform}
                                                href={contact.link}
                                                target={
                                                    contact.link.startsWith("mailto:")
                                                        ? undefined
                                                        : "_blank"
                                                }
                                                rel={
                                                    contact.link.startsWith("mailto:")
                                                        ? undefined
                                                        : "noopener noreferrer"
                                                }
                                                className="flex items-center gap-2 text-[#E1E1E8]/60 hover:text-[#E1E1E8] text-sm transition-colors duration-200"
                                            >
                                                <span className="w-4 h-4 flex items-center justify-center">
                                                    {contact.icon}
                                                </span>
                                                <span>{contact.platform}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Subscribe Column */}
                                <div className="space-y-3">
                                    <h3 className="text-[#E1E1E8] text-sm font-medium">
                                        Subscribe to my newsletter
                                    </h3>
                                    <p className="text-[#E1E1E8]/60 text-sm">
                                        Stay updated on new projects and tech articles.
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            placeholder="you@domain.com"
                                            className="w-[60%] px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs text-[#E1E1E8] placeholder-[#E1E1E8]/40 focus:outline-none focus:border-white/20 transition-colors duration-200"
                                        />
                                        <button
                                            type="button"
                                            className="px-3 py-1.5 bg-[#afafc2] text-black rounded-md text-xs font-medium hover:bg-gray-50 transition-colors duration-200"
                                        >
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
