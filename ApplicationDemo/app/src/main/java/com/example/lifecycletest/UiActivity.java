package com.example.lifecycletest;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

public class UiActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText editText;
    private ImageView imageView;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ui);
        /**/
        Button getTextEle = (Button) findViewById(R.id.button_u1);
        Button getImgEle = (Button) findViewById(R.id.button_u2);
        Button getPbarEle = (Button) findViewById(R.id.button_u3);
        Button getAlertEle = (Button) findViewById(R.id.button_u4);
        Button getProgressEle = (Button) findViewById(R.id.button_u5);
        editText = (EditText) findViewById(R.id.editText2);
        imageView = (ImageView) findViewById(R.id.imageView);
        progressBar = (ProgressBar) findViewById(R.id.progress_bar);
        getTextEle.setOnClickListener(this);
        getImgEle.setOnClickListener(this);
        getPbarEle.setOnClickListener(this);
        getAlertEle.setOnClickListener(this);
        getProgressEle.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button_u1:
                String value = editText.getText().toString();
                Toast.makeText(UiActivity.this, value, Toast.LENGTH_LONG).show();
                break;
            case R.id.button_u2:
                imageView.setImageResource(R.drawable.oip);
                break;
            case R.id.button_u3:
                /*if (progressBar.getVisibility() == View.GONE) {
                    progressBar.setVisibility(View.VISIBLE);
                } else {
                    progressBar.setVisibility(View.GONE);
                }*/
                int process = progressBar.getProgress();
                process = process + 10;
                if (process >= 100) {
                    process = 0;
                }
                progressBar.setProgress(process);
                break;
            case R.id.button_u4:
                AlertDialog.Builder dialog = new AlertDialog.Builder(UiActivity.this);
                dialog.setTitle("这是一个标题！");
                dialog.setMessage("这是对话框内容！");
                dialog.setCancelable(false);
                dialog.setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Toast.makeText(UiActivity.this, "点击了确认", Toast.LENGTH_LONG).show();
                    }
                });
                dialog.setNegativeButton("取消", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Toast.makeText(UiActivity.this, "点击了取消", Toast.LENGTH_LONG).show();
                    }
                });
                dialog.show();
                break;
            case R.id.button_u5:
                ProgressDialog pgDialog=new ProgressDialog(UiActivity.this);
                pgDialog.setTitle("呀！出问题了");
                pgDialog.setMessage("加载中...");
                pgDialog.setCancelable(true);
                pgDialog.show();
                break;
            default:
                Log.d("NormalActivity", "onClick: " + view.getId());
                break;
        }

    }
}