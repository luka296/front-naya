import 'package:equatable/equatable.dart';

class PrayerTimesModel extends Equatable {
  final String fajr;
  final String sunrise;
  final String dhuhr;
  final String asr;
  final String maghrib;
  final String isha;
  final String hijriDate;
  final String gregoryDate;
  final double latitude;
  final double longitude;

  const PrayerTimesModel({
    required this.fajr,
    required this.sunrise,
    required this.dhuhr,
    required this.asr,
    required this.maghrib,
    required this.isha,
    required this.hijriDate,
    required this.gregoryDate,
    required this.latitude,
    required this.longitude,
  });

  @override
  List<Object?> get props => [
        fajr,
        sunrise,
        dhuhr,
        asr,
        maghrib,
        isha,
        hijriDate,
        gregoryDate,
        latitude,
        longitude,
      ];
}
