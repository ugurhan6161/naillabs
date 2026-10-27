import 'package:flutter/material.dart';

class AppColors {
  static const Color cream50 = Color(0xFFF9F1EC);
  static const Color cream100 = Color(0xFFEAE1D7);
  static const Color cream200 = Color(0xFFDBCEC2);
  static const Color white = Color(0xFFFFFFFF);
  static const Color roseGold = Color(0xFFA9876D);
  static const Color roseGoldDark = Color(0xFF8B6950);
  static const Color roseGoldDeep = Color(0xFF60432E);
  static const Color roseGoldLight1 = Color(0xFFEED2BC);
  static const Color roseGoldLight2 = Color(0xFFD0B198);
  static const Color secondaryText = Color(0xFF5E564D);
  static const Color errorRed = Color(0xFFA63D2F);
  static const Color successGreen = Color(0xFF3E6B50);
  static const Color warningGold = Color(0xFF8A5F17);
  static const Color black = Color(0xFF000000);

  static const MaterialColor primarySwatch = MaterialColor(
    0xFF000000,
    <int, Color>{
      50: cream50,
      100: cream100,
      200: cream200,
      300: roseGoldLight1,
      400: roseGold,
      500: black,
      600: roseGoldDark,
      700: roseGoldDeep,
      800: Color(0xFF2E211A),
      900: black,
    },
  );

  static const ColorScheme lightColorScheme = ColorScheme(
    brightness: Brightness.light,
    primary: black,
    onPrimary: cream50,
    secondary: roseGold,
    onSecondary: white,
    error: errorRed,
    onError: white,
    surface: cream50,
    onSurface: black,
    surfaceContainerHighest: cream100,
    surfaceContainerHigh: cream100,
    surfaceContainer: cream100,
    surfaceContainerLow: cream50,
    outline: roseGoldDark,
    outlineVariant: cream200,
    tertiary: roseGoldDark,
    onTertiary: white,
    primaryContainer: black,
    secondaryContainer: cream100,
    onPrimaryContainer: black,
    onSecondaryContainer: black,
    onSurfaceVariant: secondaryText,
    onErrorContainer: errorRed,
    inverseSurface: black,
    inversePrimary: roseGoldLight1,
    scrim: black,
    shadow: Color(0x1A000000),
    tertiaryContainer: roseGoldLight1,
    onTertiaryContainer: roseGoldDeep,
  );
}
