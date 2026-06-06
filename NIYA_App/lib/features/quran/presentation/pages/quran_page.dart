import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../../core/theme/luxury_theme.dart';
import '../../../../core/widgets/glassmorphic_card.dart';
import '../../../../core/utils/niya_localizations.dart';
import 'surah_detail_page.dart';

class QuranPage extends StatefulWidget {
  const QuranPage({super.key});

  @override
  State<QuranPage> createState() => _QuranPageState();
}

class _QuranPageState extends State<QuranPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';

  // Comprehensive complete catalog of all 114 Quranic Surahs
  final List<Map<String, dynamic>> _all114Surahs = [
    {'number': 1, 'nameAr': 'الفاتحة', 'nameEn': 'Al-Fatihah', 'meaningEn': 'The Opening', 'type': 'Meccan', 'verses': 7},
    {'number': 2, 'nameAr': 'البقرة', 'nameEn': 'Al-Baqarah', 'meaningEn': 'The Cow', 'type': 'Medinan', 'verses': 286},
    {'number': 3, 'nameAr': 'آل عمران', 'nameEn': 'Ali \'Imran', 'meaningEn': 'Family of Imran', 'type': 'Medinan', 'verses': 200},
    {'number': 4, 'nameAr': 'النساء', 'nameEn': 'An-Nisa', 'meaningEn': 'The Women', 'type': 'Medinan', 'verses': 176},
    {'number': 5, 'nameAr': 'المائدة', 'nameEn': 'Al-Ma\'idah', 'meaningEn': 'The Table Spread', 'type': 'Medinan', 'verses': 120},
    {'number': 6, 'nameAr': 'الأنعام', 'nameEn': 'Al-An\'am', 'meaningEn': 'The Cattle', 'type': 'Meccan', 'verses': 165},
    {'number': 7, 'nameAr': 'الأعراف', 'nameEn': 'Al-A\'raf', 'meaningEn': 'The Heights', 'type': 'Meccan', 'verses': 206},
    {'number': 8, 'nameAr': 'الأنفال', 'nameEn': 'Al-Anfal', 'meaningEn': 'The Spoils of War', 'type': 'Medinan', 'verses': 75},
    {'number': 9, 'nameAr': 'التوبة', 'nameEn': 'At-Tawbah', 'meaningEn': 'The Repentance', 'type': 'Medinan', 'verses': 129},
    {'number': 10, 'nameAr': 'يونس', 'nameEn': 'Yunus', 'meaningEn': 'Jonah', 'type': 'Meccan', 'verses': 109},
    {'number': 11, 'nameAr': 'هود', 'nameEn': 'Hud', 'meaningEn': 'Hud', 'type': 'Meccan', 'verses': 123},
    {'number': 12, 'nameAr': 'يوسف', 'nameEn': 'Yusuf', 'meaningEn': 'Joseph', 'type': 'Meccan', 'verses': 111},
    {'number': 13, 'nameAr': 'الرعد', 'nameEn': 'Ar-Ra\'d', 'meaningEn': 'The Thunder', 'type': 'Medinan', 'verses': 43},
    {'number': 14, 'nameAr': 'إبراهيم', 'nameEn': 'Ibrahim', 'meaningEn': 'Abraham', 'type': 'Meccan', 'verses': 52},
    {'number': 15, 'nameAr': 'الحجر', 'nameEn': 'Al-Hijr', 'meaningEn': 'The Rocky Tract', 'type': 'Meccan', 'verses': 99},
    {'number': 16, 'nameAr': 'النحل', 'nameEn': 'An-Nahl', 'meaningEn': 'The Bee', 'type': 'Meccan', 'verses': 128},
    {'number': 17, 'nameAr': 'الإسراء', 'nameEn': 'Al-Isra', 'meaningEn': 'The Night Journey', 'type': 'Meccan', 'verses': 111},
    {'number': 18, 'nameAr': 'الكهف', 'nameEn': 'Al-Kahf', 'meaningEn': 'The Cave', 'type': 'Meccan', 'verses': 110},
    {'number': 19, 'nameAr': 'مريم', 'nameEn': 'Maryam', 'meaningEn': 'Mary', 'type': 'Meccan', 'verses': 98},
    {'number': 20, 'nameAr': 'طه', 'nameEn': 'Taha', 'meaningEn': 'Ta-Ha', 'type': 'Meccan', 'verses': 135},
    {'number': 21, 'nameAr': 'الأنبياء', 'nameEn': 'Al-Anbiya', 'meaningEn': 'The Prophets', 'type': 'Meccan', 'verses': 112},
    {'number': 22, 'nameAr': 'الحج', 'nameEn': 'Al-Hajj', 'meaningEn': 'The Pilgrimage', 'type': 'Medinan', 'verses': 78},
    {'number': 23, 'nameAr': 'المؤمنون', 'nameEn': 'Al-Mu\'minun', 'meaningEn': 'The Believers', 'type': 'Meccan', 'verses': 118},
    {'number': 24, 'nameAr': 'النور', 'nameEn': 'An-Nur', 'meaningEn': 'The Light', 'type': 'Medinan', 'verses': 64},
    {'number': 25, 'nameAr': 'الفرقان', 'nameEn': 'Al-Furqan', 'meaningEn': 'The Criterion', 'type': 'Meccan', 'verses': 77},
    {'number': 26, 'nameAr': 'الشعراء', 'nameEn': 'Ash-Shu\'ara', 'meaningEn': 'The Poets', 'type': 'Meccan', 'verses': 227},
    {'number': 27, 'nameAr': 'النمل', 'nameEn': 'An-Nahl', 'meaningEn': 'The Ant', 'type': 'Meccan', 'verses': 93},
    {'number': 28, 'nameAr': 'القصص', 'nameEn': 'Al-Qasas', 'meaningEn': 'The Stories', 'type': 'Meccan', 'verses': 88},
    {'number': 29, 'nameAr': 'العنكبوت', 'nameEn': 'Al-\'Ankabut', 'meaningEn': 'The Spider', 'type': 'Meccan', 'verses': 69},
    {'number': 30, 'nameAr': 'الروم', 'nameEn': 'Ar-Rum', 'meaningEn': 'The Romans', 'type': 'Meccan', 'verses': 60},
    {'number': 31, 'nameAr': 'لقمان', 'nameEn': 'Luqman', 'meaningEn': 'Luqman', 'type': 'Meccan', 'verses': 34},
    {'number': 32, 'nameAr': 'السجدة', 'nameEn': 'As-Sajdah', 'meaningEn': 'The Prostration', 'type': 'Meccan', 'verses': 30},
    {'number': 33, 'nameAr': 'الأحزاب', 'nameEn': 'Al-Ahzab', 'meaningEn': 'The Combined Forces', 'type': 'Medinan', 'verses': 73},
    {'number': 34, 'nameAr': 'سبأ', 'nameEn': 'Saba', 'meaningEn': 'Sheba', 'type': 'Meccan', 'verses': 54},
    {'number': 35, 'nameAr': 'فاطر', 'nameEn': 'Fatir', 'meaningEn': 'The Originator', 'type': 'Meccan', 'verses': 45},
    {'number': 36, 'nameAr': 'يس', 'nameEn': 'Ya-Sin', 'meaningEn': 'Ya Sin', 'type': 'Meccan', 'verses': 83},
    {'number': 37, 'nameAr': 'الصافات', 'nameEn': 'As-Saffat', 'meaningEn': 'Those who set the Ranks', 'type': 'Meccan', 'verses': 182},
    {'number': 38, 'nameAr': 'ص', 'nameEn': 'Sad', 'meaningEn': 'The Letter Sad', 'type': 'Meccan', 'verses': 88},
    {'number': 39, 'nameAr': 'الزمر', 'nameEn': 'Az-Zumar', 'meaningEn': 'The Troops', 'type': 'Meccan', 'verses': 75},
    {'number': 40, 'nameAr': 'غافر', 'nameEn': 'Ghafir', 'meaningEn': 'The Forgiver', 'type': 'Meccan', 'verses': 85},
    {'number': 41, 'nameAr': 'فصلت', 'nameEn': 'Fussilat', 'meaningEn': 'Explained in Detail', 'type': 'Meccan', 'verses': 54},
    {'number': 42, 'nameAr': 'الشورى', 'nameEn': 'Ash-Shura', 'meaningEn': 'The Consultation', 'type': 'Meccan', 'verses': 53},
    {'number': 43, 'nameAr': 'الزخرف', 'nameEn': 'Az-Zukhruf', 'meaningEn': 'The Ornaments of Gold', 'type': 'Meccan', 'verses': 89},
    {'number': 44, 'nameAr': 'الدخان', 'nameEn': 'Ad-Dukhan', 'meaningEn': 'The Smoke', 'type': 'Meccan', 'verses': 59},
    {'number': 45, 'nameAr': 'الجاثية', 'nameEn': 'Al-Jathiyah', 'meaningEn': 'The Crouching', 'type': 'Meccan', 'verses': 37},
    {'number': 46, 'nameAr': 'الأحقاف', 'nameEn': 'Al-Ahqaf', 'meaningEn': 'The Wind-Curved Sandhills', 'type': 'Meccan', 'verses': 35},
    {'number': 47, 'nameAr': 'محمد', 'nameEn': 'Muhammad', 'meaningEn': 'Muhammad', 'type': 'Medinan', 'verses': 38},
    {'number': 48, 'nameAr': 'الفتح', 'nameEn': 'Al-Fath', 'meaningEn': 'The Victory', 'type': 'Medinan', 'verses': 29},
    {'number': 49, 'nameAr': 'الحجرات', 'nameEn': 'Al-Hujurat', 'meaningEn': 'The Dwellings', 'type': 'Medinan', 'verses': 18},
    {'number': 50, 'nameAr': 'ق', 'nameEn': 'Qaf', 'meaningEn': 'The Letter Qaf', 'type': 'Meccan', 'verses': 45},
    {'number': 51, 'nameAr': 'الذاريات', 'nameEn': 'Adh-Dhariyat', 'meaningEn': 'The Winnowing Winds', 'type': 'Meccan', 'verses': 60},
    {'number': 52, 'nameAr': 'الطور', 'nameEn': 'At-Tur', 'meaningEn': 'The Mount', 'type': 'Meccan', 'verses': 49},
    {'number': 53, 'nameAr': 'النجم', 'nameEn': 'An-Najm', 'meaningEn': 'The Star', 'type': 'Meccan', 'verses': 62},
    {'number': 54, 'nameAr': 'المرسل', 'nameEn': 'Al-Qamar', 'meaningEn': 'The Moon', 'type': 'Meccan', 'verses': 55},
    {'number': 55, 'nameAr': 'الرحمن', 'nameEn': 'Ar-Rahman', 'meaningEn': 'The Beneficent', 'type': 'Medinan', 'verses': 78},
    {'number': 56, 'nameAr': 'الواقعة', 'nameEn': 'Al-Waqi\'ah', 'meaningEn': 'The Inevitable', 'type': 'Meccan', 'verses': 96},
    {'number': 57, 'nameAr': 'الحديد', 'nameEn': 'Al-Hadid', 'meaningEn': 'The Iron', 'type': 'Medinan', 'verses': 29},
    {'number': 58, 'nameAr': 'المجادلة', 'nameEn': 'Al-Mujadilah', 'meaningEn': 'The Pleading Woman', 'type': 'Medinan', 'verses': 22},
    {'number': 59, 'nameAr': 'الحشر', 'nameEn': 'Al-Hashr', 'meaningEn': 'The Exile', 'type': 'Medinan', 'verses': 24},
    {'number': 60, 'nameAr': 'الممتحنة', 'nameEn': 'Al-Mumtahanah', 'meaningEn': 'She that is to be examined', 'type': 'Medinan', 'verses': 13},
    {'number': 61, 'nameAr': 'الصف', 'nameEn': 'As-Saff', 'meaningEn': 'The Ranks', 'type': 'Medinan', 'verses': 14},
    {'number': 62, 'nameAr': 'الجمعة', 'nameEn': 'Al-Jum\'ah', 'meaningEn': 'The Congregation', 'type': 'Medinan', 'verses': 11},
    {'number': 63, 'nameAr': 'المنافقون', 'nameEn': 'Al-Munafiqun', 'meaningEn': 'The Hypocrites', 'type': 'Medinan', 'verses': 11},
    {'number': 64, 'nameAr': 'التغابن', 'nameEn': 'At-Taghabun', 'meaningEn': 'The Mutual Disillusion', 'type': 'Medinan', 'verses': 18},
    {'number': 65, 'nameAr': 'الطلاق', 'nameEn': 'At-Talaq', 'meaningEn': 'The Divorce', 'type': 'Medinan', 'verses': 12},
    {'number': 66, 'nameAr': 'التحريم', 'nameEn': 'At-Tahrim', 'meaningEn': 'The Prohibition', 'type': 'Medinan', 'verses': 12},
    {'number': 67, 'nameAr': 'الملك', 'nameEn': 'Al-Mulk', 'meaningEn': 'The Sovereignty', 'type': 'Meccan', 'verses': 30},
    {'number': 68, 'nameAr': 'القلم', 'nameEn': 'Al-Qalam', 'meaningEn': 'The Pen', 'type': 'Meccan', 'verses': 52},
    {'number': 69, 'nameAr': 'الحاقة', 'nameEn': 'Al-Haqqah', 'meaningEn': 'The Reality', 'type': 'Meccan', 'verses': 52},
    {'number': 70, 'nameAr': 'المعارج', 'nameEn': 'Al-Ma\'arij', 'meaningEn': 'The Ascending Stairways', 'type': 'Meccan', 'verses': 44},
    {'number': 71, 'nameAr': 'نوح', 'nameEn': 'Nuh', 'meaningEn': 'Noah', 'type': 'Meccan', 'verses': 28},
    {'number': 72, 'nameAr': 'الجن', 'nameEn': 'Al-Jinn', 'meaningEn': 'The Jinn', 'type': 'Meccan', 'verses': 28},
    {'number': 73, 'nameAr': 'المزمل', 'nameEn': 'Al-Muzzammil', 'meaningEn': 'The Enshrouded One', 'type': 'Meccan', 'verses': 20},
    {'number': 74, 'nameAr': 'المدثر', 'nameEn': 'Al-Muddaththir', 'meaningEn': 'The Cloaked One', 'type': 'Meccan', 'verses': 56},
    {'number': 75, 'nameAr': 'القيامة', 'nameEn': 'Al-Qiyamah', 'meaningEn': 'The Resurrection', 'type': 'Meccan', 'verses': 40},
    {'number': 76, 'nameAr': 'الإنسان', 'nameEn': 'Al-Insan', 'meaningEn': 'The Man', 'type': 'Medinan', 'verses': 31},
    {'number': 77, 'nameAr': 'المرسلات', 'nameEn': 'Al-Mursalat', 'meaningEn': 'The Emissaries', 'type': 'Meccan', 'verses': 50},
    {'number': 78, 'nameAr': 'النبأ', 'nameEn': 'An-Naba', 'meaningEn': 'The Tidings', 'type': 'Meccan', 'verses': 40},
    {'number': 79, 'nameAr': 'النازعات', 'nameEn': 'An-Nazi\'at', 'meaningEn': 'Those who drag forth', 'type': 'Meccan', 'verses': 46},
    {'number': 80, 'nameAr': 'عبس', 'nameEn': 'Abasa', 'meaningEn': 'He Frowned', 'type': 'Meccan', 'verses': 42},
    {'number': 81, 'nameAr': 'التكوير', 'nameEn': 'At-Takwir', 'meaningEn': 'The Overthrowing', 'type': 'Meccan', 'verses': 29},
    {'number': 82, 'nameAr': 'الانفطار', 'nameEn': 'Al-Infitar', 'meaningEn': 'The Cleaving', 'type': 'Meccan', 'verses': 19},
    {'number': 83, 'nameAr': 'المطففين', 'nameEn': 'Al-Mutaffifin', 'meaningEn': 'The Defrauders', 'type': 'Meccan', 'verses': 36},
    {'number': 84, 'nameAr': 'الانشقاق', 'nameEn': 'Al-Inshiqaq', 'meaningEn': 'The Sundering', 'type': 'Meccan', 'verses': 25},
    {'number': 85, 'nameAr': 'البروج', 'nameEn': 'Al-Buruj', 'meaningEn': 'The Mansions of the Stars', 'type': 'Meccan', 'verses': 22},
    {'number': 86, 'nameAr': 'الطارق', 'nameEn': 'At-Tariq', 'meaningEn': 'The Nightcomer', 'type': 'Meccan', 'verses': 17},
    {'number': 87, 'nameAr': 'الأعلى', 'nameEn': 'Al-A\'la', 'meaningEn': 'The Most High', 'type': 'Meccan', 'verses': 19},
    {'number': 88, 'nameAr': 'الغاشية', 'nameEn': 'Al-Ghashiyah', 'meaningEn': 'The Overwhelming', 'type': 'Meccan', 'verses': 26},
    {'number': 89, 'nameAr': 'الفجر', 'nameEn': 'Al-Fajr', 'meaningEn': 'The Dawn', 'type': 'Meccan', 'verses': 30},
    {'number': 90, 'nameAr': 'البلد', 'nameEn': 'Al-Balad', 'meaningEn': 'The City', 'type': 'Meccan', 'verses': 20},
    {'number': 91, 'nameAr': 'الشمس', 'nameEn': 'Ash-Shams', 'meaningEn': 'The Sun', 'type': 'Meccan', 'verses': 15},
    {'number': 92, 'nameAr': 'الليل', 'nameEn': 'Al-Layl', 'meaningEn': 'The Night', 'type': 'Meccan', 'verses': 21},
    {'number': 93, 'nameAr': 'الضحى', 'nameEn': 'Ad-Duha', 'meaningEn': 'The Morning Hours', 'type': 'Meccan', 'verses': 11},
    {'number': 94, 'nameAr': 'الشرح', 'nameEn': 'Ash-Sharh', 'meaningEn': 'The Relief', 'type': 'Meccan', 'verses': 8},
    {'number': 95, 'nameAr': 'التين', 'nameEn': 'At-Tin', 'meaningEn': 'The Fig', 'type': 'Meccan', 'verses': 8},
    {'number': 96, 'nameAr': 'العلق', 'nameEn': 'Al-\'Alaq', 'meaningEn': 'The Clot', 'type': 'Meccan', 'verses': 19},
    {'number': 97, 'nameAr': 'القدر', 'nameEn': 'Al-Qadr', 'meaningEn': 'The Power', 'type': 'Meccan', 'verses': 5},
    {'number': 98, 'nameAr': 'البينة', 'nameEn': 'Al-Bayyinah', 'meaningEn': 'The Clear Proof', 'type': 'Medinan', 'verses': 8},
    {'number': 99, 'nameAr': 'الزلزلة', 'nameEn': 'Az-Zalzalah', 'meaningEn': 'The Earthquake', 'type': 'Medinan', 'verses': 8},
    {'number': 100, 'nameAr': 'العاديات', 'nameEn': 'Al-\'Adiyat', 'meaningEn': 'The Courser', 'type': 'Meccan', 'verses': 11},
    {'number': 101, 'nameAr': 'القارعة', 'nameEn': 'Al-Qari\'ah', 'meaningEn': 'The Calamity', 'type': 'Meccan', 'verses': 11},
    {'number': 102, 'nameAr': 'التكاثر', 'nameEn': 'At-Takathur', 'meaningEn': 'The Rivalry in World Increase', 'type': 'Meccan', 'verses': 8},
    {'number': 103, 'nameAr': 'العصر', 'nameEn': 'Al-\'Asr', 'meaningEn': 'The Declining Day', 'type': 'Meccan', 'verses': 3},
    {'number': 104, 'nameAr': 'الهمزة', 'nameEn': 'Al-Humazah', 'meaningEn': 'The Slanderer', 'type': 'Meccan', 'verses': 9},
    {'number': 105, 'nameAr': 'الفيل', 'nameEn': 'Al-Fil', 'meaningEn': 'The Elephant', 'type': 'Meccan', 'verses': 5},
    {'number': 106, 'nameAr': 'قريش', 'nameEn': 'Quraysh', 'meaningEn': 'Quraysh', 'type': 'Meccan', 'verses': 4},
    {'number': 107, 'nameAr': 'الماعون', 'nameEn': 'Al-Ma\'un', 'meaningEn': 'The Small Kindnesses', 'type': 'Meccan', 'verses': 7},
    {'number': 108, 'nameAr': 'الكوثر', 'nameEn': 'Al-Kawthar', 'meaningEn': 'The Abundance', 'type': 'Meccan', 'verses': 3},
    {'number': 109, 'nameAr': 'الكافرون', 'nameEn': 'Al-Kafirun', 'meaningEn': 'The Disbelievers', 'type': 'Meccan', 'verses': 6},
    {'number': 110, 'nameAr': 'النصر', 'nameEn': 'An-Nasr', 'meaningEn': 'The Divine Support', 'type': 'Medinan', 'verses': 3},
    {'number': 111, 'nameAr': 'المسد', 'nameEn': 'Al-Masad', 'meaningEn': 'The Palm Fiber', 'type': 'Meccan', 'verses': 5},
    {'number': 112, 'nameAr': 'الإخلاص', 'nameEn': 'Al-Ikhlas', 'meaningEn': 'The Sincerity', 'type': 'Meccan', 'verses': 4},
    {'number': 113, 'nameAr': 'الفلق', 'nameEn': 'Al-Falaq', 'meaningEn': 'The Daybreak', 'type': 'Meccan', 'verses': 5},
    {'number': 114, 'nameAr': 'الناس', 'nameEn': 'An-Nas', 'meaningEn': 'Mankind', 'type': 'Meccan', 'verses': 6}
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get _filteredSurahs {
    if (_searchQuery.isEmpty) return _all114Surahs;
    return _all114Surahs.where((surah) {
      final nameEn = surah['nameEn'].toString().toLowerCase();
      final nameAr = surah['nameAr'].toString();
      final query = _searchQuery.toLowerCase();
      return nameEn.contains(query) || nameAr.contains(query);
    }).toList();
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
                  // Quran Header and Progress
                  Padding(
                    padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              NiyaLocalizations.translate('digital_quran'),
                              style: theme.textTheme.displayMedium?.copyWith(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Row(
                              children: [
                                TextButton(
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
                                const Icon(
                                  Icons.menu_book_outlined,
                                  color: LuxuryColors.goldAccent,
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        // Glassmorphic Goal Card
                        GlassmorphicCard(
                          borderRadius: 16,
                          padding: const EdgeInsets.all(16),
                          child: Row(
                            children: [
                              Container(
                                width: 50,
                                height: 50,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: LuxuryColors.goldMedium.withOpacity(0.15),
                                  border: Border.all(color: LuxuryColors.goldLight, width: 1),
                                ),
                                child: const Center(
                                  child: Icon(
                                    Icons.bookmark_added_rounded,
                                    color: LuxuryColors.goldAccent,
                                    size: 24,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      NiyaLocalizations.translate('daily_reading_goal'),
                                      style: theme.textTheme.bodyLarge?.copyWith(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 13,
                                        color: LuxuryColors.goldLight,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      NiyaLocalizations.translate('verses_completed'),
                                      style: theme.textTheme.bodyMedium?.copyWith(
                                        fontSize: 11,
                                        color: Colors.white.withOpacity(0.8),
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(2),
                                      child: LinearProgressIndicator(
                                        value: 0.6,
                                        backgroundColor: LuxuryColors.obsidianGrey,
                                        valueColor: const AlwaysStoppedAnimation<Color>(
                                          LuxuryColors.goldMedium,
                                        ),
                                        minHeight: 4,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Search Bar
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                    child: Container(
                      height: 48,
                      decoration: BoxDecoration(
                        color: LuxuryColors.obsidianDeep,
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(
                          color: LuxuryColors.goldMedium.withOpacity(0.2),
                          width: 1,
                        ),
                      ),
                      child: TextField(
                        controller: _searchController,
                        onChanged: (val) {
                          setState(() {
                            _searchQuery = val;
                          });
                        },
                        style: GoogleFonts.outfit(
                          color: Colors.white,
                          fontSize: 14,
                        ),
                        decoration: InputDecoration(
                          hintText: NiyaLocalizations.translate('search_surah_hint'),
                          hintStyle: GoogleFonts.outfit(
                            color: LuxuryColors.goldLight.withOpacity(0.4),
                            fontSize: 13,
                          ),
                          prefixIcon: const Icon(
                            Icons.search_rounded,
                            color: LuxuryColors.goldLight,
                            size: 20,
                          ),
                          suffixIcon: _searchQuery.isNotEmpty
                              ? IconButton(
                                  icon: const Icon(
                                    Icons.close_rounded,
                                    color: LuxuryColors.goldLight,
                                    size: 18,
                                  ),
                                  onPressed: () {
                                    _searchController.clear();
                                    setState(() {
                                      _searchQuery = '';
                                    });
                                  },
                                )
                              : null,
                          border: InputBorder.none,
                          contentPadding: const EdgeInsets.symmetric(vertical: 12),
                        ),
                      ),
                    ),
                  ),

                  // Custom TabBar
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: TabBar(
                      controller: _tabController,
                      indicatorColor: LuxuryColors.goldAccent,
                      labelColor: LuxuryColors.goldAccent,
                      unselectedLabelColor: LuxuryColors.goldLight.withOpacity(0.4),
                      labelStyle: GoogleFonts.cinzel(
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                      tabs: [
                        Tab(text: NiyaLocalizations.translate('tab_surah')),
                        Tab(text: NiyaLocalizations.translate('tab_juz')),
                      ],
                    ),
                  ),
                  const SizedBox(height: 8),

                  // TabBar View (Surah List / Mock Juz)
                  Expanded(
                    child: TabBarView(
                      controller: _tabController,
                      children: [
                        // Surah List Tab
                        _filteredSurahs.isEmpty
                            ? Center(
                                child: Text(
                                  NiyaLocalizations.translate('no_surah_found'),
                                  style: theme.textTheme.bodyMedium,
                                ),
                              )
                            : ListView.builder(
                                padding: const EdgeInsets.fromLTRB(20, 4, 20, 90),
                                itemCount: _filteredSurahs.length,
                                itemBuilder: (context, index) {
                                  final surah = _filteredSurahs[index];
                                  final isMeccan = surah['type'] == 'Meccan';
                                  final typeText = isMeccan
                                      ? (isAr ? 'مكية' : 'Meccan')
                                      : (isAr ? 'مدنية' : 'Medinan');

                                  return Padding(
                                    padding: const EdgeInsets.only(bottom: 10),
                                    child: Container(
                                      decoration: BoxDecoration(
                                        color: LuxuryColors.obsidianDeep,
                                        borderRadius: BorderRadius.circular(16),
                                        border: Border.all(
                                          color: LuxuryColors.goldMedium.withOpacity(0.15),
                                          width: 1,
                                        ),
                                      ),
                                      child: ListTile(
                                        contentPadding: const EdgeInsets.symmetric(
                                          horizontal: 16,
                                          vertical: 6,
                                        ),
                                        leading: Container(
                                          width: 36,
                                          height: 36,
                                          decoration: BoxDecoration(
                                            shape: BoxShape.circle,
                                            border: Border.all(
                                              color: LuxuryColors.goldLight.withOpacity(0.4),
                                            ),
                                          ),
                                          child: Center(
                                            child: Text(
                                              '${surah['number']}',
                                              style: GoogleFonts.outfit(
                                                color: LuxuryColors.goldAccent,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 11,
                                              ),
                                            ),
                                          ),
                                        ),
                                        title: Text(
                                          isAr ? surah['nameAr'] : surah['nameEn'],
                                          style: GoogleFonts.outfit(
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                            fontSize: 14,
                                          ),
                                        ),
                                        subtitle: Text(
                                          '$typeText • ${surah['verses']} ${isAr ? "آية" : "Verses"}',
                                          style: GoogleFonts.outfit(
                                            color: LuxuryColors.goldLight.withOpacity(0.6),
                                            fontSize: 11,
                                          ),
                                        ),
                                        trailing: Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            Text(
                                              surah['nameAr'] as String,
                                              style: GoogleFonts.amiri(
                                                color: LuxuryColors.goldLight,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 18,
                                              ),
                                            ),
                                            const SizedBox(width: 8),
                                            const Icon(
                                              Icons.arrow_forward_ios_rounded,
                                              color: LuxuryColors.goldLight,
                                              size: 14,
                                            ),
                                          ],
                                        ),
                                        onTap: () {
                                          Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) => SurahDetailPage(
                                                surah: surah,
                                              ),
                                            ),
                                          );
                                        },
                                      ),
                                    ),
                                  );
                                },
                              ),

                        // Juz Tab (Premium bilingual layout)
                        ListView.builder(
                          padding: const EdgeInsets.fromLTRB(20, 4, 20, 90),
                          itemCount: 30,
                          itemBuilder: (context, index) {
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 10),
                              child: Container(
                                padding: const EdgeInsets.all(16),
                                decoration: BoxDecoration(
                                  color: LuxuryColors.obsidianDeep,
                                  borderRadius: BorderRadius.circular(16),
                                  border: Border.all(
                                    color: LuxuryColors.goldMedium.withOpacity(0.15),
                                    width: 1,
                                  ),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          '${isAr ? "الجزء" : "Juz\'"} ${index + 1}',
                                          style: GoogleFonts.outfit(
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                            fontSize: 14,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          NiyaLocalizations.translate('juz_segment_desc'),
                                          style: GoogleFonts.outfit(
                                            color: LuxuryColors.goldLight.withOpacity(0.5),
                                            fontSize: 11,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(12),
                                        border: Border.all(
                                          color: LuxuryColors.goldMedium.withOpacity(0.3),
                                        ),
                                      ),
                                      child: Text(
                                        NiyaLocalizations.translate('read'),
                                        style: GoogleFonts.outfit(
                                          color: LuxuryColors.goldAccent,
                                          fontSize: 10,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
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
}
