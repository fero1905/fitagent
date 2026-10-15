import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { readLanguage, saveLanguage } from '@/i18n/storage';
import { translate, type Language } from '@/i18n/translations';
type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string, params?: Record<string, string | number>) => string;
};
const LanguageContext = createContext<LanguageContextValue | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>('tr');
  const interacted = useRef(false);
  const writes = useRef(Promise.resolve());
  useEffect(() => {
    let active = true;
    void readLanguage().then(saved => { if (active && !interacted.current && saved) updateLanguage(saved); });
    return () => { active = false; };
  }, []);
  const setLanguage = useCallback((next: Language) => {
    interacted.current = true;
    updateLanguage(next);
    writes.current = writes.current.catch(() => undefined).then(() => saveLanguage(next));
  }, []);
  const t = useCallback((text: string, params?: Record<string, string | number>) => translate(language, text, params), [language]);
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage requires LanguageProvider');
  return value;
}
