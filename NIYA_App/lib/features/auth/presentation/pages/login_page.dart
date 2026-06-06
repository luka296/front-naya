import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/luxury_button.dart';
import '../../../../core/utils/niya_localizations.dart';

class LoginPage extends StatefulWidget {
  final VoidCallback onLoginSuccess;

  const LoginPage({super.key, required this.onLoginSuccess});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _cardNumberController = TextEditingController();
  final _cardExpiryController = TextEditingController();
  final _cardCvvController = TextEditingController();
  final _cardHolderController = TextEditingController();

  String _cardNumberDisplay = '•••• •••• •••• ••••';
  String _cardExpiryDisplay = 'MM/YY';
  String _cardHolderDisplay = 'CARDHOLDER NAME';
  String _cardCvvDisplay = '•••';

  @override
  void initState() {
    super.initState();
    // Hook listeners to update card visualization dynamically
    _cardNumberController.addListener(() {
      setState(() {
        String raw = _cardNumberController.text.replaceAll(' ', '');
        if (raw.isEmpty) {
          _cardNumberDisplay = '•••• •••• •••• ••••';
          return;
        }
        // Format nicely into groups of 4 digits
        List<String> segments = [];
        for (int i = 0; i < raw.length; i += 4) {
          int end = i + 4;
          if (end > raw.length) end = raw.length;
          segments.add(raw.substring(i, end));
        }
        _cardNumberDisplay = segments.join(' ');
      });
    });

    _cardExpiryController.addListener(() {
      setState(() {
        _cardExpiryDisplay = _cardExpiryController.text.isEmpty
            ? 'MM/YY'
            : _cardExpiryController.text;
      });
    });

    _cardHolderController.addListener(() {
      setState(() {
        _cardHolderDisplay = _cardHolderController.text.isEmpty
            ? 'CARDHOLDER NAME'
            : _cardHolderController.text.toUpperCase();
      });
    });

    _cardCvvController.addListener(() {
      setState(() {
        _cardCvvDisplay = _cardCvvController.text.isEmpty
            ? '•••'
            : _cardCvvController.text;
      });
    });
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _cardNumberController.dispose();
    _cardExpiryController.dispose();
    _cardCvvController.dispose();
    _cardHolderController.dispose();
    super.dispose();
  }

