import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { FitAgentColors } from '@/constants/fitagent-theme';
import { ProfileProvider } from '@/context/profile-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  return (
    <ProfileProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: FitAgentColors.background },
          headerTintColor: FitAgentColors.mintDark,
          headerTitleStyle: {
            color: FitAgentColors.text,
            fontWeight: '700',
          },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: FitAgentColors.background },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ title: 'Profil' }} />
        <Stack.Screen name="summary" options={{ title: 'Özet' }} />
      </Stack>
    </ProfileProvider>
  );
}
