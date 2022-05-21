// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'submission.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Submission _$SubmissionFromJson(Map<String, dynamic> json) => Submission(
      id: json['id'] as int,
      comment: json['comment'] as String?,
      marks: json['marks'] as int,
      fileURL: json['fileURL'] as String?,
      markedDate: json['markedDate'] as String?,
      submittedDate: json['submittedDate'] as String?,
    );

Map<String, dynamic> _$SubmissionToJson(Submission instance) =>
    <String, dynamic>{
      'id': instance.id,
      'marks': instance.marks,
      'comment': instance.comment,
      'fileURL': instance.fileURL,
      'submittedDate': instance.submittedDate,
      'markedDate': instance.markedDate,
    };
