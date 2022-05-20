import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mylms/screens/account/sign_up.dart';
import 'package:mylms/screens/app_navigation.dart';
import 'package:mylms/services/alert/alert_service.dart';
import 'package:mylms/services/auth/auth_exception.dart';
import 'package:mylms/services/auth/auth_service.dart';
import 'auth_button.dart';
import 'auth_form_field.dart';

class LogIn extends StatefulWidget {
  const LogIn({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _LogInState();
}

class _LogInState extends State<LogIn> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  bool _isLoading = false;
  String? _email;
  String? _password;

  void _sumbit() {
    _formKey.currentState!.save();
    if (_formKey.currentState!.validate()) {
      _setLoading(true);
      AuthService.login(userName: _email!, password: _password!).then((v) {
        Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (_) => const AppNavigation()),
            (route) => false);
      }).onError((AuthException e, stackTrace) {
        AlerService.snakbarError(message: e.message, key: _scaffoldKey);
      }).whenComplete(() => _setLoading(false));
    }
  }

  void _setLoading(bool v) => setState(() => _isLoading = v);

  @override
  Widget build(BuildContext context) {
    final h = MediaQuery.of(context).size.height;
    final w = MediaQuery.of(context).size.width;
    return Scaffold(
      key: _scaffoldKey,
      body: Container(
        padding: EdgeInsets.only(top: h / 20, left: 10, right: 10),
        child: Column(
          children: [
            Align(
                alignment: Alignment.topLeft,
                child: RichText(
                  text: const TextSpan(
                      text: 'Welcome,',
                      style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                          fontSize: 30),
                      children: [
                        TextSpan(
                            text: '\nLogin to continue!',
                            style: TextStyle(color: Colors.grey, fontSize: 20))
                      ]),
                )),
            _isLoading ? const LinearProgressIndicator() : const Divider(),
            Expanded(
              child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 25),
                  child: Form(
                      key: _formKey,
                      child: ListView(
                        children: [
                          SizedBox(
                              height: h / 5,
                              child:
                                  SvgPicture.asset('assets/images/auth.svg')),
                          const SizedBox(
                            height: 20,
                          ),
                          AuthFormField(
                            icon: Icons.email,
                            hintText: "Email",
                            onSaved: (v) => _email = v,
                            validator: (v) {
                              if (v!.isEmpty) return 'Email is requaired';
                              return null;
                            },
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          AuthFormField(
                            icon: Icons.lock,
                            obscureText: true,
                            hintText: "Password",
                            onSaved: (v) => _password = v,
                            validator: (v) {
                              if (v!.isEmpty) return 'Password is requaired';
                              return null;
                            },
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          SizedBox(
                              width: double.infinity,
                              child: AuthButton(
                                disable: _isLoading,
                                onPressed: _sumbit,
                                text: "LOG IN",
                              )),
                        ],
                      ))),
            ),
            Container(
              padding: const EdgeInsets.symmetric(vertical: 20),
              child: RichText(
                  text: TextSpan(
                      text: "Don't have an account",
                      style: const TextStyle(color: Colors.black, fontSize: 16),
                      children: [
                    TextSpan(
                        text: '\tSIGN UP!',
                        recognizer: TapGestureRecognizer()
                          ..onTap = () => Navigator.push(context,
                              CupertinoPageRoute(builder: (_) => SignUp())),
                        style: TextStyle(
                            color: Theme.of(context).primaryColor,
                            fontWeight: FontWeight.bold))
                  ])),
            ),
          ],
        ),
      ),
    );
  }
}
