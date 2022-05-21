import 'package:flutter/material.dart';

class AuthButton extends StatelessWidget {
  final void Function() onPressed;
  final String text;
  final bool disable;
  AuthButton(
      {required this.onPressed, required this.text, this.disable = false});

  @override
  Widget build(BuildContext context) {
    return TextButton(
        style: ButtonStyle(
            shape: MaterialStateProperty.all(RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20))),
            backgroundColor:
                MaterialStateProperty.all(Theme.of(context).primaryColor),
            foregroundColor: MaterialStateProperty.all(Colors.white)),
        onPressed: () => !disable ? onPressed() : null,
        child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 5),
            child: Text(text)));
  }
}
