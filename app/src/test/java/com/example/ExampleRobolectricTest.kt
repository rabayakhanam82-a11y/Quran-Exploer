package com.example

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [36])
class ExampleRobolectricTest {

  @Test
  fun `read string from context`() {
    val context = ApplicationProvider.getApplicationContext<Context>()
    val appName = context.getString(R.string.app_name)
    assertEquals("Quran Explorer", appName)
  }

  @Test
  fun `verify asset loader intercepts files`() {
    val context = ApplicationProvider.getApplicationContext<Context>()
    val assetsHandler = androidx.webkit.WebViewAssetLoader.AssetsPathHandler(context)
    val safePathHandler = androidx.webkit.WebViewAssetLoader.PathHandler { path ->
      val resolvedPath = if (path.isBlank() || path == "/") "index.html" else path.trimStart('/')
      try {
        assetsHandler.handle(resolvedPath)
      } catch (e: Exception) {
        null
      }
    }
    val assetLoader = androidx.webkit.WebViewAssetLoader.Builder()
      .setDomain("appassets.androidplatform.net")
      .addPathHandler("/assets/", safePathHandler)
      .build()

    val indexResponse = assetLoader.shouldInterceptRequest(android.net.Uri.parse("https://appassets.androidplatform.net/assets/index.html"))
    org.junit.Assert.assertNotNull("index.html must be intercepted", indexResponse)

    val queryResponse = assetLoader.shouldInterceptRequest(android.net.Uri.parse("https://appassets.androidplatform.net/assets/index.html?v=1.6"))
    org.junit.Assert.assertNotNull("index.html?v=1.6 must be intercepted", queryResponse)

    val jsResponse = assetLoader.shouldInterceptRequest(android.net.Uri.parse("https://appassets.androidplatform.net/assets/quran-data.js"))
    org.junit.Assert.assertNotNull("quran-data.js must be intercepted", jsResponse)

    val audioJsResponse = assetLoader.shouldInterceptRequest(android.net.Uri.parse("https://appassets.androidplatform.net/assets/quran-audio-downloads.js"))
    org.junit.Assert.assertNotNull("quran-audio-downloads.js must be intercepted", audioJsResponse)
  }
}
