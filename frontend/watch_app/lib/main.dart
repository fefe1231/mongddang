import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'repository/stat_repository.dart';  // StatRepository import 추가

void main() {
  WidgetsFlutterBinding.ensureInitialized();  // Flutter 바인딩 초기화
  StatRepository.startSync();  // 동기화 시작
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '혈당 모니터 앱',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomeScreen(),
    );
  }
}