import Storage from 'expo-sqlite/kv-store';
import type { Language } from './translations';
const KEY = 'fitagent.language.v1';
export async function readLanguage(): Promise<Language | null> {
  try { const value = await Storage.getItem(KEY); return value === 'tr' || value === 'en' ? value : null; }
  catch { return null; }
}
export async function saveLanguage(language: Language): Promise<void> {
  try { await Storage.setItem(KEY, language); } catch { /* Language still works in memory if storage is unavailable. */ }
}
