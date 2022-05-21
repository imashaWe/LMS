// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'course.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Course _$CourseFromJson(Map<String, dynamic> json) => Course(
      id: json['id'] as int,
      title: json['title'] as String,
      description: json['description'] as String,
      duration: json['duration'] as int,
      lecturer: User.fromJson(json['lecturer'] as Map<String, dynamic>),
      level: Level.fromJson(json['level'] as Map<String, dynamic>),
      subject: Subject.fromJson(json['subject'] as Map<String, dynamic>),
      thumbnailURL: json['thumbnailURL'] as String?,
    );

Map<String, dynamic> _$CourseToJson(Course instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'description': instance.description,
      'thumbnailURL': instance.thumbnailURL,
      'duration': instance.duration,
      'lecturer': instance.lecturer,
      'level': instance.level,
      'subject': instance.subject,
    };
