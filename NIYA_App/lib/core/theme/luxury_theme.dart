import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LuxuryColors {
  // Obsidian stones shades (Kaaba marble inspiration)
  static const Color obsidianBlack = Color(0xFF0C0E10);
  static const Color obsidianDeep = Color(0xFF121518);
  static const Color obsidianLight = Color(0xFF1B1E22);
  static const Color obsidianGrey = Color(0xFF2C3036);

  // Luxury pure whites (Ihram linen inspiration)
  static const Color pureWhite = Color(0xFFFFFFFF);
  static const Color alabaster = Color(0xFFF6F8FA);
  static const Color linenGrey = Color(0xFFE2E6E9);

  // Metallic deep gold gradients
  static const Color goldDark = Color(0xFF8E6D3E);
  static const Color goldMedium = Color(0xFFAB8C5B);
  static const Color goldLight = Color(0xFFC5A880);
  static const Color goldAccent = Color(0xFFEAD2AC);

  // Secondary accents
  static const Color emeraldGreen = Color(
    0xFF0F5A47,
  ); // Sincere prayer / Islamic depth
  static const Color coralRed = Color(
    0xFFC94A4A,
  ); // Emergency alert (Lost Mode)

  // Luxury Gold Gradient
  static const LinearGradient goldGradient = LinearGradient(
    colors: [goldDark, goldMedium, goldLight, goldAccent],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient obsidianGradient = LinearGradient(
    colors: [obsidianBlack, obsidianDeep, obsidianLight],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  static const LinearGradient glassGradient = LinearGradient(
    colors: [Color(0x1AFFFFFF), Color(0x05FFFFFF)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

class LuxuryTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: LuxuryColors.obsidianBlack,
      primaryColor: LuxuryColors.goldMedium,
      colorScheme: const ColorScheme.dark(
        primary: LuxuryColors.goldMedium,
        secondary: LuxuryColors.goldLight,
        surface: LuxuryColors.obsidianDeep,
        error: LuxuryColors.coralRed,
      ),
      textTheme: TextTheme(
        // High luxury headings
        displayLarge: GoogleFonts.cinzel(
          fontSize: 32,
          fontWeight: FontWeight.bold,
          color: LuxuryColors.goldLight,
          letterSpacing: 1.5,
        ),
        displayMedium: GoogleFonts.cinzel(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: LuxuryColors.goldLight,
          letterSpacing: 1.2,
        ),
        // Arabic display Calligraphy style
        titleLarge: GoogleFonts.amiri(
          fontSize: 26,
          fontWeight: FontWeight.bold,
          color: LuxuryColors.goldAccent,
          height: 1.6,
        ),
        // Modern UI details
        bodyLarge: GoogleFonts.outfit(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          color: LuxuryColors.alabaster,
        ),
        bodyMedium: GoogleFonts.outfit(
          fontSize: 14,
          color: LuxuryColors.linenGrey,
        ),
        labelLarge: GoogleFonts.outfit(
          fontSize: 12,
          fontWeight: FontWeight.bold,
          color: LuxuryColors.goldMedium,
          letterSpacing: 1.0,
        ),
      ),
      cardTheme: CardThemeData(
        color: LuxuryColors.obsidianDeep,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: Color(0x33C5A880), width: 1.0),
        ),
        elevation: 8,
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: LuxuryColors.obsidianBlack,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.cinzel(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: LuxuryColors.goldLight,
        ),
        iconTheme: const IconThemeData(color: LuxuryColors.goldLight),
      ),
    );
  }
}

// Reusable premium glassmorphic border decorator
class GlassmorphicBorder extends ShapeBorder {
  final double borderRadius;
  const GlassmorphicBorder({this.borderRadius = 16.0});

  @override
  EdgeInsetsGeometry get dimensions => EdgeInsets.zero;

  @override
  Path getInnerPath(Rect rect, {TextDirection? textDirection}) {
    return Path()
      ..addRRect(RRect.fromRectAndRadius(rect, Radius.circular(borderRadius)));
  }

  @override
  Path getOuterPath(Rect rect, {TextDirection? textDirection}) {
    return Path()
      ..addRRect(RRect.fromRectAndRadius(rect, Radius.circular(borderRadius)));
  }

  @override
  void paint(Canvas canvas, Rect rect, {TextDirection? textDirection}) {
    final Paint paint = Paint()
      ..shader = LinearGradient(
        colors: [
          LuxuryColors.goldLight.withOpacity(0.4),
          LuxuryColors.goldDark.withOpacity(0.0),
          LuxuryColors.goldAccent.withOpacity(0.2),
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(rect)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.2;

    canvas.drawRRect(
      RRect.fromRectAndRadius(rect, Radius.circular(borderRadius)),
      paint,
    );
  }

  @override
  ShapeBorder scale(double t) => this;
}
