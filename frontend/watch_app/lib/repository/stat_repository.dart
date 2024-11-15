import 'package:dio/dio.dart';
// import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter/services.dart';

class StatRepository {
  // 플랫폼 채널 정의
  static const platform = MethodChannel('com.example.watch_app');

  // 워치로 혈당값 전송하는 메소드
  static Future<void> sendGlucoseToWatch(String glucoseValue) async {
    try {
      print('워치로 전송 시도: $glucoseValue'); // 전송 시도 로그
      await platform.invokeMethod('sendGlucoseUpdate', {
        'glucose_value': glucoseValue
      });
      print('워치로 전송 성공'); // 성공 로그
    } catch (e) {
      print('워치 전송 에러: $e'); // 에러 로그
    }
  }

  static Future<dynamic> fetchData() async {
    try {
      // Dio 인스턴스 생성
      final dio = Dio();

      // 헤더 설정
      dio.options.headers = {
        'Authorization': 'Bearer ',
        'Content-Type': 'application/json',
      };

      // API 요청
      final response = await dio.post(
        'https://baseurl/api/vital/bloodsugar/current?nickname=어린이 서원',
      );

      print('API 응답: ${response.data}'); // 디버깅용

      // 혈당 데이터 추출 및 워치로 전송
      if (response.data != null && response.data['data'] != null) {
        final glucoseValue = response.data['data'].toString();
        await sendGlucoseToWatch(glucoseValue); // 워치로 데이터 전송
      }

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

  // 주기적으로 데이터를 가져오고 워치에 전송하는 메소드
  static Future<void> startPeriodicFetch() async {
    while (true) {
      try {
        await fetchData();
        // 5분 대기 (필요에 따라 시간 조절 가능)
        await Future.delayed(const Duration(minutes: 5));
      } catch (e) {
        print('주기적 데이터 가져오기 에러: $e');
        // 에러 발생시 1분 대기 후 재시도
        await Future.delayed(const Duration(minutes: 1));
      }
    }
  }

  // 데이터 동기화 시작
  static void startSync() {
    startPeriodicFetch();
  }
}