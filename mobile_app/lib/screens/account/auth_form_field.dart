import 'package:flutter/material.dart';

class AuthFormField extends StatelessWidget {
  final String hintText;
  final IconData icon;
  final bool obscureText;
  final String? Function(String?)? validator;
  final void Function(String?)? onSaved;
  AuthFormField(
      {required this.hintText,
      required this.icon,
      this.obscureText = false,
      this.validator,
      this.onSaved});
  @override
  Widget build(BuildContext context) {
    const border = OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(90.0)),
        borderSide: BorderSide(
          color: Colors.transparent,
        ));
    return TextFormField(
      validator: validator,
      onSaved: onSaved,
      obscureText: obscureText,
      decoration: InputDecoration(
          contentPadding: const EdgeInsets.all(0),
          filled: true,
          fillColor: Theme.of(context).primaryColor.withOpacity(.1),
          border: border,
          prefixIcon: Icon(icon),
          hintText: hintText),
    );
  }
}
