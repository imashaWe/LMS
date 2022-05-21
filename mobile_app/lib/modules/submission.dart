import 'package:json_annotation/json_annotation.dart';

part 'submission.g.dart';

@JsonSerializable()
class Submission {
  int id;
  int marks;
  String? comment;
  String? fileURL;
  String? submittedDate;
  String? markedDate;

  Submission(
      {required this.id,
      required this.comment,
      required this.marks,
      this.fileURL,
      this.markedDate,
      this.submittedDate});

  factory Submission.fromJson(Map<String, dynamic> json) =>
      _$SubmissionFromJson(json);
  Map<String, dynamic> toJson() => _$SubmissionToJson(this);
}
