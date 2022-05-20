import 'package:flutter/material.dart';
import 'package:mylms/modules/content.dart';
import 'package:mylms/modules/course.dart';
import 'package:mylms/services/api/content_service.dart';

class ContentView extends StatelessWidget {
  final Course course;
  const ContentView({required this.course, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text(course.title)),
        body: Center(
          child: FutureBuilder<List<Content>>(
              future: ContentService.getContentByCourseID(course.id),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                }
                if (snapshot.hasError) {
                  return const Text("Something went wrong");
                }
                return ListView(
                    children: snapshot.data!
                        .map((e) => ListTile(
                              title: Text(e.name),
                            ))
                        .toList());
              }),
        ));
  }
}
