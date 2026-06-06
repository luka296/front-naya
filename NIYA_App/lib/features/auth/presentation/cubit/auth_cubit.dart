import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import '../../domain/entities/user_entity.dart';

abstract class AuthState extends Equatable {
  const AuthState();

  @override
  List<Object?> get props => [];
}

class AuthInitial extends AuthState {}

class AuthLoading extends AuthState {}

class Authenticated extends AuthState {
  final UserEntity user;

  const Authenticated(this.user);

  @override
  List<Object?> get props => [user];
}

class Unauthenticated extends AuthState {}

class AuthError extends AuthState {
  final String message;

  const AuthError(this.message);

  @override
  List<Object?> get props => [message];
}

class AuthCubit extends Cubit<AuthState> {
  AuthCubit() : super(AuthInitial());

  Future<void> login(String email, String password) async {
    emit(AuthLoading());
    try {
      // Simulate professional server-side authentication delay
      await Future.delayed(const Duration(milliseconds: 1200));
      
      if (email.contains('@') && password.length >= 6) {
        final mockUser = UserEntity(
          id: 'c1a9c1de-e9cb-4c54-b52e-9d297ff05bc0',
          email: email,
          fullName: 'Tariq Al-Mansoor',
          role: 'user',
          xpPoints: 450,
          currentStreak: 12,
          longestStreak: 30,
          badges: const ['First Donation', '7-Day Streak', '100 Tasbeeh'],
        );
        emit(Authenticated(mockUser));
      } else {
        emit(const AuthError('Invalid email format or password (min 6 chars)'));
      }
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }

  Future<void> register(String fullName, String email, String password) async {
    emit(AuthLoading());
    try {
      await Future.delayed(const Duration(milliseconds: 1500));
      final mockUser = UserEntity(
        id: 'c1a9c1de-e9cb-4c54-b52e-9d297ff05bc0',
        email: email,
        fullName: fullName,
        role: 'user',
        xpPoints: 50,
        currentStreak: 1,
        longestStreak: 1,
        badges: const ['Pioneer Joiner'],
      );
      emit(Authenticated(mockUser));
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }

  void logout() {
    emit(Unauthenticated());
  }
}
