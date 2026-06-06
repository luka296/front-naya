import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/glassmorphic_card.dart';
import '../../../../core/widgets/luxury_button.dart';
import '../../../../core/utils/niya_localizations.dart';

class UmrahApplicationPage extends StatefulWidget {
  const UmrahApplicationPage({super.key});

  @override
  State<UmrahApplicationPage> createState() => _UmrahApplicationPageState();
}

class _UmrahApplicationPageState extends State<UmrahApplicationPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _ageController = TextEditingController();
  final _countryController = TextEditingController();
  final _phoneController = TextEditingController();
  final _emailController = TextEditingController();
  bool _hasPerformedBefore = false;

  @override
  void dispose() {
    _nameController.dispose();
    _ageController.dispose();
    _countryController.dispose();
    _phoneController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _handleSubmit() async {
    if (_formKey.currentState!.validate()) {
      final prefs = await SharedPreferences.getInstance();
      
      // Persist submission status so HomePage can dynamically display it!
      await prefs.setBool('niya_personal_umrah_applied', true);
      await prefs.setString('niya_personal_umrah_name', _nameController.text);
      await prefs.setString('niya_personal_umrah_country', _countryController.text);
      await prefs.setString('niya_personal_umrah_phone', _phoneController.text);
      await prefs.setBool('niya_personal_umrah_prev', _hasPerformedBefore);

      HapticFeedback.vibrate();

      // Show beautiful success dialog
      if (mounted) {
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
                        width: 60,
                        height: 60,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: LuxuryColors.emeraldGreen.withOpacity(0.15),
                          border: Border.all(color: Colors.greenAccent, width: 1.5),
                        ),
                        child: const Center(
                          child: Icon(
                            Icons.verified_user_rounded,
                            color: Colors.greenAccent,
                            size: 32,
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Text(
                        NiyaLocalizations.translate('applied_success'),
                        style: GoogleFonts.cinzel(
                          color: LuxuryColors.goldAccent,
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 12),
                      Text(
                        NiyaLocalizations.translate('applied_desc'),
                        style: GoogleFonts.outfit(
                          color: Colors.white70,
                          fontSize: 12,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 24),
                      LuxuryButton(
                        text: NiyaLocalizations.translate('continue'),
                        height: 44,
                        onPressed: () {
                          Navigator.pop(context); // Close dialog
                          Navigator.pop(context); // Go back to services
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
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return ValueListenableBuilder<String>(
      valueListenable: NiyaLocalizations.activeLanguage,
      builder: (context, lang, _) {
        final isAr = lang == 'ar';

        return Scaffold(
          appBar: AppBar(
            title: Text(
              NiyaLocalizations.translate('umrah_form_title'),
              style: theme.appBarTheme.titleTextStyle,
            ),
          ),
          body: Container(
            decoration: const BoxDecoration(
              gradient: LuxuryColors.obsidianGradient,
            ),
            child: SafeArea(
              child: Form(
                key: _formKey,
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Form Header
                      Text(
                        NiyaLocalizations.translate('umrah_form_desc'),
                        style: GoogleFonts.outfit(
                          color: LuxuryColors.goldLight.withOpacity(0.6),
                          fontSize: 13,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 24),

                      // Name Field
                      _buildLabel(NiyaLocalizations.translate('beneficiary_name')),
                      const SizedBox(height: 8),
                      _buildTextField(
                        controller: _nameController,
                        hint: isAr ? 'الاسم الكامل ثلاثي' : 'Enter your full name',
                        validator: (v) => v!.isEmpty ? (isAr ? 'الرجاء إدخال الاسم' : 'Please enter your name') : null,
                      ),
                      const SizedBox(height: 20),

                      // Age Field
                      _buildLabel(NiyaLocalizations.translate('age')),
                      const SizedBox(height: 8),
                      _buildTextField(
                        controller: _ageController,
                        hint: isAr ? 'مثال: 34' : 'e.g. 34',
                        keyboard: TextInputType.number,
                        validator: (v) => v!.isEmpty ? (isAr ? 'الرجاء إدخال السن' : 'Please enter your age') : null,
                      ),
                      const SizedBox(height: 20),

                      // Country Field
                      _buildLabel(NiyaLocalizations.translate('country')),
                      const SizedBox(height: 8),
                      _buildTextField(
                        controller: _countryController,
                        hint: isAr ? 'البلد الأصلي' : 'Origin country',
                        validator: (v) => v!.isEmpty ? (isAr ? 'الرجاء إدخال البلد' : 'Please enter your country') : null,
                      ),
                      const SizedBox(height: 20),

                      // Phone Field
                      _buildLabel(NiyaLocalizations.translate('phone_number')),
                      const SizedBox(height: 8),
                      _buildTextField(
                        controller: _phoneController,
                        hint: '+966 50 123 4567',
                        keyboard: TextInputType.phone,
                        validator: (v) => v!.isEmpty ? (isAr ? 'الرجاء إدخال رقم الهاتف' : 'Please enter phone number') : null,
                      ),
                      const SizedBox(height: 20),

                      // Email Field
                      _buildLabel(NiyaLocalizations.translate('email')),
                      const SizedBox(height: 8),
                      _buildTextField(
                        controller: _emailController,
                        hint: 'name@example.com',
                        keyboard: TextInputType.emailAddress,
                        validator: (v) => v!.isEmpty ? (isAr ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter email address') : null,
                      ),
                      const SizedBox(height: 24),

                      // Question Field: Have you performed Umrah before?
                      _buildLabel(NiyaLocalizations.translate('have_performed_before')),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: _buildToggleOption(
                              label: NiyaLocalizations.translate('yes'),
                              selected: _hasPerformedBefore,
                              onTap: () => setState(() => _hasPerformedBefore = true),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: _buildToggleOption(
                              label: NiyaLocalizations.translate('no'),
                              selected: !_hasPerformedBefore,
                              onTap: () => setState(() => _hasPerformedBefore = false),
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 40),

                      // Submit button
                      LuxuryButton(
                        text: NiyaLocalizations.translate('submit_application'),
                        onPressed: _handleSubmit,
                      ),
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildLabel(String text) {
    return Text(
      text,
      style: GoogleFonts.outfit(
        color: LuxuryColors.goldLight,
        fontWeight: FontWeight.bold,
        fontSize: 10,
        letterSpacing: 1.0,
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String hint,
    TextInputType keyboard = TextInputType.text,
    String? Function(String?)? validator,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: LuxuryColors.obsidianDeep,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: LuxuryColors.goldMedium.withOpacity(0.25),
        ),
      ),
      child: TextFormField(
        controller: controller,
        keyboardType: keyboard,
        validator: validator,
        style: GoogleFonts.outfit(color: Colors.white, fontSize: 14),
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: const TextStyle(color: Colors.white24, fontSize: 13),
          border: InputBorder.none,
          errorStyle: const TextStyle(color: LuxuryColors.coralRed, fontSize: 11),
        ),
      ),
    );
  }

  Widget _buildToggleOption({
    required String label,
    required bool selected,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 48,
        decoration: BoxDecoration(
          color: selected ? LuxuryColors.goldMedium.withOpacity(0.15) : LuxuryColors.obsidianDeep,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: selected ? LuxuryColors.goldAccent : LuxuryColors.goldMedium.withOpacity(0.25),
            width: selected ? 1.5 : 1,
          ),
        ),
        child: Center(
          child: Text(
            label,
            style: GoogleFonts.outfit(
              color: selected ? LuxuryColors.goldAccent : Colors.white60,
              fontWeight: FontWeight.bold,
              fontSize: 14,
            ),
          ),
        ),
      ),
    );
  }
}
