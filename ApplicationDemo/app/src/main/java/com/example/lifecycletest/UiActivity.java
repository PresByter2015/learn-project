package com.example.lifecycletest;

import androidx.appcompat.app.AppCompatActivity;

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
        editText = (EditText) findViewById(R.id.editText2);
        imageView = (ImageView) findViewById(R.id.imageView);
        progressBar = (ProgressBar) findViewById(R.id.progress_bar);
        getTextEle.setOnClickListener(this);
        getImgEle.setOnClickListener(this);
        getPbarEle.setOnClickListener(this);
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
            default:
                Log.d("NormalActivity", "onClick: " + view.getId());
                break;
        }

    }
}