// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'course.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Course _$CourseFromJson(Map<String, dynamic> json) => Course(
      id: json['id'] as int?,
      title: json['title'] as String?,
      description: json['description'] as String?,
      duration: json['duration'] as int?,
      thumbnailURL: json['thumbnailURL'] as String?,
      lecturer: json['lecturer'] == null
          ? null
          : User.fromJson(json['lecturer'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$CourseToJson(Course instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'description': instance.description,
      'thumbnailURL': instance.thumbnailURL,
      'duration': instance.duration,
      'lecturer': instance.lecturer,
    };
