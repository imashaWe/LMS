import 'dart:convert';
import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;

import 'package:mylms/config/env.dart';
import 'package:mylms/services/api/api_exception.dart';
import 'package:mylms/services/auth/auth_service.dart';

class ApiService {
  static final _headres = {
    "Content-type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer ${AuthService.user!.token}",
  };

  static Future<dynamic> post(String path, Map<String, dynamic> data) async {
    final url = Uri.parse("${Env.baseUrl}$path");
    try {
      final res = await http.post(url, headers: _headres, body: data);
      if (res.statusCode != 200) {
        throw ApiException("Something went wrong");
      }
      return jsonDecode(res.body);
    } on SocketException catch (e) {
      throw ApiException("Network Erorr");
    }
  }

  static Future<dynamic> get(String path) async {
    final url = Uri.parse("${Env.baseUrl}$path");
    try {
      final res = await http.get(url, headers: _headres);
      if (res.statusCode != 200) {
        throw ApiException("Something went wrong");
      }
      return jsonDecode(res.body);
    } on SocketException catch (e) {
      throw ApiException("Network Erorr");
    }
  }

  static Future<dynamic> fileUpload(String path, String filePath) async {
    final headres = {
      "Content-type": "multipart/form-data",
      "Accept": "application/json",
      "Authorization": "Bearer ${AuthService.user!.token}",
    };
    final url = Uri.parse("${Env.baseUrl}$path");
    try {
      var request = http.MultipartRequest(
        'POST',
        url,
      );
      request.headers.addAll(headres);
      request.files.add(http.MultipartFile('file',
          File(filePath).readAsBytes().asStream(), File(filePath).lengthSync(),
          filename: filePath.split("/").last));
      final res = await request.send();
      if (res.statusCode != 200) {
        throw ApiException("Something went wrong");
      }
      return;
    } catch (e) {
      throw ApiException("Network Erorr");
    }
  }
}
