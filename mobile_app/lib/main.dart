import 'package:flutter/material.dart';
import 'package:mylms/screens/app_navigation.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'My LMS',
        theme: ThemeData(
            primaryColor: const Color(0xFF3c3c3c),
            appBarTheme: const AppBarTheme(
                foregroundColor: Colors.white,
                backgroundColor: Color(0xFF3c3c3c)),
            bottomNavigationBarTheme: const BottomNavigationBarThemeData(
                selectedItemColor: Color(0xFF3c3c3c))),
        home: const AppNavigation());
  }
}
