import 'package:flutter/material.dart';
import 'package:mylms/services/api/course_service.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("My LMS"),
      ),
      body: const Center(),
    );
  }
}
