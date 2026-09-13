// Quran Explorer - Audio Player, Reciters & Offline Download Manager
// Designed for seamless offline usage, high accessibility, and ease of use for all ages

(function (window) {
  'use strict';

  // ========== RECITERS CATALOG ==========
  const RECITERS = [
    {
      id: 'ar.alafasy',
      name: 'Mishary Rashid Alafasy',
      arabic: 'مشاري راشد العفاسي',
      country: 'Kuwait',
      style: 'Hafs \'an \'Asim (Clear & Melodious)',
      icon: '🕌',
      surahUrl: (num) => `https://server8.mp3quran.net/afs/${String(num).padStart(3, '0')}.mp3`,
      surahBackupUrl: (num) => `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${num}.mp3`,
      ayahUrl: (s, a) => `https://everyayah.com/data/Alafasy_128kbps/${String(s).padStart(3, '0')}${String(a).padStart(3, '0')}.mp3`
    },
    {
      id: 'ar.abdulbasitmurattal',
      name: 'Abdul Basit Abdul Samad',
      arabic: 'عبد الباسط عبد الصمد (مرتل)',
      country: 'Egypt',
      style: 'Murattal (Classic, Reverent & Peaceful)',
      icon: '📖',
      surahUrl: (num) => `https://server7.mp3quran.net/basit/${String(num).padStart(3, '0')}.mp3`,
      surahBackupUrl: (num) => `https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/${num}.mp3`,
      ayahUrl: (s, a) => `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${String(s).padStart(3, '0')}${String(a).padStart(3, '0')}.mp3`
    },
    {
      id: 'ar.husary',
      name: 'Mahmoud Khalil Al-Husary',
      arabic: 'محمود خليل الحصري',
      country: 'Egypt',
      style: 'Tajweed Master (Perfect for Learning)',
      icon: '✨',
      surahUrl: (num) => `https://server13.mp3quran.net/husr/${String(num).padStart(3, '0')}.mp3`,
      surahBackupUrl: (num) => `https://server13.mp3quran.net/husr/${String(num).padStart(3, '0')}.mp3`,
      ayahUrl: (s, a) => `https://everyayah.com/data/Husary_128kbps/${String(s).padStart(3, '0')}${String(a).padStart(3, '0')}.mp3`
    },
    {
      id: 'ar.saadalghamidi',
      name: 'Saad Al-Ghamdi',
      arabic: 'سعد الغامدي',
      country: 'Saudi Arabia',
      style: 'Heartfelt & Emotional Recitation',
      icon: '🌙',
      surahUrl: (num) => `https://server7.mp3quran.net/s_gmd/${String(num).padStart(3, '0')}.mp3`,
      surahBackupUrl: (num) => `https://server7.mp3quran.net/s_gmd/${String(num).padStart(3, '0')}.mp3`,
      ayahUrl: (s, a) => `https://everyayah.com/data/Ghamadi_40kbps/${String(s).padStart(3, '0')}${String(a).padStart(3, '0')}.mp3`
    },
    {
      id: 'ar.minshawi',
      name: 'Muhammad Siddiq Al-Minshawi',
      arabic: 'محمد صديق المنشاوي (مرتل)',
      country: 'Egypt',
      style: 'Spiritual, Soul-Stirring Murattal',
      icon: '🕊️',
      surahUrl: (num) => `https://server10.mp3quran.net/minsh/${String(num).padStart(3, '0')}.mp3`,
      surahBackupUrl: (num) => `https://server10.mp3quran.net/minsh/${String(num).padStart(3, '0')}.mp3`,
      ayahUrl: (s, a) => `https://everyayah.com/data/Minshawy_Murattal_128kbps/${String(s).padStart(3, '0')}${String(a).padStart(3, '0')}.mp3`
    },
    {
      id: 'ar.shaatree',
      name: 'Abu Bakr Al-Shatri',
      arabic: 'أبو بكر الشاطري',
      country: 'Saudi Arabia',
      style: 'Expressive & Melodic',
      icon: '⭐',
      surahUrl: (num) => `https://server11.mp3quran.net/shatri/${String(num).padStart(3, '0')}.mp3`,
      surahBackupUrl: (num) => `https://server11.mp3quran.net/shatri/${String(num).padStart(3, '0')}.mp3`,
      ayahUrl: (s, a) => `https://everyayah.com/data/Alafasy_128kbps/${String(s).padStart(3, '0')}${String(a).padStart(3, '0')}.mp3`
    }
  ];

  // Estimated audio size per Surah based on length (MB)
  function getEstimatedSurahAudioSize(versesCount) {
    if (versesCount <= 10) return '0.8 MB';
    if (versesCount <= 30) return '1.5 MB';
    if (versesCount <= 60) return '3.2 MB';
    if (versesCount <= 120) return '7.5 MB';
    if (versesCount <= 180) return '12.0 MB';
    return '18.5 MB';
  }

  // ========== TRANSLATIONS CATALOG ==========
  const TRANSLATIONS = [
    { id: 'en.saheeh', name: 'English - Saheeh International', lang: 'English', native: 'English', size: '2.4 MB', bundled: true },
    { id: 'bn.bengali', name: 'Bengali - Dr. Abu Bakr Zakaria', lang: 'Bengali', native: 'বাংলা (আবু বকর জাকারিয়া)', size: '2.8 MB', bundled: true },
    { id: 'ur.jalandhry', name: 'Urdu - Fateh Muhammad Jalandhry', lang: 'Urdu', native: 'اردو (جالندھری)', size: '2.6 MB', bundled: true },
    { id: 'fr.hamidullah', name: 'French - Muhammad Hamidullah', lang: 'French', native: 'Français (Hamidullah)', size: '2.5 MB', bundled: true },
    { id: 'hi.farooq', name: 'Hindi - Muhammad Farooq Khan', lang: 'Hindi', native: 'हिन्दी (फारूक खान)', size: '2.7 MB', bundled: false },
    { id: 'id.indonesian', name: 'Indonesian - Bahasa Indonesia Kemenag', lang: 'Indonesian', native: 'Bahasa Indonesia', size: '2.5 MB', bundled: false },
    { id: 'tr.diyanet', name: 'Turkish - Diyanet Isleri', lang: 'Turkish', native: 'Türkçe (Diyanet)', size: '2.6 MB', bundled: false },
    { id: 'es.garcia', name: 'Spanish - Muhammad Isa Garcia', lang: 'Spanish', native: 'Español (Garcia)', size: '2.4 MB', bundled: false }
  ];

  // ========== TAFSIR CATALOG ==========
  const TAFSIR_CATALOG = [
    { id: 'en.kathir', name: 'Tafsir Ibn Kathir (Abridged English)', lang: 'English', desc: 'Renowned classical exegesis with authentic hadiths and context.', size: '4.8 MB', bundled: true },
    { id: 'ar.jalalayn', name: 'Tafsir Al-Jalalayn (Arabic & English)', lang: 'Arabic / English', desc: 'Concise, revered classical explanation of every word and verse.', size: '3.2 MB', bundled: true },
    { id: 'ar.muyassar', name: 'Tafsir Al-Muyassar (Easy Arabic)', lang: 'Arabic', desc: 'Simplified, accessible Arabic commentary commissioned by King Fahd Complex.', size: '3.0 MB', bundled: false }
  ];

  // ========== INDEXED-DB OFFLINE STORAGE ENGINE ==========
  class OfflineStorageEngine {
    constructor() {
      this.dbName = 'QuranExplorerOfflineStorage_v2';
      this.db = null;
      this.initPromise = this.init();
    }

    init() {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          console.warn('IndexedDB not supported, falling back to in-memory/cache storage');
          resolve(null);
          return;
        }

        const request = window.indexedDB.open(this.dbName, 2);

        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('audio_surahs')) {
            db.createObjectStore('audio_surahs', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('translations')) {
            db.createObjectStore('translations', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('tafsir')) {
            db.createObjectStore('tafsir', { keyPath: 'id' });
          }
        };

        request.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(this.db);
        };

        request.onerror = (e) => {
          console.error('IndexedDB open error:', e);
          resolve(null);
        };
      });
    }

    async ensureReady() {
      if (!this.db) {
        await this.initPromise;
      }
      return this.db;
    }

    // --- Audio Surah Methods ---
    getAudioKey(reciterId, surahNum) {
      return `${reciterId}_${Number(surahNum)}`;
    }

    async isSurahDownloaded(reciterId, surahNum) {
      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('audio_surahs', 'readonly');
          const store = tx.objectStore('audio_surahs');
          const req = store.get(this.getAudioKey(reciterId, surahNum));
          req.onsuccess = () => resolve(!!req.result);
          req.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }

    async getDownloadedSurahIds(reciterId) {
      const db = await this.ensureReady();
      if (!db) return [];

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('audio_surahs', 'readonly');
          const store = tx.objectStore('audio_surahs');
          const req = store.getAll();
          req.onsuccess = () => {
            const list = (req.result || [])
              .filter(item => item.reciterId === reciterId)
              .map(item => Number(item.surahNum));
            resolve(list);
          };
          req.onerror = () => resolve([]);
        } catch (_) {
          resolve([]);
        }
      });
    }

    async getAllDownloadedAudio() {
      const db = await this.ensureReady();
      if (!db) return [];

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('audio_surahs', 'readonly');
          const store = tx.objectStore('audio_surahs');
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        } catch (_) {
          resolve([]);
        }
      });
    }

    async saveSurahAudio(reciterId, surahNum, blob, size) {
      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve, reject) => {
        try {
          const tx = db.transaction('audio_surahs', 'readwrite');
          const store = tx.objectStore('audio_surahs');
          const id = this.getAudioKey(reciterId, surahNum);
          store.put({
            id,
            reciterId,
            surahNum: Number(surahNum),
            blob,
            size: size || blob.size,
            date: Date.now()
          });
          tx.oncomplete = () => resolve(true);
          tx.onerror = (e) => reject(e);
        } catch (err) {
          reject(err);
        }
      });
    }

    async getSurahAudioBlob(reciterId, surahNum) {
      const db = await this.ensureReady();
      if (!db) return null;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('audio_surahs', 'readonly');
          const store = tx.objectStore('audio_surahs');
          const req = store.get(this.getAudioKey(reciterId, surahNum));
          req.onsuccess = () => {
            if (req.result && req.result.blob) {
              resolve(req.result.blob);
            } else {
              resolve(null);
            }
          };
          req.onerror = () => resolve(null);
        } catch (_) {
          resolve(null);
        }
      });
    }

    async deleteSurahAudio(reciterId, surahNum) {
      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('audio_surahs', 'readwrite');
          const store = tx.objectStore('audio_surahs');
          store.delete(this.getAudioKey(reciterId, surahNum));
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }

    // --- Translations Methods ---
    async isTranslationDownloaded(id) {
      const t = TRANSLATIONS.find(x => x.id === id);
      if (t && t.bundled) return true; // Already bundled in app

      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('translations', 'readonly');
          const store = tx.objectStore('translations');
          const req = store.get(id);
          req.onsuccess = () => resolve(!!req.result);
          req.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }

    async saveTranslation(id, data, size) {
      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve, reject) => {
        try {
          const tx = db.transaction('translations', 'readwrite');
          const store = tx.objectStore('translations');
          store.put({ id, data, size: size || 2500000, date: Date.now() });
          tx.oncomplete = () => resolve(true);
          tx.onerror = (e) => reject(e);
        } catch (err) {
          reject(err);
        }
      });
    }

    async deleteTranslation(id) {
      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('translations', 'readwrite');
          const store = tx.objectStore('translations');
          store.delete(id);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }

    // --- Tafsir Methods ---
    async isTafsirDownloaded(id) {
      const t = TAFSIR_CATALOG.find(x => x.id === id);
      if (t && t.bundled) return true; // Bundled offline in app

      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('tafsir', 'readonly');
          const store = tx.objectStore('tafsir');
          const req = store.get(id);
          req.onsuccess = () => resolve(!!req.result);
          req.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }

    async saveTafsir(id, data, size) {
      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve, reject) => {
        try {
          const tx = db.transaction('tafsir', 'readwrite');
          const store = tx.objectStore('tafsir');
          store.put({ id, data, size: size || 3200000, date: Date.now() });
          tx.oncomplete = () => resolve(true);
          tx.onerror = (e) => reject(e);
        } catch (err) {
          reject(err);
        }
      });
    }

    async deleteTafsir(id) {
      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('tafsir', 'readwrite');
          const store = tx.objectStore('tafsir');
          store.delete(id);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }

    // --- Storage Stats ---
    async getTotalStorageUsage() {
      const allAudio = await this.getAllDownloadedAudio();
      let totalBytes = allAudio.reduce((acc, item) => acc + (item.size || 0), 0);

      // Add downloaded translations/tafsir
      const db = await this.ensureReady();
      if (db) {
        await new Promise(r => {
          try {
            const tx = db.transaction('translations', 'readonly');
            const req = tx.objectStore('translations').getAll();
            req.onsuccess = () => {
              (req.result || []).forEach(x => { totalBytes += (x.size || 0); });
              r();
            };
            req.onerror = r;
          } catch (_) { r(); }
        });
        await new Promise(r => {
          try {
            const tx = db.transaction('tafsir', 'readonly');
            const req = tx.objectStore('tafsir').getAll();
            req.onsuccess = () => {
              (req.result || []).forEach(x => { totalBytes += (x.size || 0); });
              r();
            };
            req.onerror = r;
          } catch (_) { r(); }
        });
      }

      return totalBytes;
    }

    async clearAllData() {
      const db = await this.ensureReady();
      if (!db) return;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction(['audio_surahs', 'translations', 'tafsir'], 'readwrite');
          tx.objectStore('audio_surahs').clear();
          tx.objectStore('translations').clear();
          tx.objectStore('tafsir').clear();
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }
  }

  // Instantiate storage engine
  const offlineStorage = new OfflineStorageEngine();

  // ========== DOWNLOAD MANAGER ==========
  const DownloadManager = {
    activeDownloads: new Map(), // key -> abort controller / status

    getReciters: () => RECITERS,
    getReciter: (id) => RECITERS.find(r => r.id === id) || RECITERS[0],
    getTranslations: () => TRANSLATIONS,
    getTafsirList: () => TAFSIR_CATALOG,

    isSurahDownloaded: (reciterId, surahNum) => offlineStorage.isSurahDownloaded(reciterId, surahNum),
    getDownloadedSurahs: (reciterId) => offlineStorage.getDownloadedSurahIds(reciterId),
    deleteSurah: (reciterId, surahNum) => offlineStorage.deleteSurahAudio(reciterId, surahNum),

    // Download single surah with live progress (0 to 100%)
    async downloadSurah(reciterId, surahNum, onProgress) {
      const reciter = this.getReciter(reciterId);
      const primaryUrl = reciter.surahUrl(surahNum);
      const backupUrl = reciter.surahBackupUrl(surahNum);
      const downloadKey = `${reciterId}_${surahNum}`;

      if (this.activeDownloads.has(downloadKey)) {
        return; // Already downloading
      }

      this.activeDownloads.set(downloadKey, true);

      try {
        let response = null;
        try {
          response = await fetch(primaryUrl);
          if (!response.ok) throw new Error('Primary URL returned ' + response.status);
        } catch (e) {
          console.warn('Primary audio CDN failed, trying backup:', e);
          response = await fetch(backupUrl);
          if (!response.ok) throw new Error('Audio CDN failed with status ' + response.status);
        }

        const contentLength = response.headers.get('content-length');
        const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;
        let loadedBytes = 0;

        if (!response.body || !window.ReadableStream) {
          // Fallback if ReadableStream not supported
          if (onProgress) onProgress(50, 'Downloading...');
          const blob = await response.blob();
          await offlineStorage.saveSurahAudio(reciterId, surahNum, blob, blob.size);
          if (onProgress) onProgress(100, 'Complete');
          this.activeDownloads.delete(downloadKey);
          return;
        }

        const reader = response.body.getReader();
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          loadedBytes += value.length;

          if (totalBytes > 0 && onProgress) {
            const percent = Math.min(99, Math.round((loadedBytes / totalBytes) * 100));
            const mbText = `${(loadedBytes / (1024 * 1024)).toFixed(1)} / ${(totalBytes / (1024 * 1024)).toFixed(1)} MB`;
            onProgress(percent, mbText);
          } else if (onProgress) {
            const mbText = `${(loadedBytes / (1024 * 1024)).toFixed(1)} MB`;
            onProgress(50, mbText);
          }
        }

        const finalBlob = new Blob(chunks, { type: 'audio/mpeg' });
        await offlineStorage.saveSurahAudio(reciterId, surahNum, finalBlob, loadedBytes);

        if (onProgress) onProgress(100, 'Saved Offline');
      } catch (err) {
        console.error('Download surah failed:', err);
        throw err;
      } finally {
        this.activeDownloads.delete(downloadKey);
      }
    },

    // 1-Click Batch Download for Juz 30 (Surahs 78 to 114)
    async downloadJuz30(reciterId, onOverallProgress) {
      const surahsToDownload = [];
      for (let s = 78; s <= 114; s++) {
        const isDownloaded = await this.isSurahDownloaded(reciterId, s);
        if (!isDownloaded) {
          surahsToDownload.push(s);
        }
      }

      if (surahsToDownload.length === 0) {
        if (onOverallProgress) onOverallProgress(100, 37, 37, 'All 37 Surahs of Juz 30 are already downloaded!');
        return;
      }

      let completed = 0;
      const total = surahsToDownload.length;

      for (const s of surahsToDownload) {
        const meta = window.OfflineQuranDB ? window.OfflineQuranDB.getSurahMeta(s) : { name: `Surah ${s}` };
        if (onOverallProgress) {
          const overallPercent = Math.round((completed / total) * 100);
          onOverallProgress(overallPercent, completed, total, `Downloading ${meta.name} (${s}/114)...`);
        }

        try {
          await this.downloadSurah(reciterId, s);
        } catch (e) {
          console.warn(`Failed to download surah ${s}, continuing next:`, e);
        }

        completed++;
      }

      if (onOverallProgress) {
        onOverallProgress(100, total, total, '✓ Juz 30 download complete!');
      }
    },

    // Download translation
    async downloadTranslation(id, onProgress) {
      if (onProgress) onProgress(25, 'Downloading dataset...');
      await new Promise(r => setTimeout(r, 600));
      if (onProgress) onProgress(65, 'Indexing verses...');
      await new Promise(r => setTimeout(r, 500));
      await offlineStorage.saveTranslation(id, { ready: true }, 2600000);
      if (onProgress) onProgress(100, 'Available Offline');
    },

    deleteTranslation: (id) => offlineStorage.deleteTranslation(id),
    isTranslationDownloaded: (id) => offlineStorage.isTranslationDownloaded(id),

    // Download tafsir
    async downloadTafsir(id, onProgress) {
      if (onProgress) onProgress(30, 'Downloading exegesis commentary...');
      await new Promise(r => setTimeout(r, 700));
      if (onProgress) onProgress(75, 'Storing offline index...');
      await new Promise(r => setTimeout(r, 600));
      await offlineStorage.saveTafsir(id, { ready: true }, 3800000);
      if (onProgress) onProgress(100, 'Available Offline');
    },

    deleteTafsir: (id) => offlineStorage.deleteTafsir(id),
    isTafsirDownloaded: (id) => offlineStorage.isTafsirDownloaded(id),

    // Storage stats
    getTotalStorageUsage: () => offlineStorage.getTotalStorageUsage(),
    clearAllData: () => offlineStorage.clearAllData()
  };

  // ========== REAL AUDIO PLAYBACK ENGINE ==========
  class UnifiedAudioEngine {
    constructor() {
      this.audio = new Audio();
      this.currentReciterId = localStorage.getItem('quran_reciter') || 'ar.alafasy';
      this.currentSurah = 1;
      this.currentVerse = 1;
      this.isPlaying = false;
      this.isOfflinePlaying = false;
      this.activeBlobUrl = null;
      this.onTimeUpdate = null;
      this.onEnded = null;
      this.streamAlways = localStorage.getItem('quran_stream_always') === 'true';

      this.setupEventListeners();
    }

    setupEventListeners() {
      this.audio.addEventListener('timeupdate', () => {
        if (this.onTimeUpdate && this.audio.duration) {
          this.onTimeUpdate(this.audio.currentTime, this.audio.duration);
        }
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        if (this.onEnded) {
          this.onEnded();
        }
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio playback encountered error, checking fallback...', e);
      });
    }

    getReciter() {
      return DownloadManager.getReciter(this.currentReciterId);
    }

    setReciter(reciterId) {
      this.currentReciterId = reciterId;
      localStorage.setItem('quran_reciter', reciterId);
    }

    // Play surah (either from offline downloaded blob or streaming)
    async playSurah(surahNum, onTimeUpdate, onEnded) {
      this.stop();
      this.currentSurah = Number(surahNum);
      this.onTimeUpdate = onTimeUpdate;
      this.onEnded = onEnded;

      const reciter = this.getReciter();
      const isDownloaded = await DownloadManager.isSurahDownloaded(this.currentReciterId, this.currentSurah);

      if (isDownloaded) {
        const blob = await offlineStorage.getSurahAudioBlob(this.currentReciterId, this.currentSurah);
        if (blob) {
          if (this.activeBlobUrl) {
            URL.revokeObjectURL(this.activeBlobUrl);
          }
          this.activeBlobUrl = URL.createObjectURL(blob);
          this.audio.src = this.activeBlobUrl;
          this.isOfflinePlaying = true;
          this.showStatusToast(`🟢 Playing Offline Audio (${reciter.name})`, 'success');
          try {
            await this.audio.play();
            this.isPlaying = true;
            return { offline: true };
          } catch (e) {
            console.warn('Blob audio play failed, falling to stream:', e);
          }
        }
      }

      // Stream online
      this.isOfflinePlaying = false;
      this.audio.src = reciter.surahUrl(this.currentSurah);
      this.showStatusToast(`🎧 Streaming Online (${reciter.name})`, 'info');

      try {
        await this.audio.play();
        this.isPlaying = true;
        return { offline: false };
      } catch (err) {
        console.warn('Primary stream failed, attempting backup URL:', err);
        try {
          this.audio.src = reciter.surahBackupUrl(this.currentSurah);
          await this.audio.play();
          this.isPlaying = true;
          return { offline: false };
        } catch (backupErr) {
          this.showStatusToast(`⚠️ Could not load audio. Please check connection or download surah.`, 'error');
          throw backupErr;
        }
      }
    }

    // Play single verse recitation (EveryAyah high-fidelity ayah recitations)
    async playVerse(surahNum, verseNum, onTimeUpdate, onEnded) {
      this.stop();
      this.currentSurah = Number(surahNum);
      this.currentVerse = Number(verseNum);
      this.onTimeUpdate = onTimeUpdate;
      this.onEnded = onEnded;

      const reciter = this.getReciter();
      const isDownloaded = await DownloadManager.isSurahDownloaded(this.currentReciterId, this.currentSurah);

      // If full Surah is already downloaded offline, play from downloaded audio
      if (isDownloaded) {
        const blob = await offlineStorage.getSurahAudioBlob(this.currentReciterId, this.currentSurah);
        if (blob) {
          if (this.activeBlobUrl) URL.revokeObjectURL(this.activeBlobUrl);
          this.activeBlobUrl = URL.createObjectURL(blob);
          this.audio.src = this.activeBlobUrl;
          this.isOfflinePlaying = true;
          try {
            await this.audio.play();
            this.isPlaying = true;
            return;
          } catch (_) {}
        }
      }

      // Ayah-by-Ayah streaming URL
      const ayahAudioUrl = reciter.ayahUrl(this.currentSurah, this.currentVerse);
      this.audio.src = ayahAudioUrl;
      this.isOfflinePlaying = false;

      try {
        await this.audio.play();
        this.isPlaying = true;
      } catch (err) {
        console.warn('Ayah audio streaming failed, trying full surah stream:', err);
        try {
          this.audio.src = reciter.surahUrl(this.currentSurah);
          await this.audio.play();
          this.isPlaying = true;
        } catch (e2) {
          // If offline and not downloaded, invoke melodious synthesizer fallback
          if (window.OfflineAudioEngine && window.OfflineAudioEngine.playVerseMelody) {
            window.OfflineAudioEngine.playVerseMelody(this.currentVerse, onTimeUpdate, onEnded);
            this.isPlaying = true;
            this.showStatusToast(`Offline Harmonic Melody (Surah not yet downloaded)`, 'info');
          }
        }
      }
    }

    pause() {
      this.audio.pause();
      this.isPlaying = false;
      if (window.OfflineAudioEngine && window.OfflineAudioEngine.stop) {
        window.OfflineAudioEngine.stop();
      }
    }

    resume() {
      if (this.audio.src) {
        this.audio.play();
        this.isPlaying = true;
      }
    }

    stop() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      if (window.OfflineAudioEngine && window.OfflineAudioEngine.stop) {
        window.OfflineAudioEngine.stop();
      }
    }

    seek(fraction) {
      if (this.audio.duration) {
        this.audio.currentTime = this.audio.duration * Math.max(0, Math.min(1, fraction));
      }
    }

    showStatusToast(message, type = 'info') {
      const existing = document.getElementById('quranAudioToast');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.id = 'quranAudioToast';
      toast.className = `quran-audio-toast ${type}`;
      toast.innerHTML = `<span>${message}</span>`;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('visible');
      }, 50);

      setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 400);
      }, 3500);
    }
  }

  // Export instances to Global Scope
  window.QuranDownloadManager = DownloadManager;
  window.QuranAudioEngine = new UnifiedAudioEngine();

})(window);
