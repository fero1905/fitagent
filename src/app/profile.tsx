import { useLanguage } from '@/context/language-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PageHeading, SectionHeading } from '@/components/fitagent/design';
import { FitAgentScreen } from '@/components/fitagent/screen';
import { Card, Chip, FieldError, FieldLabel, LabeledInput, PrimaryButton } from '@/components/fitagent/ui';
import { FitAgentColors } from '@/constants/fitagent-theme';
import { useProfile } from '@/context/profile-context';
import {
  DURATIONS,
  EQUIPMENT_OPTIONS,
  GOALS,
  LEVELS,
  WEEKDAYS,
  type ProfileErrors,
} from '@/types/profile';
import { toggleDay, validateProfile, weeklyDayCount, formatBirthDateInput, ageFromBirthDate, profileWithLocation, toggleEquipment, labelsForEquipment, sanitizeName, validateName, withPrimaryGoal, toggleAdditionalGoal, labelsForAdditionalGoals } from '@/utils/profile';

export default function ProfileScreen() {
  const { t, language } = useLanguage();
  const { profile, setProfile } = useProfile();
  const [errors, setErrors] = useState<ProfileErrors>({});

  const goToSummary = () => {
    const nextErrors = validateProfile(profile);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    router.push('/summary');
  };

  return (
    <FitAgentScreen edges={['right', 'bottom', 'left']}>
      <PageHeading eyebrow={t("SENİ TANIYALIM")} title={t("Senin hedefin, senin ritmin")} detail={t("Birkaç bilgiyle başlayalım. Tercihlerini özet ekranında kontrol edip düzenleyebilirsin.")} />

      <Card>
        <SectionHeading number="01" title={t("Kişisel bilgilerin")} detail={t("Sana ait temel bilgilerle başlayalım.")} />
        <LabeledInput
          label={t("İsim Soyisim")}
          placeholder={t("İsmini ve soyismini yaz")}
          value={profile.name}
          onChangeText={(value) => {
            const name = sanitizeName(value);
            setProfile(current => ({ ...current, name }));
            setErrors(current => ({ ...current, name: name !== value.normalize('NFC')
              ? 'Sayı ve özel karakterler isim alanına eklenemez.' : validateName(name) }));
          }}
          autoCapitalize="words"
          error={errors.name}
        />
        <LabeledInput
          label={t("Doğum tarihi")}
          placeholder={t("GG.AA.YYYY (ör. 15.04.2002)")}
          value={profile.birthDate}
          onChangeText={(value) => setProfile({ ...profile, birthDate: formatBirthDateInput(value) })}
          maxLength={10}
          keyboardType="number-pad"
          error={errors.birthDate}
        />
        <Text style={styles.hint}>{ageFromBirthDate(profile.birthDate) !== null ? t("Yaşın otomatik hesaplanır: {age}", { age: ageFromBirthDate(profile.birthDate) ?? 0 }) : t("Gün, ay ve yıl gir; yaşın otomatik hesaplanacak.")}</Text>
        <LabeledInput
          label={t("Boy (cm)")}
          placeholder={t("Örn. 175")}
          value={profile.heightCm}
          onChangeText={(heightCm) => setProfile({ ...profile, heightCm })}
          keyboardType="decimal-pad"
          error={errors.heightCm}
        />
        <LabeledInput
          label={t("Kilo (kg)")}
          placeholder={t("Örn. 72,5")}
          value={profile.weightKg}
          onChangeText={(weightKg) => setProfile({ ...profile, weightKg })}
          keyboardType="decimal-pad"
          error={errors.weightKg}
        />
      </Card>

      <Card>
        <SectionHeading number="02" title={t("Hedef ve deneyim")} detail={t("Nereye ulaşmak istediğini ve başlangıç seviyeni seç.")} />
        <View style={styles.field}>
          <FieldLabel>{t("Ana hedefin")}</FieldLabel>
          <Text style={styles.hint}>{t("Planının önceliği olacak bir hedef seç.")}</Text>
          <View style={styles.chips}>
            {GOALS.map((goal) => (
              <Chip
                key={goal.id}
                label={goal.label}
                selected={profile.goal === goal.id}
                onPress={() => setProfile(current => withPrimaryGoal(current, goal.id))}
              />
            ))}
          </View>
          <FieldError message={errors.goal} />
        </View>
        <View style={styles.field}>
          <FieldLabel>{t("Ek hedeflerin (isteğe bağlı)")}</FieldLabel>
          <Text style={styles.hint}>{t("Birden fazla seçebilirsin. Ana hedefini burada tekrar seçmene gerek yok.")}</Text>
          <View style={styles.chips}>
            {GOALS.filter(goal => goal.id !== profile.goal).map(goal => (
              <Chip key={goal.id} label={goal.label} selected={profile.additionalGoals.includes(goal.id)}
                onPress={() => setProfile(current => toggleAdditionalGoal(current, goal.id))} />
            ))}
          </View>
          <View style={styles.selectedBox}>
            <Text style={styles.selectedTitle}>{t("HEDEF SEÇİMLERİN")}</Text>
            <Text style={styles.selectedText}>{t("Ana hedef: ")}{t(GOALS.find(goal => goal.id === profile.goal)?.label ?? t("Henüz seçilmedi"))}</Text>
            <Text style={styles.selectedText}>{t("Ek hedefler: ")}{labelsForAdditionalGoals(profile.additionalGoals, language) || t("Seçilmedi")}</Text>
          </View>
          <FieldError message={errors.additionalGoals} />
        </View>

        <View style={styles.field}>
          <FieldLabel>{t("Seviye")}</FieldLabel>
          <View style={styles.chips}>
            {LEVELS.map((level) => (
              <Chip
                key={level.id}
                label={level.label}
                selected={profile.level === level.id}
                onPress={() => setProfile({ ...profile, level: level.id })}
              />
            ))}
          </View>
          <FieldError message={errors.level} />
        </View>
      </Card>

      <Card>
        <SectionHeading number="03" title={t("Haftalık ritmin")} detail={t("Hayatına uyacak günleri ve süreyi belirle.")} />
        <View style={styles.field}>
          <FieldLabel>{t("Antrenman günleri")}</FieldLabel>
          <View style={styles.chips}>
            {WEEKDAYS.map((day) => (
              <Chip
                key={day.id}
                label={day.label}
                selected={profile.days.includes(day.id)}
                onPress={() => setProfile({ ...profile, days: toggleDay(profile.days, day.id) })}
              />
            ))}
          </View>
          <Text style={styles.hint}>{t("Haftalık gün sayısı: ")}{weeklyDayCount(profile.days)}</Text>
          <FieldError message={errors.days} />
        </View>

        <View style={styles.field}>
          <FieldLabel>{t("Süre")}</FieldLabel>
          <View style={styles.chips}>
            {DURATIONS.map((duration) => (
              <Chip
                key={duration}
                label={t("{duration} dk", { duration })}
                selected={profile.durationMinutes === duration}
                onPress={() => setProfile({ ...profile, durationMinutes: duration })}
              />
            ))}
          </View>
          <FieldError message={errors.durationMinutes} />
        </View>
      </Card>

      <Card>
        <SectionHeading number="04" title={t("Nerede antrenman yapacaksın?")} detail={t("Yerini seç; ekipman adımını buna göre hazırlayalım.")} />
        <View style={styles.chips}>
          <Chip label={t("Ev")} selected={profile.location === 'home'} onPress={() => {
            setProfile(current => profileWithLocation(current, 'home'));
          }} />
          <Chip label={t("Spor salonu")} selected={profile.location === 'gym'} onPress={() => {
            setProfile(current => profileWithLocation(current, 'gym'));
          }} />
        </View>
        <FieldError message={errors.location} />
        {profile.location === 'home' ? <>
          <View style={styles.homeEquipment}>
            <FieldLabel>{t("Evde hangi ekipmanların var?")}</FieldLabel>
            <Text style={styles.hint}>{t("Birden fazla seçebilirsin. Hiç ekipmanın yoksa Ekipmansız seç.")}</Text>
            <View style={styles.chips}>
              {EQUIPMENT_OPTIONS.map(option => (
                <Chip key={option.id} label={option.label}
                  selected={profile.equipment.includes(option.id)}
                  onPress={() => {
                    setProfile(current => ({ ...current, equipment: toggleEquipment(current.equipment, option.id) }));
                    setErrors(current => ({ ...current, equipment: undefined }));
                  }} />
              ))}
            </View>
            <View style={styles.selectedBox}>
              <Text style={styles.selectedTitle}>{t("SEÇTİĞİN EKİPMANLAR")}</Text>
              <Text style={styles.selectedText}>{profile.equipment.length ? labelsForEquipment(profile.equipment, language) : t("Henüz ekipman seçmedin.")}</Text>
            </View>
            <Text style={styles.hint}>{t("Ekipmansız ve diğer ekipmanlar birlikte seçilemez.")}</Text>
          </View>
          <FieldError message={errors.equipment} />
        </> : profile.location === 'gym' ? <Text style={styles.hint}>{t("Spor salonu ekipmanları kullanılabilir kabul edildi. Ayrı ekipman seçimi gerekmiyor.")}</Text> : null}

        <LabeledInput
          label={t("Kısıt veya kaçınılacak hareket (isteğe bağlı)")}
          value={profile.notes}
          onChangeText={(notes) => setProfile({ ...profile, notes })}
          multiline
          textAlignVertical="top"
          style={styles.notes}
        />
      </Card>

      <Text style={styles.hint}>{t("Bu aşamada bilgilerin kalıcı olarak kaydedilmez.")}</Text>
      {Object.values(errors).some(Boolean) ? <FieldError message={t("Devam etmek için işaretlenen alanları kontrol et.")} /> : null}
      <PrimaryButton label={t("Profil özetimi gör  →")} onPress={goToSummary} />
    </FitAgentScreen>
  );
}

const styles = StyleSheet.create({
  intro: {
    color: FitAgentColors.textMuted,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
  },
  field: {
    gap: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hint: {
    color: FitAgentColors.textMuted,
    fontSize: 13,
  },
  homeEquipment: { gap: 12, marginTop: 4, paddingTop: 16, borderTopWidth: 1, borderTopColor: FitAgentColors.border },
  selectedBox: { backgroundColor: FitAgentColors.mintSoft, padding: 15, borderRadius: 16, gap: 6 },
  selectedTitle: { color: FitAgentColors.mintDark, fontWeight: '800', fontSize: 10, letterSpacing: 1 },
  selectedText: { color: FitAgentColors.text, fontSize: 14, lineHeight: 22, fontWeight: '600' },
  notes: {
    minHeight: 96,
  },
});
