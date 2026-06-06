import 'package:equatable/equatable.dart';

enum UmrahStatus {
  submitted,
  accepted,
  scheduled,
  traveling,
  arrived,
  performing,
  completed,
}

extension UmrahStatusExtension on UmrahStatus {
  String get displayName {
    switch (this) {
      case UmrahStatus.submitted: return 'Submitted | تم التقديم';
      case UmrahStatus.accepted: return 'Accepted | تم القبول';
      case UmrahStatus.scheduled: return 'Scheduled | تم الجدولة';
      case UmrahStatus.traveling: return 'Traveling | في الطريق';
      case UmrahStatus.arrived: return 'Arrived | وصل الميقات';
      case UmrahStatus.performing: return 'Performing Umrah | يؤدي العمرة';
      case UmrahStatus.completed: return 'Completed | اكتملت العمرة';
    }
  }

  String get description {
    switch (this) {
      case UmrahStatus.submitted: return 'Your request has been securely logged on our double-entry ledger.';
      case UmrahStatus.accepted: return 'A vetted student of knowledge from Islamic University of Madinah has accepted your trust.';
      case UmrahStatus.scheduled: return 'The performer has completed physical Ihram plans and scheduled their travel date.';
      case UmrahStatus.traveling: return 'The performer is traveling to the holy boundary (Miqat).';
      case UmrahStatus.arrived: return 'The performer has entered the state of consecration and arrived in Makkah.';
      case UmrahStatus.performing: return 'Performer is actively executing Tawaf & Sa\'i. Live video streaming highlights uploaded below.';
      case UmrahStatus.completed: return 'Alhamdulillah! Umrah completed successfully. Download certificate and dua recordings below.';
    }
  }
}

class UmrahRequestModel extends Equatable {
  final String id;
  final String beneficiaryName;
  final String motherName;
  final String specialDua;
  final UmrahStatus status;
  final String? certificateUrl;
  final List<String> imageUrls;
  final List<String> videoUrls;
  final DateTime createdAt;

  const UmrahRequestModel({
    required this.id,
    required this.beneficiaryName,
    required this.motherName,
    required this.specialDua,
    required this.status,
    this.certificateUrl,
    required this.imageUrls,
    required this.videoUrls,
    required this.createdAt,
  });

  @override
  List<Object?> get props => [
        id,
        beneficiaryName,
        motherName,
        specialDua,
        status,
        certificateUrl,
        imageUrls,
        videoUrls,
        createdAt,
      ];
}
