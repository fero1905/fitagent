import { useLanguage } from '@/context/language-context';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { FitAgentScreen } from '@/components/fitagent/screen';
import { Card, PrimaryButton } from '@/components/fitagent/ui';
import { FitAgentColors as C } from '@/constants/fitagent-theme';
export default function WelcomeScreen() {
  const { t } = useLanguage();
  return <FitAgentScreen>
    <View style={s.brand}><View style={s.logo}><Text style={s.logoText}>F</Text></View><Text style={s.brandText}>FitAgent</Text><View style={s.badge}><Text style={s.badgeText}>{t("SENİN TEMPON")}</Text></View></View>
    <View style={s.hero}>
      <Text style={s.eyebrow}>{t("DAHA İYİ BİR RUTİNE İLK ADIM")}</Text>
      <Text style={s.title}>{t("Kendi tempon.")}{'\n'}{t("Kendi ")}<Text style={s.green}>{t("hedefin.")}</Text></Text>
      <Text style={s.description}>{t("Hedeflerini, zamanını ve imkanlarını bir araya getir. Sana uygun antrenman yolculuğunun temelini oluştur.")}</Text>
      <View style={s.visual} accessible={false}>
        <View style={s.orbit} /><View style={s.innerOrbit} />
        <View style={s.bar}><View style={s.plate} /><View style={s.shaft} /><View style={s.plate} /></View>
        <View style={s.visualLabel}><Text style={s.visualLabelText}>{t("KÜÇÜK ADIMLAR, YENİ BİR RUTİN")}</Text></View>
      </View>
    </View>
    <View style={s.steps}>{[['01', t("Hedefini seç")], ['02', t("Ritmini belirle")], ['03', t("Profilini tamamla")]].map(([n, text]) => <View key={n} style={s.step}><Text style={s.stepNo}>{n}</Text><Text style={s.stepText}>{t(text)}</Text></View>)}</View>
    <Card><Text style={s.cardTitle}>{t("Hayatına uyacak bir başlangıç")}</Text><Text style={s.description}>{t("Evde veya spor salonunda. Kısa bir arada veya haftanın seçtiğin günlerinde. Önce seni tanıyalım.")}</Text><View style={s.tags}>{[t("Hedefin"), t("Zamanın"), t("Ekipmanın")].map(text => <View key={text} style={s.tag}><Text style={s.tagText}>{t(text)}</Text></View>)}</View></Card>
    <PrimaryButton label={t("Profilimi oluştur  →")} onPress={() => router.push('/profile')} />
    <Text style={s.footer}>{t("Şimdi profilini hazırla; plan bağlantısı sonraki adımda eklenecek.")}</Text>
  </FitAgentScreen>;
}
const s = StyleSheet.create({
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, flexWrap: 'wrap' }, logo: { backgroundColor: C.mintDark, width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: 'white', fontWeight: '900', fontSize: 22 }, brandText: { fontWeight: '800', fontSize: 20, color: C.text }, badge: { marginLeft: 'auto', backgroundColor: C.mintSoft, padding: 8, borderRadius: 10 }, badgeText: { color: C.mintDark, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  hero: { gap: 15, paddingTop: 20 }, eyebrow: { fontSize: 10, fontWeight: '800', color: C.mintDark, letterSpacing: 1.5 }, title: { fontSize: 43, lineHeight: 49, fontWeight: '800', letterSpacing: -1.6, color: C.text }, green: { color: C.mintDark }, description: { fontSize: 14, lineHeight: 23, color: C.textMuted },
  visual: { height: 215, borderRadius: 32, overflow: 'hidden', backgroundColor: '#DDEFE8', alignItems: 'center', justifyContent: 'center' }, orbit: { position: 'absolute', width: 235, height: 235, borderRadius: 118, borderWidth: 24, borderColor: '#CEE7DB', right: -45, top: -60 }, innerOrbit: { position: 'absolute', width: 150, height: 150, borderRadius: 75, backgroundColor: '#D4E5EE', left: -45, bottom: -45 },
  bar: { flexDirection: 'row', alignItems: 'center', transform: [{ rotate: '-25deg' }], marginBottom: 15 }, shaft: { width: 98, height: 17, backgroundColor: '#79AB91' }, plate: { width: 43, height: 98, borderRadius: 15, backgroundColor: '#205F47', borderWidth: 7, borderColor: '#377B5E' }, visualLabel: { position: 'absolute', bottom: 20, backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12 }, visualLabelText: { fontSize: 9, fontWeight: '800', letterSpacing: 1, color: C.mintDark },
  steps: { flexDirection: 'row', gap: 8 }, step: { flex: 1, backgroundColor: 'white', borderRadius: 18, padding: 14, gap: 7 }, stepNo: { color: C.mintDark, fontSize: 12, fontWeight: '800' }, stepText: { color: C.text, fontSize: 12, fontWeight: '700', lineHeight: 17 }, cardTitle: { color: C.text, fontSize: 19, fontWeight: '800' }, tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, tag: { paddingHorizontal: 12, paddingVertical: 7, backgroundColor: C.input, borderRadius: 10 }, tagText: { color: C.mintDark, fontSize: 12, fontWeight: '700' }, footer: { color: C.textMuted, textAlign: 'center', fontSize: 11, lineHeight: 17, marginBottom: 8 },
});
