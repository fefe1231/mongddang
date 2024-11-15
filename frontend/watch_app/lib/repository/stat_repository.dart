import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class StatRepository {
  static String get accessToken => dotenv.env['ACCESS_TOKEN'] ?? '';
  static String get baseUrl => dotenv.env['BASE_URL'] ?? '';

  static Future<dynamic> fetchData() async {
    try {
      // Dio 인스턴스 생성
      final dio = Dio();

      // 헤더 설정
      dio.options.headers = {
        'Authorization': 'Bearer $accessToken',
        'Content-Type': 'application/json',
      };

      // API 요청
      final response = await dio.post(
        '$baseUrl/api/vital/bloodsugar/current?nickname=어린이 서원',
        // queryParameters: {
        //   'nickname': '어린이 서원',
        // },
      );

      print('API 응답: ${response.data}'); // 디버깅용
      return response.data['data'];

    } catch (e) {
      print('에러 상세 정보:');
      print('에러 타입: ${e.runtimeType}');
      if (e is DioException) {
        print('에러 메시지: ${e.message}');
        print('에러 타입: ${e.type}');
        print('상태 코드: ${e.response?.statusCode}');
        print('응답 데이터: ${e.response?.data}');
      }
      throw e;
    }
  }
}