  Future<void> _handleSaveAndLogin() async {
    final prefs = await SharedPreferences.getInstance();

    // Securely cache login credentials and card information
    await prefs.setString('niya_user_email', _emailController.text);
    
    // Cache registered Visa card information
    String cardNum = _cardNumberController.text.replaceAll(' ', '');
    if (cardNum.length >= 4) {
      String masked = '•••• •••• •••• ${cardNum.substring(cardNum.length - 4)}';
      await prefs.setString('niya_visa_number', masked);
      await prefs.setString('niya_visa_holder', _cardHolderController.text);
      await prefs.setString('niya_visa_expiry', _cardExpiryController.text);
    } else {
      // Default mock card if they leave it empty
      await prefs.setString('niya_visa_number', '•••• •••• •••• 8820');
      await prefs.setString('niya_visa_holder', 'TARIQ AL-MANSOOR');
      await prefs.setString('niya_visa_expiry', '12/29');
    }

    await prefs.setBool('niya_session_active', true);

    HapticFeedback.mediumImpact();
    widget.onLoginSuccess();
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
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Top language bar
                    Align(
                      alignment: isAr ? Alignment.topLeft : Alignment.topRight,
                      child: TextButton(
                        onPressed: () {
                          NiyaLocalizations.toggleLanguage();
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
                    ),

                    // Brand calligraphic emblem
                    Center(
                      child: Text(
                        'نية',
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontSize: 64,
                          color: LuxuryColors.goldAccent,
                          shadows: [
                            Shadow(
                              color: LuxuryColors.goldDark.withOpacity(0.6),
                              blurRadius: 15,
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Center(
                      child: Text(
                        NiyaLocalizations.translate('login_header_title'),
                        style: theme.textTheme.displayMedium?.copyWith(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Center(
                      child: Text(
                        NiyaLocalizations.translate('login_subtitle'),
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: LuxuryColors.goldLight.withOpacity(0.6),
                          fontSize: 12,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    const SizedBox(height: 28),

                    // Inputs Section
                    Text(
                      NiyaLocalizations.translate('email'),
                      style: GoogleFonts.outfit(color: LuxuryColors.goldLight, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        color: LuxuryColors.obsidianDeep,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: LuxuryColors.goldMedium.withOpacity(0.2)),
                      ),
                      child: TextField(
                        controller: _emailController,
                        style: GoogleFonts.outfit(color: Colors.white, fontSize: 14),
                        decoration: const InputDecoration(
                          hintText: 'tariq@niya.app',
                          hintStyle: TextStyle(color: Colors.white24, fontSize: 13),
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),

                    Text(
                      NiyaLocalizations.translate('password'),
                      style: GoogleFonts.outfit(color: LuxuryColors.goldLight, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        color: LuxuryColors.obsidianDeep,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: LuxuryColors.goldMedium.withOpacity(0.2)),
                      ),
                      child: TextField(
                        controller: _passwordController,
                        obscureText: true,
                        style: GoogleFonts.outfit(color: Colors.white, fontSize: 14),
                        decoration: const InputDecoration(
                          hintText: '••••••••',
                          hintStyle: TextStyle(color: Colors.white24, fontSize: 13),
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),

                    // Interactive Premium Visa Card Visual
                    _buildVisaCardWidget(),
                    const SizedBox(height: 28),

                    // Visa Registration Fields
                    Text(
                      NiyaLocalizations.translate('visa_card_info').toUpperCase(),
                      style: GoogleFonts.outfit(
                        color: LuxuryColors.goldAccent,
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.0,
                      ),
                    ),
                    const SizedBox(height: 12),

                    // Card Number
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        color: LuxuryColors.obsidianDeep,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: LuxuryColors.goldMedium.withOpacity(0.2)),
                      ),
                      child: TextField(
                        controller: _cardNumberController,
                        keyboardType: TextInputType.number,
                        maxLength: 19, // Support spaces spacing
                        style: GoogleFonts.outfit(color: Colors.white, fontSize: 14),
                        decoration: InputDecoration(
                          hintText: NiyaLocalizations.translate('card_number'),
                          hintStyle: const TextStyle(color: Colors.white24, fontSize: 13),
                          border: InputBorder.none,
                          counterText: '',
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),

                    // Expiry and CVV Row
                    Row(
                      children: [
                        Expanded(
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            decoration: BoxDecoration(
                              color: LuxuryColors.obsidianDeep,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: LuxuryColors.goldMedium.withOpacity(0.2)),
                            ),
                            child: TextField(
                              controller: _cardExpiryController,
                              keyboardType: TextInputType.datetime,
                              maxLength: 5,
                              style: GoogleFonts.outfit(color: Colors.white, fontSize: 14),
                              decoration: InputDecoration(
                                hintText: NiyaLocalizations.translate('card_expiry'),
                                hintStyle: const TextStyle(color: Colors.white24, fontSize: 13),
                                border: InputBorder.none,
                                counterText: '',
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            decoration: BoxDecoration(
                              color: LuxuryColors.obsidianDeep,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: LuxuryColors.goldMedium.withOpacity(0.2)),
                            ),
                            child: TextField(
                              controller: _cardCvvController,
                              keyboardType: TextInputType.number,
                              maxLength: 3,
                              obscureText: true,
                              style: GoogleFonts.outfit(color: Colors.white, fontSize: 14),
                              decoration: InputDecoration(
                                hintText: NiyaLocalizations.translate('card_cvv'),
                                hintStyle: const TextStyle(color: Colors.white24, fontSize: 13),
                                border: InputBorder.none,
                                counterText: '',
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    // Cardholder Name
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        color: LuxuryColors.obsidianDeep,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: LuxuryColors.goldMedium.withOpacity(0.2)),
                      ),
                      child: TextField(
                        controller: _cardHolderController,
                        keyboardType: TextInputType.name,
                        style: GoogleFonts.outfit(color: Colors.white, fontSize: 14),
                        decoration: InputDecoration(
                          hintText: NiyaLocalizations.translate('cardholder_name'),
                          hintStyle: const TextStyle(color: Colors.white24, fontSize: 13),
                          border: InputBorder.none,
                        ),
                      ),
                    ),

                    const SizedBox(height: 36),

                    // Action Save & Login Button
                    LuxuryButton(
                      text: NiyaLocalizations.translate('save_and_login'),
                      onPressed: _handleSaveAndLogin,
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  // Beautiful visual luxury Visa card widget
  Widget _buildVisaCardWidget() {
    return Container(
      height: 180,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: const LinearGradient(
          colors: [
            Color(0xFF0F1424),
            Color(0xFF1E284C),
            Color(0xFF0C0E1A),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        border: Border.all(
          color: LuxuryColors.goldMedium.withOpacity(0.4),
          width: 1.5,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.6),
            blurRadius: 16,
            spreadRadius: -2,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Visa Logo & Luxury Chip Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Gold smart chip symbol
              Container(
                width: 38,
                height: 28,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(6),
                  gradient: LinearGradient(
                    colors: [
                      LuxuryColors.goldAccent,
                      LuxuryColors.goldDark,
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: CustomPaint(
                  painter: CardChipPainter(),
                ),
              ),
              // Visa Infinite Calligraphy logo
              Text(
                'VISA',
                style: GoogleFonts.cinzel(
                  color: LuxuryColors.goldAccent,
                  fontWeight: FontWeight.bold,
                  fontSize: 22,
                  fontStyle: FontStyle.italic,
                  letterSpacing: 1.5,
                ),
              ),
            ],
          ),

          // Card Number Group
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 12.0),
            child: Text(
              _cardNumberDisplay,
              style: GoogleFonts.outfit(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.w600,
                letterSpacing: 2.0,
              ),
            ),
          ),

          // Expiry & Card Holder Details
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'CARDHOLDER',
                      style: GoogleFonts.outfit(
                        color: LuxuryColors.goldLight.withOpacity(0.5),
                        fontSize: 8,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      _cardHolderDisplay,
                      style: GoogleFonts.outfit(
                        color: Colors.white,
                        fontSize: 11,
                        fontWeight: FontWeight.w500,
                        letterSpacing: 0.5,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    'EXPIRY',
                    style: GoogleFonts.outfit(
                      color: LuxuryColors.goldLight.withOpacity(0.5),
                      fontSize: 8,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    _cardExpiryDisplay,
                    style: GoogleFonts.outfit(
                      color: Colors.white,
                      fontSize: 11,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'CVV',
                    style: GoogleFonts.outfit(
                      color: LuxuryColors.goldLight.withOpacity(0.5),
                      fontSize: 8,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    _cardCvvDisplay,
                    style: GoogleFonts.outfit(
                      color: Colors.white,
                      fontSize: 11,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// Micro CustomPainter for smart chip details
class CardChipPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final Paint linePaint = Paint()
      ..color = Colors.black.withOpacity(0.2)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    // Draw card chip metal contacts simulation
    canvas.drawLine(Offset(size.width / 3, 0), Offset(size.width / 3, size.height), linePaint);
    canvas.drawLine(Offset(2 * size.width / 3, 0), Offset(2 * size.width / 3, size.height), linePaint);
    canvas.drawLine(Offset(0, size.height / 2), Offset(size.width, size.height / 2), linePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
