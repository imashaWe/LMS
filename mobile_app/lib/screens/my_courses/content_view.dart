import 'package:flutter/material.dart';
import 'package:mylms/modules/content.dart';
import 'package:mylms/modules/course.dart';
import 'package:mylms/screens/my_courses/single_content_view.dart';
import 'package:mylms/screens/my_courses/submission_view.dart';
import 'package:mylms/services/api/content_service.dart';
import 'package:timelines/timelines.dart';
import 'package:timeago/timeago.dart' as timeago;

class ContentView extends StatelessWidget {
  final Course course;
  const ContentView({required this.course, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(course.title)),
      body: FutureBuilder<List<Content>>(
          future: ContentService.getContentByCourseID(course.id),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            }
            if (snapshot.hasError) {
              return const Text("Something went wrong");
            }

            return Timeline.tileBuilder(
              builder: TimelineTileBuilder.fromStyle(
                contentsAlign: ContentsAlign.basic,
                oppositeContentsBuilder: (context, index) {
                  final item = snapshot.data![index];
                  return Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Text(timeago.format(DateTime.parse(item.addedDate))),
                  );
                },
                contentsBuilder: (context, index) {
                  final item = snapshot.data![index];
                  IconData icon = Icons.file_copy;
                  if (item.type == "Assignment") {
                    icon = Icons.upload_file;
                  }
                  if (item.type == "Announcement") {
                    icon = Icons.announcement;
                  }
                  return Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: ListTile(
                      leading: Icon(icon),
                      title: Text(item.name),
                      subtitle: Text(item.description),
                      onTap: () {
                        if (item.type == "Assignment") {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (_) =>
                                      SubmissionView(content: item)));
                        } else {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (_) =>
                                      SingleContentView(content: item)));
                        }
                      },
                    ),
                  );
                },
                itemCount: snapshot.data!.length,
              ),
            );
          }),
    );
  }
}
