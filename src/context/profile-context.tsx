import { createContext, use, useMemo, useState, type ReactNode } from 'react';

import { emptyProfile, type ProfileForm } from '@/types/profile';

type ProfileContextValue = {
  profile: ProfileForm;
  setProfile: (next: ProfileForm | ((current: ProfileForm) => ProfileForm)) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileForm>(emptyProfile);
  const value = useMemo(() => ({ profile, setProfile }), [profile]);

  return <ProfileContext value={value}>{children}</ProfileContext>;
}

export function useProfile() {
  const context = use(ProfileContext);
  if (!context) {
    throw new Error('useProfile, ProfileProvider içinde kullanılmalıdır.');
  }
  return context;
}
