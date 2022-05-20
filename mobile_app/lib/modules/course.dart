import 'package:json_annotation/json_annotation.dart';
import 'package:mylms/modules/level.dart';
import 'package:mylms/modules/subject.dart';
import 'package:mylms/modules/user.dart';

part 'course.g.dart';

@JsonSerializable()
class Course {
  int id;
  String title;
  String description;
  String? thumbnailURL;
  int duration;
  User lecturer;
  Level level;
  Subject subject;

  Course({
    required this.id,
    required this.title,
    required this.description,
    required this.duration,
    required this.lecturer,
    required this.level,
    required this.subject,
    this.thumbnailURL,
  });

  factory Course.fromJson(Map<String, dynamic> json) => _$CourseFromJson(json);
  Map<String, dynamic> toJson() => _$CourseToJson(this);
}
