import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../../core/utils/math_3d.dart';
import '../../../../core/theme/luxury_theme.dart';

class ThreeDTasbeehRing extends StatefulWidget {
  final int count;
  final VoidCallback onTap;

  const ThreeDTasbeehRing({
    super.key,
    required this.count,
    required this.onTap,
  });

  @override
  State<ThreeDTasbeehRing> createState() => _ThreeDTasbeehRingState();
}

class _ThreeDTasbeehRingState extends State<ThreeDTasbeehRing>
    with SingleTickerProviderStateMixin {
  // 3D rotation angles in radians
  double _angleY = 0.0;
  double _angleX = 0.4; // Slightly tilted forward for nice 3D look

  late AnimationController _springController;
  late Animation<double> _springAnimation;
  double _baseAngleY = 0.0;
  double _targetAngleY = 0.0;

  @override
  void initState() {
    super.initState();
    _springController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );
    _springAnimation = CurvedAnimation(
      parent: _springController,
      curve: Curves.easeOutBack,
    );
    _springAnimation.addListener(() {
      setState(() {
        _angleY =
            _baseAngleY +
            (_targetAngleY - _baseAngleY) * _springAnimation.value;
      });
    });
  }

  @override
  void didUpdateWidget(covariant ThreeDTasbeehRing oldWidget) {
    super.didUpdateWidget(oldWidget);
    // If the count increased, trigger a smooth spring rotation to the next bead position
    if (widget.count > oldWidget.count) {
      _triggerRotationStep();
    }
  }

  @override
  void dispose() {
    _springController.dispose();
    super.dispose();
  }

  void _triggerRotationStep() {
    _baseAngleY = _angleY;
    // Rotate ring by one bead step (2 * pi / 33 beads)
    _targetAngleY = _angleY - (2 * pi / 33);

    _springController.reset();
    _springController.forward();

    // Play professional haptic click
    HapticFeedback.mediumImpact();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanUpdate: (details) {
        setState(() {
          // Allow interactive 3D rotation by dragging
          _angleY += details.delta.dx * 0.007;
          _angleX += details.delta.dy * 0.007;

          // Clamp X rotation to avoid folding the ring vertically onto itself
          _angleX = _angleX.clamp(-pi / 3, pi / 3);
        });
      },
      onTap: widget.onTap,
      child: Container(
        width: 320,
        height: 320,
        color: Colors.transparent, // Capture taps across the full area
        child: CustomPaint(
          painter: Tasbeeh3DPainter(
            angleX: _angleX,
            angleY: _angleY,
            activeBeadIndex: widget.count % 33,
          ),
        ),
      ),
    );
  }
}

class Tasbeeh3DPainter extends CustomPainter {
  final double angleX;
  final double angleY;
  final int activeBeadIndex;

  static const int numBeads = 33;
  static const double ringRadius = 1.2;

  const Tasbeeh3DPainter({
    required this.angleX,
    required this.angleY,
    required this.activeBeadIndex,
  });

