// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) => User(
      fristName: json['fristName'] as String,
      lastName: json['lastName'] as String,
      email: json['email'] as String,
      token: json['token'] as String,
    );

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'fristName': instance.fristName,
      'lastName': instance.lastName,
      'email': instance.email,
      'token': instance.token,
    };
