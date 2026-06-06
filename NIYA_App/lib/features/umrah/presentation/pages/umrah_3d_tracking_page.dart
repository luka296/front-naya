import 'dart:math';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:model_viewer_plus/model_viewer_plus.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/glassmorphic_card.dart';
import '../../../../core/utils/niya_localizations.dart';
import '../../data/models/umrah_status_model.dart';

class Umrah3DTrackingPage extends StatefulWidget {
  final UmrahRequestModel request;

  const Umrah3DTrackingPage({super.key, required this.request});

  @override
  State<Umrah3DTrackingPage> createState() => _Umrah3DTrackingPageState();
}

class _Umrah3DTrackingPageState extends State<Umrah3DTrackingPage> with SingleTickerProviderStateMixin {
  bool _followPerformer = true;
  late AnimationController _pulseController;
  late double _progressPercent;

String get _modelSrc => 'assets/models/kaaba3dmodel_1.glb';
  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    // Calculate map path progress based on status index
    final statusIndex = widget.request.status.index;
    final totalStatuses = UmrahStatus.values.length;
    _progressPercent = (statusIndex / (totalStatuses - 1)).clamp(0.0, 1.0);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final status = widget.request.status;
    final isAr = NiyaLocalizations.activeLanguage.value == 'ar';

    return Scaffold(
      appBar: AppBar(
        title: Text(
          isAr ? 'التتبع ثلاثي الأبعاد 3D' : '3D Live Tracker',
          style: theme.appBarTheme.titleTextStyle,
        ),
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LuxuryColors.obsidianGradient,
        ),
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // 1. Interactive 3D Kaaba in Mecca Model Viewport
              Expanded(
                flex: 4,
                child: Stack(
                  children: [
                    // ModelViewer Container
                    Container(
                      color: Colors.transparent,
                      child: ModelViewer(
                        src: _modelSrc,
                        alt: 'A 3D Kaaba model in Mecca',
                        autoRotate: true,
                        cameraControls: true,
                        autoPlay: true,
                        backgroundColor: Colors.transparent,
                        loading: Loading.lazy,
                      ),
                    ),

                    // Top visual telemetry overlays
                    Positioned(
                      top: 16,
                      left: 16,
                      child: GlassmorphicCard(
                        borderRadius: 12,
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        child: Row(
                          children: [
                            Container(
                              width: 10,
                              height: 10,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.greenAccent,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Text(
                              isAr ? 'بث حي ومباشر' : 'LIVE TELEMETRY',
                              style: GoogleFonts.outfit(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 10,
                                letterSpacing: 1.0,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    // Title overlay for Kaaba model
                    Positioned(
                      top: 64,
                      left: 0,
                      right: 0,
                      child: Center(
                        child: GlassmorphicCard(
                          borderRadius: 14,
                          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                          child: Text(
                            isAr ? 'الكعبة في مكة' : 'Kaaba in Mecca',
                            style: GoogleFonts.outfit(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                              letterSpacing: 1.2,
                            ),
                          ),
                        ),
                      ),
                    ),

                    // Model calibration & details overlay
                    Positioned(
                      bottom: 16,
                      right: 16,
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Colors.black54,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: LuxuryColors.goldMedium.withOpacity(0.3)),
                        ),
                        child: Text(
                          (isAr ? 'اسحب لتدوير الكعبة 3D' : 'Drag to rotate Kaaba 3D'),
                          style: GoogleFonts.outfit(
                            color: LuxuryColors.goldAccent,
                            fontSize: 9,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              // 2. Stylized Mecca path map (Radar tracking view)
              Expanded(
                flex: 3,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  child: GlassmorphicCard(
                    borderRadius: 20,
                    padding: const EdgeInsets.all(16),
                    child: Stack(
                      children: [
                        // Map Painter
                        Positioned.fill(
                          child: CustomPaint(
                            painter: HaramMapPainter(
                              progress: _progressPercent,
                              pulseValue: _pulseController,
                              follow: _followPerformer,
                            ),
                          ),
                        ),

                        // Map Control UI overlay
                        Positioned(
                          top: 0,
                          left: 0,
                          child: Text(
                            isAr ? 'خريطة التتبع الميداني' : 'Haram Radar Map',
                            style: GoogleFonts.cairo(
                              color: LuxuryColors.goldAccent,
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          ),
                        ),

                        // Follow Switch
                        Positioned(
                          top: 0,
                          right: 0,
                          child: Row(
                            children: [
                              Text(
                                isAr ? 'تتبع المعتمر' : 'Follow',
                                style: GoogleFonts.cairo(
                                  color: Colors.white60,
                                  fontSize: 10,
                                ),
                              ),
                              const SizedBox(width: 4),
                              SizedBox(
                                height: 24,
                                width: 40,
                                child: Switch(
                                  value: _followPerformer,
                                  activeColor: LuxuryColors.goldAccent,
                                  onChanged: (v) {
                                    setState(() {
                                      _followPerformer = v;
                                    });
                                  },
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),

              // 3. Status Timeline & GPS coordinates footer
              Expanded(
                flex: 3,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Active Performer State Card
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: LuxuryColors.obsidianDeep,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: LuxuryColors.goldMedium.withOpacity(0.2)),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 48,
                              height: 48,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: LuxuryColors.goldMedium.withOpacity(0.15),
                                border: Border.all(color: LuxuryColors.goldLight),
                              ),
                              child: const Center(
                                child: Icon(
                                  Icons.person_pin_circle_rounded,
                                  color: LuxuryColors.goldAccent,
                                  size: 28,
                                ),
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    widget.request.beneficiaryName,
                                    style: GoogleFonts.cairo(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 14,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    status.displayName,
                                    style: GoogleFonts.cairo(
                                      color: LuxuryColors.goldAccent,
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Telemetry GPS Coordinates Logs
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: LuxuryColors.obsidianBlack,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: LuxuryColors.goldMedium.withOpacity(0.1)),
                          ),
                          child: SingleChildScrollView(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                _buildTelemetryLine('SYSTEM STATUS', 'SYNCED & SECURE', Colors.greenAccent),
                                _buildTelemetryLine('TARGET DESTINATION', 'MASJID AL-HARAM, MAKKAH', LuxuryColors.goldLight),
                                _buildTelemetryLine('GPS TELEMETRY', _getGPSCoordinates(status), Colors.white),
                                _buildTelemetryLine('BEARING TO COMPASS', '252° WSW', LuxuryColors.goldAccent),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTelemetryLine(String label, String value, Color valColor) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: GoogleFonts.outfit(
              color: LuxuryColors.goldLight.withOpacity(0.4),
              fontSize: 9,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            value,
            style: GoogleFonts.outfit(
              color: valColor,
              fontSize: 10,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  String _getGPSCoordinates(UmrahStatus status) {
    switch (status) {
      case UmrahStatus.submitted:
      case UmrahStatus.accepted:
      case UmrahStatus.scheduled:
        return 'Lat 24.4672, Lon 39.6112 (Madinah)';
      case UmrahStatus.traveling:
        return 'Lat 22.8214, Lon 39.8428 (Highway)';
      case UmrahStatus.arrived:
        return 'Lat 21.6248, Lon 40.4285 (Miqat Al-Sail)';
      case UmrahStatus.performing:
        return 'Lat 21.4225, Lon 39.8262 (Haram Sanctuary)';
      case UmrahStatus.completed:
        return 'Lat 21.4225, Lon 39.8262 (Completed)';
    }
  }
}

// Custom Painter to draw stylized radar tracking map of Makkah sanctuary
class HaramMapPainter extends CustomPainter {
  final double progress;
  final Animation<double> pulseValue;
  final bool follow;

  HaramMapPainter({
    required this.progress,
    required this.pulseValue,
    required this.follow,
  }) : super(repaint: pulseValue);

  @override
  void paint(Canvas canvas, Size size) {
    final Paint linePaint = Paint()
      ..color = LuxuryColors.goldMedium.withOpacity(0.25)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;

    // Define coordinates of key pilgrimage waypoints
    final List<Offset> points = [
      Offset(size.width * 0.15, size.height * 0.8),  // 1. Miqat Boundary
      Offset(size.width * 0.4, size.height * 0.65),  // 2. Highway / Arrival
      Offset(size.width * 0.6, size.height * 0.45),  // 3. Haram Sanctuary
    ];

    // Connect dots with a smooth gold line path
    final Path routePath = Path();
    routePath.moveTo(points[0].dx, points[0].dy);
    for (int i = 1; i < points.length; i++) {
      routePath.lineTo(points[i].dx, points[i].dy);
    }

    // Add Tawaf loop (orbit) around the Kaaba at the end of path
    final Offset kaabaCenter = Offset(size.width * 0.72, size.height * 0.45);
    routePath.addOval(Rect.fromCircle(center: kaabaCenter, radius: 18));

    // Draw the full caravan route path
    canvas.drawPath(routePath, linePaint);

    // Draw Sanctuary Holy sites illustrations
    final Paint sitePaint = Paint()..style = PaintingStyle.fill;

    // 1. Miqat Boundary Gate marker
    sitePaint.color = LuxuryColors.goldDark.withOpacity(0.5);
    canvas.drawRect(
      Rect.fromCenter(center: points[0], width: 12, height: 12),
      sitePaint,
    );

    // 2. Central Kaaba Sanctuary (Black Cube with Gold stripes)
    final Paint kaabaPaint = Paint()..color = Colors.black;
    canvas.drawRect(
      Rect.fromCenter(center: kaabaCenter, width: 22, height: 22),
      kaabaPaint,
    );
    // Gold stripe overlay representing Kiswah border
    final Paint kiswahPaint = Paint()
      ..color = LuxuryColors.goldAccent
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;
    canvas.drawRect(
      Rect.fromCenter(center: kaabaCenter, width: 22, height: 22),
      kiswahPaint,
    );

    // 3. Safa and Marwa Parallel lines
    final Paint sMlinePaint = Paint()
      ..color = LuxuryColors.goldLight.withOpacity(0.4)
      ..strokeWidth = 3.0;
    final Offset safaPoint = Offset(size.width * 0.85, size.height * 0.25);
    final Offset marwaPoint = Offset(size.width * 0.85, size.height * 0.65);
    canvas.drawLine(safaPoint, marwaPoint, sMlinePaint);
    canvas.drawCircle(safaPoint, 4.0, Paint()..color = LuxuryColors.goldMedium);
    canvas.drawCircle(marwaPoint, 4.0, Paint()..color = LuxuryColors.goldMedium);

    // Calculate dynamic coordinates of the performer along the path based on progress
    Offset performerPos = Offset.zero;
    if (progress <= 0.6) {
      // Linearly interpolate along the highway
      final double segmentProgress = progress / 0.6;
      final int startIndex = (segmentProgress * (points.length - 2)).floor();
      final double subProgress = (segmentProgress * (points.length - 2)) - startIndex;
      performerPos = Offset.lerp(points[startIndex], points[startIndex + 1], subProgress)!;
    } else if (progress <= 0.95) {
      // Perform Tawaf: orbit around Kaaba
      final double angle = (progress - 0.6) / 0.35 * 4 * pi; // Loop 2 times
      performerPos = Offset(
        kaabaCenter.dx + 18 * cos(angle),
        kaabaCenter.dy + 18 * sin(angle),
      );
    } else {
      // Completed: standing at Safa/Marwa
      performerPos = Offset.lerp(kaabaCenter, marwaPoint, (progress - 0.95) / 0.05)!;
    }

    // Draw pulsing active locator glow
    final double pulseRadius = 10.0 + (pulseValue.value * 12.0);
    final Paint glowPaint = Paint()
      ..color = LuxuryColors.goldAccent.withOpacity(0.3 * (1.0 - pulseValue.value))
      ..style = PaintingStyle.fill;
    canvas.drawCircle(performerPos, pulseRadius, glowPaint);

    // Draw active performer pin
    canvas.drawCircle(performerPos, 5.0, Paint()..color = Colors.greenAccent);
    canvas.drawCircle(
      performerPos,
      3.0,
      Paint()
        ..color = Colors.white
        ..style = PaintingStyle.fill,
    );

    // Draw target crosshairs if follow is active
    if (follow) {
      final Paint crosshairPaint = Paint()
        ..color = Colors.greenAccent.withOpacity(0.4)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.0;

      canvas.drawCircle(performerPos, 16.0, crosshairPaint);
      canvas.drawLine(Offset(performerPos.dx - 22, performerPos.dy), Offset(performerPos.dx + 22, performerPos.dy), crosshairPaint);
      canvas.drawLine(Offset(performerPos.dx, performerPos.dy - 22), Offset(performerPos.dx, performerPos.dy + 22), crosshairPaint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
