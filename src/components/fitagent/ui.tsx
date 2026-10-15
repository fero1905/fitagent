import { useLanguage } from '@/context/language-context';
import { useState, type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { FitAgentColors, FitAgentRadius } from '@/constants/fitagent-theme';

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function FieldLabel({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  return <Text style={styles.label}>{typeof children === 'string' ? t(children) : children}</Text>;
}

export function FieldError({ message }: { message?: string }) {
  const { t } = useLanguage();
  if (!message) {
    return null;
  }
  return <Text accessibilityLiveRegion="polite" style={styles.error}>{t(message)}</Text>;
}

export function LabeledInput({
  label,
  error,
  ...inputProps
}: TextInputProps & { label: string; error?: string }) {
  const { t } = useLanguage();
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.field}>
      <FieldLabel>{label}</FieldLabel>
      <TextInput
        placeholderTextColor={FitAgentColors.textMuted}
        {...inputProps}
        placeholder={inputProps.placeholder ? t(inputProps.placeholder) : undefined}
        accessibilityLabel={t(inputProps.accessibilityLabel ?? label)}
        onFocus={(event) => { setFocused(true); inputProps.onFocus?.(event); }}
        onBlur={(event) => { setFocused(false); inputProps.onBlur?.(event); }}
        style={[styles.input, focused ? { borderColor: FitAgentColors.mintDark } : null, error ? styles.inputError : null, inputProps.style]}
      />
      <FieldError message={error} />
    </View>
  );
}

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const { t } = useLanguage();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : null,
        pressed ? styles.pressed : null,
      ]}>
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : null]}>{t(label)}</Text>
    </Pressable>
  );
}

export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}) {
  const { t } = useLanguage();
  const isSecondary = variant === 'secondary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isSecondary ? styles.buttonSecondary : styles.buttonPrimary,
        pressed ? styles.pressed : null,
      ]}>
      <Text style={[styles.buttonText, isSecondary ? styles.buttonTextSecondary : null]}>
        {t(label)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: FitAgentColors.card,
    borderRadius: FitAgentRadius.card,
    borderWidth: 1.5,
    borderColor: FitAgentColors.border,
    padding: 20,
    gap: 16,
    shadowColor: "#173D2B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },
  field: {
    gap: 8,
  },
  label: {
    color: FitAgentColors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  input: {
    backgroundColor: FitAgentColors.input,
    borderWidth: 1.5,
    borderColor: FitAgentColors.borderStrong,
    borderRadius: FitAgentRadius.control,
    color: FitAgentColors.text,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputError: {
    borderColor: FitAgentColors.error,
  },
  error: {
    color: FitAgentColors.error,
    fontSize: 13,
    fontWeight: '600',
  },
  chip: {
    backgroundColor: FitAgentColors.input,
    borderWidth: 1.5,
    borderColor: FitAgentColors.borderStrong,
    borderRadius: FitAgentRadius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipSelected: {
    backgroundColor: FitAgentColors.mint,
    borderColor: FitAgentColors.mintDark,
  },
  chipText: {
    color: FitAgentColors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  chipTextSelected: {
    color: FitAgentColors.white,
  },
  button: {
    borderRadius: FitAgentRadius.control,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  buttonPrimary: {
    backgroundColor: FitAgentColors.mint,
    borderColor: FitAgentColors.mintDark,
  },
  buttonSecondary: {
    backgroundColor: FitAgentColors.white,
    borderColor: FitAgentColors.borderStrong,
  },
  buttonText: {
    color: FitAgentColors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  buttonTextSecondary: {
    color: FitAgentColors.mintDark,
  },
  pressed: {
    opacity: 0.85,
  },
});
