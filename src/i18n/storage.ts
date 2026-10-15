import type { Language } from './translations';
const KEY = 'fitagent.language.v1';
// Web implementation; Metro uses storage.native.ts on iOS and Android.
export async function readLanguage(): Promise<Language | null> {
  try { const value = globalThis.localStorage?.getItem(KEY); return value === 'tr' || value === 'en' ? value : null; }
  catch { return null; }
}
export async function saveLanguage(language: Language): Promise<void> {
  try { globalThis.localStorage?.setItem(KEY, language); } catch { /* Keep the current in-memory language. */ }
}
