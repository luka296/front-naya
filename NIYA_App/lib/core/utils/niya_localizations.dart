import 'package:flutter/material.dart';

class NiyaLocalizations {
  static final ValueNotifier<String> activeLanguage = ValueNotifier<String>('ar'); // Default to Arabic

  static void toggleLanguage() {
    activeLanguage.value = activeLanguage.value == 'ar' ? 'en' : 'ar';
  }

  static String translate(String key) {
    final lang = activeLanguage.value;
    if (_dictionary.containsKey(key)) {
      return _dictionary[key]![lang] ?? key;
    }
    return key;
  }

  static final Map<String, Map<String, String>> _dictionary = {
    // Bottom Nav Bar
    'nav_home': {'ar': 'الرئيسية', 'en': 'Home'},
    'nav_quran': {'ar': 'القرآن', 'en': 'Quran'},
    'nav_qibla': {'ar': 'القبلة', 'en': 'Qibla'},
    'nav_services': {'ar': 'الخدمات', 'en': 'Services'},

    // Home Screen
    'app_title': {'ar': 'نية | NIYA', 'en': 'NIYA | نية'},
    'streak_title': {'ar': 'يوم تتابع', 'en': 'Day Streak'},
    'level_aspirant': {'ar': 'مستكشف المستوى 4', 'en': 'Level 4 Aspirant'},
    'prayer_times': {'ar': 'مواقيت الصلاة', 'en': 'Prayer Times'},
    'tap_to_count': {'ar': 'اضغط للتسبيح | اسحب للتدوير ثلاثي الأبعاد', 'en': 'Tap to count | Drag to spin 3D'},
    'next_dhikr': {'ar': 'الذكر التالي', 'en': 'Next Dhikr'},
    'family_emergency': {'ar': 'مجموعات الحماية والموقع', 'en': 'Family Protection & Location'},
    'active_umrah_tracker': {'ar': 'تتبع حالة عمرة النيابة النشطة', 'en': 'Active Proxy Umrah Tracker'},

    // Quran Screen
    'digital_quran': {'ar': 'المصحف الشريف', 'en': 'Digital Quran'},
    'daily_reading_goal': {'ar': 'الورد اليومي', 'en': 'Daily Reading Goal'},
    'verses_completed': {'ar': 'تم قراءة 5 آيات (3/5 مكتمل)', 'en': 'Read 5 Verses (3/5 Completed)'},
    'search_surah_hint': {'ar': 'ابحث عن السورة...', 'en': 'Search Surah...'},
    'tab_surah': {'ar': 'السور', 'en': 'Surah'},
    'tab_juz': {'ar': 'الأجزاء', 'en': 'Juz\''},
    'no_surah_found': {'ar': 'لم يتم العثور على السورة', 'en': 'No Surah found'},
    'juz_segment_desc': {'ar': 'يحتوي على أجزاء مختلفة من السور', 'en': 'Contains various surah segments'},
    'read': {'ar': 'اقرأ', 'en': 'READ'},

    // Surah Detail Screen
    'surah_recitation': {'ar': 'تلاوة السورة', 'en': 'Surah Recitation'},
    'playing_from': {'ar': 'تلاوة القارئ: ', 'en': 'Playing from: '},
    'bismillah': {'ar': 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'en': 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'},

    // Qibla Screen
    'qibla_title': {'ar': 'اتجاه القبلة', 'en': 'Qibla Finder'},
    'current_heading': {'ar': 'الاتجاه الحالي', 'en': 'CURRENT HEADING'},
    'distance_to_kaaba': {'ar': 'المسافة للكعبة', 'en': 'DISTANCE TO KAABA'},
    'facing_kaaba': {'ar': 'مواجه للكعبة تماماً! يمكنك الصلاة.', 'en': 'Facing Kaaba! You can now pray.'},
    'rotate_instructions': {'ar': 'أدر البوصلة للمحاذاة مع السهم الذهبي.', 'en': 'Drag compass or turn to align with the golden Kaaba arrow.'},

    // Services Screen
    'sacred_services': {'ar': 'بوابة الخدمات المقدسة', 'en': 'Sacred Services Portal'},
    'services_subtitle': {'ar': 'صدقات موثقة وعمرة بالنيابة داخل الحرم', 'en': 'Verifiable Sadaqah & Proxy Umrah inside Haram'},
    'completed_badge': {'ar': 'مكتمل', 'en': 'Completed'},
    'my_records_title': {'ar': 'سجل المعاملات والمسجلات الخاصة بي', 'en': 'My Bookings & Records Ledger'},
    'no_records_yet': {'ar': 'لا توجد حجوزات مسجلة حتى الآن.', 'en': 'No registered bookings yet.'},

    // Booking Sheet
    'umrah_by_proxy': {'ar': 'عمرة بالنيابة عن أحبتك', 'en': 'Umrah on Behalf of Loved Ones'},
    'charity_dist': {'ar': 'توزيع صدقات مقدسة', 'en': 'Sacred Charity Distribution'},
    'beneficiary_name': {'ar': 'اسم المستفيد ثنائي/ثلاثي', 'en': 'BENEFICIARY NAME'},
    'dua_request': {'ar': 'أدعية وتوصيات خاصة', 'en': 'SPECIAL DUA REQUEST'},
    'quantity': {'ar': 'الكمية المطلوبة', 'en': 'QUANTITY'},
    'quantity_desc': {'ar': 'اختر عدد الوحدات المراد توزيعها', 'en': 'Select number of units to distribute'},
    'dedicated_name': {'ar': 'الإهداء باسم', 'en': 'DEDICATED NAME'},
    'total_amount': {'ar': 'المبلغ الإجمالي', 'en': 'TOTAL AMOUNT'},
    'pay_with_apple_pay': {'ar': 'دفع بواسطة Apple Pay', 'en': 'Pay with Apple Pay'},

    // Success Dialog
    'order_confirmed': {'ar': 'تم تأكيد الخدمة بنجاح', 'en': 'Order Confirmed successfully'},
    'order_registered_desc': {'ar': 'تم تسجيل طلبك وتوثيقه بنجاح في سجل الحركات المالية الآمن وتعيين مقدم الخدمة.', 'en': 'Your order has been successfully registered on the secure double-entry ledger.'},
    'ledger_id': {'ar': 'رمز المعاملة المالي', 'en': 'LEDGER ID'},
    'xp_gained': {'ar': 'مكافأة نية من النقاط', 'en': 'XP Gained'},
    'continue': {'ar': 'استمرار', 'en': 'CONTINUE'},

    // Login & Visa Page
    'login_header_title': {'ar': 'تسجيل الدخول', 'en': 'Secure Login'},
    'login_subtitle': {'ar': 'الدخول الآمن وتسجيل بطاقة الدفع (الفيزا)', 'en': 'Access account & register Visa card'},
    'email': {'ar': 'البريد الإلكتروني', 'en': 'Email Address'},
    'password': {'ar': 'كلمة المرور', 'en': 'Password'},
    'visa_card_info': {'ar': 'معلومات بطاقة الدفع (الفيزا)', 'en': 'Visa / Credit Card Info'},
    'card_number': {'ar': 'رقم البطاقة (16 خانة)', 'en': 'Card Number (16 Digits)'},
    'card_expiry': {'ar': 'تاريخ الانتهاء (MM/YY)', 'en': 'Expiry Date (MM/YY)'},
    'card_cvv': {'ar': 'رمز الأمان (CVV)', 'en': 'CVV Code'},
    'cardholder_name': {'ar': 'اسم حامل البطاقة', 'en': 'Cardholder Name'},
    'save_and_login': {'ar': 'حفظ البطاقة وتسجيل الدخول', 'en': 'Save Card & Access App'},

    // Fasting Meals Service
    'fasting_meals': {'ar': 'إفطار صائم', 'en': 'Fasting Meals'},
    'meals_desc': {'ar': 'توزيع وجبات إفطار على الصائمين في ساحات الحرم', 'en': 'Meals distribution to fasting pilgrims in Haram'},
    'meals_price': {'ar': '15 ريال للوجبة', 'en': '\$4.00 per Meal / Box'},

    // Personal Umrah Form Page
    'umrah_form_title': {'ar': 'طلب التقديم على العمرة', 'en': 'Umrah Application Form'},
    'umrah_form_desc': {'ar': 'تقديم طلب تصريح للحصول على عمرة شخصية', 'en': 'Submit an authorization request for personal Umrah'},
    'age': {'ar': 'السن', 'en': 'Age'},
    'country': {'ar': 'البلد', 'en': 'Country'},
    'phone_number': {'ar': 'رقم الهاتف', 'en': 'Phone Number'},
    'have_performed_before': {'ar': 'هل قمت بالعمرة من قبل؟', 'en': 'Have you performed Umrah before?'},
    'yes': {'ar': 'نعم', 'en': 'Yes'},
    'no': {'ar': 'لا', 'en': 'No'},
    'submit_application': {'ar': 'تقديم طلب العمرة', 'en': 'Submit Umrah Application'},
    'applied_success': {'ar': 'تم تقديم طلب العمرة بنجاح', 'en': 'Umrah Application Submitted Successfully'},
    'applied_desc': {'ar': 'تم استلام طلب تصريح العمرة الخاص بك وتمريره للمراجعة الأمنية والموافقة.', 'en': 'Your personal Umrah application has been received and routed for review.'},
    'personal_umrah_form_btn': {'ar': 'تقديم طلب تصريح عمرة شخصية', 'en': 'Apply for Personal Umrah Permit'},

    // Campaign Dashboard
    'campaign_title': {'ar': 'لوحة تتبع حملات العمرة والتمويل', 'en': 'Haram Campaigns & Funding'},
    'campaign_group': {'ar': 'الفوج القادم: يناير (30 فوجاً مجدولاً)', 'en': 'Next Group: January (30 caravans scheduled)'},
    'campaign_pilgrims': {'ar': 'سعة الفوج: 100 معتمر مسجل للفوج', 'en': 'Group Caravan Capacity: 100 Pilgrims'},
    'remaining_spots': {'ar': 'المقاعد المتبقية للحملة', 'en': 'Remaining spots available'},
    'spots_gained': {'ar': 'تم تمويلها من الهدف الكلي', 'en': 'sponsored from campaign target'},
  };
}
