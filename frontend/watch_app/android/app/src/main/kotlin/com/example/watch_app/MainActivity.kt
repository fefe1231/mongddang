package com.example.watch_app

import android.util.Log
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import io.flutter.embedding.android.FlutterActivity
import androidx.wear.watchface.complications.datasource.ComplicationDataSourceUpdateRequester
import android.content.ComponentName
import android.content.Context

class MainActivity : FlutterActivity() {
    private val CHANNEL = "com.example.watch_app"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "sendGlucoseUpdate" -> {
                    val glucoseValue = call.argument<String>("glucose_value")
                    Log.d("WatchApp", "Received glucose value: $glucoseValue")

                    saveGlucoseValue(glucoseValue)
                    updateComplicationData()

                    result.success(null)
                }
                else -> result.notImplemented()
            }
        }
    }

    private fun saveGlucoseValue(value: String?) {
        try {
            Log.d("WatchApp", "Attempting to save glucose value: $value")
            getSharedPreferences("GlucoseData", Context.MODE_PRIVATE)
                .edit()
                .putString("glucose_value", value)
                .apply()
            Log.d("WatchApp", "Successfully saved glucose value")
        } catch (e: Exception) {
            Log.e("WatchApp", "Error saving glucose value", e)
        }
    }

    private fun updateComplicationData() {
        try {
            Log.d("WatchApp", "Starting complication update")
            val componentName = ComponentName(applicationContext, GlucoseComplicationProvider::class.java)
            Log.d("WatchApp", "Component name created: ${componentName.className}")

            val updateRequester = ComplicationDataSourceUpdateRequester.create(
                applicationContext,
                componentName
            )
            Log.d("WatchApp", "UpdateRequester created successfully")

            updateRequester.requestUpdateAll()
            Log.d("WatchApp", "Update request sent successfully")
        } catch (e: Exception) {
            Log.e("WatchApp", "Error updating complication", e)
        }
    }
}