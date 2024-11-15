package com.example.watch_app  // 실제 패키지명으로 변경해주세요

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.content.Intent

class MainActivity : FlutterActivity() {
    private val CHANNEL = "com.example.watch_app"  // 실제 패키지명으로 변경해주세요

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "sendGlucoseUpdate" -> {
                    val glucoseValue = call.argument<String>("glucose_value")
                    val intent = Intent("com.your.package.GLUCOSE_UPDATE")  // 실제 패키지명으로 변경해주세요
                    intent.putExtra("glucose_value", glucoseValue)
                    sendBroadcast(intent)
                    result.success(null)
                }
                else -> {
                    result.notImplemented()
                }
            }
        }
    }
}