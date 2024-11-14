package com.mongddang.app

import android.util.Log
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.annotation.CapacitorPlugin

private const val TAG = "ExamplePlugin"

@CapacitorPlugin(name = "ExamplePlugin")
class ExamplePlugin : Plugin() {
    fun sayHello() {
        // Your logic here
        println("Hello from ExamplePlugin!")
        Log.d(TAG,"Hello from ExamplePlugin!")
    }
}