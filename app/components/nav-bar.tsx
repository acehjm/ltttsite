import { Link, useLocation } from "@remix-run/react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { GlobeIcon, ChevronDownIcon } from "@radix-ui/react-icons"

const navItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "projects", href: "/projects" },
  { name: "contact", href: "/contact" },
]

export function NavBar() {
  const location = useLocation()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  
  const headerOpacity = useTransform(
    scrollY,
    [0, 50],
    ["rgba(24, 24, 27, 0)", "rgba(24, 24, 27, 0.6)"]
  )

  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(8px)"]
  )

  const borderOpacity = useTransform(
    scrollY,
    [0, 50],
    ["rgba(39, 39, 42, 0)", "rgba(39, 39, 42, 0.2)"]
  )

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", updateScrolled)
    return () => window.removeEventListener("scroll", updateScrolled)
  }, [])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsOpen(false)
  }
  
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: headerOpacity,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
          borderBottom: "1px solid",
          borderColor: borderOpacity,
          boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
          transition: 'box-shadow 0.3s ease'
        }}
      />
      
      <nav className="container mx-auto px-4 h-12 relative">
        <div className="flex items-center justify-between h-full max-w-5xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link 
              to="/" 
              className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400"
            >
              lttt.dev
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <motion.ul 
              className="flex items-center gap-0.5"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.href
                
                return (
                  <motion.li 
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <Link
                      to={item.href}
                      className={`relative px-3 py-1 rounded-full text-sm font-medium transition-all
                        ${isActive ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'}
                        ${isScrolled ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-800/30'}`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className={`absolute inset-0 rounded-full ${isScrolled ? 'bg-zinc-800/50' : 'bg-zinc-800/30'}`}
                          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                        />
                      )}
                      <span className="relative">
                        {t(`nav.${item.name}`)}
                      </span>
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                <GlobeIcon className="w-3.5 h-3.5" />
                <span>{i18n.language === 'en' ? 'EN' : '中文'}</span>
                <ChevronDownIcon 
                  className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="language-menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 py-1.5 w-20 rounded-lg bg-zinc-900/90 border border-zinc-800 shadow-lg backdrop-blur-sm"
                  >
                    <button
                      onClick={() => {
                        i18n.changeLanguage('en');
                        setIsOpen(false);
                      }}
                      className={`w-full px-3 py-1 text-left hover:bg-zinc-800/50 transition-colors flex items-center gap-2
                        ${i18n.language === 'en' ? 'text-zinc-200' : 'text-zinc-400'} text-xs`}
                    >
                      <span>English</span>
                      {i18n.language === 'en' && (
                        <motion.div
                          layoutId="language-indicator"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.15 }}
                          className="w-1 h-1 rounded-full bg-zinc-400"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        i18n.changeLanguage('zh');
                        setIsOpen(false);
                      }}
                      className={`w-full px-3 py-1 text-left hover:bg-zinc-800/50 transition-colors flex items-center gap-2
                        ${i18n.language === 'zh' ? 'text-zinc-200' : 'text-zinc-400'} text-xs`}
                    >
                      <span>中文</span>
                      {i18n.language === 'zh' && (
                        <motion.div
                          layoutId="language-indicator"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.15 }}
                          className="w-1 h-1 rounded-full bg-zinc-400"
                        />
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
