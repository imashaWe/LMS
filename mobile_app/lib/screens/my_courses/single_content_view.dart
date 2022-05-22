import 'package:flutter/material.dart';
import 'package:mylms/modules/content.dart';

class SingleContentView extends StatefulWidget {
  final Content content;
  const SingleContentView({required this.content, Key? key}) : super(key: key);

  @override
  State<SingleContentView> createState() => _SingleContentViewState();
}

class _SingleContentViewState extends State<SingleContentView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.content.name)),
      body: Padding(
        padding: const EdgeInsets.all(5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              widget.content.description,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.justify,
            ),
          ],
        ),
      ),
    );
  }
}
