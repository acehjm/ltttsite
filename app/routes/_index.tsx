import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "~/components/nav-bar";
import { contacts } from "~/data/contacts";
import { projects } from "~/data/projects";
import { useEffect, useState } from "react";
import { useAvatarStore } from "~/stores/avatarStore";

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
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const { showAvatar, setShowAvatar } = useAvatarStore();

    // 监听窗口大小变化，在小屏幕上隐藏头像
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setShowAvatar(false);
            } else {
                setShowAvatar(true);
            }
        };

        // 初始化
        handleResize();

        // 添加事件监听
        window.addEventListener("resize", handleResize);

        // 清理
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setShowAvatar]);

    return (
        <>
            {/* 动态背景 - 完全分离并放在最底层 */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* 基础渐变层 */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F]/95 via-[#141420]/80 to-[#1A1A2E]" />
                    {/* 2025年流行色彩渐变 */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(116,7,14,0.12),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(164,120,100,0.15),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,237,168,0.12),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(240,231,218,0.18),transparent_60%)]" />

                    {/* 增强粉色元素 #E0BAC1 */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(224,186,193,0.2),transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_40%,rgba(224,186,193,0.15),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,rgba(224,186,193,0.18),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_85%,rgba(224,186,193,0.12),transparent_60%)]" />

                    {/* 粉色渐变叠加 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#E0BAC1]/[0.03] to-transparent" />
                </div>

                {/* 动态光效层 */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full opacity-40"
                        style={{
                            background:
                                "radial-gradient(circle at center, rgba(164,120,100, 0.18) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                    />

                    {/* 增强粉色光效 #E0BAC1 */}
                    <div
                        className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-35"
                        style={{
                            background:
                                "radial-gradient(circle at center, rgba(224,186,193, 0.18) 0%, transparent 70%)",
                            filter: "blur(60px)",
                        }}
                    />
                    <div
                        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-30"
                        style={{
                            background:
                                "radial-gradient(circle at center, rgba(224,186,193, 0.15) 0%, transparent 70%)",
                            filter: "blur(45px)",
                        }}
                    />

                    {/* 新增粉色光效点 */}
                    <div
                        className="absolute top-[15%] left-[20%] w-[300px] h-[300px] rounded-full opacity-25"
                        style={{
                            background:
                                "radial-gradient(circle at center, rgba(224,186,193, 0.2) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                    />
                    <div
                        className="absolute bottom-[10%] right-[15%] w-[250px] h-[250px] rounded-full opacity-30"
                        style={{
                            background:
                                "radial-gradient(circle at center, rgba(224,186,193, 0.22) 0%, transparent 70%)",
                            filter: "blur(35px)",
                        }}
                    />
                    <div
                        className="absolute top-3/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-25"
                        style={{
                            background:
                                "radial-gradient(circle at center, rgba(255,237,168, 0.2) 0%, transparent 70%)",
                            filter: "blur(45px)",
                        }}
                    />
                </div>

                {/* 内容区域 - 确保可交互 */}
                <div className="relative z-20">
                    {/* 内容区域背景 */}
                    <div className="absolute inset-0 bg-transparent" />
                </div>
            </div>

            {/* 内容区域 - 完全独立于背景 */}
            <div className="relative min-h-screen w-full bg-transparent font-['PixelFont']">
                <NavBar />

                {/* 头像 - 放在内容区域中，随页面滚动，在小屏幕上隐藏 */}
                {showAvatar && (
                    <div className="absolute top-[15%] right-[20%] w-[400px] h-[400px] pointer-events-none">
                        <div className="relative w-full h-full">
                            {/* 额外的粉色光晕 - 更大范围 */}
                            <AnimatePresence>
                                <motion.div
                                    key="glow"
                                    className="absolute -inset-20 bg-[#E0BAC1] opacity-[0.03] blur-3xl -z-10"
                                    initial={{ scale: 1, opacity: 0.03 }}
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        opacity: [0.03, 0.04, 0.03]
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                />
                            </AnimatePresence>

                            {/* 图片本身 - 简洁展示 */}
                            <AnimatePresence>
                                <motion.div
                                    key="avatar"
                                    className="w-full h-full overflow-hidden relative z-0"
                                    style={{ transform: "rotate(5deg)" }}
                                >
                                    <img
                                        src="/images/avatar.png"
                                        alt="Profile Avatar"
                                        className="w-full h-full object-contain rounded-[2rem] opacity-100"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                <main>
                    {/* Hero Section */}
                    <section className="container mx-auto px-4 pt-40 pb-20">
                        <div className="max-w-5xl mx-auto space-y-12">
                            <div className="space-y-6">
                                <div className="inline-block">
                                    <span className="group inline-block px-5 py-2.5 rounded-lg bg-white/[0.02] hover:bg-violet-500/[0.03] border border-white/[0.05] backdrop-blur-md transition-colors duration-300">
                                        <span className="mr-2">✨</span>
                                        <span className="text-violet-300/60 font-medium text-sm font-['PixelFont']">
                                            {t("home.hire")}
                                        </span>
                                    </span>
                                </div>

                                <div className="mb-2">
                                    <h1 className="text-6xl font-bold tracking-tight inline-block typewriter-font">
                                        {t("home.title")}, I'm
                                    </h1>
                                    <span className="relative inline-block" style={{ marginLeft: '1.5rem' }}>
                                        <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-rose-400/40 via-sky-400 through-rose-400 to-indigo-400 opacity-20" />
                                        <span className="text-7xl relative bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-rose-300/40 through-purple-400 to-sky-400/30 hover:from-purple-300 hover:via-sky-300 hover:through-rose-300 hover:to-indigo-300 transition-all duration-300 inline-block typewriter-font">
                                            lttt
                                        </span>
                                    </span>
                                </div>

                                <div className="text-2xl text-[#E1E1E8]/90 max-w-2xl leading-relaxed font-light">
                                    <p className="inline-block font-['PixelFont']" style={{ letterSpacing: '0.5px' }}>
                                        {t("home.description")}
                                    </p>
                                </div>

                                <div className="flex gap-5 pt-6">
                                    <a
                                        href="https://github.com/acehjm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-medium transition-all duration-300 shadow-lg shadow-black/40 scale-[1.02] relative overflow-hidden font-['PixelFont'] hover:scale-[1.03] hover:shadow-xl hover:shadow-black/50"
                                    >
                                        {/* 黑白颗粒效果 */}
                                        <span className="absolute inset-0 rounded-full opacity-20" style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                            mixBlendMode: 'overlay'
                                        }} />

                                        {/* 内部白色阴影效果 - 由外向内扩张 */}
                                        <span className="absolute inset-0 rounded-full" style={{
                                            boxShadow: 'inset 0 0 8px 1px rgba(255, 255, 255, 0.15), inset 0 0 4px 1px rgba(255, 255, 255, 0.1)'
                                        }} />

                                        {/* 内部发光核心 - 增强饱满感 */}
                                        <span className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/5 to-transparent blur-sm" />

                                        {/* 边缘高光 */}
                                        <span className="absolute inset-0 rounded-full" style={{
                                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)'
                                        }} />

                                        {/* 悬停时的微妙光效 */}
                                        <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />

                                        {/* 按钮文字 */}
                                        <span className="relative z-10 font-['PixelFont']">
                                            {t("home.buttons.viewGitHubProfile")}
                                        </span>

                                        {/* 箭头 */}
                                        <span className="inline-block relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
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
                                    <h2 className="text-2xl font-bold text-[#E1E1E8] font-['PixelFont']">
                                        {t("home.projects.title")}
                                    </h2>
                                    <div className="h-1 w-16 bg-gradient-to-r from-[#E0BAC1] to-[#E0BAC1] rounded-full mt-2" />
                                </div>
                                <Link
                                    to="/projects"
                                    className="group flex items-center gap-2 text-sm text-[#E1E1E8]/60 hover:text-[#5CCCCF] transition-colors font-['PixelFont']"
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
                                                <h3 className="text-base font-medium text-zinc-100 mb-1.5 group-hover:text-indigo-300/70 transition-colors duration-300 font-['PixelFont']">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-zinc-400 mb-2 font-['PixelFont']">
                                                    {project.subtitle}
                                                </p>
                                                <p className="text-xs text-zinc-500 mb-3 line-clamp-2 font-['PixelFont']">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                                    {project.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 text-xs rounded-full bg-indigo-300/[0.03] text-indigo-300/40 border border-indigo-300/[0.05] backdrop-blur-sm font-['PixelFont']"
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
                                    <h3 className="text-[#E1E1E8] text-sm font-medium font-['PixelFont']">Connect</h3>
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
                                                className="flex items-center gap-2 text-[#E1E1E8]/60 hover:text-[#E1E1E8] text-sm transition-colors duration-200 font-['PixelFont']"
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
                                    <h3 className="text-[#E1E1E8] text-sm font-medium font-['PixelFont']">
                                        Subscribe to my newsletter
                                    </h3>
                                    <p className="text-[#E1E1E8]/60 text-sm font-['PixelFont']">
                                        Stay updated on new projects and tech articles.
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            placeholder="you@domain.com"
                                            className="w-[60%] px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs text-[#E1E1E8] placeholder-[#E1E1E8]/40 focus:outline-none focus:border-white/20 transition-colors duration-200 font-['PixelFont']"
                                        />
                                        <button
                                            type="button"
                                            className="px-3 py-1.5 bg-[#afafc2] text-black rounded-md text-xs font-medium hover:bg-gray-50 transition-colors duration-200 font-['PixelFont']"
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
        </>
    );
}
