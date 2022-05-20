import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:mylms/screens/account/log_in.dart';
import 'auth_button.dart';
import 'auth_form_field.dart';

class SignUp extends StatefulWidget {
  const SignUp({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  bool _isLoading = false;
  String? _email;
  String? _password;

  void _sumbit() {
    _formKey.currentState!.save();
    if (_formKey.currentState!.validate()) {
      _setLoading(true);
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
                      text: 'Create Account,',
                      style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                          fontSize: 30),
                      children: [
                        TextSpan(
                            text: '\nSign up to get started!',
                            style: TextStyle(color: Colors.grey, fontSize: 20))
                      ]),
                )),
            _isLoading ? const LinearProgressIndicator() : const Divider(),
            Expanded(
              child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
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

                              if (v.length < 6) {
                                return 'Password should be at least 6 charecters';
                              }

                              return null;
                            },
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          AuthFormField(
                              icon: Icons.lock,
                              obscureText: true,
                              hintText: "Confrim Password",
                              validator: (v) {
                                if (v!.isEmpty) {
                                  return 'Confirm Password is requaired';
                                }

                                if (v != _password) {
                                  return "Password and confirm password doesn't match";
                                }

                                return null;
                              }),
                          const SizedBox(
                            height: 10,
                          ),
                          SizedBox(
                              width: double.infinity,
                              child: AuthButton(
                                disable: _isLoading,
                                onPressed: _sumbit,
                                text: "SIGN UP",
                              )),
                          const SizedBox(
                            height: 30,
                          ),
                        ],
                      ))),
            ),
            Container(
              padding: const EdgeInsets.symmetric(vertical: 20),
              child: RichText(
                  text: TextSpan(
                      text: "I have an account",
                      style: TextStyle(color: Colors.black, fontSize: 16),
                      children: [
                    TextSpan(
                        text: '\tLOG IN!',
                        recognizer: TapGestureRecognizer()
                          ..onTap = () => Navigator.push(
                              context,
                              CupertinoPageRoute(
                                  builder: (_) => const LogIn())),
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
