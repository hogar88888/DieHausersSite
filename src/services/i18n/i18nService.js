import { createContext, useContext, useState, useCallback, createElement } from 'react';
import { translations } from './translations';

const STORAGE_KEY = 'diehausers.lang';
const SUPPORTED_LANGUAGES = ['hr', 'en'];
const DEFAULT_LANGUAGE = 'en';

const LanguageContext = createContext(null);

function getInitialLanguage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
            return stored;
        }
    } catch (error) {
        // localStorage unavailable (e.g. SSR or blocked storage) – fall through
    }
    return DEFAULT_LANGUAGE;
}

function resolvePath(root, segments) {
    let node = root;
    for (const segment of segments) {
        if (node == null) {
            return undefined;
        }
        node = node[segment];
    }
    return typeof node === 'string' ? node : undefined;
}

function translate(key, lang) {
    const segments = key.split('.');
    const active = resolvePath(translations[lang], segments);
    if (active !== undefined) {
        return active;
    }
    // Key missing for the active language – fall back to the default language
    const fallback = resolvePath(translations[DEFAULT_LANGUAGE], segments);
    return fallback !== undefined ? fallback : key;
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(getInitialLanguage);

    const setLang = useCallback((nextLanguage) => {
        if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) {
            return;
        }
        setLanguage(nextLanguage);
        try {
            localStorage.setItem(STORAGE_KEY, nextLanguage);
        } catch (error) {
            // Ignore storage failures – the UI will still switch language
        }
    }, []);

    const t = useCallback(
        (key) => translate(key, language),
        [language]
    );

    const value = {
        language,
        setLang,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
    };

    return createElement(
        LanguageContext.Provider,
        { value },
        children
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
}