import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '@/context/language-context';
import { FitAgentColors as C } from '@/constants/fitagent-theme';
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return <SafeAreaView edges={['top', 'left', 'right']} style={s.safe}>
    <View style={s.row} accessibilityLabel={t('Dil')}>
      {([{ code: 'tr', flag: '🇹🇷', label: 'TR', name: 'Türkçe' }, { code: 'en', flag: '🇬🇧', label: 'EN', name: 'English' }] as const).map(item => (
        <Pressable key={item.code} accessibilityRole="button" accessibilityLabel={item.name}
          accessibilityState={{ selected: language === item.code }} onPress={() => setLanguage(item.code)}
          style={({ pressed }) => [s.button, language === item.code && s.selected, pressed && { opacity: 0.75 }]}>
          <Text style={s.flag}>{item.flag}</Text><Text style={[s.text, language === item.code && s.selectedText]}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  </SafeAreaView>;
}
const s = StyleSheet.create({
  safe: { backgroundColor: C.background }, row: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, paddingVertical: 8 },
  button: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingHorizontal: 13, borderRadius: 14, borderWidth: 1, borderColor: C.borderStrong, backgroundColor: C.white },
  selected: { backgroundColor: C.mintDark, borderColor: C.mintDark }, flag: { fontSize: 21 }, text: { color: C.text, fontSize: 13, fontWeight: '800' }, selectedText: { color: C.white },
});
