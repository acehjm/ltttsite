import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import { AnimatePresence, motion } from 'framer-motion';
import './i18n/i18n';
// 使用 ?url 查询参数来处理样式文件
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export default function App() {
  const location = useLocation();

  return (
    <html lang="en" className="dark antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-50" 
        style={{
          "--background": "0 0% 3.9%",
          "--foreground": "0 0% 98%",
          "--card": "0 0% 3.9%",
          "--card-foreground": "0 0% 98%",
          "--popover": "0 0% 3.9%",
          "--popover-foreground": "0 0% 98%",
          "--primary": "262.1 83.3% 57.8%",
          "--primary-foreground": "210 40% 98%",
          "--secondary": "217.2 32.6% 17.5%",
          "--secondary-foreground": "210 40% 98%",
          "--muted": "217.2 32.6% 17.5%",
          "--muted-foreground": "215 20.2% 65.1%",
          "--accent": "217.2 32.6% 17.5%",
          "--accent-foreground": "210 40% 98%",
          "--destructive": "0 62.8% 30.6%",
          "--destructive-foreground": "210 40% 98%",
          "--border": "217.2 32.6% 17.5%",
          "--input": "217.2 32.6% 17.5%",
          "--ring": "224.3 76.3% 48%",
          "--radius": "0.75rem"
        } as React.CSSProperties}
      >
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
