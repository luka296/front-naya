import 'package:equatable/equatable.dart';

class UserEntity extends Equatable {
  final String id;
  final String email;
  final String fullName;
  final String role;
  final int xpPoints;
  final int currentStreak;
  final int longestStreak;
  final List<String> badges;

  const UserEntity({
    required this.id,
    required this.email,
    required this.fullName,
    required this.role,
    required this.xpPoints,
    required this.currentStreak,
    required this.longestStreak,
    required this.badges,
  });

  @override
  List<Object?> get props => [
        id,
        email,
        fullName,
        role,
        xpPoints,
        currentStreak,
        longestStreak,
        badges,
      ];
}
