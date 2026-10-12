import { StyleSheet, Text, View } from 'react-native';
import { FitAgentColors as C } from '@/constants/fitagent-theme';
export function SectionHeading({ number, title, detail }: { number: string; title: string; detail: string }) {
  return <View style={s.heading}><View style={s.number}><Text style={s.numberText}>{number}</Text></View><View style={{ flex: 1 }}><Text style={s.title}>{title}</Text><Text style={s.detail}>{detail}</Text></View></View>;
}
export function PageHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return <View style={s.page}><Text style={s.eyebrow}>{eyebrow}</Text><Text style={s.pageTitle}>{title}</Text><Text style={s.body}>{detail}</Text></View>;
}
export function Metric({ value, label, unit }: { value: string; label: string; unit?: string }) {
  return <View style={s.metric}><Text style={s.metricLabel}>{label}</Text><Text style={s.metricValue}>{value || '—'}</Text>{unit ? <Text style={s.detail}>{unit}</Text> : null}</View>;
}
const s = StyleSheet.create({
  heading: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 },
  number: { width: 38, height: 38, borderRadius: 12, backgroundColor: C.mintSoft, alignItems: 'center', justifyContent: 'center' },
  numberText: { color: C.mintDark, fontWeight: '800', fontSize: 14 }, title: { color: C.text, fontSize: 18, fontWeight: '800' },
  detail: { color: C.textMuted, fontSize: 12, lineHeight: 18 }, page: { gap: 8, paddingVertical: 12 },
  eyebrow: { color: C.mintDark, fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  pageTitle: { color: C.text, fontSize: 30, lineHeight: 36, fontWeight: '800', letterSpacing: -0.7 }, body: { color: C.textMuted, fontSize: 15, lineHeight: 23 },
  metric: { flex: 1, minWidth: 80, padding: 16, backgroundColor: '#EAF5EF', borderRadius: 20, gap: 5 }, metricLabel: { fontSize: 11, color: C.textMuted, fontWeight: '700' }, metricValue: { fontSize: 25, color: C.text, fontWeight: '800' },
});
