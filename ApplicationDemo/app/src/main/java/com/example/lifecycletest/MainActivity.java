package com.example.lifecycletest;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    public final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate: 1");
        setContentView(R.layout.activity_main);

//       恢复数据
        if (savedInstanceState != null) {
            String tmpData = savedInstanceState.getString("tmp_data_key");
            Log.d(TAG, "onCreate: " + tmpData);
        }
        Button startUI = (Button) findViewById(R.id.button_event);
        Button startDialog = (Button) findViewById(R.id.button_dialog);
        Button startNormal = (Button) findViewById(R.id.button_noraml);
        /*跳转UI测试页面*/
        startUI.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, UiActivity.class);
                startActivity(intent);
            }
        });
        /*打开弹出 活动*/
        startDialog.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, DialogActivity.class);
                startActivity(intent);
            }
        });
        /*打开普通活动*/
        startNormal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, NormalActivity.class);
                startActivity(intent);
            }
        });
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(TAG, "onStart: 1");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "onResume: 1");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG, "onPause: 1");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG, "onStop: 1");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy: 1");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.d(TAG, "onRestart: 1");
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        String tmpData = "这是一个临时数据";
        outState.putString("tmp_data_key", tmpData);
    }
}