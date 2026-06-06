import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../theme/luxury_theme.dart';

class LuxuryButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final Widget? icon;
  final double height;
  final double? width;
  final bool isSecondary;

  const LuxuryButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.icon,
    this.height = 54.0,
    this.width,
    this.isSecondary = false,
  });

  @override
  State<LuxuryButton> createState() => _LuxuryButtonState();
}

class _LuxuryButtonState extends State<LuxuryButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 100),
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.96).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    _controller.forward();
    HapticFeedback.lightImpact();
  }

  void _handleTapUp(TapUpDetails details) {
    _controller.reverse();
  }

  void _handleTapCancel() {
    _controller.reverse();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ScaleTransition(
      scale: _scaleAnimation,
      child: GestureDetector(
        onTapDown: _handleTapDown,
        onTapUp: _handleTapUp,
        onTapCancel: _handleTapCancel,
        onTap: widget.onPressed,
        child: Container(
          width: widget.width ?? double.infinity,
          height: widget.height,
          decoration: BoxDecoration(
            gradient: widget.isSecondary ? null : LuxuryColors.goldGradient,
            color: widget.isSecondary ? Colors.transparent : null,
            borderRadius: BorderRadius.circular(27),
            border: widget.isSecondary
                ? Border.all(color: LuxuryColors.goldMedium, width: 1.5)
                : null,
            boxShadow: widget.isSecondary
                ? null
                : [
                    BoxShadow(
                      color: LuxuryColors.goldDark.withOpacity(0.4),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
          ),
          child: Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                if (widget.icon != null) ...[
                  widget.icon!,
                  const SizedBox(width: 8),
                ],
                Text(
                  widget.text,
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: widget.isSecondary
                        ? LuxuryColors.goldLight
                        : LuxuryColors.obsidianBlack,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.2,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
