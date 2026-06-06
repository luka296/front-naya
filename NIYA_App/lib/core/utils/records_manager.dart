import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class RecordsManager {
  static const String _bookingsKey = 'niya_bookings_ledger_v1';
  static const String _spotsKey = 'niya_campaign_spots_remaining_v1';
  static const int totalCampaignSpots = 3500;

  // Save a booking transaction record
  static Future<void> saveBooking({
    required String serviceTitle,
    required String serviceTitleEn,
    required String beneficiary,
    required String dua,
    required double amount,
    required String ledgerId,
    required int quantity,
    required bool isUmrah,
  }) async {
    final prefs = await SharedPreferences.getInstance();
    final List<String> currentList = prefs.getStringList(_bookingsKey) ?? [];

    final Map<String, dynamic> record = {
      'serviceTitle': serviceTitle,
      'serviceTitleEn': serviceTitleEn,
      'beneficiary': beneficiary,
      'dua': dua,
      'amount': amount,
      'ledgerId': ledgerId,
      'quantity': quantity,
      'isUmrah': isUmrah,
      'date': DateTime.now().toIso8601String(),
    };

    currentList.insert(0, json.encode(record)); // Add newest first
    await prefs.setStringList(_bookingsKey, currentList);
  }

  // Load all booking transaction records
  static Future<List<Map<String, dynamic>>> loadBookings() async {
    final prefs = await SharedPreferences.getInstance();
    final List<String> currentList = prefs.getStringList(_bookingsKey) ?? [];

    return currentList.map((str) {
      try {
        return json.decode(str) as Map<String, dynamic>;
      } catch (_) {
        return <String, dynamic>{};
      }
    }).where((map) => map.isNotEmpty).toList();
  }

  // Get current remaining campaign slots (default base: 2000 remaining)
  static Future<int> getCampaignRemainingSpots() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey(_spotsKey)) {
      await prefs.setInt(_spotsKey, 2000);
    }
    return prefs.getInt(_spotsKey) ?? 2000;
  }

  // Decrement remaining campaign slots upon successful checkout
  static Future<void> decrementCampaignSpots(int count) async {
    final prefs = await SharedPreferences.getInstance();
    int current = await getCampaignRemainingSpots();
    current = (current - count).clamp(0, totalCampaignSpots);
    await prefs.setInt(_spotsKey, current);
  }
}
