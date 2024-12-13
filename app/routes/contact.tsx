import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "~/components/nav-bar";
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

const contacts = [
  {
    platform: "Email",
    value: "majh.dkl@gmail.com",
    link: "mailto:majh.dkl@gmail.com",
    avatar: "/images/github.jpg",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    gradient: "from-red-500/10 via-yellow-400/10 to-blue-500/10",
    hoverGradient: "from-red-500/20 via-yellow-400/20 to-blue-500/20",
    borderColor: "border-red-500/10",
    hoverBorderColor: "border-red-500/30",
    iconBg: "bg-red-900/30",
    iconHoverBg: "bg-red-800/40",
    textColor: "text-red-400",
    textHoverColor: "text-red-300"
  },
  {
    platform: "GitHub",
    value: "github.com/acehjm",
    link: "https://github.com/acehjm",
    avatar: "/images/github.jpg",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 1C19.91 1 18.73 0.650001 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.650001 5.09 1 5.09 1C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    gradient: "from-purple-500/10 via-purple-400/10 to-pink-500/10",
    hoverGradient: "from-purple-500/20 via-purple-400/20 to-pink-500/20",
    borderColor: "border-purple-500/10",
    hoverBorderColor: "border-purple-500/30",
    iconBg: "bg-purple-900/30",
    iconHoverBg: "bg-purple-800/40",
    textColor: "text-purple-400",
    textHoverColor: "text-purple-300"
  },
  {
    platform: "X",
    value: "x.com/zzzerozzz0",
    link: "https://x.com/zzzerozzz0",
    avatar: "/images/x.jpg",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.99 8.32L22 3H20.18L15.98 7.56L12.63 3H7L12.76 10.89L7.47 17.5H9.29L13.72 12.67L17.26 17.5H22.89L16.99 8.32ZM14.61 11.54L13.76 10.33L9.19 4.13H11.53L15.14 9.1L16 10.31L20.82 17H18.48L14.61 11.54Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    gradient: "from-zinc-400/10 via-zinc-300/10 to-zinc-200/10",
    hoverGradient: "from-zinc-400/20 via-zinc-300/20 to-zinc-200/20",
    borderColor: "border-zinc-700/20",
    hoverBorderColor: "border-zinc-600/40",
    iconBg: "bg-zinc-900/40",
    iconHoverBg: "bg-zinc-800/50",
    textColor: "text-zinc-400",
    textHoverColor: "text-zinc-300"
  },
  {
    platform: "WeChat",
    value: "UltttNhs",
    link: "#",
    avatar: null,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.85 19.5C20.89 17.96 22.23 15.56 22.23 12.86C22.23 7.54 17.61 3.24 11.91 3.24C6.21 3.24 1.59 7.54 1.59 12.86C1.59 18.18 6.21 22.48 11.91 22.48C13.03 22.48 14.11 22.31 15.13 21.99L19.03 23.5L18.85 19.5ZM8.61 11.08C7.89 11.08 7.31 10.5 7.31 9.78C7.31 9.06 7.89 8.48 8.61 8.48C9.33 8.48 9.91 9.06 9.91 9.78C9.91 10.5 9.33 11.08 8.61 11.08ZM15.21 11.08C14.49 11.08 13.91 10.5 13.91 9.78C13.91 9.06 14.49 8.48 15.21 8.48C15.93 8.48 16.51 9.06 16.51 9.78C16.51 10.5 15.93 11.08 15.21 11.08Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    gradient: "from-emerald-500/10 via-green-400/10 to-emerald-300/10",
    hoverGradient: "from-emerald-500/20 via-green-400/20 to-emerald-300/20",
    borderColor: "border-emerald-500/10",
    hoverBorderColor: "border-emerald-500/30",
    iconBg: "bg-emerald-900/30",
    iconHoverBg: "bg-emerald-800/40",
    textColor: "text-emerald-400",
    textHoverColor: "text-emerald-300"
  },
];

