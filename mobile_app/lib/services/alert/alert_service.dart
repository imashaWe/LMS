import 'package:flutter/material.dart';

class AlerService {
  static void snakbarError(
          {required String message, required GlobalKey<ScaffoldState> key}) =>
      _setSnack(key, message, true);

  static void snakbarSuccess(
          {required String message, required GlobalKey<ScaffoldState> key}) =>
      _setSnack(key, message, false);

  static void _setSnack(GlobalKey<ScaffoldState> key, String m, bool isError) {
    final SnackBar snackBar = SnackBar(
      duration: const Duration(seconds: 5),
      content: Text(
        m,
        style: const TextStyle(
            color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
      ),
      backgroundColor: isError ? Colors.red : Colors.green,
    );
    ScaffoldMessenger.of(key.currentState!.context).showSnackBar(snackBar);
  }
}
