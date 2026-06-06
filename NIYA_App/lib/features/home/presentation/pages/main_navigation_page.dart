import 'package:flutter/material.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/glassmorphic_card.dart';
import '../../../../core/utils/niya_localizations.dart';
import 'home_page.dart';
import '../../../quran/presentation/pages/quran_page.dart';
import '../../../qibla/presentation/pages/qibla_page.dart';
import '../../../services/presentation/pages/services_page.dart';

class MainNavigationPage extends StatefulWidget {
  final VoidCallback onLogout;

  const MainNavigationPage({super.key, required this.onLogout});

  @override
  State<MainNavigationPage> createState() => _MainNavigationPageState();
}

class _MainNavigationPageState extends State<MainNavigationPage> {
  int _currentIndex = 0;

  late final List<Widget> _pages;

  @override
  void initState() {
    super.initState();
    _pages = [
      HomePage(onLogout: widget.onLogout),
      const QuranPage(),
      const QiblaPage(),
      const ServicesPage(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<String>(
      valueListenable: NiyaLocalizations.activeLanguage,
      builder: (context, currentLanguage, _) {
        return Scaffold(
          extendBody: true, // Allows content to scroll behind the floating bar
          body: IndexedStack(
            index: _currentIndex,
            children: _pages,
          ),
          bottomNavigationBar: SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
              child: GlassmorphicCard(
                borderRadius: 30,
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildNavItem(0, Icons.home_rounded, NiyaLocalizations.translate('nav_home')),
                    _buildNavItem(1, Icons.menu_book_rounded, NiyaLocalizations.translate('nav_quran')),
                    _buildNavItem(2, Icons.explore_rounded, NiyaLocalizations.translate('nav_qibla')),
                    _buildNavItem(3, Icons.volunteer_activism_rounded, NiyaLocalizations.translate('nav_services')),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    final isSelected = _currentIndex == index;

    return GestureDetector(
      onTap: () {
        if (_currentIndex != index) {
          setState(() {
            _currentIndex = index;
          });
        }
      },
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: isSelected
            ? BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: LuxuryColors.goldMedium.withOpacity(0.15),
                border: Border.all(
                  color: LuxuryColors.goldLight.withOpacity(0.3),
                  width: 1,
                ),
              )
            : null,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              color: isSelected
                  ? LuxuryColors.goldAccent
                  : LuxuryColors.goldLight.withOpacity(0.5),
              size: 22,
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: TextStyle(
                fontSize: 10,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                color: isSelected
                    ? LuxuryColors.goldAccent
                    : LuxuryColors.goldLight.withOpacity(0.5),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
