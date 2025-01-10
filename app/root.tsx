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
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n/i18n';
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export default function App() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <html lang={i18n.language} className="dark antialiased">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="min-h-screen bg-zinc-950 text-zinc-50">
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="relative"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </I18nextProvider>
  );
}