  @override
  void paint(Canvas canvas, Size size) {
    // 1. Generate 3D vertices for the beads and the wire connecting them
    final List<Vector3D> originalVertices = [];
    for (int i = 0; i < numBeads; i++) {
      final double theta = (2 * pi * i) / numBeads;
      // Arrange beads in a horizontal 3D circle (XZ plane)
      originalVertices.add(
        Vector3D(ringRadius * cos(theta), 0.0, ringRadius * sin(theta)),
      );
    }

    // 2. Rotate and project vertices
    final List<Point2D> projectedBeads = [];
    for (int i = 0; i < numBeads; i++) {
      // Apply X and Y rotations
      final Vector3D rotated = originalVertices[i]
          .rotateX(angleX)
          .rotateY(angleY);
      // Project 3D vertex to 2D canvas coordinates
      projectedBeads.add(
        rotated.project(
          size.width,
          size.height,
          fov: 260.0,
          cameraDistance: 3.5,
        ),
      );
    }

    // 3. Painter's Algorithm: Sort indices of beads by depth (Z coordinate)
    // We want to draw beads furthest away (most negative Z) first, and closest beads (positive Z) last.
    final List<int> sortedIndices = List.generate(numBeads, (index) => index);
    sortedIndices.sort(
      (a, b) => projectedBeads[b].depth.compareTo(projectedBeads[a].depth),
    );

    // 4. Draw the supporting golden wire loop in 3D
    final Paint wirePaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.0
      ..shader = LuxuryColors.goldGradient.createShader(
        Rect.fromLTWH(0, 0, size.width, size.height),
      );

    final Path wirePath = Path();
    // Sort vertices along their circle path (not depth-sorted) to draw a continuous path
    final List<Point2D> pathPoints = List.from(projectedBeads);
    wirePath.moveTo(pathPoints[0].x, pathPoints[0].y);
    for (int i = 1; i < numBeads; i++) {
      wirePath.lineTo(pathPoints[i].x, pathPoints[i].y);
    }
    wirePath.close();
    canvas.drawPath(wirePath, wirePaint);

    // 5. Draw the 3D beads in depth-sorted order
    for (final int i in sortedIndices) {
      final bead = projectedBeads[i];
      final double beadRadius =
          14.0 * bead.scale; // Scale bead size by perspective depth
      final bool isActive = i == activeBeadIndex;

      // Color and shading based on depth and active state
      final double depthMultiplier =
          (bead.depth + 1.2) / 2.4; // Normalized 0.0 - 1.0 (approx depth range)
      final double opacity = (0.4 + (0.6 * depthMultiplier)).clamp(0.2, 1.0);

      // Define metallic shader for the bead
      final Paint beadPaint = Paint()..style = PaintingStyle.fill;

      // Active bead has a brilliant green-gold radiance
      if (isActive) {
        beadPaint.shader =
            RadialGradient(
              colors: [
                Colors.white,
                LuxuryColors.goldAccent,
                LuxuryColors.emeraldGreen,
              ],
              stops: const [0.0, 0.3, 1.0],
              center: const Alignment(-0.35, -0.35), // Specular light offset
            ).createShader(
              Rect.fromCircle(
                center: Offset(bead.x, bead.y),
                radius: beadRadius,
              ),
            );
      } else {
        // Inactive beads have luxury golden-bronze highlights based on depth
        final Color primaryGold = Color.lerp(
          LuxuryColors.goldDark,
          LuxuryColors.goldLight,
          depthMultiplier,
        )!.withOpacity(opacity);

        beadPaint.shader =
            RadialGradient(
              colors: [
                Colors.white.withOpacity(opacity),
                LuxuryColors.goldAccent.withOpacity(opacity),
                primaryGold,
                Colors.black.withOpacity(0.3),
              ],
              stops: const [0.0, 0.15, 0.8, 1.0],
              center: const Alignment(-0.3, -0.3),
            ).createShader(
              Rect.fromCircle(
                center: Offset(bead.x, bead.y),
                radius: beadRadius,
              ),
            );
      }

      // Draw shadow under the bead
      canvas.drawCircle(
        Offset(bead.x, bead.y + 4.0 * bead.scale),
        beadRadius,
        Paint()
          ..color = Colors.black.withOpacity(0.3 * opacity)
          ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 4.0),
      );

      // Draw the bead itself
      canvas.drawCircle(Offset(bead.x, bead.y), beadRadius, beadPaint);

      // Active bead glowing rings
      if (isActive) {
        final Paint glowPaint = Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2.0
          ..color = LuxuryColors.goldAccent.withOpacity(opacity)
          ..maskFilter = const MaskFilter.blur(BlurStyle.outer, 3.0);
        canvas.drawCircle(Offset(bead.x, bead.y), beadRadius + 2.0, glowPaint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant Tasbeeh3DPainter oldDelegate) {
    return oldDelegate.angleX != angleX ||
        oldDelegate.angleY != angleY ||
        oldDelegate.activeBeadIndex != activeBeadIndex;
  }
}
