import 'package:flutter/material.dart';
import 'package:mylms/screens/account/log_in.dart';
import 'package:mylms/screens/app_navigation.dart';
import 'package:mylms/services/auth/auth_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await AuthService.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'My LMS',
        routes: {
          '/home': (_) => const AppNavigation(),
          '/login': (_) => const LogIn(),
        },
        theme: ThemeData(
            primaryColor: const Color(0xFF3c3c3c),
            appBarTheme: const AppBarTheme(
                centerTitle: true,
                foregroundColor: Colors.white,
                backgroundColor: Color(0xFF3c3c3c)),
            bottomNavigationBarTheme: const BottomNavigationBarThemeData(
                unselectedItemColor: Colors.grey,
                selectedItemColor: Color(0xFF3c3c3c)),
            dividerColor: Colors.black),
        home: AuthService.isLoggedIn ? const AppNavigation() : const LogIn());
  }
}
