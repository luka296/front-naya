import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/glassmorphic_card.dart';
import '../../../../core/widgets/luxury_button.dart';
import '../../../../core/utils/niya_localizations.dart';
import '../../../../core/utils/records_manager.dart';
import '../../../tasbeeh/presentation/widgets/three_d_tasbeeh_ring.dart';
import '../../../umrah/data/models/umrah_status_model.dart';
import '../../../umrah/presentation/widgets/umrah_3d_status_tracker.dart';
import '../../../family/presentation/widgets/lost_mode_panel.dart';

class HomePage extends StatefulWidget {
  final VoidCallback onLogout;

  const HomePage({super.key, required this.onLogout});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _tasbeehCount = 0;
  String _activeDhikr = 'SubhanAllah | سبحان الله';
  List<Map<String, dynamic>> _userBookings = [];
  UmrahRequestModel? _activeUmrah;
  int _campaignRemainingSpots = 2000;

  final List<String> _dhikrList = [
    'SubhanAllah | سبحان الله',
    'Alhamdulillah | الحمد لله',
    'Allahu Akbar | الله أكبر',
    'Astaghfirullah | أستغفر الله',
  ];

  // Default Mocking active Umrah Request
  final UmrahRequestModel _mockUmrah = UmrahRequestModel(
    id: 'f8a7e6b5-cd12-4e45-8123-9abcd98765ef',
    beneficiaryName: 'Rashid Al-Mansoor (Father)',
    motherName: 'Amina',
    specialDua: 'May Allah enter him to Fardous without accountability.',
    status: UmrahStatus.performing,
    createdAt: DateTime.now().subtract(const Duration(days: 2)),
    imageUrls: const ['img1', 'img2'],
    videoUrls: const ['vid1'],
  );

  @override
  void initState() {
    super.initState();
    _loadBookings();
  }

  Future<void> _loadBookings() async {
    final list = await RecordsManager.loadBookings();
    final prefs = await SharedPreferences.getInstance();
    final spots = await RecordsManager.getCampaignRemainingSpots();
    
    // Dynamically check if the user has submitted a personal Umrah application!
    final personalApplied = prefs.getBool('niya_personal_umrah_applied') ?? false;
    
    setState(() {
      _userBookings = list;
      _campaignRemainingSpots = spots;
      
      if (personalApplied) {
        final personalName = prefs.getString('niya_personal_umrah_name') ?? 'Rashid Al-Mansoor';
        final personalCountry = prefs.getString('niya_personal_umrah_country') ?? 'Saudi Arabia';
        
        _activeUmrah = UmrahRequestModel(
          id: 'personal-umrah-permit-9012',
          beneficiaryName: '$personalName (${NiyaLocalizations.translate('yes')})',
          motherName: '${NiyaLocalizations.translate('country')}: $personalCountry',
          specialDua: 'Personal Umrah authorization permit submitted securely and routed for review.',
          status: UmrahStatus.submitted, // Dynamic submitted status!
          createdAt: DateTime.now(),
          imageUrls: const [],
          videoUrls: const [],
        );
      } else {
        _activeUmrah = _mockUmrah; // Fallback default
      }
    });
  }

