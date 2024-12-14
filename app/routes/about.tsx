import { motion } from "framer-motion";
import { GridBackground } from "~/components/grid-background";
import { CodeIcon, GlobeIcon, RocketIcon } from "@radix-ui/react-icons";
import { NavBar } from "~/components/nav-bar";
import { useTranslation } from "react-i18next";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
    <div className="min-h-screen bg-zinc-950">
      <NavBar />
      <GridBackground />

      <div className="container px-4 mx-auto pt-32 relative">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto space-y-32 relative"
        >
          {/* Introduction Section */}
          <motion.section variants={item}>
            <div className="relative space-y-8">
              <div className="inline-block">
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 text-violet-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {t('about.badge')}
                </motion.span>
              </div>

              <div className="grid lg:grid-cols-[2fr,1fr] gap-12">
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300">
                    {t('about.title')}
                  </h1>
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    {t('about.intro1')}
                  </p>
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    {t('about.intro2')}
                  </p>
                </div>

                <div className="space-y-8 lg:border-l lg:pl-12 lg:border-zinc-800">
                  <InfoItem
                    icon={<GlobeIcon className="w-5 h-5 text-violet-300" />}
                    label={t('about.location.label')}
                    value={t('about.location.value') || '-'}
                  />
                  <InfoItem
                    icon={<CodeIcon className="w-5 h-5 text-violet-300" />}
                    label={t('about.experience.label')}
                    value={t('about.experience.value')}
                  />
                  <InfoItem
                    icon={<RocketIcon className="w-5 h-5 text-violet-300" />}
                    label={t('about.focus.label')}
                    value={t('about.focus.value')}
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section variants={item} className="relative">
            <div className="space-y-12 relative">
              <div className="space-y-4">
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 text-violet-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {t('about.skills.badge')}
                </motion.span>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300">
                  {t('about.skills.title')}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SkillCategory
                  title={t('about.skills.categories.languages')}
                  skills={[
                    { name: "Rust", level: 30 },
                    { name: "JavaScript", level: 45 },
                    { name: "Java", level: 90 },
                    { name: "SQL", level: 85 }
                  ]}
                />
                <SkillCategory
                  title={t('about.skills.categories.frontend')}
                  skills={[
                    { name: "React", level: 75 },
                    { name: "Remix", level: 80 },
                    { name: "TailwindCSS", level: 70 },
                    { name: "Framer Motion", level: 65 }
                  ]}
                />
                <SkillCategory
                  title={t('about.skills.categories.backend')}
                  skills={[
                    { name: "SpringBoot", level: 90 },
                    { name: "Redis", level: 85 },
                    { name: "RabbitMQ", level: 80 },
                    { name: "PostgreSQL", level: 85 }
                  ]}
                />
              </div>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section variants={item} className="relative pb-16">
            <div className="flex flex-col">
              {/* 时间线 */}
              <div className="absolute left-1 h-2/3 border-l border-zinc-800" style={{ top: '20%' }}></div>

              <div className="space-y-8 relative">
                <div className="space-y-4">
                  <motion.span
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 text-violet-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t('about.experience_section.badge')}
                  </motion.span>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300">
                    {t('about.experience_section.title')}
                  </h2>
                </div>

                {/* 使用 flex 布局使时间线与经历项并排 */}
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-yellow-300 via-fuchsia-400 rounded-full shadow-lg animate-pulse"></div> {/* 时间线标记 */}
                    </div>
                    <div className="flex-1">
                      <ExperienceItem
                        title={t('about.experience_section.jobs.senior.title')}
                        company={t('about.experience_section.jobs.senior.company')}
                        period={t('about.experience_section.jobs.senior.period')}
                        description={t('about.experience_section.jobs.senior.description')}
                        achievements={t('about.experience_section.jobs.senior.achievements', { returnObjects: true }) as string[]}
                      />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-yellow-300 via-fuchsia-400 rounded-full shadow-lg animate-pulse"></div> {/* 时间线标记 */}
                    </div>
                    <div className="flex-1">
                      <ExperienceItem
                        title={t('about.experience_section.jobs.fullstack.title')}
                        company={t('about.experience_section.jobs.fullstack.company')}
                        period={t('about.experience_section.jobs.fullstack.period')}
                        description={t('about.experience_section.jobs.fullstack.description')}
                        achievements={t('about.experience_section.jobs.fullstack.achievements', { returnObjects: true }) as string[]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      variants={item}
      className="flex items-center gap-4"
    >
      <div className="p-2 rounded-lg bg-violet-500/10">
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </motion.div>
  );
}

function SkillCategory({ title, skills }: {
  title: string;
  skills: { name: string; level: number; }[];
}) {
  return (
    <motion.div
      variants={item}
      className="space-y-4 p-6 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50"
    >
      <h3 className="text-lg font-semibold text-zinc-200">{title}</h3>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">{skill.name}</span>
              <span className="text-zinc-500">{skill.level}%</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-fuchsia-300 to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ExperienceItem({
  title,
  company,
  period,
  description,
  achievements
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
      className="space-y-4 p-6 rounded-sm bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50"
    >
      <div>
        <h3 className="text-lg font-semibold text-zinc-200">{title}</h3>
        <p className="text-zinc-400">{company} · {period}</p>
      </div>
      <p className="text-zinc-400 text-sm">{description}</p>
      <ul className="space-y-2">
        {achievements?.map((achievement, index) => (
          <li key={index} className="flex items-center gap-2 text-zinc-400">
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span> {/* 时间线标记 */}
            <span className="text-sm">{achievement}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
