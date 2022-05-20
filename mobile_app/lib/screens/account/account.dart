import 'package:flutter/material.dart';
import 'package:mylms/screens/account/log_in.dart';
import 'package:mylms/services/auth/auth_service.dart';

class Account extends StatelessWidget {
  Account({Key? key}) : super(key: key);

  final user = AuthService.user;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Account")),
      body: Center(
        child: Column(
          children: [
            ListTile(
              leading: Icon(Icons.person),
              title: Text("${user!.firstName} ${user!.lastName}"),
            ),
            ListTile(
              leading: const Icon(Icons.exit_to_app),
              title: const Text("Log out"),
              onTap: () async {
                await AuthService.logout();
                Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (_) => const LogIn()),
                    (route) => false);
              },
            )
          ],
        ),
      ),
    );
  }
}
