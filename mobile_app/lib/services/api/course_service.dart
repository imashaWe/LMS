import 'package:mylms/modules/course.dart';
import 'package:mylms/services/api/api_service.dart';

class CourseService {
  static Future<List<Course>> getMyCourses() async {
    List data = await ApiService.get('course/my');
    return data.map((e) => Course.fromJson(e)).toList();
  }
}
