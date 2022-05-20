import 'package:http/http.dart' as http;

import 'package:mylms/config/env.dart';
import 'package:mylms/services/auth/auth_service.dart';

class ApiService {
  static final _headres = {
    "Content-type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer ${AuthService.user!.token}",
  };

  static Future<http.Response> post(
      String path, Map<String, dynamic> data) async {
    final url = Uri.parse("${Env.baseUrl}$path");
    return await http.post(url, headers: _headres, body: data);
  }

  static Future<http.Response> get(String path) async {
    final url = Uri.parse("${Env.baseUrl}$path");
    return await http.get(url, headers: _headres);
  }
}
