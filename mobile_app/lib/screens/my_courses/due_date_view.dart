import 'package:flutter/material.dart';

class DueDateView extends StatelessWidget {
  final String date;
  const DueDateView({required this.date, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final d = DateTime.parse(date);
    final def = d.difference(DateTime.now()).inDays;
    return def < 1
        ? Chip(
            backgroundColor: Colors.redAccent,
            label: Text(
              def.abs().toString() + " Days Overdued",
              style: TextStyle(color: Colors.white),
            ),
          )
        : Chip(
            label: Text(def.abs().toString() + " Days Remaining"),
          );
  }
}
