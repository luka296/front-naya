import 'package:flutter/material.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/glassmorphic_card.dart';
import '../../../../core/widgets/luxury_button.dart';

class OnboardingPage extends StatefulWidget {
  final VoidCallback onComplete;

  const OnboardingPage({super.key, required this.onComplete});

  @override
  State<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<Map<String, String>> _slides = [
    {
      'title': 'Niya | نية',
      'subtitle': 'Purity of Intent',
      'description': 'Elevate your daily worship with a premium, all-in-one Islamic companion built for high-performance and deep visual devotion.',
    },
    {
      'title': 'Sacred Trusts',
      'subtitle': 'Umrah on Behalf',
      'description': 'Sponsor Umrah to be performed on behalf of loved ones, with complete transparent GPS verification and live media reports from vetted scholars.',
    },
    {
      'title': 'Family Safety',
      'subtitle': 'Lost Mode Radar',
      'description': 'Coordinate in crowds around Haram. Broadcast real-time location and navigate securely back to your family with custom bearing HUD maps.',
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LuxuryColors.obsidianGradient,
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
            child: Column(
              children: [
                // Top calligraphic accent brand
                const SizedBox(height: 20),
                Center(
                  child: Text(
                    'نية',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontSize: 48,
                      color: LuxuryColors.goldAccent,
                      shadows: [
                        Shadow(
                          color: LuxuryColors.goldDark.withOpacity(0.5),
                          blurRadius: 10,
                        ),
                      ],
                    ),
                  ),
                ),
                
                // Sliding cards
                Expanded(
                  child: PageView.builder(
                    controller: _pageController,
                    onPageChanged: (index) {
                      setState(() {
                        _currentPage = index;
                      });
                    },
                    itemCount: _slides.length,
                    itemBuilder: (context, index) {
                      final slide = _slides[index];
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 40.0),
                        child: GlassmorphicCard(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              // Decorative gold vector border symbol
                              Container(
                                width: 70,
                                height: 70,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  border: Border.all(color: LuxuryColors.goldLight, width: 1.5),
                                ),
                                child: const Center(
                                  child: Icon(
                                    Icons.spa_outlined,
                                    color: LuxuryColors.goldAccent,
                                    size: 32,
                                  ),
                                ),
                              ),
                              const SizedBox(height: 30),
                              Text(
                                slide['title']!,
                                style: theme.textTheme.displayLarge?.copyWith(fontSize: 26),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 8),
                              Text(
                                slide['subtitle']!,
                                style: theme.textTheme.labelLarge?.copyWith(
                                  color: LuxuryColors.goldAccent,
                                  fontSize: 14,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 20),
                              Padding(
                                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                                child: Text(
                                  slide['description']!,
                                  style: theme.textTheme.bodyLarge?.copyWith(
                                    color: LuxuryColors.linenGrey,
                                    fontSize: 14,
                                    height: 1.5,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),

                // Indicators & Control bar
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Slide Indicators
                    Row(
                      children: List.generate(
                        _slides.length,
                        (index) => AnimatedContainer(
                          duration: const Duration(milliseconds: 300),
                          margin: const EdgeInsets.only(right: 8.0),
                          width: _currentPage == index ? 24.0 : 8.0,
                          height: 8.0,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(4.0),
                            gradient: _currentPage == index ? LuxuryColors.goldGradient : null,
                            color: _currentPage == index ? null : LuxuryColors.obsidianGrey,
                          ),
                        ),
                      ),
                    ),
                    
                    // Action Trigger
                    LuxuryButton(
                      text: _currentPage == _slides.length - 1 ? 'BEGIN | ابدأ' : 'NEXT | التالي',
                      width: 140,
                      height: 48,
                      onPressed: () {
                        if (_currentPage < _slides.length - 1) {
                          _pageController.nextPage(
                            duration: const Duration(milliseconds: 450),
                            curve: Curves.easeInOutCubic,
                          );
                        } else {
                          widget.onComplete();
                        }
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
