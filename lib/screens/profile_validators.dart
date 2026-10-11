import '../models/user_profile.dart';

double? parseDecimalInput(String? value) {
  if (value == null) {
    return null;
  }
  final normalized = value.trim().replaceAll(',', '.');
  if (normalized.isEmpty) {
    return null;
  }
  return double.tryParse(normalized);
}

String? validateProfileName(String? value) {
  if (value == null || value.trim().isEmpty) {
    return 'Ad gerekli';
  }
  return null;
}

String? validateProfileAge(String? value) {
  if (value == null || value.trim().isEmpty) {
    return 'Yaş gerekli';
  }
  final age = int.tryParse(value.trim());
  if (age == null) {
    return 'Geçerli bir yaş gir';
  }
  if (age <= 0) {
    return 'Yaş pozitif bir tam sayı olmalı';
  }
  return null;
}

String? validateProfileHeight(String? value) {
  if (value == null || value.trim().isEmpty) {
    return 'Boy gerekli';
  }
  final height = parseDecimalInput(value);
  if (height == null || !height.isFinite) {
    return 'Geçerli bir boy gir';
  }
  if (height <= 0) {
    return 'Boy pozitif bir sayı olmalı';
  }
  return null;
}

String? validateProfileWeight(String? value) {
  if (value == null || value.trim().isEmpty) {
    return 'Kilo gerekli';
  }
  final weight = parseDecimalInput(value);
  if (weight == null || !weight.isFinite) {
    return 'Geçerli bir kilo gir';
  }
  if (weight <= 0) {
    return 'Kilo pozitif bir sayı olmalı';
  }
  return null;
}

String? validateTrainingDays(Set<Weekday>? days) {
  if (days == null || days.isEmpty) {
    return 'En az bir antrenman günü seçmelisin.';
  }
  return null;
}
