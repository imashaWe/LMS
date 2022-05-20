import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mylms/screens/account/log_in.dart';
import 'package:mylms/services/auth/auth_service.dart';

class Account extends StatelessWidget {
  Account({Key? key}) : super(key: key);

  final user = AuthService.user;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Account")),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10),
        child: Column(
          children: [
            Column(
              children: [
                CircleAvatar(
                  radius: 40,
                  backgroundColor:
                      Theme.of(context).primaryColor.withOpacity(0.9),
                  foregroundColor: Colors.white,
                  child: const Icon(FontAwesomeIcons.user),
                ),
                Text(
                  "${user!.firstName} ${user!.lastName}",
                  style: Theme.of(context).textTheme.headline5,
                )
              ],
            ),
            ListTile(
              leading: const Icon(Icons.email),
              title: Text(user!.email),
            ),
            const Divider(),
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
