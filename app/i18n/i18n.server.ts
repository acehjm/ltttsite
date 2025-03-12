import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nConfig } from "./i18n.config";

export function createI18nInstance(lng: string = "en") {
    const instance = createInstance();
    instance.use(initReactI18next).init({
        ...i18nConfig,
        lng,
        interpolation: {
            escapeValue: false,
        },
    });

    return instance;
}
