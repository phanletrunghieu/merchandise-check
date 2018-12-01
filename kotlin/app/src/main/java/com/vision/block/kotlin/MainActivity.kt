package com.vision.block.kotlin

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.support.v7.app.ActionBar
import android.support.v7.app.AppCompatActivity
import com.vision.block.kotlin.view.scan.IntroScanActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initView()
        setTimeSleep()
    }

    @SuppressLint("CheckResult")
    private fun setTimeSleep() {
        val handler = Handler()
        handler.postDelayed({
            startSalesManagerActivity()
        }, 2000)
    }

    private fun startSalesManagerActivity() {
        val intent = Intent(this, IntroScanActivity::class.java)
        startActivity(intent)
        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)
        finish()
    }

    private fun initView() {
        val actionBar: ActionBar? = supportActionBar
        actionBar?.hide()
    }
}