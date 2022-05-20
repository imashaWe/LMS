import 'package:json_annotation/json_annotation.dart';

part 'level.g.dart';

@JsonSerializable()
class Level {
  int id;
  String level;

  Level({required this.id, required this.level});

  factory Level.fromJson(Map<String, dynamic> json) => _$LevelFromJson(json);
  Map<String, dynamic> toJson() => _$LevelToJson(this);
}
