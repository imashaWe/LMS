import 'package:badges/badges.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mylms/screens/account/account.dart';
import 'package:mylms/screens/home/home.dart';
import 'package:mylms/screens/my_courses/my_courses.dart';
import 'package:mylms/screens/notifications/notification.dart';

class AppNavigation extends StatefulWidget {
  const AppNavigation({Key? key}) : super(key: key);

  @override
  State<AppNavigation> createState() => _AppNavigationState();
}

class _AppNavigationState extends State<AppNavigation> {
  int _selectedIndex = 0;
  void _change(int i) => setState(() => _selectedIndex = i);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _selectedIndex, children: [
        const Home(),
        const MyCourses(),
        const Notifications(),
        Account(),
      ]),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        items: [
          const BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          const BottomNavigationBarItem(
              icon: Icon(FontAwesomeIcons.graduationCap), label: "My Courses"),
          BottomNavigationBarItem(
              icon: Badge(
                badgeContent: const Text(
                  '3',
                  style: TextStyle(color: Colors.white),
                ),
                child: const Icon(Icons.notifications),
              ),
              label: "Notification"),
          const BottomNavigationBarItem(
              icon: Icon(Icons.person), label: "Account"),
        ],
        onTap: _change,
      ),
    );
  }
}
