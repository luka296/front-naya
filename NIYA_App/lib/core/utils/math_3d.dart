import 'dart:math';

/// Representation of a 3D Vector for our custom graphics rendering engine.
class Vector3D {
  final double x;
  final double y;
  final double z;

  const Vector3D(this.x, this.y, this.z);

  /// Rotates the vector around the X axis by the given angle (in radians).
  Vector3D rotateX(double angle) {
    final double cosA = cos(angle);
    final double sinA = sin(angle);
    return Vector3D(
      x,
      y * cosA - z * sinA,
      y * sinA + z * cosA,
    );
  }

  /// Rotates the vector around the Y axis by the given angle (in radians).
  Vector3D rotateY(double angle) {
    final double cosA = cos(angle);
    final double sinA = sin(angle);
    return Vector3D(
      x * cosA + z * sinA,
      y,
      -x * sinA + z * cosA,
    );
  }

  /// Rotates the vector around the Z axis by the given angle (in radians).
  Vector3D rotateZ(double angle) {
    final double cosA = cos(angle);
    final double sinA = sin(angle);
    return Vector3D(
      x * cosA - y * sinA,
      x * sinA + y * cosA,
      z,
    );
  }

  /// Projects this 3D point onto a 2D coordinate space using perspective projection.
  /// [screenWidth] and [screenHeight] are the canvas size boundaries.
  /// [fov] represents the Field of View scale factor.
  /// [cameraDistance] is the virtual camera offset along the positive Z-axis.
  Point2D project(double screenWidth, double screenHeight, {double fov = 300.0, double cameraDistance = 4.0}) {
    // Offset along the Z axis to avoid dividing by zero and place objects in front of camera
    final double distanceZ = z + cameraDistance;
    
    // Perspective division formula: projectedX = (x * fov) / z + screenCenter
    final double projectedX = (x * fov) / distanceZ + (screenWidth / 2);
    final double projectedY = (y * fov) / distanceZ + (screenHeight / 2);
    
    // Scale size factor based on depth (Z)
    final double scale = fov / (fov + z * 100);

    return Point2D(projectedX, projectedY, scale, z);
  }
}

/// Representation of a 2D projected coordinate.
/// Holds the 2D coordinate on screen as well as depth (Z) and scaling information.
class Point2D {
  final double x;
  final double y;
  final double scale;
  final double depth; // Keep track of depth for Z-sorting (painter's algorithm)

  const Point2D(this.x, this.y, this.scale, this.depth);
}
