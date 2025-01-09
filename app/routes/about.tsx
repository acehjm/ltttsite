import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { NavBar } from "~/components/nav-bar";
import { GridBackground } from "~/components/grid-background";
import { CodeIcon, GlobeIcon, RocketIcon } from "@radix-ui/react-icons";
import "../styles/fonts.css";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
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
          <motion.div
            className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle at center, rgba(186,135,255, 0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      <div className="relative">
        <NavBar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto space-y-16"
          >
            {/* 简介部分 */}
            <motion.section variants={item} className="space-y-8">
              <div className="space-y-4">
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-lg text-sm font-['PixelFont'] bg-violet-500/10 text-violet-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("about.badge")}
                </motion.span>
                <h1 className="text-4xl font-['PixelFont'] leading-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300">
                  {t("about.title")}
                </h1>
                <div className="grid lg:grid-cols-[2fr,1fr] gap-12">
                  <div className="space-y-6">
                    <p className="text-lg text-zinc-400 leading-relaxed">
                      {t("about.intro1")}
                    </p>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                      {t("about.intro2")}
                    </p>
                  </div>
                  <div className="space-y-6 lg:border-l lg:pl-12 lg:border-white/10">
                    <InfoItem
                      icon={<GlobeIcon className="w-5 h-5 text-violet-300" />}
                      label={t("about.location.label")}
                      value={t("about.location.value") || "Remote"}
                    />
                    <InfoItem
                      icon={<CodeIcon className="w-5 h-5 text-violet-300" />}
                      label={t("about.experience.label")}
                      value={t("about.experience.value")}
                    />
                    <InfoItem
                      icon={<RocketIcon className="w-5 h-5 text-violet-300" />}
                      label={t("about.focus.label")}
                      value={t("about.focus.value")}
                    />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 技能部分 */}
            <motion.section variants={item} className="space-y-8">
              <div className="space-y-4">
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-lg text-sm font-['PixelFont'] bg-violet-500/10 text-violet-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("about.skills.badge")}
                </motion.span>
                <h2 className="text-3xl font-['PixelFont'] bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300">
                  {t("about.skills.title")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkillCategory
                  title={t("about.skills.categories.languages")}
                  type="languages"
                  skills={[
                    { name: "Rust", level: 30 },
                    { name: "JavaScript/TypeScript", level: 50 },
                    { name: "Java", level: 90 },
                    { name: "Kotlin", level: 90 },
                  ]}
                />
                <SkillCategory
                  title={t("about.skills.categories.frontend")}
                  type="frontend"
                  skills={[
                    { name: "React/Next.js", level: 90 },
                    { name: "Remix", level: 80 },
                    { name: "TailwindCSS", level: 65 },
                    { name: "Framer Motion", level: 60 },
                  ]}
                />
                <SkillCategory
                  title={t("about.skills.categories.backend")}
                  type="backend"
                  skills={[
                    { name: "Node.js", level: 85 },
                    { name: "SpringBoot", level: 90 },
                    { name: "PostgreSQL", level: 85 },
                    { name: "Redis", level: 85 },
                  ]}
                />
              </div>

              {/* More tags section */}
              <div className="pt-1 space-y-1.5">
                <div className="text-sm text-zinc-500/70 font-['PixelBody']">more tags</div>
                <div className="flex flex-wrap gap-2">
                  {/* Languages */}
                  {["Python", "Go"].map((tag, index) => (
                    <span
                      key={`lang-${index}`}
                      className="text-xs text-sky-300/50 bg-sky-400/[0.02] px-2.5 py-1 rounded-full font-['PixelBody'] hover:bg-sky-400/[0.03] hover:text-sky-200/60 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {/* Frontend */}
                  {["Vue.js", "Svelte", "Three.js"].map((tag, index) => (
                    <span
                      key={`frontend-${index}`}
                      className="text-xs text-rose-300/40 bg-rose-300/[0.015] px-2.5 py-1 rounded-full font-['PixelBody'] hover:bg-rose-300/[0.02] hover:text-rose-200/40 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {/* Backend */}
                  {["Ktor", "MQTT", "RabbitMQ", "Apache Kafka"].map((tag, index) => (
                    <span
                      key={`backend-${index}`}
                      className="text-xs text-indigo-300/60 bg-indigo-400/[0.02] px-2.5 py-1 rounded-full font-['PixelBody'] hover:bg-indigo-400/[0.03] hover:text-indigo-200/80 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* 工作经验部分 */}
            <motion.section variants={item} className="space-y-8">
              <div className="space-y-4">
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-lg text-sm font-['PixelFont'] bg-violet-500/10 text-violet-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("about.experience_section.badge")}
                </motion.span>
                <h2 className="text-3xl font-['PixelFont'] bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300">
                  {t("about.experience_section.title")}
                </h2>
              </div>

              <div className="space-y-8">
                <ExperienceItem
                  title={t("about.experience_section.jobs.senior.title")}
                  company={t("about.experience_section.jobs.senior.company")}
                  period={t("about.experience_section.jobs.senior.period")}
                  description={t("about.experience_section.jobs.senior.description")}
                  achievements={t("about.experience_section.jobs.senior.achievements", { returnObjects: true }) as string[]}
                />
                <ExperienceItem
                  title={t("about.experience_section.jobs.fullstack.title")}
                  company={t("about.experience_section.jobs.fullstack.company")}
                  period={t("about.experience_section.jobs.fullstack.period")}
                  description={t("about.experience_section.jobs.fullstack.description")}
                  achievements={t("about.experience_section.jobs.fullstack.achievements", { returnObjects: true }) as string[]}
                />
              </div>
            </motion.section>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <div className="text-sm text-zinc-500">{label}</div>
        <div className="text-zinc-300">{value}</div>
      </div>
    </div>
  );
}

function ExperienceItem({
  title,
  company,
  period,
  description,
  achievements,
}: {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}) {
  return (
    <motion.div
      variants={item}
      className="p-6 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] backdrop-blur-md transition-all duration-300 group"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-['PixelFont'] text-zinc-200/90 group-hover:text-violet-300/90 transition-colors duration-300">{title}</h3>
          <div className="text-sm text-zinc-400/80">{company} · {period}</div>
        </div>
        <p className="text-zinc-400/90 text-sm leading-relaxed">{description}</p>
        <ul className="space-y-2.5 pt-2">
          {achievements.map((achievement, index) => (
            <li key={index} className="text-sm text-zinc-400/80 flex items-start group-hover:text-zinc-400/90 transition-colors duration-300">
              <span className="text-violet-400/60 mr-2.5 mt-1">•</span>
              <span className="leading-relaxed">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function SkillCategory({
  title,
  skills,
  type = "languages", // "languages" | "frontend" | "backend"
}: {
  title: string;
  skills: { name: string; level: number }[];
  type?: "languages" | "frontend" | "backend";
}) {
  const gradientColors = {
    languages: "from-sky-400/25 via-sky-300/25 to-sky-400/25",
    frontend: "from-rose-300/25 via-rose-200/25 to-rose-300/25",
    backend: "from-indigo-400/30 via-indigo-300/30 to-indigo-400/30",
  };

  const bgHoverColor = {
    languages: "hover:bg-sky-400/[0.03]",
    frontend: "hover:bg-rose-300/[0.02]",
    backend: "hover:bg-indigo-400/[0.03]",
  };

  const textColor = {
    languages: "text-sky-300/50",
    frontend: "text-rose-300/40",
    backend: "text-indigo-300/60",
  };

  return (
    <motion.div
      variants={item}
      className={`p-6 rounded-lg bg-white/[0.02] ${bgHoverColor[type]} border border-white/[0.05] backdrop-blur-md transition-colors duration-300`}
    >
      <h3 className="text-lg font-['PixelFont'] text-zinc-200/90 mb-6">{title}</h3>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2.5">
            <div className="flex justify-between text-sm items-center">
              <span className={`${textColor[type]} font-['PixelBody']`}>{skill.name}</span>
              <span className={`${textColor[type]} font-['PixelBody'] text-xs bg-white/5 px-2 py-0.5 rounded-full`}>
                {skill.level}%
              </span>
            </div>
            <div className="h-1 bg-white/[0.03] rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${gradientColors[type]}`}
                style={{
                  backgroundSize: '200% 100%',
                }}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${skill.level}%`,
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  width: { duration: 1, ease: "easeOut" },
                  backgroundPosition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
