# Quran Explorer — Complete Version History & Release Notes

## Version 2.5 (Current Release — Build 16)
**Release Focus:** Reading Comfort Mode, Fine Visual Polish & Release Archive

### ✨ What's New
* **Reading Comfort Mode (Warm Sepia)**:
  * Brand-new eye-protection sepia mode specifically tuned for the Quran Reading section.
  * Reduces harsh blue-light emission and softens background contrast for comfortable prolonged recitation at night and low-light environments.
  * Applies warm parchment background tones, calibrated high-contrast typography, and gold-trimmed card borders.
* **Instant Toggle Access**:
  * Added "Reading Comfort" switch directly in the **Quick Settings** top-bar dropdown.
  * Added direct "Comfort Mode" button in the Read Quran card header for one-tap switching while reading.
  * Preferences are automatically saved in local storage across app restarts.
* **In-App Releases & Version Archive**:
  * New dedicated "Releases & Notes" screen in the sidebar navigation drawer.
  * Complete changelog and release history viewable directly inside the app, with one-tap copy functionality for GitHub release publishing.
* **Fine Details & Visual Polish**:
  * Polished button touch targets and active glow rings.
  * Added version watermark in sidebar footer (`v2.5 • Build 16`).
  * Enhanced visual indicators for active reading modes.

---

## Version 2.4 (Build 15)
**Release Focus:** Ultra-Smooth 120 FPS Rendering & Deep Performance Optimization

### ⚡ Performance & Rendering
* **Eliminated Backdrop Filter Stalls**:
  * Replaced CPU-heavy 14px Gaussian blur convolutions (`backdrop-filter`) on fixed top header and bottom audio playback bars with hardware-accelerated solid composites (`transform: translateZ(0)`).
  * Completely eliminated scroll stutter and frame drops during fast touch gestures.
* **Off-Screen Layout Virtualization (`content-visibility: auto`)**:
  * Introduced native Chromium rendering containment on `.verse-container`, `.surah-card`, and `.word-item`.
  * Off-screen verses in massive chapters (e.g., *Surah Al-Baqarah* with 286 verses) are skipped during initial layout calculation, cutting surah load times from ~800ms to under 30ms.
* **Scroll & Animation Pipeline**:
  * Scroll event listeners debounced using `requestAnimationFrame` and marked `{ passive: true }` to liberate the main UI compositor thread.
  * Replaced layout-triggering smooth page scrolling with instantaneous section switching (`window.scrollTo(0, 0)`).
* **Native WebView Acceleration**:
  * Enabled standard asset caching (`LOAD_DEFAULT`) to eliminate cold asset recompilation.
  * Disabled stretch overscroll jitter (`OVER_SCROLL_NEVER`) and hardware scrollbar rendering overhead.

---

## Version 2.2 & 2.3 (Builds 13–14)
**Release Focus:** Full Quran (114 Surahs) Offline Downloader & Responsive Orientation

### 📱 Responsive Design & Architecture
* **Full Quran (114 Surahs) Download Manager**:
  * Added batch downloader capable of saving the complete Quran (all 114 Surahs) for any selected reciter.
  * Live percentage, downloaded count badge, and cancellation safeguards.
  * IndexedDB and CacheStorage quota status monitoring.
* **Orientation & Adaptive Landscape Layout**:
  * Support for portrait, landscape, tablets, and split-screen multitasking.
  * Sidebar drawer and quick settings automatically scale to fit viewport constraints.
  * Dynamic `safe-area-inset` padding for modern display cutouts and navigation bars.
* **History Stack Navigation**:
  * Added functional "Back" button in the top bar to retrace visited app sections without losing state.

---

## Version 2.1 (Build 12)
**Release Focus:** Studio-Grade Multi-Reciter Engine & Quick Settings Dropdown

### 🎙️ Audio & Customization
* **Studio-Grade Recitation Modal**:
  * Bottom-sheet dialog with live offline status badges ("Downloaded to Device" vs "Online Recitation").
  * Multi-Qari audio switching between 5 world-renowned reciters:
    1. Sheikh Mishary Rashid Alafasy
    2. Sheikh Abdul Basit Abdul Samad
    3. Sheikh Mahmoud Khalil Al-Husary
    4. Sheikh Saad Al-Ghamdi
    5. Sheikh Abu Bakr Al-Shatri
* **Quick Settings Dropdown**:
  * Added top-bar cog menu for instant adjustments to script (Uthmani, IndoPak, Imla'i), reciters, and translations without leaving the page.
* **Audio Loop & Ayah Repeat**:
  * Instant ayah repeat mode for memorization (Hifz) practice.

---

## Version 2.0 (Builds 9–11)
**Release Focus:** Interactive Word-by-Word Analysis & Dynamic Tajweed Rules

### 📖 Quranic Study Features
* **Word-by-Word Analysis**:
  * Word-level grammatical breakdown with transliteration and direct translations.
  * Root word display and interactive audio playback for individual words.
* **Dynamic Tajweed Engine**:
  * Real-time color-coding for essential Quranic recitation rules:
    * Ghunnah (Nasal sound)
    * Ikhfa (Nasal concealment)
    * Idgham (Assimilation)
    * Qalqalah (Echo/Bouncing)
    * Madd (Vowel elongation)
  * Basic and Advanced Tajweed modes with dedicated visual reference guide.
* **Tafsir Viewer**:
  * Detailed commentary and verse explanations (Ibn Kathir & Tafsir Jalalayn).
* **Reading Streaks & Dashboard**:
  * Track daily reading habits, streak counters, and weekly completion metrics.

---

## Version 1.5 (Builds 5–8)
**Release Focus:** Juz Navigation, Prayer Time Calculations & Bookmarking

### 🧭 Navigation & Daily Practice
* **30 Juz / Hizb / Rub Navigator**:
  * Complete breakdown of the 30 Juz with verse starting ranges and quick links.
* **Qatar Prayer Times & Solar Calculator**:
  * Astronomical solar calculations for Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha.
  * Next prayer countdown and interactive prayer log.
* **Expanded Translations**:
  * Added Bengali (Muhiuddin Khan & Zakaria), Urdu (Ahmed Ali), and French (Hamidullah).
* **Favorites & Bookmarks**:
  * Save favorite verses with custom notes directly to device storage.

---

## Version 1.0 (Builds 1–4)
**Release Focus:** Initial Foundation & Complete Offline Quran Engine

### 🏛️ Core Platform
* **114 Surahs Text Engine**:
  * Full Arabic text with standard Uthmani script.
  * Surah metadata (Meccan / Medinan, verse count, revelation order).
* **Audio Streaming & Service Worker Cache**:
  * High-quality MP3 verse recitations by Sheikh Mishary Rashid Alafasy.
  * Audio player bar with play, pause, progress scrubbing, and next/previous controls.
* **M3 Dark & Light Theming**:
  * High-contrast OLED dark theme with emerald and warm Islamic gold accents.
  * Seamless one-tap theme toggle.
* **Native Android WebView Shell**:
  * Single-activity Jetpack Compose container with hardware rendering.
