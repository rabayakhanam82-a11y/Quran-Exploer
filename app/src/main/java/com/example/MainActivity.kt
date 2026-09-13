package com.example

import android.annotation.SuppressLint
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.View
import android.webkit.ServiceWorkerClient
import android.webkit.ServiceWorkerController
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.viewinterop.AndroidView
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {

  private var webView: WebView? = null

  @SuppressLint("SetJavaScriptEnabled")
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()

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
        webView?.let { wv ->
          if (wv.canGoBack()) {
            wv.goBack()
          } else {
            isEnabled = false
            onBackPressedDispatcher.onBackPressed()
          }
        } ?: run {
          isEnabled = false
          onBackPressedDispatcher.onBackPressed()
        }
      }
    })

    setContent {
      MyApplicationTheme {
        QuranWebView(
          onRequestIntercept = { handleIntercept(it) },
          onWebViewCreated = { webView = it }
        )
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
      .statusBarsPadding()
      .imePadding(),
    factory = { context ->
      WebView(context).apply {
        settings.apply {
          javaScriptEnabled = true
          domStorageEnabled = true
          databaseEnabled = true
          allowFileAccess = true
          allowContentAccess = true
          mediaPlaybackRequiresUserGesture = false
          cacheMode = WebSettings.LOAD_DEFAULT
          useWideViewPort = true
          loadWithOverviewMode = true
          mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        // Fallback to software layer in emulator environments to prevent MESA rendernode failure
        val isEmulator = Build.FINGERPRINT.startsWith("generic") ||
          Build.FINGERPRINT.startsWith("unknown") ||
          Build.MODEL.contains("google_sdk") ||
          Build.MODEL.contains("Emulator") ||
          Build.MODEL.contains("Android SDK built for x86") ||
          Build.MANUFACTURER.contains("Genymotion") ||
          Build.HARDWARE.contains("goldfish") ||
          Build.HARDWARE.contains("ranchu") ||
          Build.PRODUCT.contains("sdk") ||
          Build.PRODUCT.contains("google_sdk")

        if (isEmulator) {
          setLayerType(View.LAYER_TYPE_SOFTWARE, null)
        }

        webViewClient = object : WebViewClientCompat() {
          override fun shouldInterceptRequest(
            view: WebView,
            request: WebResourceRequest
          ): WebResourceResponse? {
            return onRequestIntercept(request.url)
          }
        }

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

