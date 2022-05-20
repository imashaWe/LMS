import 'package:json_annotation/json_annotation.dart';

part 'subject.g.dart';

@JsonSerializable()
class Subject {
  int id;
  String subject;

  Subject({required this.id, required this.subject});

  factory Subject.fromJson(Map<String, dynamic> json) =>
      _$SubjectFromJson(json);
  Map<String, dynamic> toJson() => _$SubjectToJson(this);
}
