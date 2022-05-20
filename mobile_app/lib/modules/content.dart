import 'package:json_annotation/json_annotation.dart';

part 'content.g.dart';

@JsonSerializable()
class Content {
  int id;
  String name;
  String description;
  String type;
  String dueDate;
  String? fileURL;

  Content(
      {required this.id,
      required this.name,
      required this.description,
      required this.type,
      required this.dueDate,
      this.fileURL});

  factory Content.fromJson(Map<String, dynamic> json) =>
      _$ContentFromJson(json);
  Map<String, dynamic> toJson() => _$ContentToJson(this);
}
