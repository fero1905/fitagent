import 'package:flutter/material.dart';

import 'screens/welcome_screen.dart';

void main() {
  runApp(const FitAgentApp());
}

class FitAgentApp extends StatelessWidget {
  const FitAgentApp({super.key});

  static const _offWhite = Color(0xFFF4F6F5);
  static const _ink = Color(0xFF1B2430);
  static const _green = Color(0xFF1FA971);
  static const _focusGreen = Color(0xFF147A52);
  static const _fieldFill = Color(0xFFEAF5EF);
  static const _fieldBorder = Color(0xFF8FB8A3);
  static const _muted = Color(0xFF5B6775);

  @override
  Widget build(BuildContext context) {
    const colorScheme = ColorScheme.light(
      primary: _green,
      onPrimary: Colors.white,
      secondary: _green,
      onSecondary: Colors.white,
      surface: Colors.white,
      onSurface: _ink,
      error: Color(0xFFC62828),
      onError: Colors.white,
    );

    return MaterialApp(
      title: 'FitAgent',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        colorScheme: colorScheme,
        scaffoldBackgroundColor: _offWhite,
        appBarTheme: const AppBarTheme(
          backgroundColor: _offWhite,
          foregroundColor: _ink,
          elevation: 0,
          centerTitle: true,
        ),
        textTheme: ThemeData.light().textTheme.apply(
              bodyColor: _ink,
              displayColor: _ink,
            ),
        filledButtonTheme: FilledButtonThemeData(
          style: FilledButton.styleFrom(
            backgroundColor: _green,
            foregroundColor: Colors.white,
            minimumSize: const Size.fromHeight(54),
            textStyle: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: _fieldFill,
          hintStyle: const TextStyle(color: _muted),
          labelStyle: const TextStyle(
            color: _ink,
            fontWeight: FontWeight.w600,
          ),
          floatingLabelStyle: const TextStyle(
            color: _ink,
            fontWeight: FontWeight.w700,
          ),
          prefixIconColor: _ink,
          suffixIconColor: _ink,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: const BorderSide(color: _fieldBorder),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: const BorderSide(color: _fieldBorder),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: const BorderSide(color: _focusGreen, width: 1.6),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: const BorderSide(color: Color(0xFFC62828)),
          ),
          focusedErrorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: const BorderSide(color: Color(0xFFC62828), width: 1.6),
          ),
          errorStyle: const TextStyle(
            color: Color(0xFFC62828),
            fontWeight: FontWeight.w600,
          ),
        ),
        chipTheme: ChipThemeData(
          selectedColor: _green,
          backgroundColor: Colors.white,
          disabledColor: Colors.white,
          checkmarkColor: Colors.white,
          labelStyle: const TextStyle(
            color: _ink,
            fontWeight: FontWeight.w600,
          ),
          secondaryLabelStyle: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w700,
          ),
          side: const BorderSide(color: Color(0xFFD7DEE6)),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        dialogTheme: DialogThemeData(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
        ),
        cardTheme: CardThemeData(
          color: Colors.white,
          elevation: 0,
          margin: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
        ),
      ),
      home: const WelcomeScreen(),
    );
  }
}
