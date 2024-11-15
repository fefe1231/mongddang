package com.mongddang.app

import android.os.Bundle
import android.util.Log
import com.getcapacitor.BridgeActivity

private const val TAG = "MainActivity"

class MainActivity : BridgeActivity(){
    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "onCreate")
        // ExamplePlugin 인스턴스 생성 후 메서드 호출
        registerPlugin(EchoPlugin::class.java)
        super.onCreate(savedInstanceState)
    }
}
