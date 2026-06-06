import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/glassmorphic_card.dart';
import '../../../../core/widgets/luxury_button.dart';
import '../../../../core/utils/niya_localizations.dart';
import '../../../../core/utils/records_manager.dart';
import '../../../umrah/presentation/pages/umrah_application_page.dart';

class ServicesPage extends StatefulWidget {
  const ServicesPage({super.key});

  @override
  State<ServicesPage> createState() => _ServicesPageState();
}

class _ServicesPageState extends State<ServicesPage> {
  List<Map<String, dynamic>> _userBookings = [];
  String _savedCardMask = '';

  @override
  void initState() {
    super.initState();
    _loadBookings();
    _loadSavedCard();
  }

  Future<void> _loadSavedCard() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _savedCardMask = prefs.getString('niya_visa_number') ?? '';
    });
  }

  Future<void> _loadBookings() async {
    final list = await RecordsManager.loadBookings();
    setState(() {
      _userBookings = list;
    });
  }

  void _showOrderSuccessDialog(
    String serviceTitle,
    String refId,
    int xpGained,
  ) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24.0),
            child: GlassmorphicCard(
              borderRadius: 24,
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 64,
                    height: 64,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: LuxuryColors.emeraldGreen.withOpacity(0.15),
                      border: Border.all(color: Colors.greenAccent, width: 1.5),
                    ),
                    child: const Center(
                      child: Icon(
                        Icons.check_circle_outline_rounded,
                        color: Colors.greenAccent,
                        size: 36,
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    NiyaLocalizations.translate('order_confirmed'),
                    style: GoogleFonts.cinzel(
                      color: LuxuryColors.goldAccent,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    NiyaLocalizations.translate('order_registered_desc'),
                    style: GoogleFonts.outfit(
                      color: Colors.white70,
                      fontSize: 12,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: LuxuryColors.obsidianBlack,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: LuxuryColors.goldMedium.withOpacity(0.2),
                      ),
                    ),
                    child: Column(
                      children: [
                        Text(
                          '${NiyaLocalizations.translate('ledger_id')}: $refId',
                          style: GoogleFonts.outfit(
                            color: LuxuryColors.goldLight,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 1.2,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '+$xpGained XP ${NiyaLocalizations.translate('streak_title')}',
                          style: GoogleFonts.outfit(
                            color: Colors.greenAccent,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  LuxuryButton(
                    text: NiyaLocalizations.translate('continue'),
                    height: 44,
                    onPressed: () {
                      Navigator.pop(context);
                      _loadBookings(); // Refresh bookings
                    },
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  void _openBookingSheet(
    String titleAr,
    String titleEn,
    String priceDesc,
    double unitPrice,
    bool isUmrah,
  ) {
    int quantity = 10;
    final TextEditingController nameController = TextEditingController();
    final TextEditingController duaController = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setModalState) {
            final double totalPrice = isUmrah
                ? unitPrice
                : unitPrice * quantity;

            return Padding(
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom,
              ),
              child: Container(
                decoration: const BoxDecoration(
                  gradient: LuxuryColors.obsidianGradient,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(30),
                    topRight: Radius.circular(30),
                  ),
                  border: Border(
                    top: BorderSide(color: LuxuryColors.goldMedium, width: 1),
                  ),
                ),
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Handle line
                    Center(
                      child: Container(
                        width: 40,
                        height: 4,
                        decoration: BoxDecoration(
                          color: LuxuryColors.goldMedium.withOpacity(0.3),
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Sheet Header
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              titleEn,
                              style: GoogleFonts.outfit(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            Text(
                              isUmrah
                                  ? NiyaLocalizations.translate(
                                      'umrah_by_proxy',
                                    )
                                  : NiyaLocalizations.translate('charity_dist'),
                              style: GoogleFonts.outfit(
                                color: LuxuryColors.goldLight,
                                fontSize: 11,
                              ),
                            ),
                          ],
                        ),
                        Text(
                          titleAr,
                          style: GoogleFonts.amiri(
                            color: LuxuryColors.goldAccent,
                            fontWeight: FontWeight.bold,
                            fontSize: 22,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    Divider(
                      color: LuxuryColors.goldMedium.withOpacity(0.15),
                    ),
                    const SizedBox(height: 16),

                    if (isUmrah) ...[
                      // Umrah Form Fields
                      Text(
                        NiyaLocalizations.translate('beneficiary_name'),
                        style: GoogleFonts.outfit(
                          color: LuxuryColors.goldLight,
                          fontWeight: FontWeight.bold,
                          fontSize: 10,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        decoration: BoxDecoration(
                          color: LuxuryColors.obsidianDeep,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: LuxuryColors.goldMedium.withOpacity(0.2),
                          ),
                        ),
                        child: TextField(
                          controller: nameController,
                          style: GoogleFonts.outfit(
                            color: Colors.white,
                            fontSize: 14,
                          ),
                          decoration: InputDecoration(
                            hintText: 'e.g. Rashid Al-Mansoor',
                            hintStyle: GoogleFonts.outfit(
                              color: Colors.white24,
                              fontSize: 13,
                            ),
                            border: InputBorder.none,
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Text(
                        NiyaLocalizations.translate('dua_request'),
                        style: GoogleFonts.outfit(
                          color: LuxuryColors.goldLight,
                          fontWeight: FontWeight.bold,
                          fontSize: 10,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        decoration: BoxDecoration(
                          color: LuxuryColors.obsidianDeep,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: LuxuryColors.goldMedium.withOpacity(0.2),
                          ),
                        ),
                        child: TextField(
                          controller: duaController,
                          maxLines: 3,
                          style: GoogleFonts.outfit(
                            color: Colors.white,
                            fontSize: 14,
                          ),
                          decoration: InputDecoration(
                            hintText:
                                'Specify any Dua you wish the performer to say...',
                            hintStyle: GoogleFonts.outfit(
                              color: Colors.white24,
                              fontSize: 13,
                            ),
                            border: InputBorder.none,
                          ),
                        ),
                      ),
                    ] else ...[
                      // Distribution Quantity Selector
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                NiyaLocalizations.translate('quantity'),
                                style: GoogleFonts.outfit(
                                  color: LuxuryColors.goldLight,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 10,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                NiyaLocalizations.translate('quantity_desc'),
                                style: GoogleFonts.outfit(
                                  color: Colors.white38,
                                  fontSize: 11,
                                ),
                              ),
                            ],
                          ),
                          Row(
                            children: [
                              IconButton(
                                icon: const Icon(
                                  Icons.remove_circle_outline_rounded,
                                  color: LuxuryColors.goldLight,
                                ),
                                onPressed: () {
                                  if (quantity > 10) {
                                    setModalState(() {
                                      quantity -= 10;
                                    });
                                  }
                                },
                              ),
                              Text(
                                '$quantity',
                                style: GoogleFonts.outfit(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 18,
                                ),
                              ),
                              IconButton(
                                icon: const Icon(
                                  Icons.add_circle_outline_rounded,
                                  color: LuxuryColors.goldLight,
                                ),
                                onPressed: () {
                                  setModalState(() {
                                    quantity += 10;
                                  });
                                },
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),
                      Text(
                        NiyaLocalizations.translate('dedicated_name'),
                        style: GoogleFonts.outfit(
                          color: LuxuryColors.goldLight,
                          fontWeight: FontWeight.bold,
                          fontSize: 10,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        decoration: BoxDecoration(
                          color: LuxuryColors.obsidianDeep,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: LuxuryColors.goldMedium.withOpacity(0.2),
                          ),
                        ),
                        child: TextField(
                          controller: nameController,
                          style: GoogleFonts.outfit(
                            color: Colors.white,
                            fontSize: 14,
                          ),
                          decoration: InputDecoration(
                            hintText: 'e.g. On behalf of my parents',
                            hintStyle: GoogleFonts.outfit(
                              color: Colors.white24,
                              fontSize: 13,
                            ),
                            border: InputBorder.none,
                          ),
                        ),
                      ),
                    ],

                    const SizedBox(height: 28),

                    // Price Breakdown
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: LuxuryColors.obsidianDeep,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: LuxuryColors.goldDark.withOpacity(0.15),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            NiyaLocalizations.translate('total_amount'),
                            style: GoogleFonts.outfit(
                              color: LuxuryColors.goldLight,
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            '\$${totalPrice.toStringAsFixed(2)}',
                            style: Theme.of(context).textTheme.displayMedium
                                ?.copyWith(fontSize: 20, color: Colors.white),
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 24),

                    // Apple Pay or Saved Visa Action Button (Saves persistent ledger record)
                    LuxuryButton(
                      text: _savedCardMask.isNotEmpty
                          ? (NiyaLocalizations.activeLanguage.value == 'ar'
                                ? 'دفع بواسطة فيزا (${_savedCardMask.substring(_savedCardMask.length - 4)})'
                                : 'Pay with Saved Visa (${_savedCardMask.substring(_savedCardMask.length - 4)})')
                          : NiyaLocalizations.translate('pay_with_apple_pay'),
                      icon: Icon(
                        _savedCardMask.isNotEmpty
                            ? Icons.credit_card_rounded
                            : Icons.apple_rounded,
                        color: LuxuryColors.obsidianBlack,
                        size: 22,
                      ),
                      onPressed: () async {
                        Navigator.pop(context);
                        final randomRef =
                            'TX-${10000 + (1000 * totalPrice.toInt() % 90000)}';
                        final xpReward = isUmrah ? 250 : quantity * 5;

                        // Persistent SharedPreferences registration via RecordsManager
                        await RecordsManager.saveBooking(
                          serviceTitle: titleAr,
                          serviceTitleEn: titleEn,
                          beneficiary: isUmrah
                              ? (nameController.text.isNotEmpty
                                    ? nameController.text
                                    : 'Rashid Al-Mansoor')
                              : (nameController.text.isNotEmpty
                                    ? nameController.text
                                    : 'Sadaqah Distribution'),
                          dua: duaController.text,
                          amount: totalPrice,
                          ledgerId: randomRef,
                          quantity: isUmrah ? 1 : quantity,
                          isUmrah: isUmrah,
                        );

                        // Dynamically decrement group campaign remaining spots persistently!
                        if (isUmrah) {
                          await RecordsManager.decrementCampaignSpots(1);
                        } else {
                          // Decrement 1 available spot per 10 charity items/meals sponsored
                          int decCount = (quantity / 10).round().clamp(1, 100);
                          await RecordsManager.decrementCampaignSpots(decCount);
                        }

                        // Trigger success visual indicators
                        _showOrderSuccessDialog(titleAr, randomRef, xpReward);
                        // Haptic click
                        HapticFeedback.vibrate();
                      },
                    ),
                    const SizedBox(height: 12),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return ValueListenableBuilder<String>(
      valueListenable: NiyaLocalizations.activeLanguage,
      builder: (context, lang, _) {
        final isAr = lang == 'ar';

        return Scaffold(
          body: Container(
            decoration: const BoxDecoration(
              gradient: LuxuryColors.obsidianGradient,
            ),
            child: SafeArea(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header & Language Switcher
                  Padding(
                    padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              NiyaLocalizations.translate('sacred_services'),
                              style: theme.textTheme.displayMedium?.copyWith(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              NiyaLocalizations.translate('services_subtitle'),
                              style: theme.textTheme.bodyMedium?.copyWith(
                                fontSize: 11,
                                color: LuxuryColors.goldLight.withOpacity(0.6),
                              ),
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            TextButton(
                              onPressed: () {
                                NiyaLocalizations.toggleLanguage();
                                _loadBookings(); // Refresh bookings
                                _loadSavedCard(); // Refresh credit card mask
                              },
                              child: Text(
                                isAr ? 'EN' : 'عربي',
                                style: GoogleFonts.outfit(
                                  color: LuxuryColors.goldAccent,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                ),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 10,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                color: LuxuryColors.goldMedium.withOpacity(0.1),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: LuxuryColors.goldMedium.withOpacity(0.3),
                                ),
                              ),
                              child: Text(
                                '${_userBookings.length} ${NiyaLocalizations.translate('completed_badge')}',
                                style: GoogleFonts.outfit(
                                  color: LuxuryColors.goldAccent,
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Marketplace Services Scrollable List
                  Expanded(
                    child: ListView(
                      padding: const EdgeInsets.fromLTRB(20, 0, 20, 90),
                      children: [
                        // Prominent Personal Umrah Application Banner Header
                        GlassmorphicCard(
                          borderRadius: 16,
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Row(
                                children: [
                                  const Icon(
                                    Icons.description_rounded,
                                    color: LuxuryColors.goldAccent,
                                    size: 24,
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Text(
                                      NiyaLocalizations.translate(
                                        'umrah_form_title',
                                      ),
                                      style: GoogleFonts.cairo(
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white,
                                        fontSize: 14,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text(
                                NiyaLocalizations.translate('umrah_form_desc'),
                                style: GoogleFonts.outfit(
                                  color: Colors.white60,
                                  fontSize: 11,
                                ),
                              ),
                              const SizedBox(height: 12),
                              LuxuryButton(
                                text: NiyaLocalizations.translate(
                                  'personal_umrah_form_btn',
                                ),
                                height: 38,
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) =>
                                          const UmrahApplicationPage(),
                                    ),
                                  ).then((_) {
                                    // Refresh bookings and application status when returning
                                    _loadBookings();
                                  });
                                },
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),

                        // Service 1: العمرة بالنيابة (Umrah by Proxy)
                        _buildServiceCard(
                          title: isAr ? 'العمرة بالنيابة' : 'Umrah by Proxy',
                          caption: isAr
                              ? 'نؤدي العمرة عنك أو عن أحبتك'
                              : 'We perform Umrah on behalf of your loved ones',
                          priceText: isAr
                              ? '1300 ريال سعودي'
                              : '\$350.00 / 1300 SAR',
                          iconData: Icons.home_filled, // Kaaba mock symbol
                          onTap: () {
                            _openBookingSheet(
                              'العمرة بالنيابة',
                              'Umrah on Behalf of Loved Ones',
                              '\$350.00',
                              350.0,
                              true,
                            );
                          },
                        ),

                        // Service 2: توزيع وجبات إفطار صائم (Fasting Meals) - NEW FEATURE REQUESTED!
                        _buildServiceCard(
                          title: isAr
                              ? 'وجبة إفطار صائم'
                              : 'Fasting Meals in Haram',
                          caption: isAr
                              ? 'توزيع وجبات إفطار على الصائمين في ساحات الحرم'
                              : 'Distributing fast-breaking meals in Haram',
                          priceText: isAr
                              ? '15 ريال للوجبة'
                              : '\$4.00 per Meal / Box',
                          iconData: Icons.restaurant_rounded, // Meals symbol
                          onTap: () {
                            _openBookingSheet(
                              'وجبة إفطار صائم',
                              'Fasting Meals in Haram Courtyard',
                              '\$4.00',
                              4.0,
                              false,
                            );
                          },
                        ),

                        // Service 3: توزيع الماء (Water Distribution)
                        _buildServiceCard(
                          title: isAr ? 'توزيع الماء' : 'Water Distribution',
                          caption: isAr
                              ? 'سقيا الماء في المسجد الحرام'
                              : 'Zamzam water distribution inside Haram',
                          priceText: isAr
                              ? '6 ريال للعبوة'
                              : '\$1.50 per Bottle / Zamzam',
                          iconData: Icons
                              .local_drink_rounded, // Water bottle mock symbol
                          onTap: () {
                            _openBookingSheet(
                              'توزيع الماء',
                              'Zamzam Water Distribution in Haram',
                              '\$1.50',
                              1.5,
                              false,
                            );
                          },
                        ),

                        // Service 4: توزيع التمر (Dates Distribution)
                        _buildServiceCard(
                          title: isAr ? 'توزيع التمر' : 'Dates Distribution',
                          caption: isAr
                              ? 'نوزع التمر على ضيوف الرحمن'
                              : 'Dates distribution to holy guests',
                          priceText: isAr
                              ? '8 ريال للعلبة'
                              : '\$2.00 per Box / Sukari',
                          iconData: Icons.eco_rounded, // Date box mock symbol
                          onTap: () {
                            _openBookingSheet(
                              'توزيع التمر',
                              'Dates Distribution for Pilgrims',
                              '\$2.00',
                              2.0,
                              false,
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  // Helper widget matching screenshot design perfectly
  Widget _buildServiceCard({
    required String title,
    required String caption,
    required String priceText,
    required IconData iconData,
    required VoidCallback onTap,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.all(20),
          height: 120,
          decoration: BoxDecoration(
            color: LuxuryColors.obsidianDeep,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: LuxuryColors.goldMedium.withOpacity(0.25),
              width: 1,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.4),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(
            children: [
              // Premium Icon/Graphic Representing Service on Left
              Container(
                width: 70,
                height: 70,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: LuxuryColors.obsidianBlack,
                  border: Border.all(
                    color: LuxuryColors.goldDark.withOpacity(0.3),
                    width: 1,
                  ),
                ),
                child: Center(
                  child: ShaderMask(
                    shaderCallback: (bounds) =>
                        LuxuryColors.goldGradient.createShader(bounds),
                    child: Icon(iconData, color: Colors.white, size: 32),
                  ),
                ),
              ),

              const SizedBox(width: 16),

              // Title and Sub-Caption in the Center (Expanded)
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      title,
                      style: GoogleFonts.amiri(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                        height: 1.2,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      caption,
                      style: GoogleFonts.cairo(
                        color: LuxuryColors.linenGrey.withOpacity(0.7),
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      priceText,
                      style: GoogleFonts.outfit(
                        color: LuxuryColors.goldAccent,
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ],
                ),
              ),

              // Small circular chevron button > on far right matching screenshot
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: LuxuryColors.goldMedium.withOpacity(0.1),
                  border: Border.all(
                    color: LuxuryColors.goldMedium.withOpacity(0.4),
                    width: 1,
                  ),
                ),
                child: const Center(
                  child: Icon(
                    Icons.chevron_right_rounded,
                    color: LuxuryColors.goldAccent,
                    size: 20,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
