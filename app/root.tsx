import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import styles from "./tailwind.css?url";
import fontStyles from "./styles/fonts.css?url";
import { Layout } from "./components/layout";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: fontStyles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
];

export default function App() {
  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      document.documentElement.lang = savedLang;
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <html lang={i18n.language} className="dark antialiased">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="lttt.dev - Personal Website" />
          <Meta />
          <Links />
        </head>
        <body className="min-h-screen bg-zinc-950 text-zinc-50">
          <Layout>
            <Outlet />
          </Layout>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </I18nextProvider>
  );
}