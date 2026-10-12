export const WEEKDAYS = [
  { id: 'mon', label: 'Pazartesi' },
  { id: 'tue', label: 'Salı' },
  { id: 'wed', label: 'Çarşamba' },
  { id: 'thu', label: 'Perşembe' },
  { id: 'fri', label: 'Cuma' },
  { id: 'sat', label: 'Cumartesi' },
  { id: 'sun', label: 'Pazar' },
] as const;

export type Weekday = (typeof WEEKDAYS)[number]['id'];

export const GOALS = [
  { id: 'lose_weight', label: 'Kilo verme' },
  { id: 'build_muscle', label: 'Kas geliştirme' },
  { id: 'gain_strength', label: 'Güç kazanma' },
  { id: 'endurance', label: 'Kondisyon ve dayanıklılık' },
  { id: 'flexibility', label: 'Esneklik ve hareketlilik' },
  { id: 'general_fitness', label: 'Aktif kalma / genel fitness' },
] as const;

export type Goal = (typeof GOALS)[number]['id'];

export const LEVELS = [
  { id: 'beginner', label: 'Başlangıç' },
  { id: 'intermediate', label: 'Orta' },
  { id: 'advanced', label: 'İleri' },
] as const;

export type Level = (typeof LEVELS)[number]['id'];

export const DURATIONS = [15, 30, 45, 60] as const;
export type DurationMinutes = (typeof DURATIONS)[number];

export const EQUIPMENT_OPTIONS = [
  { id: 'none', label: 'Ekipmansız' },
  { id: 'dumbbell', label: 'Dambıl' },
  { id: 'resistance_band', label: 'Direnç bandı' },
  { id: 'mat', label: 'Egzersiz matı' },
  { id: 'kettlebell', label: 'Kettlebell' },
  { id: 'pull_up_bar', label: 'Barfiks demiri' },
  { id: 'bench', label: 'Antrenman sehpası' },
  { id: 'jump_rope', label: 'Atlama ipi' },
] as const;

export type Equipment = (typeof EQUIPMENT_OPTIONS)[number]['id'] | 'gym';

export type ProfileForm = {
  name: string;
  birthDate: string;
  location: 'home' | 'gym' | null;
  heightCm: string;
  weightKg: string;
  goal: Goal | null;
  additionalGoals: Goal[];
  level: Level | null;
  days: Weekday[];
  durationMinutes: DurationMinutes | null;
  equipment: Equipment[];
  notes: string;
};

export type ProfileField = keyof ProfileForm;

export type ProfileErrors = Partial<Record<ProfileField, string>>;

export const emptyProfile: ProfileForm = {
  name: '',
  birthDate: '',
  location: null,
  heightCm: '',
  weightKg: '',
  goal: null,
  additionalGoals: [],
  level: null,
  days: [],
  durationMinutes: null,
  equipment: [],
  notes: '',
};
