import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  String fristName;
  String lastName;
  String email;
  String token;

  User(
      {required this.fristName,
      required this.lastName,
      required this.email,
      required this.token});

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
