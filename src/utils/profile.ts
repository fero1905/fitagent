import {
  EQUIPMENT_OPTIONS,
  GOALS,
  LEVELS,
  WEEKDAYS,
  type Equipment,
  type Goal,
  type ProfileErrors,
  type ProfileForm,
  type Weekday,
} from '@/types/profile';

export function weeklyDayCount(days: Weekday[]): number {
  return days.length;
}

export function toggleDay(days: Weekday[], day: Weekday): Weekday[] {
  if (days.includes(day)) {
    return days.filter((item) => item !== day);
  }
  return [...days, day];
}

export function toggleEquipment(equipment: Equipment[], item: Equipment): Equipment[] {
  if (item === 'none') {
    return equipment.includes('none') ? [] : ['none'];
  }

  const withoutNone = equipment.filter((value) => value !== 'none');
  if (withoutNone.includes(item)) {
    return withoutNone.filter((value) => value !== item);
  }
  return [...withoutNone, item];
}

export function parsePositiveInteger(value: string): number | null {
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) {
    return null;
  }
  const parsed = Number(trimmed);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

export function parsePositiveFiniteNumber(value: string): number | null {
  const normalized = value.trim().replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return null;
  }
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

export function validateProfile(form: ProfileForm): ProfileErrors {
  const errors: ProfileErrors = {};

  const nameError = validateName(form.name);
  if (nameError) errors.name = nameError;

  if (!form.birthDate.trim()) {
    errors.birthDate = 'Doğum tarihi zorunludur.';
  } else if (!parseBirthDate(form.birthDate)) {
    errors.birthDate = 'Geçerli bir tarih gir: GG.AA.YYYY. Gelecek tarih seçilemez.';
  }

  if (form.heightCm.trim().length === 0) {
    errors.heightCm = 'Boy zorunludur.';
  } else if (parsePositiveFiniteNumber(form.heightCm) === null) {
    errors.heightCm = 'Boy pozitif ve geçerli bir sayı olmalıdır.';
  }

  if (form.weightKg.trim().length === 0) {
    errors.weightKg = 'Kilo zorunludur.';
  } else if (parsePositiveFiniteNumber(form.weightKg) === null) {
    errors.weightKg = 'Kilo pozitif ve geçerli bir sayı olmalıdır.';
  }

  if (!GOALS.some(item => item.id === form.goal)) {
    errors.goal = 'Bir ana hedef seçin.';
  }
  if (new Set(form.additionalGoals).size !== form.additionalGoals.length ||
      form.additionalGoals.some(goal => goal === form.goal || !GOALS.some(item => item.id === goal))) {
    errors.additionalGoals = 'Ek hedefler farklı olmalı ve ana hedefi tekrar etmemeli.';
  }

  if (form.level === null) {
    errors.level = 'Bir seviye seçin.';
  }

  if (form.days.length === 0) {
    errors.days = 'En az bir gün seçin.';
  }

  if (form.durationMinutes === null) {
    errors.durationMinutes = 'Antrenman süresini seçin.';
  }

  if (form.location === null) {
    errors.location = 'Ev veya spor salonunu seçin.';
  }
  if (form.location === 'home' && !isHomeEquipmentValid(form.equipment)) {
    errors.equipment = 'Ev için ekipmanlarını veya Ekipmansız seçeneğini belirle.';
  }
  if (form.location === 'gym' && (form.equipment.length !== 1 || form.equipment[0] !== 'gym')) {
    errors.equipment = 'Spor salonu tercihini yeniden seçin.';
  }

  return errors;
}

export function isProfileValid(form: ProfileForm): boolean {
  return Object.keys(validateProfile(form)).length === 0;
}

export function labelForGoal(goal: ProfileForm['goal']): string {
  return GOALS.find((item) => item.id === goal)?.label ?? '—';
}

export function labelForLevel(level: ProfileForm['level']): string {
  return LEVELS.find((item) => item.id === level)?.label ?? '—';
}

export function labelsForDays(days: Weekday[]): string {
  if (days.length === 0) {
    return '—';
  }
  const order = WEEKDAYS.map((day) => day.id);
  return [...days]
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((day) => WEEKDAYS.find((item) => item.id === day)?.label)
    .filter(Boolean)
    .join(', ');
}

export function labelsForEquipment(equipment: Equipment[]): string {
  if (equipment.includes('gym')) return 'Spor salonu ekipmanları';
  if (equipment.length === 0) {
    return '—';
  }
  const order: Equipment[] = EQUIPMENT_OPTIONS.map((item) => item.id);
  return [...equipment]
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((item) => EQUIPMENT_OPTIONS.find((option) => option.id === item)?.label)
    .filter(Boolean)
    .join(', ');
}

// Birth date is displayed and held as DD.MM.YYYY; backend mapping can send ISO later.
export function formatBirthDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean).join('.');
}
export function parseBirthDate(value: string, today = new Date()): Date | null {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value.trim());
  if (!match) return null;
  const day = Number(match[1]), month = Number(match[2]), year = Number(match[3]);
  if (year < 1900 || month < 1 || month > 12 || day < 1) return null;
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return date > currentDay ? null : date;
}
export function ageFromBirthDate(value: string, today = new Date()): number | null {
  const birth = parseBirthDate(value, today);
  if (!birth) return null;
  let age = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
  return age;
}
export function isHomeEquipmentValid(equipment: Equipment[]): boolean {
  const allowed: readonly string[] = EQUIPMENT_OPTIONS.map(item => item.id);
  return equipment.length > 0 && equipment.every(item => allowed.includes(item)) &&
    !(equipment.includes('none') && equipment.length > 1);
}
export function profileWithLocation(form: ProfileForm, location: 'home' | 'gym'): ProfileForm {
  return { ...form, location, equipment: location === 'gym' ? ['gym'] : form.equipment.filter(item => item !== 'gym') };
}

export function sanitizeName(value: string): string {
  return value.normalize('NFC').replace(/[^\p{L}\p{M} '\u2019-]/gu, '');
}
export function validateName(value: string): string | undefined {
  const normalized = value.normalize('NFC').trim().replace(/ +/g, ' ');
  if (!normalized) return 'Ad boş bırakılamaz.';
  if (!/^\p{L}[\p{L}\p{M}]*(?:[ '\u2019-][\p{L}\p{M}]+)*$/u.test(normalized)) {
    return 'Adında yalnızca harf, kelimeler arasında boşluk, tire veya apostrof kullan.';
  }
  return undefined;
}
export function withPrimaryGoal(form: ProfileForm, goal: Goal): ProfileForm {
  return { ...form, goal, additionalGoals: form.additionalGoals.filter(item => item !== goal) };
}
export function toggleAdditionalGoal(form: ProfileForm, goal: Goal): ProfileForm {
  if (goal === form.goal) return form;
  return { ...form, additionalGoals: form.additionalGoals.includes(goal)
    ? form.additionalGoals.filter(item => item !== goal) : [...form.additionalGoals, goal] };
}
export function labelsForAdditionalGoals(goals: Goal[]): string {
  return GOALS.filter(item => goals.includes(item.id)).map(item => item.label).join(', ');
}
