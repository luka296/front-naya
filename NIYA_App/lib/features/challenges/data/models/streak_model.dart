import 'package:equatable/equatable.dart';

class StreakModel extends Equatable {
  final int currentStreak;
  final int longestStreak;
  final double weeklyProgress; // 0.0 - 1.0
  final int level;
  final int currentXp;
  final int xpNeededForNextLevel;
  final String title;

  const StreakModel({
    required this.currentStreak,
    required this.longestStreak,
    required this.weeklyProgress,
    required this.level,
    required this.currentXp,
    required this.xpNeededForNextLevel,
    required this.title,
  });

  @override
  List<Object?> get props => [
        currentStreak,
        longestStreak,
        weeklyProgress,
        level,
        currentXp,
        xpNeededForNextLevel,
        title,
      ];
}
