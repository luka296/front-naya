import 'dart:math';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sensors_plus/sensors_plus.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/glassmorphic_card.dart';
import '../../../../core/utils/niya_localizations.dart';

class QiblaPage extends StatefulWidget {
  const QiblaPage({super.key});

  @override
  State<QiblaPage> createState() => _QiblaPageState();
}

class _QiblaPageState extends State<QiblaPage>
    with SingleTickerProviderStateMixin {
  double _heading = 120.0; // Simulated current heading in degrees
  final double _qiblaAngle =
      252.0; // Standard Mecca bearing from Middle East/KSA
  late AnimationController _pulseController;
  bool _isAligned = false;
  StreamSubscription? _magnetometerSub;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    // Listen to real device magnetic sensor
    _startMagnetometer();
  }

  void _startMagnetometer() {
    try {
      _magnetometerSub = magnetometerEventStream().listen(
        (MagnetometerEvent event) {
          // Calculate dynamic azimuth heading in radians
          final double headingRad = atan2(event.y, event.x);
          // Convert to absolute degrees
          double headingDeg = headingRad * 180 / pi;
          // Normalize to 0-360 range
          headingDeg = (headingDeg + 360) % 360;

          final double oldHeading = _heading;
          setState(() {
            _heading = headingDeg;
          });
          _checkAlignment(oldHeading, _heading);
        },
        onError: (_) {
          // Fallback silently if sensor is unsupported on the system (e.g. Simulator, Desktop)
        },
      );
    } catch (_) {
      // Fallback silently if sensors_plus crashes or fails
    }
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _magnetometerSub?.cancel();
    super.dispose();
  }

  void _checkAlignment(double oldHeading, double newHeading) {
    // Aligned if the difference between current heading and Qibla is very small
    final diff = (newHeading - _qiblaAngle).abs();
    final wasAligned = _isAligned;
    final nowAligned = diff < 4.0;

    if (nowAligned != wasAligned) {
      setState(() {
        _isAligned = nowAligned;
      });
      if (nowAligned) {
        // Trigger elegant alignment haptics
        HapticFeedback.heavyImpact();
      }
    } else if (nowAligned && (newHeading - oldHeading).abs() > 0.5) {
      // Small ticking haptic as you stay aligned
      HapticFeedback.lightImpact();
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    // Calculate rotation angle in radians for the dial
    // The dial rotates counter to the heading
    final double dialRotation = -_heading * pi / 180.0;

    return ValueListenableBuilder<String>(
      valueListenable: NiyaLocalizations.activeLanguage,
      builder: (context, lang, _) {
        return Scaffold(
          body: Container(
            decoration: const BoxDecoration(
              gradient: LuxuryColors.obsidianGradient,
            ),
            child: SafeArea(
              child: Column(
                children: [
                  // Header
                  Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          NiyaLocalizations.translate('qibla_title'),
                          style: theme.textTheme.displayMedium?.copyWith(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Row(
                          children: [
                            TextButton(
                              onPressed: () {
                                NiyaLocalizations.toggleLanguage();
                              },
                              child: Text(
                                lang == 'ar' ? 'EN' : 'عربي',
                                style: GoogleFonts.outfit(
                                  color: LuxuryColors.goldAccent,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                ),
                              ),
                            ),
                            const Icon(
                              Icons.explore_outlined,
                              color: LuxuryColors.goldAccent,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),

                  const Spacer(),

                  // Compass Display Container (supports Sensor and Manual drag calibration fallback)
                  GestureDetector(
                    onPanUpdate: (details) {
                      final double oldHeading = _heading;
                      setState(() {
                        // Drag horizontally to manually calibrate or test rotation on desktop
                        _heading = (_heading - details.delta.dx * 0.5) % 360;
                      });
                      _checkAlignment(oldHeading, _heading);
                    },
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        // Outer pulsing glow when aligned
                        if (_isAligned)
                          AnimatedBuilder(
                            animation: _pulseController,
                            builder: (context, child) {
                              return Container(
                                width: 320,
                                height: 320,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  boxShadow: [
                                    BoxShadow(
                                      color: LuxuryColors.emeraldGreen
                                          .withOpacity(0.15 +
                                                (_pulseController.value * 0.2)),
                                      blurRadius:
                                          30 + (_pulseController.value * 20),
                                      spreadRadius:
                                          5 + (_pulseController.value * 10),
                                    ),
                                  ],
                                ),
                              );
                            },
                          ),

                        // Rotating Astrolabe/Compass Dial
                        Transform.rotate(
                          angle: dialRotation,
                          child: Container(
                            width: 300,
                            height: 300,
                            color: Colors.transparent,
                            child: CustomPaint(
                              painter: QiblaCompassPainter(
                                qiblaAngle: _qiblaAngle,
                                isAligned: _isAligned,
                              ),
                            ),
                          ),
                        ),

                        // Fixed Pointer needle (always points straight up)
                        CustomPaint(
                          size: const Size(40, 300),
                          painter: QiblaNeedlePainter(isAligned: _isAligned),
                        ),

                        // Inner central Kaaba medallion
                        Container(
                          width: 70,
                          height: 70,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: LuxuryColors.obsidianBlack,
                            border: Border.all(
                              color: _isAligned
                                  ? LuxuryColors.emeraldGreen
                                  : LuxuryColors.goldLight,
                              width: 2,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.5),
                                blurRadius: 10,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Center(
                            child: Icon(
                              Icons.home_filled, // Represents Kaaba Sanctuary
                              color: _isAligned
                                  ? Colors.greenAccent
                                  : LuxuryColors.goldAccent,
                              size: 32,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const Spacer(),

                  // Information HUD Panel
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20.0,
                      vertical: 16.0,
                    ),
                    child: GlassmorphicCard(
                      borderRadius: 20,
                      padding: const EdgeInsets.all(20),
                      child: Column(
                        children: [
                          // Compass Status
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    NiyaLocalizations.translate(
                                      'current_heading',
                                    ),
                                    style: GoogleFonts.outfit(
                                      color: LuxuryColors.goldLight.withOpacity(0.6),
                                      fontSize: 10,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '${_heading.toStringAsFixed(0)}° WSW',
                                    style: theme.textTheme.displayMedium
                                        ?.copyWith(
                                          fontSize: 20,
                                          color: Colors.white,
                                          fontWeight: FontWeight.w300,
                                        ),
                                  ),
                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Text(
                                    NiyaLocalizations.translate(
                                      'distance_to_kaaba',
                                    ),
                                    style: GoogleFonts.outfit(
                                      color: LuxuryColors.goldLight.withOpacity(0.6),
                                      fontSize: 10,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '1,428 KM',
                                    style: theme.textTheme.displayMedium
                                        ?.copyWith(
                                          fontSize: 20,
                                          color: LuxuryColors.goldAccent,
                                          fontWeight: FontWeight.w300,
                                        ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          Divider(
                            color: LuxuryColors.goldMedium.withOpacity(0.15),
                          ),
                          const SizedBox(height: 8),
                          // Interaction Instructions
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                _isAligned
                                    ? Icons.check_circle_rounded
                                    : Icons.info_outline_rounded,
                                color: _isAligned
                                    ? Colors.greenAccent
                                    : LuxuryColors.goldLight,
                                size: 18,
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  _isAligned
                                      ? NiyaLocalizations.translate(
                                          'facing_kaaba',
                                        )
                                      : NiyaLocalizations.translate(
                                          'rotate_instructions',
                                        ),
                                  style: GoogleFonts.outfit(
                                    color: _isAligned
                                        ? Colors.greenAccent
                                        : Colors.white70,
                                    fontSize: 11,
                                    height: 1.4,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 80), // Offset bottom bar height
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

// Painter for the Astrolabe-inspired rotating compass face
class QiblaCompassPainter extends CustomPainter {
  final double qiblaAngle;
  final bool isAligned;

  const QiblaCompassPainter({
    required this.qiblaAngle,
    required this.isAligned,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final double radius = size.width / 2;
    final Offset center = Offset(radius, radius);

    // 1. Draw outer marble background circle
    final Paint dialBgPaint = Paint()
      ..color = LuxuryColors.obsidianDeep
      ..style = PaintingStyle.fill;
    canvas.drawCircle(center, radius - 4, dialBgPaint);

    // 2. Draw luxury golden rings
    final Paint borderPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5
      ..shader = LuxuryColors.goldGradient.createShader(
        Rect.fromCircle(center: center, radius: radius),
      );
    canvas.drawCircle(center, radius - 4, borderPaint);
    canvas.drawCircle(center, radius - 18, borderPaint);

    // 3. Draw Compass Tick Marks
    final Paint tickPaint = Paint()
      ..color = LuxuryColors.goldLight.withOpacity(0.3)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    for (int i = 0; i < 72; i++) {
      final double angle = i * 5 * pi / 180;
      final bool isMajor = i % 2 == 0;
      final double tickLength = isMajor ? 12 : 6;

      final Offset p1 = Offset(
        center.dx + (radius - 18) * cos(angle),
        center.dy + (radius - 18) * sin(angle),
      );
      final Offset p2 = Offset(
        center.dx + (radius - 18 - tickLength) * cos(angle),
        center.dy + (radius - 18 - tickLength) * sin(angle),
      );

      tickPaint.color = isMajor
          ? LuxuryColors.goldLight.withOpacity(0.4)
          : LuxuryColors.goldLight.withOpacity(0.15);
      canvas.drawLine(p1, p2, tickPaint);
    }

    // 4. Draw North, South, East, West texts
    final Map<String, double> directions = {
      'N': -pi / 2,
      'E': 0.0,
      'S': pi / 2,
      'W': pi,
    };

    directions.forEach((label, angle) {
      final Offset textOffset = Offset(
        center.dx + (radius - 40) * cos(angle),
        center.dy + (radius - 40) * sin(angle),
      );

      final TextPainter textPainter = TextPainter(
        text: TextSpan(
          text: label,
          style: GoogleFonts.cinzel(
            color: label == 'N'
                ? Colors.white
                : LuxuryColors.goldLight.withOpacity(0.6),
            fontWeight: FontWeight.bold,
            fontSize: 14,
          ),
        ),
        textDirection: TextDirection.ltr,
      )..layout();

      canvas.save();
      canvas.translate(textOffset.dx, textOffset.dy);
      // Rotate text so it stands upright on the compass dial
      canvas.rotate(angle + pi / 2);
      textPainter.paint(
        canvas,
        Offset(-textPainter.width / 2, -textPainter.height / 2),
      );
      canvas.restore();
    });

    // 5. Draw the Qibla (Kaaba) Direction Marker on the dial
    final double qiblaAngleRad =
        (qiblaAngle - 90) *
        pi /
        180; // Adjusted for 0 pointing North (straight up)

    // Draw a prominent golden arrow pointing to Mecca
    final Paint qiblaArrowPaint = Paint()
      ..style = PaintingStyle.fill
      ..shader = isAligned
          ? const RadialGradient(
              colors: [Colors.white, Colors.greenAccent],
            ).createShader(Rect.fromCircle(center: center, radius: radius))
          : LuxuryColors.goldGradient.createShader(
              Rect.fromCircle(center: center, radius: radius),
            );

    final Path qiblaPath = Path();
    final double arrowTipRadius = radius - 24;
    final double arrowBaseRadius = radius - 55;

    final Offset tip = Offset(
      center.dx + arrowTipRadius * cos(qiblaAngleRad),
      center.dy + arrowTipRadius * sin(qiblaAngleRad),
    );
    final Offset baseLeft = Offset(
      center.dx + arrowBaseRadius * cos(qiblaAngleRad - 0.08),
      center.dy + arrowBaseRadius * sin(qiblaAngleRad - 0.08),
    );
    final Offset baseRight = Offset(
      center.dx + arrowBaseRadius * cos(qiblaAngleRad + 0.08),
      center.dy + arrowBaseRadius * sin(qiblaAngleRad + 0.08),
    );

    qiblaPath.moveTo(tip.dx, tip.dy);
    qiblaPath.lineTo(baseLeft.dx, baseLeft.dy);
    qiblaPath.quadraticBezierTo(
      center.dx + (radius - 48) * cos(qiblaAngleRad),
      center.dy + (radius - 48) * sin(qiblaAngleRad),
      baseRight.dx,
      baseRight.dy,
    );
    qiblaPath.close();
    canvas.drawPath(qiblaPath, qiblaArrowPaint);

    // Draw little Kaaba calligraphic circle surrounding the arrow
    final Paint arrowGlow = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0
      ..color = isAligned ? Colors.greenAccent : LuxuryColors.goldAccent;
    canvas.drawCircle(tip, 6.0, arrowGlow);
  }

  @override
  bool shouldRepaint(covariant QiblaCompassPainter oldDelegate) {
    return oldDelegate.qiblaAngle != qiblaAngle ||
        oldDelegate.isAligned != isAligned;
  }
}

// Fixed Needle Painter pointing straight up
class QiblaNeedlePainter extends CustomPainter {
  final bool isAligned;

  const QiblaNeedlePainter({required this.isAligned});

  @override
  void paint(Canvas canvas, Size size) {
    final double midX = size.width / 2;

    // Draw fixed top pointer
    final Paint needlePaint = Paint()
      ..style = PaintingStyle.fill
      ..color = isAligned ? Colors.greenAccent : LuxuryColors.goldAccent;

    // Draw beautiful thin alignment pin
    final Path needlePath = Path();
    needlePath.moveTo(midX, 20); // Tip
    needlePath.lineTo(midX - 5, 45); // Left base
    needlePath.lineTo(midX + 5, 45); // Right base
    needlePath.close();
    canvas.drawPath(needlePath, needlePaint);

    // Glowing alignment bead
    final Paint beadPaint = Paint()
      ..style = PaintingStyle.fill
      ..color = isAligned ? Colors.greenAccent : LuxuryColors.goldAccent;

    if (isAligned) {
      beadPaint.maskFilter = const MaskFilter.blur(BlurStyle.normal, 5.0);
      canvas.drawCircle(Offset(midX, 12), 6.0, beadPaint);
    }

    canvas.drawCircle(
      Offset(midX, 12),
      4.0,
      Paint()
        ..style = PaintingStyle.fill
        ..color = isAligned ? Colors.white : LuxuryColors.goldAccent,
    );
  }

  @override
  bool shouldRepaint(covariant QiblaNeedlePainter oldDelegate) {
    return oldDelegate.isAligned != isAligned;
  }
}
