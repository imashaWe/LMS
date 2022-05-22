import 'package:flutter/material.dart';
import 'package:mylms/modules/course.dart';
import 'package:mylms/screens/my_courses/content_view.dart';
import 'package:mylms/services/api/course_service.dart';

class MyCourses extends StatefulWidget {
  MyCourses({Key? key}) : super(key: key);

  @override
  State<MyCourses> createState() => _MyCoursesState();
}

class _MyCoursesState extends State<MyCourses> {
  Future<List<Course>>? _future;
  @override
  void initState() {
    _future = CourseService.getMyCourses();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final w = MediaQuery.of(context).size.width;
    final h = MediaQuery.of(context).size.height;
    final border = BorderRadius.only(
        topLeft: Radius.circular(15), bottomLeft: Radius.circular(15));
    return Scaffold(
      appBar: AppBar(title: const Text("My Courses")),
      body: Center(
        child: FutureBuilder<List<Course>>(
            future: _future,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const CircularProgressIndicator();
              }
              if (snapshot.hasError) {
                print(snapshot.error);
                return const Text("Something went wrong");
              }
              return ListView(
                children: snapshot.data!
                    .map((e) => GestureDetector(
                        onTap: () => Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (_) => ContentView(course: e))),
                        child: Card(
                            margin: const EdgeInsets.all(5),
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(15)),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                      borderRadius: border,
                                      image: DecorationImage(
                                          fit: BoxFit.fill,
                                          image:
                                              NetworkImage(e.thumbnailURL!))),
                                  width: w * 0.35,
                                  height: h * 0.15,
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(5),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      Text(
                                        e.title,
                                        style: Theme.of(context)
                                            .textTheme
                                            .headline6,
                                      ),
                                      Text(e.description)
                                    ],
                                  ),
                                )
                              ],
                            ))))
                    .toList(),
              );
            }),
      ),
    );
  }
}
