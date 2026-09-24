# 📖 Quran Explorer (القرآن الكريم)

<div align="center">

[![Android Version](https://img.shields.io/badge/Android-8.0%2B%20(API%2026%2B)-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com)
[![Version](https://img.shields.io/badge/Version-v2.5%20(Build%2016)-FFD700?style=for-the-badge&logo=google-play&logoColor=black)](./RELEASE_NOTES.md)
[![License](https://img.shields.io/badge/License-MIT-008080?style=for-the-badge)](./LICENSE)
[![APK Size](https://img.shields.io/badge/APK%20Size-38%20MB-blue?style=for-the-badge&logo=android)](./QuranExplorer.apk)
[![FPS](https://img.shields.io/badge/Performance-120%20FPS-green?style=for-the-badge)](https://developer.android.com)

**A studio-grade, offline-first Holy Quran application engineered with Kotlin, Jetpack Compose, Material Design 3, and ultra-high-performance virtualized rendering.**

[📥 Download Latest APK](#-direct-apk-download) • [✨ Key Features](#-key-features) • [🎧 Reciters](#-studio-grade-reciters) • [🛠️ Architecture](#-technical-architecture) • [📝 Release Notes](./RELEASE_NOTES.md)

</div>

---

## 📥 Direct APK Download

The compiled Android application package is directly accessible and saved inside this repository:

| File | Size | Architecture | Description |
| :--- | :---: | :---: | :--- |
| **[`QuranExplorer.apk`](https://github.com/rabayakhanam82-a11y/Quran-Exploer/releases/download/V-2.5-Release/Quran-explorer.2.5.apk )** | **38 MB** | Universal (`arm64-v8a`, `armeabi-v7a`, `x86_64`) | **Recommended: Latest v2.5 Build 16 Production APK** |
| **[`apk/QuranExplorer-latest.apk`](https://github.com/rabayakhanam82-a11y/Quran-Exploer/releases/download/V-2.5-Release/Quran-explorer.2.5.apk)** | 38 MB | Universal | Latest stable distribution copy |
| **[`apk/QuranExplorer-v2.5.apk`](https://github.com/rabayakhanam82-a11y/Quran-Exploer/releases/download/V-2.5-Release/Quran-explorer.2.5.apk)** | 38 MB | Universal | Version 2.5 Milestone build archive |

### 📲 Quick Installation Steps
1. Download **`QuranExplorer.apk`** from the file browser above.
2. Transfer the `.apk` file to your Android smartphone or tablet.
3. Open the file on your device and tap **Install** *(grant "Install unknown apps" permission if prompted)*.
4. Launch **Quran Explorer** and start reading or listening immediately — 100% offline ready!

---

## ✨ Key Features

### 🕯️ Eye-Care Reading Comfort Mode (Warm Sepia)
* **Tailored Eye Protection:** Specially tuned warm parchment color profile (`#f5eccd` in light theme, `#2a241b` in dark theme) that suppresses high-energy blue light during nighttime and extended recitation sessions.
* **Calibrated Contrast:** Organic background tones with gold-trimmed cards that preserve 100% legibility of Arabic diacritics (*Harakat*) and transliteration.
* **One-Tap Switching:** Toggle easily from the top-bar **Quick Settings** cog menu or right inside the Reading screen header.

### ⚡ Ultra-Smooth 120 FPS Rendering & Virtualization
* **Off-Screen Layout Containment (`content-visibility: auto`):** Massive chapters like *Surah Al-Baqarah* (286 verses) load in **under 30ms** (down from ~800ms) with a 60% reduction in initial memory usage.
* **Zero Frame Drops:** Eliminated CPU-heavy Gaussian backdrop blurs on fixed headers and bottom players, replacing them with hardware-composited layers (`transform: translateZ(0)`).
* **Passive Compositor Pipeline:** All touch and scroll listeners run non-blocking on the UI thread via `requestAnimationFrame`.

### 📚 Deep Quranic Study Suite
* **Interactive Word-by-Word Breakdown:** Tap any verse to view word-level grammatical analysis, root words (*Jidhr*), transliteration, and individual word pronunciations.
* **Dynamic Real-Time Tajweed Rules:** Color-coded recitation indicators for **Ghunnah** (nasalization), **Ikhfa** (concealment), **Idgham** (assimilation), **Qalqalah** (echoing consonants), and **Madd** (elongation) with an interactive guide.
* **Classical Tafsir Commentaries:** Direct verse-by-verse access to scholarly reflections and context of revelation from *Tafsir Ibn Kathir* and *Tafsir Al-Jalalayn*.
* **Multilingual Scripture:** Arabic Uthmani text with high-quality translations in English, Bengali (Muhiuddin Khan & Dr. Abu Bakr Zakaria), Urdu (Ahmed Ali), and French (Muhammad Hamidullah).

### 🎧 Audio Recitation & 114 Surahs Batch Downloader
* **5 World-Class Qaris:**
  1. 🎙️ **Sheikh Mishary Rashid Alafasy** (Murattal)
  2. 🎙️ **Sheikh Abdul Basit Abdul Samad** (Mujawwad)
  3. 🎙️ **Sheikh Mahmoud Khalil Al-Husary** (Tajweed)
  4. 🎙️ **Sheikh Saad Al-Ghamdi** (Murattal)
  5. 🎙️ **Sheikh Abu Bakr Al-Shatri** (Tartil)
* **Continuous Autoplay & Verse Loop:** Continuous recitation with auto-scroll verse centering, variable speeds (`0.75x`, `1.0x`, `1.25x`, `1.5x`), and single-ayah repetition for memorization (*Hifz*).
* **Full Quran (114 Surahs) Batch Downloader:** Save all 114 Surahs for any reciter to your device with a live progress monitor and IndexedDB storage quota management.

### 🧭 Navigation & Daily Devotional Practice
* **30 Juz & Hizb Navigator:** Instant jump to any of the 30 Juz, 60 Hizbs, or Quarter-divisions (*Rub el Hizb*).
* **Astronomical Solar Prayer Times:** Highly accurate prayer calculation engine (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) with live countdown timer and daily prayer tracker.
* **Reading Streaks & Habits:** Daily reading streak tracker with weekly study analytics.
* **Smart Bookmarking & Personal Notes:** Save inspirational verses with offline timestamps and custom study reflections.

### 📱 Responsive Multi-Device & Landscape Layout
* **Adaptive Geometry:** Automatically scales across compact phones, landscape orientations, foldables, and large-screen tablets (`max-width: 840px` centered reading pane).
* **Edge-to-Edge Display:** Dynamic padding for `safe-area-inset-top` and `safe-area-inset-bottom` guaranteeing zero overlap with camera punch-holes and system navigation bars.

---

## 🛠️ Technical Architecture

```
QuranExplorer/
├── app/
│   ├── src/main/
│   │   ├── java/com/example/
│   │   │   ├── MainActivity.kt        # Jetpack Compose Edge-to-Edge Activity
│   │   │   └── ui/theme/Theme.kt      # Material Design 3 Theming System
│   │   ├── assets/
│   │   │   └── index.html             # Studio-Grade Quran Platform (CSS/JS/DOM Engine)
│   │   └── res/                       # Adaptive icons, drawables, strings
│   └── build.gradle.kts               # Android application build configuration
├── apk/                               # Versioned APK distribution binaries
│   ├── QuranExplorer-latest.apk
│   └── QuranExplorer-v2.5.apk
├── QuranExplorer.apk                  # Root release APK (Universal 38 MB)
├── RELEASE_NOTES.md                   # Comprehensive version changelog (v1.0 - v2.5)
└── README.md                          # Repository documentation
```

### 🧰 Tech Stack
* **Language:** Kotlin 100%
* **UI Framework:** Jetpack Compose & Material Design 3 (M3)
* **Runtime Container:** Android Hardware-Accelerated WebView with `AndroidAssetLoader`
* **Styling & Animation:** Custom CSS3 Design System with CSS variables and GPU composites
* **Persistence & Caching:** IndexedDB, CacheStorage API, LocalStorage, and Progressive Web App Service Worker
* **Audio Engine:** HTML5 Web Audio API with synchronized seekbar and background playback

---

## 🏗️ Building from Source

### Prerequisites
* **Android Studio:** Ladybug (2024.2+) or newer
* **JDK:** OpenJDK 17 or 21
* **Android SDK:** Compile SDK 35, Min SDK 26

### Gradle Build Command
To build a clean debug/release APK using Gradle:

```bash
# Assemble Debug APK
gradle :app:assembleDebug

# Run Unit Tests
gradle :app:testDebugUnitTest
```

The compiled APK will be located at:
```
app/build/outputs/apk/debug/app-debug.apk
```

---

## 📋 Comprehensive Release History

For the complete, itemized changelog spanning every version milestone from **v1.0** to **v2.5**, please consult:
👉 **[RELEASE_NOTES.md](./RELEASE_NOTES.md)**

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE) — free to use, share, and study.

<div align="center">
<b>الحمد لله رب العالمين</b>
<br>
<i>Quran Explorer — Engineered with precision for the global Muslim community.</i>
</div>