  void _nextDhikr() {
    final currentIndex = _dhikrList.indexOf(_activeDhikr);
    setState(() {
      _activeDhikr = _dhikrList[(currentIndex + 1) % _dhikrList.length];
      _tasbeehCount = 0; // Reset count for the next Dhikr
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return ValueListenableBuilder<String>(
      valueListenable: NiyaLocalizations.activeLanguage,
      builder: (context, lang, _) {
        return Scaffold(
          appBar: AppBar(
            leading: IconButton(
              icon: const Icon(Icons.logout_rounded, color: LuxuryColors.goldLight),
              onPressed: widget.onLogout,
            ),
            title: Text(
              NiyaLocalizations.translate('app_title'),
              style: theme.appBarTheme.titleTextStyle,
            ),
            actions: [
              // Language Switch Button
              TextButton(
                onPressed: () {
                  NiyaLocalizations.toggleLanguage();
                  _loadBookings(); // Refresh bookings dynamically
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
              IconButton(
                icon: const Icon(
                  Icons.notifications_active_outlined,
                  color: LuxuryColors.goldAccent,
                ),
                onPressed: () {},
              ),
              Padding(
                padding: const EdgeInsets.only(right: 16.0),
                child: CircleAvatar(
                  radius: 16,
                  backgroundColor: LuxuryColors.goldLight,
                  child: const Text(
                    'T',
                    style: TextStyle(
                      color: LuxuryColors.obsidianBlack,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
          body: Container(
            decoration: const BoxDecoration(
              gradient: LuxuryColors.obsidianGradient,
            ),
            child: RefreshIndicator(
              onRefresh: () async {
                await _loadBookings();
              },
              color: LuxuryColors.goldMedium,
              backgroundColor: LuxuryColors.obsidianDeep,
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // 1. Streak & XP Level Banner
                    _buildGamifiedBanner(theme),
                    const SizedBox(height: 20),

                    // 2. Group Campaign Dashboard Widget (Ties the 30 Umrahs Departures & Real-Time remaining spots decrement!)
                    _buildCampaignDashboard(theme),
                    const SizedBox(height: 24),

                    // 3. Prayer Times horizontal scroll line
                    Text(
                      NiyaLocalizations.translate('prayer_times'),
                      style: theme.textTheme.displayMedium?.copyWith(fontSize: 16),
                    ),
                    const SizedBox(height: 12),
                    _buildPrayerTimeline(theme),
                    const SizedBox(height: 24),

                    // 4. Central 3D Tasbeeh Counter widget
                    Center(
                      child: Column(
                        children: [
                          Text(
                            _activeDhikr,
                            style: theme.textTheme.titleLarge?.copyWith(fontSize: 20),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            NiyaLocalizations.translate('tap_to_count'),
                            style: theme.textTheme.bodyMedium?.copyWith(
                              color: LuxuryColors.goldLight.withOpacity(0.6),
                              fontSize: 11,
                            ),
                          ),
                          const SizedBox(height: 16),
                          Stack(
                            alignment: Alignment.center,
                            children: [
                              // The pure mathematical 3D bead ring
                              ThreeDTasbeehRing(
                                count: _tasbeehCount,
                                onTap: () {
                                  setState(() {
                                    _tasbeehCount++;
                                  });
                                },
                              ),
                              // Inner overlay text showing the absolute count
                              Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    '$_tasbeehCount',
                                    style: theme.textTheme.displayLarge?.copyWith(
                                      fontSize: 44,
                                      color: Colors.white,
                                      fontWeight: FontWeight.w300,
                                    ),
                                  ),
                                  Text(
                                    '/33',
                                    style: theme.textTheme.bodyMedium?.copyWith(
                                      color: LuxuryColors.goldLight,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          LuxuryButton(
                            text: NiyaLocalizations.translate('next_dhikr'),
                            width: 180,
                            height: 38,
                            isSecondary: true,
                            onPressed: _nextDhikr,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),

                    // 5. Family emergency Tracker & Lost Mode coordination Panel
                    Text(
                      NiyaLocalizations.translate('family_emergency'),
                      style: theme.textTheme.displayMedium?.copyWith(fontSize: 15),
                    ),
                    const SizedBox(height: 12),
                    LostModePanel(
                      groupName: 'Al-Mansoor Family Group',
                      members: [
                        {'name': 'Tariq Al-Mansoor', 'is_lost': false, 'battery': 88},
                        {'name': 'Layla Benguerir', 'is_lost': false, 'battery': 92},
                        {'name': 'Mother Amina', 'is_lost': false, 'battery': 12},
                      ],
                    ),
                    const SizedBox(height: 24),

                    // 6. Dynamic Bookings Persistent Ledger (الخدمات المسجلة)
                    Text(
                      NiyaLocalizations.translate('my_records_title'),
                      style: theme.textTheme.displayMedium?.copyWith(fontSize: 15),
                    ),
                    const SizedBox(height: 12),
                    _buildLedgerBookings(theme),
                    const SizedBox(height: 24),

                    // 7. Umrah on behalf status tracker (Fully operational and reactively maps user submitted permits!)
                    Text(
                      NiyaLocalizations.translate('active_umrah_tracker'),
                      style: theme.textTheme.displayMedium?.copyWith(fontSize: 15),
                    ),
                    const SizedBox(height: 12),
                    if (_activeUmrah != null)
                      GlassmorphicCard(
                        child: Umrah3DStatusTracker(request: _activeUmrah!),
                      ),
                    const SizedBox(height: 80), // Space for navigation bar
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildCampaignDashboard(ThemeData theme) {
    final int sponsoredSpots = RecordsManager.totalCampaignSpots - _campaignRemainingSpots;
    final double progressRatio = sponsoredSpots / RecordsManager.totalCampaignSpots;

    return GlassmorphicCard(
      borderRadius: 20,
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Header Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                NiyaLocalizations.translate('campaign_title'),
                style: GoogleFonts.cairo(
                  color: LuxuryColors.goldAccent,
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                ),
              ),
              const Icon(
                Icons.campaign_rounded,
                color: LuxuryColors.goldAccent,
                size: 24,
              ),
            ],
          ),
          const SizedBox(height: 8),
          Divider(color: LuxuryColors.goldMedium.withOpacity(0.15)),
          const SizedBox(height: 12),

          // Scheduled departures info
          Row(
            children: [
              const Icon(
                Icons.calendar_month_rounded,
                color: LuxuryColors.goldLight,
                size: 16,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  NiyaLocalizations.translate('campaign_group'),
                  style: GoogleFonts.cairo(
                    color: Colors.white70,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Row(
            children: [
              const Icon(
                Icons.groups_rounded,
                color: LuxuryColors.goldLight,
                size: 16,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  NiyaLocalizations.translate('campaign_pilgrims'),
                  style: GoogleFonts.cairo(
                    color: Colors.white70,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Core Stats Row (Target spots, remaining spots dynamically decremented)
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    NiyaLocalizations.translate('remaining_spots').toUpperCase(),
                    style: GoogleFonts.outfit(
                      color: LuxuryColors.goldLight.withOpacity(0.6),
                      fontSize: 9,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text(
                        '$_campaignRemainingSpots',
                        style: GoogleFonts.outfit(
                          color: Colors.white,
                          fontSize: 28,
                          fontWeight: FontWeight.w300,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Text(
                        '/ 3500',
                        style: GoogleFonts.outfit(
                          color: LuxuryColors.goldLight.withOpacity(0.4),
                          fontSize: 13,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    '$sponsoredSpots',
                    style: GoogleFonts.outfit(
                      color: Colors.greenAccent,
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    NiyaLocalizations.translate('spots_gained'),
                    style: GoogleFonts.outfit(
                      color: Colors.white38,
                      fontSize: 9,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Premium gold progress bar
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: Container(
              height: 6,
              color: LuxuryColors.obsidianBlack,
              child: Align(
                alignment: Alignment.centerLeft,
                child: FractionallySizedBox(
                  widthFactor: progressRatio.clamp(0.0, 1.0),
                  child: Container(
                    decoration: const BoxDecoration(
                      gradient: LuxuryColors.goldGradient,
                    ),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 4),
          Align(
            alignment: Alignment.centerRight,
            child: Text(
              '${(progressRatio * 100).toStringAsFixed(1)}% Funded',
              style: GoogleFonts.outfit(
                color: LuxuryColors.goldAccent,
                fontSize: 9,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLedgerBookings(ThemeData theme) {
    if (_userBookings.isEmpty) {
      return GlassmorphicCard(
        borderRadius: 16,
        padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
        child: Center(
          child: Column(
            children: [
              Icon(
                Icons.receipt_long_rounded,
                color: LuxuryColors.goldLight.withOpacity(0.4),
                size: 32,
              ),
              const SizedBox(height: 8),
              Text(
                NiyaLocalizations.translate('no_records_yet'),
                style: GoogleFonts.outfit(
                  color: Colors.white38,
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      );
    }

    return Column(
      children: _userBookings.map((booking) {
        final isAr = NiyaLocalizations.activeLanguage.value == 'ar';
        final title = isAr ? booking['serviceTitle'] : booking['serviceTitleEn'];
        final isUmrah = booking['isUmrah'] as bool;
        final details = isUmrah
            ? '${NiyaLocalizations.translate('beneficiary_name')}: ${booking['beneficiary']}'
            : '${NiyaLocalizations.translate('quantity')}: ${booking['quantity']} units';

        return Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: LuxuryColors.obsidianDeep,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: LuxuryColors.goldMedium.withOpacity(0.25),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: GoogleFonts.cairo(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        details,
                        style: GoogleFonts.outfit(
                          color: LuxuryColors.linenGrey.withOpacity(0.7),
                          fontSize: 11,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        'ID: ${booking['ledgerId']}',
                        style: GoogleFonts.outfit(
                          color: LuxuryColors.goldAccent,
                          fontWeight: FontWeight.bold,
                          fontSize: 9,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: LuxuryColors.emeraldGreen.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.greenAccent.withOpacity(0.3)),
                  ),
                  child: Row(
                    children: [
                      const Icon(
                        Icons.check_circle_rounded,
                        color: Colors.greenAccent,
                        size: 12,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        NiyaLocalizations.translate('completed_badge'),
                        style: GoogleFonts.outfit(
                          color: Colors.greenAccent,
                          fontSize: 9,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildGamifiedBanner(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: LuxuryColors.obsidianDeep,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: LuxuryColors.goldDark.withOpacity(0.3)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              const Icon(
                Icons.local_fire_department,
                color: LuxuryColors.goldAccent,
                size: 24,
              ),
              const SizedBox(width: 8),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '12 ${NiyaLocalizations.translate('streak_title')}',
                    style: theme.textTheme.bodyLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: LuxuryColors.goldLight,
                    ),
                  ),
                  Text(
                    NiyaLocalizations.translate('level_aspirant'),
                    style: theme.textTheme.bodyMedium?.copyWith(fontSize: 11),
                  ),
                ],
              ),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                '450 XP',
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 4),
              // Mini XP progress bar
              Container(
                width: 80,
                height: 4,
                decoration: BoxDecoration(
                  color: LuxuryColors.obsidianGrey,
                  borderRadius: BorderRadius.circular(2),
                ),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Container(
                    width: 50, // mock progress
                    height: 4,
                    decoration: BoxDecoration(
                      gradient: LuxuryColors.goldGradient,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPrayerTimeline(ThemeData theme) {
    final prayers = [
      {'name': 'Fajr', 'time': '04:12 AM', 'active': false},
      {'name': 'Sunrise', 'time': '05:38 AM', 'active': false},
      {'name': 'Dhuhr', 'time': '12:22 PM', 'active': false},
      {'name': 'Asr', 'time': '03:48 PM', 'active': true}, // Mock active
      {'name': 'Maghrib', 'time': '07:05 PM', 'active': false},
      {'name': 'Isha', 'time': '08:32 PM', 'active': false},
    ];

    return SizedBox(
      height: 70,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: prayers.length,
        itemBuilder: (context, index) {
          final prayer = prayers[index];
          final isActive = prayer['active'] as bool;

          return Padding(
            padding: const EdgeInsets.only(right: 12.0),
            child: Container(
              width: 90,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                gradient: isActive ? LuxuryColors.goldGradient : null,
                color: isActive ? null : LuxuryColors.obsidianDeep,
                border: Border.all(
                  color: isActive
                      ? Colors.transparent
                      : LuxuryColors.goldMedium.withOpacity(0.2),
                ),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    prayer['name'] as String,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      fontWeight: isActive
                          ? FontWeight.bold
                          : FontWeight.normal,
                      color: isActive
                          ? LuxuryColors.obsidianBlack
                          : LuxuryColors.goldLight,
                      fontSize: 12,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    prayer['time'] as String,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      fontSize: 10,
                      color: isActive
                          ? LuxuryColors.obsidianBlack
                          : Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
