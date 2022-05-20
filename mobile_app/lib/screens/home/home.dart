import 'package:flutter/material.dart';
import 'package:mylms/services/api/api_exception.dart';
import 'package:mylms/services/api/api_service.dart';
import 'package:mylms/services/api/course_service.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("My LMS"),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text("Ok"),
          onPressed: () {
            CourseService.getMyCourses()
                .then((r) => print(r[0].lecturer!.firstName));
          },
        ),
      ),
    );
  }
}
