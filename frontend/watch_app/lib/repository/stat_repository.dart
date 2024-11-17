import 'package:dio/dio.dart';
import 'package:flutter/services.dart';

class StatRepository {
  static const platform = MethodChannel('com.example.watch_app');

  // 혈당 임계값 설정
  static const double LOW_THRESHOLD = 70.0;
  static const double HIGH_THRESHOLD = 180.0;

  // 워치로 혈당값과 알림 상태를 전송하는 메소드
  // sendGlucoseToWatch 메소드 수정
  static Future<void> sendGlucoseToWatch(dynamic data) async {
    try {
      final glucoseValue = double.parse(data['bloodSugarLevel'].toString());
      final isLow = glucoseValue <= 70.0;
      final isHigh = glucoseValue >= 180.0;
      final needsAlert = isLow || isHigh;

      print('워치로 전송 시도: $glucoseValue (알림 필요: $needsAlert)');

      await platform.invokeMethod('sendGlucoseUpdate', {
        'glucose_value': glucoseValue.toString(),
        'needs_alert': needsAlert,
        'alert_type': isLow ? 'low' : (isHigh ? 'high' : 'normal')
      });

      print('워치로 전송 성공: $glucoseValue');

      if (needsAlert) {
        print('알림 타입: ${isLow ? "저혈당" : "고혈당"}');
      }
    } catch (e) {
      print('워치 전송 에러: $e');
    }
  }

  static Future<dynamic> fetchData() async {
    try {
      final dio = Dio();
      dio.options.headers = {
        'Authorization': 'Bearer ',
        'Content-Type': 'application/json',
      };

      final response = await dio.post(
        'https://baseurl/api/vital/bloodsugar/current?nickname=어린이 서원',
      );

      if (response.data != null && response.data['data'] != null) {
        await sendGlucoseToWatch(response.data['data']);
        return response.data['data'];
      }

      return null;
    } catch (e) {
      _logError(e);
      throw e;
    }
  }

  // 에러 로깅 헬퍼 메소드
  static void _logError(dynamic e) {
    print('에러 상세 정보:');
    print('에러 타입: ${e.runtimeType}');
    if (e is DioException) {
      print('에러 메시지: ${e.message}');
      print('에러 타입: ${e.type}');
      print('상태 코드: ${e.response?.statusCode}');
      print('응답 데이터: ${e.response?.data}');
    }
  }

  // 주기적으로 데이터를 가져오고 워치에 전송하는 메소드
  static Future<void> startPeriodicFetch() async {
    while (true) {
      try {
        final data = await fetchData();
        if (data != null) {
          double glucoseValue = double.parse(data['bloodSugarLevel'].toString());
          print('현재 혈당: $glucoseValue mg/dL');

          // 비정상 혈당 로깅
          if (glucoseValue <= LOW_THRESHOLD) {
            print('경고: 저혈당 감지! ($glucoseValue mg/dL)');
          } else if (glucoseValue >= HIGH_THRESHOLD) {
            print('경고: 고혈당 감지! ($glucoseValue mg/dL)');
          }
        }

        // 5분 대기
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