export default function Contact() {
  const { t } = useTranslation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="contact-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative min-h-screen bg-zinc-950"
      >
        {/* 背景装饰 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* 渐变光效 */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),rgba(20,184,166,0.05)_50%)] opacity-30" />
          
          {/* 网格背景 */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] opacity-[0.3]" 
            style={{ backgroundSize: '2rem 2rem' }}
          />

          {/* 光晕效果 */}
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-500/5 via-transparent to-transparent opacity-75" />
          <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-teal-500/5 via-transparent to-transparent opacity-75" />
        </div>

        <NavBar />
        
        <main className="relative container mx-auto px-4 pt-24 pb-16 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center"
          >
            {/* 页面标题 */}
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut"
                }}
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {t('contact.title')}
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
              >
                <p className="mt-4 text-base text-zinc-400 max-w-sm">
                  {t('contact.description')}
                </p>
              </motion.div>
            </div>

            {/* 中心内容区域 */}
            <div className="relative w-full min-h-[500px] flex items-start justify-center mx-auto max-w-[1000px] mt-8">
              {/* 卡片容器 */}
              <div className="relative w-full grid grid-cols-3 gap-x-8 gap-y-12 px-4">
                {contacts.map((contact, index) => {
                  // 计算卡片的行列位置
                  const columnIndex = index % 3;
                  const rowIndex = Math.floor(index / 3);

                  // 基础倾斜角度计算函数
                  const getBaseRotation = (col: number, row: number) => {
                    // 基础随机角度（第一排3-8度，第二排2-5度）
                    const baseAngle = row === 0 
                      ? 3 + Math.random() * 5  // 第一排 3-8度
                      : 2 + Math.random() * 3; // 第二排 2-5度
                    
                    // 根据列位置决定倾斜方向
                    // 左列向左倾斜，右列向右倾斜，中间列随机
                    let direction = 0;
                    if (col === 0) direction = -1;
                    else if (col === 2) direction = 1;
                    else direction = Math.random() > 0.5 ? 1 : -1;

                    // 根据行位置调整倾斜程度
                    let rowMultiplier = row === 0 ? 1 : 0.6; // 第二行显著减小倾斜度

                    // 为中间列的卡片减小倾斜度
                    const columnMultiplier = col === 1 ? 0.7 : 1;

                    return baseAngle * direction * rowMultiplier * columnMultiplier;
                  };

                  // 计算最终的旋转角度
                  let baseRotate = getBaseRotation(columnIndex, rowIndex);

                  // 添加细微的随机扰动（±1度）
                  const jitter = (Math.random() - 0.5) * 2;
                  baseRotate += jitter;

                  // 确保最终角度在合理范围内（-10到10度）
                  baseRotate = Math.max(-10, Math.min(10, baseRotate));
                  
                  return (
                    <motion.div
                      key={contact.platform}
                      className="group relative"
                      initial={{ 
                        scale: 0.9,
                        opacity: 0,
                        y: 20,
                        rotate: baseRotate * 1.5
                      }}
                      animate={{ 
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        rotate: baseRotate
                      }}
                      exit={{
                        scale: 0.9,
                        opacity: 0,
                        y: -20,
                        transition: { duration: 0.2 }
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        rotate: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }
                      }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                    >
                      {/* 添加点击区域和链接 */}
                      <a
                        href={contact.link}
                        target={contact.link.startsWith("mailto:") ? undefined : "_blank"}
                        rel={contact.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className={clsx(
                          "block cursor-pointer",
                          "active:scale-95 transition-transform duration-200"
                        )}
                      >
                        <div
                          className={clsx(
                            "relative overflow-hidden rounded-2xl border transition-all duration-300",
                            contact.borderColor,
                            "hover:shadow-lg hover:shadow-black/5",
                            `group-hover:${contact.hoverBorderColor}`
                          )}
                        >
                          {/* 发光效果 */}
                          <div className={clsx(
                            "absolute inset-0 bg-gradient-to-r",
                            contact.gradient,
                            "opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"
                          )} />
                          
                          {/* 卡片内容 */}
                          <div className="relative p-5">
                            {/* 头部：图标和平台名称 */}
                            <div className="flex items-center gap-3 mb-3">
                              {/* 图标 */}
                              <div className={clsx(
                                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300",
                                contact.iconBg,
                                `group-hover:${contact.iconHoverBg}`
                              )}>
                                {contact.icon}
                              </div>
                              {/* 平台名称 */}
                              <span className={clsx(
                                "text-base font-medium transition-colors duration-300",
                                contact.textColor,
                                `group-hover:${contact.textHoverColor}`
                              )}>
                                {contact.platform}
                              </span>
                            </div>
                            {/* 账号值和头像 */}
                            <div className="flex items-center justify-between mt-1">
                              <div className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                                {contact.value}
                              </div>
                              {/* 头像框 */}
                              {contact.avatar ? (
                                <div className="relative">
                                  {/* 头像光晕效果 */}
                                  <div className={clsx(
                                    "absolute -inset-1 rounded-full opacity-0 blur-sm transition-opacity duration-300",
                                    contact.gradient,
                                    "group-hover:opacity-70"
                                  )} />
                                  {/* 头像容器 */}
                                  <div className={clsx(
                                    "relative w-7 h-7 rounded-full overflow-hidden ring-1 transition-all duration-300",
                                    contact.borderColor,
                                    `group-hover:${contact.hoverBorderColor}`
                                  )}>
                                    <img
                                      src={contact.avatar}
                                      alt={`${contact.platform} avatar`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className={clsx(
                                  "w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-300",
                                  contact.iconBg,
                                  `group-hover:${contact.iconHoverBg}`,
                                  contact.textColor,
                                  `group-hover:${contact.textHoverColor}`
                                )}>
                                  {contact.platform.charAt(0)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
