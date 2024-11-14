package com.mongddang.app

import android.os.Bundle
import android.util.Log
import com.getcapacitor.BridgeActivity
import com.mongddang.ExamplePlugin

private const val TAG = "MainActivity"

class MainActivity : BridgeActivity(){
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate: ㅎㅇㅎㅇ")
        // ExamplePlugin 인스턴스 생성 후 메서드 호출
        registerPlugin(ExamplePlugin::class.java)

        Log.d(TAG, "onCreate: 실행됨?")
    }
}
