import 'package:flutter/material.dart';
import '../../data/models/umrah_status_model.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/luxury_button.dart';
import '../../../../core/utils/niya_localizations.dart';
import '../pages/umrah_3d_tracking_page.dart';

class UmrahTimelineTracker extends StatelessWidget {
  final UmrahRequestModel request;

  const UmrahTimelineTracker({super.key, required this.request});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final activeIndex = request.status.index;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Trust Timeline | مسار الأمانة',
                style: theme.textTheme.displayMedium?.copyWith(fontSize: 18),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 4,
                ),
                decoration: BoxDecoration(
                  border: Border.all(
                    color: LuxuryColors.goldMedium,
                    width: 1.0,
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  'ID: ${request.id.substring(0, 8).toUpperCase()}',
                  style: theme.textTheme.labelLarge?.copyWith(fontSize: 10),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),

        // Vertical Timeline list
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: UmrahStatus.values.length,
          itemBuilder: (context, index) {
            final status = UmrahStatus.values[index];
            final isCompleted = index < activeIndex;
            final isActive = index == activeIndex;
            final isFuture = index > activeIndex;

            return IntrinsicHeight(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Timeline line & nodes
                  Column(
                    children: [
                      Container(
                        width: 24,
                        height: 24,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: isCompleted
                              ? LuxuryColors.goldGradient
                              : isActive
                              ? const LinearGradient(
                                  colors: [
                                    LuxuryColors.emeraldGreen,
                                    LuxuryColors.goldLight,
                                  ],
                                )
                              : null,
                          color: isFuture ? LuxuryColors.obsidianGrey : null,
                          border: Border.all(
                            color: isActive
                                ? Colors.white
                                : LuxuryColors.goldLight.withOpacity(0.3),
                            width: 1.5,
                          ),
                        ),
                        child: Center(
                          child: isCompleted
                              ? const Icon(
                                  Icons.check,
                                  size: 14,
                                  color: LuxuryColors.obsidianBlack,
                                )
                              : isActive
                              ? Container(
                                  width: 10,
                                  height: 10,
                                  decoration: const BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: Colors.white,
                                  ),
                                )
                              : null,
                        ),
                      ),
                      // Connective line
                      if (index != UmrahStatus.values.length - 1)
                        Expanded(
                          child: Container(
                            width: 2,
                            color: isCompleted
                                ? LuxuryColors.goldMedium
                                : LuxuryColors.obsidianGrey,
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(width: 16),

                  // Step Details
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 24.0),
                      child: Opacity(
                        opacity: isFuture ? 0.4 : 1.0,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              status.displayName,
                              style: theme.textTheme.bodyLarge?.copyWith(
                                fontWeight: isActive
                                    ? FontWeight.bold
                                    : FontWeight.normal,
                                color: isActive
                                    ? LuxuryColors.goldAccent
                                    : isCompleted
                                    ? LuxuryColors.goldLight
                                    : LuxuryColors.linenGrey,
                                fontSize: isActive ? 16 : 14,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              status.description,
                              style: theme.textTheme.bodyMedium?.copyWith(
                                color: isCompleted
                                    ? LuxuryColors.linenGrey.withOpacity(0.7)
                                    : LuxuryColors.linenGrey,
                                fontSize: 12,
                              ),
                            ),

                            // If active and has videos/images, display them
                            if (isActive &&
                                (request.imageUrls.isNotEmpty ||
                                    request.videoUrls.isNotEmpty)) ...[
                              const SizedBox(height: 16),
                              SizedBox(
                                height: 110,
                                child: ListView.builder(
                                  scrollDirection: Axis.horizontal,
                                  itemCount:
                                      request.imageUrls.length +
                                      request.videoUrls.length,
                                  itemBuilder: (context, mediaIndex) {
                                    final isVideo =
                                        mediaIndex >= request.imageUrls.length;
                                    final url = isVideo
                                        ? request.videoUrls[mediaIndex -
                                              request.imageUrls.length]
                                        : request.imageUrls[mediaIndex];

                                    return Padding(
                                      padding: const EdgeInsets.only(
                                        right: 12.0,
                                      ),
                                      child: Container(
                                        width: 150,
                                        decoration: BoxDecoration(
                                          borderRadius: BorderRadius.circular(
                                            12,
                                          ),
                                          border: Border.all(
                                            color: LuxuryColors.goldLight
                                                .withOpacity(0.2),
                                            width: 1.0,
                                          ),
                                          color: LuxuryColors.obsidianGrey,
                                        ),
                                        child: Stack(
                                          fit: StackFit.expand,
                                          children: [
                                            // Fallback elegant background instead of raw network images in mockup
                                            const Center(
                                              child: Icon(
                                                Icons.image_outlined,
                                                color: LuxuryColors.goldLight,
                                                size: 28,
                                              ),
                                            ),
                                            Positioned(
                                              bottom: 8,
                                              left: 8,
                                              right: 8,
                                              child: Container(
                                                padding:
                                                    const EdgeInsets.symmetric(
                                                      horizontal: 6,
                                                      vertical: 2,
                                                    ),
                                                decoration: BoxDecoration(
                                                  color: Colors.black
                                                      .withOpacity(0.6),
                                                  borderRadius:
                                                      BorderRadius.circular(6),
                                                ),
                                                child: Text(
                                                  isVideo
                                                      ? '▶ Live Dua Recording ($url)'
                                                      : '📸 Kaaba Verified ($url)',
                                                  style: theme
                                                      .textTheme
                                                      .bodyMedium
                                                      ?.copyWith(
                                                        fontSize: 8,
                                                        color: Colors.white,
                                                      ),
                                                  textAlign: TextAlign.center,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    );
                                  },
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
        const SizedBox(height: 20),
        ValueListenableBuilder<String>(
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
                    builder: (context) => Umrah3DTrackingPage(request: request),
                  ),
                );
              },
            );
          },
        ),
      ],
    );
  }
}
