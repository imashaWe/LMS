import 'package:flutter/material.dart';
import 'package:mylms/services/api/api_service.dart';

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
            //   ApiService.get('course/my').then((value) => print(value.body));
          },
        ),
      ),
    );
  }
}
