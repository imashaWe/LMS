import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:mylms/config/env.dart';
import 'package:mylms/modules/user.dart';
import 'package:mylms/services/auth/auth_exception.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static const _userDatakey = "userdata";
  static SharedPreferences? _prefs;

  static User? get user {
    final data = _prefs!.getString(_userDatakey);
    if (data == null) {
      return null;
    }
    return User.fromJson(jsonDecode(data));
  }

  static bool get isLoggedIn => user != null;

  static Future<void> login(
      {required String userName, required String password}) async {
    final url = Uri.parse("${Env.baseUrl}/auth/login");

    try {
      final res = await http
          .post(url, body: {'userName': userName, 'password': password});

      if (res.statusCode != 200) {
        throw AuthException(res.body);
      }

      await _saveUser(User.fromJson(jsonDecode(res.body)));
    } on SocketException catch (e) {
      throw AuthException("Network Error");
    }
  }

  static Future<void> signup(
      {required String firstName,
      required String lastName,
      required String userName,
      required String password}) async {
    final url = Uri.parse("${Env.baseUrl}/auth/signup");

    try {
      final res = await http.post(url, body: {
        'firstName': firstName,
        'lastName': lastName,
        'userName': userName,
        'password': password
      });

      if (res.statusCode != 200) {
        throw AuthException(res.body);
      }

      await _saveUser(User.fromJson(jsonDecode(res.body)));
    } on SocketException catch (e) {
      throw AuthException("Network Error");
    }
  }

  static Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  static Future<void> _saveUser(User user) async {
    await _prefs!.setString(_userDatakey, jsonEncode(user.toJson()));
  }
}
