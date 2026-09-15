package com.example

import android.annotation.SuppressLint
import android.graphics.Color as AndroidColor
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.RenderProcessGoneDetail
import android.webkit.ServiceWorkerClient
import android.webkit.ServiceWorkerController
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.view.WindowCompat
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {

  companion object {
    init {
      try {
        android.system.Os.setenv("MESA_LOG_FILE", "/dev/null", true)
        android.system.Os.setenv("LIBGL_ALWAYS_SOFTWARE", "1", true)
      } catch (_: Throwable) {}
    }
  }

  private var webView: WebView? = null

  @SuppressLint("SetJavaScriptEnabled")
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()

    try {
      val insetsController = WindowCompat.getInsetsController(window, window.decorView)
      insetsController.isAppearanceLightStatusBars = false
      insetsController.isAppearanceLightNavigationBars = false
    } catch (_: Throwable) {}

    try {
      // Clear legacy webview disk cache on startup to avoid loading stale HTML shells
      cacheDir.deleteRecursively()
    } catch (_: Throwable) {}

    val assetsHandler = WebViewAssetLoader.AssetsPathHandler(this)
    val safePathHandler = WebViewAssetLoader.PathHandler { path ->
      val resolvedPath = if (path.isBlank() || path == "/") "index.html" else path.trimStart('/')
      try {
        assetsHandler.handle(resolvedPath)
      } catch (e: Exception) {
        null
      }
    }

    val assetLoader = WebViewAssetLoader.Builder()
      .setDomain("appassets.androidplatform.net")
      .addPathHandler("/assets/", safePathHandler)
      .build()

    fun handleIntercept(url: Uri): WebResourceResponse? {
      val normalizedUri = normalizeAssetUri(url)
      return assetLoader.shouldInterceptRequest(normalizedUri)
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
      try {
        val swController = ServiceWorkerController.getInstance()
        swController.setServiceWorkerClient(object : ServiceWorkerClient() {
          override fun shouldInterceptRequest(request: WebResourceRequest): WebResourceResponse? {
            return handleIntercept(request.url)
          }
        })
      } catch (e: Exception) {
        // Fallback for custom ROMs or test environments
      }
    }

    onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
      override fun handleOnBackPressed() {
        val wv = webView
        if (wv != null) {
          wv.evaluateJavascript("(function(){ try { if (typeof window.handleAndroidBack === 'function') { return window.handleAndroidBack(); } } catch(e){} return false; })()") { result ->
            val handled = result == "true" || result == "\"true\""
            if (!handled) {
              if (wv.canGoBack()) {
                wv.goBack()
              } else {
                isEnabled = false
                onBackPressedDispatcher.onBackPressed()
              }
            }
          }
        } else {
          isEnabled = false
          onBackPressedDispatcher.onBackPressed()
        }
      }
    })

    setContent {
      MyApplicationTheme {
        Box(
          modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF090E15))
            .statusBarsPadding()
            .navigationBarsPadding()
        ) {
          QuranWebView(
            onRequestIntercept = { handleIntercept(it) },
            onWebViewCreated = { webView = it }
          )
        }
      }
    }
  }

  private fun normalizeAssetUri(uri: Uri): Uri {
    val path = uri.path ?: return uri
    return if (path == "/assets" || path == "/assets/") {
      uri.buildUpon().path("/assets/index.html").build()
    } else {
      uri
    }
  }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun QuranWebView(
  onRequestIntercept: (Uri) -> WebResourceResponse?,
  onWebViewCreated: (WebView) -> Unit,
  modifier: Modifier = Modifier
) {
  AndroidView(
    modifier = modifier
      .fillMaxSize()
      .imePadding(),
    factory = { context ->
      WebView(context).apply {
        setBackgroundColor(AndroidColor.parseColor("#090E15"))
        settings.apply {
          javaScriptEnabled = true
          domStorageEnabled = true
          allowFileAccess = true
          allowContentAccess = true
          mediaPlaybackRequiresUserGesture = false
          cacheMode = WebSettings.LOAD_NO_CACHE
          useWideViewPort = true
          loadWithOverviewMode = true
          mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        webChromeClient = object : WebChromeClient() {
          override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
            consoleMessage?.let {
              Log.d("QuranWebView", "${it.message()} [${it.sourceId()}:${it.lineNumber()}]")
            }
            return true
          }
        }

        webViewClient = object : WebViewClientCompat() {
          override fun shouldInterceptRequest(
            view: WebView,
            request: WebResourceRequest
          ): WebResourceResponse? {
            return onRequestIntercept(request.url)
          }

          override fun onRenderProcessGone(
            view: WebView,
            detail: RenderProcessGoneDetail
          ): Boolean {
            Log.w("QuranWebView", "Render process gone (didCrash: ${detail.didCrash()})")
            view.post {
              view.loadUrl("https://appassets.androidplatform.net/assets/index.html")
            }
            return true
          }
        }

        clearCache(true)
        loadUrl("https://appassets.androidplatform.net/assets/index.html")
        onWebViewCreated(this)
      }
    }
  )
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
  Text(text = "Hello $name!", modifier = modifier)
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
  MyApplicationTheme { Greeting("Android") }
}

