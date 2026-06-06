import 'package:flutter/material.dart';
import 'package:model_viewer_plus/model_viewer_plus.dart';

import '../../data/models/umrah_status_model.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/luxury_button.dart';
import '../../../../core/utils/niya_localizations.dart';
import '../pages/umrah_3d_tracking_page.dart';

class Umrah3DStatusTracker extends StatefulWidget {
  final UmrahRequestModel request;

  const Umrah3DStatusTracker({super.key, required this.request});

  @override
  State<Umrah3DStatusTracker> createState() => _Umrah3DStatusTrackerState();
}

class _Umrah3DStatusTrackerState extends State<Umrah3DStatusTracker> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final activeIndex = widget.request.status.index;
    final progress = (activeIndex + 1) / UmrahStatus.values.length;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 12.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  'عمرة النيابة 3D Tracker',
                  style: theme.textTheme.displayMedium?.copyWith(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(width: 12),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: LuxuryColors.obsidianBlack,
                  border: Border.all(color: LuxuryColors.goldLight.withOpacity(0.25)),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Text(
                  'ID: ${widget.request.id.substring(0, 8).toUpperCase()}',
                  style: theme.textTheme.labelLarge?.copyWith(
                    fontSize: 11,
                    color: LuxuryColors.goldAccent,
                  ),
                ),
              ),
            ],
          ),
        ),
        SizedBox(
          height: 260,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(16),
            child: ModelViewer(
              src: 'assets/models/hajj_man_animated.glb',
              alt: '3D Kaaba Model',
              autoRotate: true,
              cameraControls: true,
              autoPlay: true,
              backgroundColor: Colors.transparent,
              loading: Loading.lazy,
            ),
          ),
        ),
        const SizedBox(height: 16),
        LinearProgressIndicator(
          value: progress,
          minHeight: 8,
          backgroundColor: LuxuryColors.obsidianGrey,
          valueColor: AlwaysStoppedAnimation<Color>(LuxuryColors.goldAccent),
        ),
        const SizedBox(height: 12),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12.0),
          child: Text(
            widget.request.status.displayName,
            style: theme.textTheme.headlineSmall?.copyWith(
              fontSize: 16,
              color: LuxuryColors.goldLight,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        const SizedBox(height: 8),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12.0),
          child: Text(
            widget.request.status.description,
            style: theme.textTheme.bodyMedium?.copyWith(
              fontSize: 13,
              color: LuxuryColors.linenGrey,
            ),
          ),
        ),
        const SizedBox(height: 14),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12.0),
          child: Wrap(
            spacing: 10,
            runSpacing: 10,
            children: UmrahStatus.values.map((status) {
              final isActive = status == widget.request.status;
              final isCompleted = status.index < activeIndex;
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                decoration: BoxDecoration(
                  color: isActive
                      ? LuxuryColors.goldAccent.withOpacity(0.18)
                      : LuxuryColors.obsidianDeep,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: isActive
                        ? LuxuryColors.goldAccent
                        : LuxuryColors.goldLight.withOpacity(0.12),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      isCompleted ? Icons.check_circle : Icons.circle,
                      size: 12,
                      color: isActive || isCompleted ? LuxuryColors.goldAccent : LuxuryColors.linenGrey,
                    ),
                    const SizedBox(width: 6),
                    Text(
                      status.displayName.split(' | ').first,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: isActive || isCompleted
                            ? Colors.white
                            : LuxuryColors.linenGrey,
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ),
        const SizedBox(height: 16),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12.0),
          child: ValueListenableBuilder<String>(
            valueListenable: NiyaLocalizations.activeLanguage,
            builder: (context, lang, _) {
              final isAr = lang == 'ar';
              return LuxuryButton(
                text: isAr
                    ? 'رادار التتبع ثلاثي الأبعاد 3D ➔'
                    : '3D Live Tracking Radar ➔',
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => Umrah3DTrackingPage(request: widget.request),
                    ),
                  );
                },
              );
            },
          ),
        ),
        const SizedBox(height: 16),
      ],
    );
  }
}

