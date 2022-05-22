import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:mylms/modules/content.dart';
import 'package:mylms/services/api/api_exception.dart';
import 'package:mylms/services/api/submission_service.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../services/alert/alert_service.dart';
import 'due_date_view.dart';

class SubmissionView extends StatefulWidget {
  final Content content;
  const SubmissionView({required this.content, Key? key}) : super(key: key);

  @override
  State<SubmissionView> createState() => _SubmissionViewState();
}

class _SubmissionViewState extends State<SubmissionView> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  bool _isLoading = false;
  String? _filePath;

  void _openDownloadLink() async {
    final Uri url = Uri.parse(widget.content.fileURL!);
    if (!await launchUrl(url)) throw 'Could not launch';
  }

  void _pickFile() async {
    final result = await FilePicker.platform.pickFiles();

    if (result != null) {
      _filePath = result.files.single.path!;
    } else {
      // User canceled the picker
    }
  }

  void _submit() {
    if (_filePath == null) {
      AlerService.snakbarError(
          message: "Please select the file", key: _scaffoldKey);
      return;
    }
    SubmissionServices.submit(widget.content.id, _filePath!)
        .then((value) => (r) {
              print("Ok");
            })
        .catchError((ApiException e) {
      AlerService.snakbarError(message: e.message, key: _scaffoldKey);
    }).whenComplete(() => _setLoading(false));
  }

  void _setLoading(bool v) => setState((() => _isLoading = v));
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
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
            Align(
              child: TextButton(
                  onPressed: _openDownloadLink, child: const Text("Download")),
            ),
            ListTile(
              title: const Text("Due Date"),
              subtitle: Text(widget.content.dueDate),
              trailing: DueDateView(
                date: widget.content.dueDate,
              ),
            ),
            GestureDetector(
                onTap: _pickFile,
                child: const CircleAvatar(
                  radius: 50,
                  backgroundColor: Colors.grey,
                  foregroundColor: Colors.white,
                  child: Icon(
                    Icons.file_upload,
                    size: 50,
                  ),
                )),
            const Spacer(),
            _isLoading
                ? const CircularProgressIndicator()
                : SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                        onPressed: _submit, child: const Text("Submit")),
                  ),
          ],
        ),
      ),
    );
  }
}
