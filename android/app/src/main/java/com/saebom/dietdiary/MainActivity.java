package com.saebom.dietdiary;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Insets;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.Toast;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;
import java.io.ByteArrayInputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import org.json.JSONObject;

public final class MainActivity extends Activity {
    private static final String ORIGIN = "appassets.androidplatform.net";
    private static final int IMPORT_FILE = 11, EXPORT_FILE = 12;
    private WebView web;
    private ValueCallback<Uri[]> fileCallback;
    private String pendingBackup;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        if(Build.VERSION.SDK_INT>=30)getWindow().setDecorFitsSystemWindows(false);
        else getWindow().getDecorView().setSystemUiVisibility(
            android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
            android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
            android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR |
            (Build.VERSION.SDK_INT>=27?android.view.View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR:0));
        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(245,239,229));
        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(245,239,229));
        root.addView(web,new FrameLayout.LayoutParams(-1,-1));
        setContentView(root);
        root.setOnApplyWindowInsetsListener((view,insets)->{
            if(Build.VERSION.SDK_INT>=30){
                Insets safe=insets.getInsets(android.view.WindowInsets.Type.systemBars() | android.view.WindowInsets.Type.displayCutout() | android.view.WindowInsets.Type.ime());
                view.setPadding(safe.left,safe.top,safe.right,safe.bottom);
            }else view.setPadding(insets.getSystemWindowInsetLeft(),insets.getSystemWindowInsetTop(),insets.getSystemWindowInsetRight(),insets.getSystemWindowInsetBottom());
            return insets;
        });
        root.requestApplyInsets();
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG);
        WebSettings settings=web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setMediaPlaybackRequiresUserGesture(true);
        WebViewAssetLoader.AssetsPathHandler assets=new WebViewAssetLoader.AssetsPathHandler(this);
        WebViewAssetLoader loader=new WebViewAssetLoader.Builder()
            .addPathHandler("/assets/",path->{
                // Older Android MIME tables do not always recognize .mjs.
                // JavaScript modules require an explicit JavaScript MIME type.
                if(path.startsWith("www/")&&!path.contains("..")&&path.endsWith(".mjs")){
                    try{return new WebResourceResponse("text/javascript","UTF-8",getAssets().open(path));}
                    catch(Exception ignored){return new WebResourceResponse("text/plain","UTF-8",404,"Not Found",Collections.emptyMap(),new ByteArrayInputStream(new byte[0]));}
                }
                return assets.handle(path);
            }).build();
        web.setWebViewClient(new WebViewClientCompat(){
            @Override public WebResourceResponse shouldInterceptRequest(WebView view,WebResourceRequest request){
                WebResourceResponse response=loader.shouldInterceptRequest(request.getUrl());
                if(response!=null)return response;
                return new WebResourceResponse("text/plain","UTF-8",403,"Forbidden",Collections.emptyMap(),new ByteArrayInputStream(new byte[0]));
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view,WebResourceRequest request){
                Uri uri=request.getUrl();
                if("https".equals(uri.getScheme())&&ORIGIN.equals(uri.getHost()))return false;
                if(request.isForMainFrame()&&"https".equals(uri.getScheme())){
                    try{startActivity(new Intent(Intent.ACTION_VIEW,uri));}catch(Exception ignored){}
                }
                return true;
            }
        });
        web.setWebChromeClient(new WebChromeClient(){
            @Override public boolean onShowFileChooser(WebView view,ValueCallback<Uri[]> callback,FileChooserParams params){
                if(fileCallback!=null)fileCallback.onReceiveValue(null);
                fileCallback=callback;
                Intent intent=new Intent(Intent.ACTION_OPEN_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("*/*");
                intent.putExtra(Intent.EXTRA_MIME_TYPES,new String[]{"application/json","text/plain"});
                try{startActivityForResult(intent,IMPORT_FILE);}catch(Exception e){callback.onReceiveValue(null);fileCallback=null;}
                return true;
            }
        });
        web.addJavascriptInterface(new BackupBridge(),"SaebomAndroid");
        if(state!=null&&state.containsKey("pendingBackup"))pendingBackup=state.getString("pendingBackup");
        web.loadUrl("https://"+ORIGIN+"/assets/www/index.html");
        if(Build.VERSION.SDK_INT>=33)getOnBackInvokedDispatcher().registerOnBackInvokedCallback(android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT,this::handleBack);
    }

    public final class BackupBridge {
        @JavascriptInterface public void saveBackup(String json,String filename){
            if(json==null||json.length()>8_000_000)return;
            final boolean csv=filename!=null&&filename.endsWith(".csv");
            if(!csv){try{new JSONObject(json);}catch(Exception e){return;}}
            runOnUiThread(()->{
                if(pendingBackup!=null){Toast.makeText(MainActivity.this,"진행 중인 저장을 먼저 마쳐주세요.",Toast.LENGTH_SHORT).show();return;}
                pendingBackup=json;
                Intent intent=new Intent(Intent.ACTION_CREATE_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType(csv?"text/csv":"application/json");
                String safe=filename==null?"새봄-백업.json":filename.replaceAll("[\\\\/:*?\"<>|]","_");
                intent.putExtra(Intent.EXTRA_TITLE,safe.substring(0,Math.min(100,safe.length())));
                try{startActivityForResult(intent,EXPORT_FILE);}catch(Exception e){pendingBackup=null;Toast.makeText(MainActivity.this,"파일 저장창을 열지 못했어요.",Toast.LENGTH_LONG).show();}
            });
        }
    }

    @Override protected void onActivityResult(int request,int result,Intent data){
        super.onActivityResult(request,result,data);
        if(request==IMPORT_FILE){
            if(fileCallback!=null)fileCallback.onReceiveValue(result==RESULT_OK&&data!=null&&data.getData()!=null?new Uri[]{data.getData()}:null);
            fileCallback=null;
        }else if(request==EXPORT_FILE){
            if(result==RESULT_OK&&data!=null&&data.getData()!=null&&pendingBackup!=null){
                try(OutputStream out=getContentResolver().openOutputStream(data.getData(),"wt")){
                    if(out==null)throw new IllegalStateException("No output stream");
                    out.write(pendingBackup.getBytes(StandardCharsets.UTF_8));
                    Toast.makeText(this,"백업 파일을 저장했어요.",Toast.LENGTH_SHORT).show();
                }catch(Exception e){Toast.makeText(this,"저장하지 못했어요. 다시 시도해주세요.",Toast.LENGTH_LONG).show();}
            }
            pendingBackup=null;
        }
    }
    // API 33+ gestures use the OnBackInvokedCallback registered in onCreate.
    // This override is only the legacy button/gesture fallback for API 26-32.
    @Override @android.annotation.SuppressLint("GestureBackNavigation")
    public void onBackPressed(){
        handleBack();
    }
    private void handleBack(){
        web.evaluateJavascript("(()=>{const d=document.querySelector('dialog[open]');if(d){const b=d.querySelector('[data-action=close]');if(b)b.click();else d.close();return true}return false})()",value->{
            if(!"true".equals(value)){
                if(web.canGoBack())web.goBack();
                else new android.app.AlertDialog.Builder(this).setMessage("새봄을 잠시 닫을까요?").setNegativeButton("계속하기",null).setPositiveButton("닫기",(d,w)->finish()).show();
            }
        });
    }
    @Override protected void onSaveInstanceState(Bundle out){
        super.onSaveInstanceState(out);
        if(pendingBackup!=null&&pendingBackup.length()<200_000)out.putString("pendingBackup",pendingBackup);
    }
    @Override protected void onPause(){super.onPause();web.onPause();web.pauseTimers();}
    @Override protected void onResume(){super.onResume();if(web!=null){web.onResume();web.resumeTimers();web.evaluateJavascript("window.dispatchEvent(new Event('saebomresume'))",null);}}
    @Override protected void onDestroy(){if(fileCallback!=null)fileCallback.onReceiveValue(null);web.removeJavascriptInterface("SaebomAndroid");web.destroy();super.onDestroy();}
}
