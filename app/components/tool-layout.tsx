import { motion } from "framer-motion";

interface ToolLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}

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

export function ToolLayout({ children, title, description, badge }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 主渐变背景 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.12),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(20,184,166,0.12),transparent_50%)] opacity-20" />

        {/* 网格背景 */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)",
          }}
        />

        {/* 动态光斑效果 */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 text-violet-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {badge}
            </motion.span>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              <motion.h1 variants={item} className="text-3xl font-bold tracking-tight text-zinc-100">
                {title}
              </motion.h1>
              <motion.p variants={item} className="text-zinc-400 max-w-2xl">
                {description}
              </motion.p>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function ToolPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={item} className={`group relative bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 hover:border-purple-500/20 transition-all duration-300 ${className}`}>
      {/* 高亮线圈 */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/15 to-teal-500/15 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      <div className="absolute -inset-[1px] rounded-xl bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),rgba(20,184,166,0.1)_70%)] opacity-0 group-hover:opacity-5 blur-[1px] transition-opacity duration-500" />

      <div className="relative p-6 space-y-4">
        {children}
      </div>
    </motion.div>
  );
}

export function ToolButton({ 
  children, 
  active = false,
  disabled = false,
  onClick,
  className = "",
  fullWidth = false,
}: { 
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg transition-all duration-300
        ${active
          ? "bg-violet-500/20 text-violet-300"
          : disabled
          ? "bg-zinc-800/20 text-zinc-600 cursor-not-allowed"
          : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
        }
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function ToolInput({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
}: {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full px-4 py-2 rounded-lg
        bg-zinc-800/50 text-zinc-300
        placeholder:text-zinc-600
        focus:outline-none focus:ring-2 focus:ring-violet-500/20
        transition-all duration-300
        ${className}
      `}
    />
  );
}

export function ToolTextArea({
  value,
  onChange,
  placeholder = "",
  className = "",
  readOnly = false,
}: {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`
        w-full px-4 py-3 rounded-lg
        bg-zinc-800/50 text-zinc-300
        placeholder:text-zinc-600
        focus:outline-none focus:ring-2 focus:ring-violet-500/20
        transition-all duration-300
        font-mono text-sm
        resize-none
        ${className}
      `}
    />
  );
}

export function ToolSelect({
  value,
  onChange,
  options,
  className = "",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`
        w-full px-4 py-2 rounded-lg
        bg-zinc-800/50 text-zinc-300
        focus:outline-none focus:ring-2 focus:ring-violet-500/20
        transition-all duration-300
        ${className}
      `}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function ToolLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-zinc-400">
      {children}
    </label>
  );
}

export function ToolSection({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-medium text-zinc-300">{title}</h3>
      )}
      {children}
    </div>
  );
}

export function ToolGrid({ children, cols = 1 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className={`grid grid-cols-1 ${
      cols === 2 ? "lg:grid-cols-2" : 
      cols === 3 ? "md:grid-cols-2 lg:grid-cols-3" :
      cols === 4 ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" :
      ""
    } gap-6`}>
      {children}
    </div>
  );
}

export function ToolDivider() {
  return <div className="h-px bg-zinc-800/50 my-6" />;
}
