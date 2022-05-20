import 'package:json_annotation/json_annotation.dart';
import 'package:mylms/modules/user.dart';

part 'course.g.dart';

@JsonSerializable()
class Course {
  int? id;
  String? title;
  String? description;
  String? thumbnailURL;
  int? duration;
  User? lecturer;

  Course(
      {this.id,
      this.title,
      this.description,
      this.duration,
      this.thumbnailURL,
      this.lecturer});

  factory Course.fromJson(Map<String, dynamic> json) => _$CourseFromJson(json);
  Map<String, dynamic> toJson() => _$CourseToJson(this);
}
