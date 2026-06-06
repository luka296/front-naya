import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'core/theme/luxury_theme.dart';
import 'features/auth/presentation/cubit/auth_cubit.dart';
import 'features/auth/presentation/pages/onboarding_page.dart';
import 'features/auth/presentation/pages/login_page.dart';
import 'features/home/presentation/pages/main_navigation_page.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set preferred orientation to portrait to lock coordinates and standard gyro angles
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  
  // Enforce premium translucent system bar colors
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.light,
    systemNavigationBarColor: LuxuryColors.obsidianBlack,
    systemNavigationBarIconBrightness: Brightness.light,
  ));

  runApp(const NiyaApp());
}

class NiyaApp extends StatelessWidget {
  const NiyaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<AuthCubit>(create: (context) => AuthCubit()),
      ],
      child: MaterialApp(
        title: 'Niya | نية',
        debugShowCheckedModeBanner: false,
        theme: LuxuryTheme.darkTheme,
        home: const SplashLandingScreen(),
      ),
    );
  }
}

class SplashLandingScreen extends StatefulWidget {
  const SplashLandingScreen({super.key});

  @override
  State<SplashLandingScreen> createState() => _SplashLandingScreenState();
}

class _SplashLandingScreenState extends State<SplashLandingScreen> with SingleTickerProviderStateMixin {
  late AnimationController _fadeController;
  late Animation<double> _opacity;
  bool _isOnboardingFinished = false;
  bool _isSessionActive = false;

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    );
    _opacity = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _fadeController, curve: Curves.easeIn),
    );
    _fadeController.forward();

    // Simulate luxury brand exposure delay
    Future.delayed(const Duration(milliseconds: 2800), () {
      if (mounted) {
        setState(() {
          _isOnboardingFinished = false; // Trigger onboarding flow
        });
      }
    });
  }

  @override
  void dispose() {
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    // Switch between Splash screen, Onboarding flow, and Main Home Dashboard
    if (_isSessionActive) {
      return MainNavigationPage(
        onLogout: () {
          setState(() {
            _isSessionActive = false;
            _isOnboardingFinished = false;
          });
        },
      );
    }

    if (_isOnboardingFinished && !_isSessionActive) {
      return LoginPage(
        onLoginSuccess: () {
          setState(() {
            _isSessionActive = true;
          });
        },
      );
    }

    if (_isOnboardingFinished == false && _fadeController.isCompleted) {
      return OnboardingPage(
        onComplete: () {
          setState(() {
            _isOnboardingFinished = true;
          });
        },
      );
    }

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LuxuryColors.obsidianGradient,
        ),
        child: Center(
          child: FadeTransition(
            opacity: _opacity,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Calligraphic center logo
                Text(
                  'نية',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontSize: 84,
                    color: LuxuryColors.goldAccent,
                    shadows: [
                      Shadow(
                        color: LuxuryColors.goldDark.withOpacity(0.6),
                        blurRadius: 20,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  'NIYA',
                  style: theme.textTheme.displayMedium?.copyWith(
                    fontSize: 22,
                    fontWeight: FontWeight.w300,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Sacred Worship & Safety Ecosystem',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: LuxuryColors.goldLight.withOpacity(0.5),
                    fontSize: 12,
                    letterSpacing: 1.5,
                  ),
                ),
                const SizedBox(height: 80),
                const CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(LuxuryColors.goldMedium),
                  strokeWidth: 2.0,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
