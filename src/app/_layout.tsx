import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FitAgentColors } from '@/constants/fitagent-theme';
import { ProfileProvider } from '@/context/profile-context';
import { LanguageProvider, useLanguage } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/fitagent/language-switcher';
void SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  return <SafeAreaProvider><LanguageProvider><ProfileProvider><AppShell /></ProfileProvider></LanguageProvider></SafeAreaProvider>;
}
function AppShell() {
  const { t } = useLanguage();
  useEffect(() => { void SplashScreen.hideAsync(); }, []);
  return <View style={{ flex: 1, backgroundColor: FitAgentColors.background }}>
    <StatusBar style="dark" />
    <LanguageSwitcher />
    <Stack screenOptions={{
      headerStyle: { backgroundColor: FitAgentColors.background },
      headerTintColor: FitAgentColors.mintDark,
      headerTitleStyle: { color: FitAgentColors.text, fontWeight: '700' },
      headerShadowVisible: false,
      headerBackTitle: t('Geri'),
      contentStyle: { backgroundColor: FitAgentColors.background },
    }}>
      <Stack.Screen name="index" options={{ headerShown: false, title: t('Ana sayfa') }} />
      <Stack.Screen name="profile" options={{ title: t('Profil') }} />
      <Stack.Screen name="summary" options={{ title: t('Özet') }} />
    </Stack>
  </View>;
}
