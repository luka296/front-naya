import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/glassmorphic_card.dart';
import '../../../../core/widgets/luxury_button.dart';

class LostModePanel extends StatefulWidget {
  final String groupName;
  final List<Map<String, dynamic>> members;

  const LostModePanel({
    super.key,
    required this.groupName,
    required this.members,
  });

  @override
  State<LostModePanel> createState() => _LostModePanelState();
}

class _LostModePanelState extends State<LostModePanel> {
  bool _isLostModeActive = false;
  final double _distanceToLeader = 142.0; // In meters, dynamic mock
  int _batteryLevel = 18; // Low battery alert trigger test

  void _toggleLostMode() {
    setState(() {
      _isLostModeActive = !_isLostModeActive;
    });
    // Multi-vibe emergency warning haptics
    HapticFeedback.vibrate();
    Future.delayed(
      const Duration(milliseconds: 100),
      () => HapticFeedback.vibrate(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GlassmorphicCard(
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 400),
        transitionBuilder: (child, animation) => FadeTransition(
          opacity: animation,
          child: ScaleTransition(scale: animation, child: child),
        ),
        child: _isLostModeActive
            ? _buildActiveLostModeHUD(theme)
            : _buildNormalModeHUD(theme),
      ),
    );
  }

  Widget _buildNormalModeHUD(ThemeData theme) {
    return Column(
      key: const ValueKey('normal_hud'),
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.groupName,
                  style: theme.textTheme.displayMedium?.copyWith(fontSize: 16),
                ),
                const SizedBox(height: 2),
                Text(
                  '${widget.members.length} Members Active | متصلين',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontSize: 12,
                    color: LuxuryColors.goldLight,
                  ),
                ),
              ],
            ),
            const Icon(
              Icons.people_alt_outlined,
              color: LuxuryColors.goldMedium,
              size: 28,
            ),
          ],
        ),
        const SizedBox(height: 16),
        const Divider(color: Color(0x33C5A880)),
        const SizedBox(height: 12),

        // Members list
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: widget.members.length,
          itemBuilder: (context, index) {
            final member = widget.members[index];
            final bool isLost = member['is_lost'] ?? false;
            final bool lowBattery =
                member['battery'] != null && member['battery'] < 20;

            return Padding(
              padding: const EdgeInsets.symmetric(vertical: 6.0),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 16,
                    backgroundColor: isLost
                        ? LuxuryColors.coralRed
                        : LuxuryColors.goldDark,
                    child: Text(
                      member['name']?[0] ?? 'U',
                      style: const TextStyle(
                        fontSize: 12,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      member['name'] ?? '',
                      style: theme.textTheme.bodyLarge?.copyWith(
                        fontSize: 14,
                        color: isLost
                            ? LuxuryColors.coralRed
                            : LuxuryColors.alabaster,
                      ),
                    ),
                  ),
                  if (lowBattery) ...[
                    const Icon(
                      Icons.battery_alert,
                      color: LuxuryColors.coralRed,
                      size: 16,
                    ),
                    const SizedBox(width: 6),
                  ],
                  Text(
                    isLost ? '🔴 Separated' : '🟢 Active',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      fontSize: 11,
                      color: isLost
                          ? LuxuryColors.coralRed
                          : LuxuryColors.goldLight.withOpacity(0.8),
                    ),
                  ),
                ],
              ),
            );
          },
        ),

        const SizedBox(height: 20),

        // Giant Lost Trigger Button
        GestureDetector(
          onTap: _toggleLostMode,
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 14),
            decoration: BoxDecoration(
              color: Colors.transparent,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: LuxuryColors.coralRed, width: 1.5),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(
                  Icons.warning_amber_rounded,
                  color: LuxuryColors.coralRed,
                  size: 20,
                ),
                const SizedBox(width: 10),
                Text(
                  'I\'M LOST | أنا تائه',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: LuxuryColors.coralRed,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.5,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildActiveLostModeHUD(ThemeData theme) {
    return Column(
      key: const ValueKey('lost_hud'),
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
          decoration: BoxDecoration(
            color: LuxuryColors.coralRed.withOpacity(0.15),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: LuxuryColors.coralRed, width: 1.0),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.error_outline,
                color: LuxuryColors.coralRed,
                size: 16,
              ),
              const SizedBox(width: 8),
              Text(
                'EMERGENCY BROADCAST ACTIVE',
                style: theme.textTheme.labelLarge?.copyWith(
                  color: LuxuryColors.coralRed,
                  fontSize: 11,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),

        // Circular Directional Radar HUD representation in Pure Canvas
        SizedBox(
          width: 140,
          height: 140,
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Spinning pulse rings mock
              TweenAnimationBuilder<double>(
                tween: Tween(begin: 0.0, end: 360.0),
                duration: const Duration(seconds: 4),
                builder: (context, val, child) {
                  return Transform.rotate(
                    angle: val * (pi / 180),
                    child: Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: LuxuryColors.coralRed.withOpacity(0.2),
                          width: 2.0,
                        ),
                      ),
                      child: Align(
                        alignment: Alignment.topCenter,
                        child: Container(
                          width: 8,
                          height: 8,
                          decoration: const BoxDecoration(
                            shape: BoxShape.circle,
                            color: LuxuryColors.coralRed,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.navigation,
                    color: LuxuryColors.goldAccent,
                    size: 36,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${_distanceToLeader.toInt()}m',
                    style: theme.textTheme.displayMedium?.copyWith(
                      fontSize: 20,
                      color: LuxuryColors.goldLight,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),

        const SizedBox(height: 16),
        Text(
          'Keep moving towards your family leader.',
          style: theme.textTheme.bodyMedium?.copyWith(
            color: LuxuryColors.linenGrey,
            fontSize: 13,
          ),
          textAlign: TextAlign.center,
        ),
        Text(
          'Group members are currently navigating to your live location.',
          style: theme.textTheme.bodyMedium?.copyWith(
            color: LuxuryColors.linenGrey.withOpacity(0.6),
            fontSize: 11,
          ),
          textAlign: TextAlign.center,
        ),

        const SizedBox(height: 24),

        Row(
          children: [
            Expanded(
              child: GestureDetector(
                onTap: () {
                  setState(() {
                    _batteryLevel = 100;
                  });
                  HapticFeedback.lightImpact();
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  decoration: BoxDecoration(
                    color: LuxuryColors.obsidianGrey,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: LuxuryColors.goldMedium.withOpacity(0.3),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        Icons.battery_alert,
                        color: LuxuryColors.goldAccent,
                        size: 16,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Send Low Batt Alert',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: LuxuryColors.goldAccent,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: LuxuryButton(
                text: 'I\'m Safe | وجدتهم',
                height: 44,
                onPressed: _toggleLostMode,
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        Text(
          'Battery level: $_batteryLevel%',
          style: theme.textTheme.bodyMedium?.copyWith(
            color: LuxuryColors.goldLight.withOpacity(0.8),
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}
