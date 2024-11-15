import 'package:flutter/material.dart';
import '../models/activity.dart';
import '../repository/stat_repository.dart';

class ResultScreen extends StatefulWidget {
  final ActivityType type;

  const ResultScreen({
    super.key,
    required this.type,
  });

  @override
  State<ResultScreen> createState() => _ResultScreenState();
}

class _ResultScreenState extends State<ResultScreen> {
  int? currentBloodSugar;

  @override
  void initState() {
    super.initState();
    _updateBloodSugar();

    Future.delayed(const Duration(seconds: 5), () {
      if (mounted) {
        Navigator.of(context).popUntil((route) => route.isFirst);
      }
    });
  }

  Future<void> _updateBloodSugar() async {
    try {
      final response = await StatRepository.fetchData();
      if (mounted) {
        setState(() {
          currentBloodSugar = response['bloodSugarLevel'] as int?;
        });
      }
    } catch (e) {
      print('혈당 데이터 가져오기 실패: $e');
    }
  }

  Activity get _activity => Activity.activities[widget.type]!;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.black,
        body: Container(
          width: 192,
          height: 192,
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            color: Colors.black,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                _activity.imagePath,
                width: 40,
                height: 40,
                errorBuilder: (context, error, stackTrace) {
                  return Container(
                    width: 40,
                    height: 40,
                    color: Colors.transparent,
                  );
                },
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: Text(
                  _activity.completeTitle,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              currentBloodSugar == null
                  ? const CircularProgressIndicator(
                color: Colors.white,
                strokeWidth: 2,
              )
                  : Text(
                currentBloodSugar.toString(),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}