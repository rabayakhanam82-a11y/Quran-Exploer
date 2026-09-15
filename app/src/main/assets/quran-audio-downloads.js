// Quran Explorer - Audio Player, Reciters Catalog & Offline Download Engine
// Production-grade implementation for offline storage and high-fidelity recitation streaming

(function (window) {
  'use strict';

  // ========== RECITERS CATALOG ==========
  const RECITERS = [
    {
      id: 'ar.alafasy',
      name: 'Mishary Rashid Alafasy',
      arabic: 'مشاري راشد العفاسي',
      country: 'Kuwait',
      style: "Hafs 'an 'Asim (Clear & Melodious)",
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
      surahUrl: (num) => `https://server11.mp3quran.net/shatri/${String(num).padStart(3, '0')}.mp3`,
      surahBackupUrl: (num) => `https://server11.mp3quran.net/shatri/${String(num).padStart(3, '0')}.mp3`,
      ayahUrl: (s, a) => `https://everyayah.com/data/Alafasy_128kbps/${String(s).padStart(3, '0')}${String(a).padStart(3, '0')}.mp3`
    }
  ];

  // Helper: Estimate Surah download size
  function getEstimatedSurahAudioSize(versesCount) {
    if (versesCount <= 10) return '0.8 MB';
    if (versesCount <= 30) return '1.5 MB';
    if (versesCount <= 60) return '3.2 MB';
    if (versesCount <= 120) return '7.5 MB';
    if (versesCount <= 180) return '12.0 MB';
    return '18.5 MB';
  }

  // ========== TRANSLATIONS & TAFSIR CATALOGS ==========
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
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('IndexedDB not supported');
          resolve(null);
          return;
        }

        const request = window.indexedDB.open(this.dbName, 3);

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
          if (!db.objectStoreNames.contains('wbw_audio')) {
            db.createObjectStore('wbw_audio', { keyPath: 'id' });
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

    // Alias for index.html compatibility
    async isSurahAudioDownloaded(reciterId, surahNum) {
      return this.isSurahDownloaded(reciterId, surahNum);
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

    // Alias for index.html compatibility
    async getDownloadedSurahsForReciter(reciterId) {
      return this.getDownloadedSurahIds(reciterId);
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

    getWordAudioKey(surahNum, verseNum, wordIndex) {
      return `${Number(surahNum)}_${Number(verseNum)}_${Number(wordIndex)}`;
    }

    async saveWordAudio(surahNum, verseNum, wordIndex, blob, size) {
      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve, reject) => {
        try {
          const tx = db.transaction('wbw_audio', 'readwrite');
          const store = tx.objectStore('wbw_audio');
          const id = this.getWordAudioKey(surahNum, verseNum, wordIndex);
          store.put({
            id,
            surahNum: Number(surahNum),
            verseNum: Number(verseNum),
            wordIndex: Number(wordIndex),
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

    async getWordAudioBlob(surahNum, verseNum, wordIndex) {
      const db = await this.ensureReady();
      if (!db) return null;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('wbw_audio', 'readonly');
          const store = tx.objectStore('wbw_audio');
          const req = store.get(this.getWordAudioKey(surahNum, verseNum, wordIndex));
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

    async isWordAudioDownloaded(surahNum, verseNum, wordIndex) {
      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('wbw_audio', 'readonly');
          const store = tx.objectStore('wbw_audio');
          const req = store.get(this.getWordAudioKey(surahNum, verseNum, wordIndex));
          req.onsuccess = () => resolve(!!req.result);
          req.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }

    async getAllDownloadedWordAudio() {
      const db = await this.ensureReady();
      if (!db) return [];

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('wbw_audio', 'readonly');
          const store = tx.objectStore('wbw_audio');
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        } catch (_) {
          resolve([]);
        }
      });
    }

    async clearAllWordAudio() {
      const db = await this.ensureReady();
      if (!db) return;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('wbw_audio', 'readwrite');
          tx.objectStore('wbw_audio').clear();
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
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

    async getTotalStorageUsage() {
      const allAudio = await this.getAllDownloadedAudio();
      return allAudio.reduce((acc, item) => acc + (item.size || 0), 0);
    }

    // Alias for index.html returning formatted string
    async calculateStorageUsage() {
      const bytes = await this.getTotalStorageUsage();
      if (!bytes || bytes === 0) return '0.0 MB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    async clearAllData() {
      const db = await this.ensureReady();
      if (!db) return;

      return new Promise((resolve) => {
        try {
          const stores = ['audio_surahs', 'translations', 'tafsir'];
          if (db.objectStoreNames.contains('wbw_audio')) stores.push('wbw_audio');
          const tx = db.transaction(stores, 'readwrite');
          stores.forEach(s => tx.objectStore(s).clear());
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }

    async clearReciterAudio(reciterId) {
      const db = await this.ensureReady();
      if (!db) return false;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('audio_surahs', 'readwrite');
          const store = tx.objectStore('audio_surahs');
          const req = store.getAll();
          req.onsuccess = () => {
            const list = req.result || [];
            list.forEach(item => {
              if (item.reciterId === reciterId) {
                store.delete(item.id);
              }
            });
            resolve(true);
          };
          req.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }

    async clearAllAudio() {
      const db = await this.ensureReady();
      if (!db) return;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction('audio_surahs', 'readwrite');
          tx.objectStore('audio_surahs').clear();
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }
  }

  const offlineStorage = new OfflineStorageEngine();

  // ========== DOWNLOAD MANAGER ==========
  const DownloadManager = {
    RECITERS: RECITERS,
    activeDownloads: new Map(),

    getReciters: () => RECITERS,
    getReciter: (id) => RECITERS.find(r => r.id === id) || RECITERS[0],
    getTranslations: () => TRANSLATIONS,
    getTafsirList: () => TAFSIR_CATALOG,
    getEstimatedSurahAudioSize: getEstimatedSurahAudioSize,

    isSurahDownloaded: (reciterId, surahNum) => offlineStorage.isSurahDownloaded(reciterId, surahNum),
    isSurahAudioDownloaded: (reciterId, surahNum) => offlineStorage.isSurahDownloaded(reciterId, surahNum),
    getDownloadedSurahs: (reciterId) => offlineStorage.getDownloadedSurahIds(reciterId),
    deleteSurah: (reciterId, surahNum) => offlineStorage.deleteSurahAudio(reciterId, surahNum),
    deleteSurahAudio: (reciterId, surahNum) => offlineStorage.deleteSurahAudio(reciterId, surahNum),
    getTotalStorageUsage: () => offlineStorage.getTotalStorageUsage(),
    calculateStorageUsage: () => offlineStorage.calculateStorageUsage(),
    clearAllData: () => offlineStorage.clearAllData(),
    clearAllAudio: () => offlineStorage.clearAllAudio(),

    // Core download method returning Promise
    async downloadSurah(reciterId, surahNum, onProgress) {
      const reciter = this.getReciter(reciterId);
      const primaryUrl = reciter.surahUrl(surahNum);
      const backupUrl = reciter.surahBackupUrl(surahNum);
      const downloadKey = `${reciterId}_${surahNum}`;

      if (this.activeDownloads.has(downloadKey)) {
        return;
      }

      this.activeDownloads.set(downloadKey, true);

      try {
        let response = null;
        try {
          response = await fetch(primaryUrl);
          if (!response.ok) throw new Error('Primary CDN status ' + response.status);
        } catch (e) {
          console.warn('Primary audio CDN failed, using backup:', e);
          response = await fetch(backupUrl);
          if (!response.ok) throw new Error('Backup CDN status ' + response.status);
        }

        const contentLength = response.headers.get('content-length');
        const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;
        let loadedBytes = 0;

        if (!response.body || !window.ReadableStream) {
          if (onProgress) onProgress(0, totalBytes, 50);
          const blob = await response.blob();
          await offlineStorage.saveSurahAudio(reciterId, surahNum, blob, blob.size);
          if (onProgress) onProgress(blob.size, blob.size, 100);
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

          if (onProgress) {
            const pct = totalBytes > 0 ? Math.min(99, Math.round((loadedBytes / totalBytes) * 100)) : 50;
            onProgress(loadedBytes, totalBytes, pct);
          }
        }

        const finalBlob = new Blob(chunks, { type: 'audio/mpeg' });
        await offlineStorage.saveSurahAudio(reciterId, surahNum, finalBlob, loadedBytes);

        if (onProgress) onProgress(loadedBytes, totalBytes || loadedBytes, 100);
      } catch (err) {
        console.error('Download surah failed:', err);
        throw err;
      } finally {
        this.activeDownloads.delete(downloadKey);
      }
    },

    // Callback-style method called by index.html: downloadSurahAudio(reciterId, surahNum, onProgress, onSuccess, onError)
    downloadSurahAudio(reciterId, surahNum, onProgress, onSuccess, onError) {
      this.downloadSurah(reciterId, surahNum, (loaded, total, percent) => {
        if (onProgress) onProgress(loaded, total, percent);
      }).then(() => {
        if (onSuccess) onSuccess();
      }).catch((err) => {
        if (onError) onError(err);
      });
    },

    // Batch download control state
    batchCancelled: false,
    isBatchRunning: false,

    cancelBatchDownload() {
      this.batchCancelled = true;
      this.isBatchRunning = false;
    },

    cancelBatch() {
      this.cancelBatchDownload();
    },

    // Batch download method called by index.html: batchDownloadSurahs(reciterId, surahList, onProgress, onComplete, onError, onCancelled)
    async batchDownloadSurahs(reciterId, surahList, onProgress, onComplete, onError, onCancelled) {
      this.batchCancelled = false;
      this.isBatchRunning = true;
      try {
        let completedCount = 0;
        const total = surahList.length;

        for (const surahNum of surahList) {
          if (this.batchCancelled) {
            this.isBatchRunning = false;
            if (onCancelled) onCancelled(completedCount, total);
            return;
          }

          const isDownloaded = await offlineStorage.isSurahDownloaded(reciterId, surahNum);
          if (isDownloaded) {
            completedCount++;
            if (onProgress) onProgress(completedCount, total, surahNum, 100);
            continue;
          }

          if (onProgress) onProgress(completedCount, total, surahNum, 0);
          try {
            await this.downloadSurah(reciterId, surahNum, (loaded, totalBytes, pct) => {
              if (onProgress) onProgress(completedCount, total, surahNum, pct);
            });
          } catch (e) {
            console.warn(`Failed surah ${surahNum}, skipping:`, e);
          }

          if (this.batchCancelled) {
            this.isBatchRunning = false;
            if (onCancelled) onCancelled(completedCount, total);
            return;
          }

          completedCount++;
          if (onProgress) onProgress(completedCount, total, surahNum, 100);
        }

        this.isBatchRunning = false;
        if (onComplete) onComplete();
      } catch (err) {
        this.isBatchRunning = false;
        if (onError) onError(err);
      }
    }
  };

  // ========== UNIFIED AUDIO PLAYBACK ENGINE ==========
  class UnifiedAudioEngine {
    constructor() {
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.currentReciterId = localStorage.getItem('quran_reciter') || 'ar.alafasy';
      this.currentSurah = 1;
      this.currentVerse = 1;
      this.isPlaying = false;
      this.isOffline = false;
      this.activeBlobUrl = null;
      this.onTimeUpdate = null;
      this.onEnded = null;

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

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
      });
    }

    getReciter() {
      return DownloadManager.getReciter(this.currentReciterId);
    }

    setReciter(reciterId) {
      this.currentReciterId = reciterId;
      localStorage.setItem('quran_reciter', reciterId);
    }

    // Supports both (surah, verse, reciterId, onTimeUpdate, onEnded, onError) and (surah, verse, onTimeUpdate, onEnded)
    async playVerse(surahNum, verseNum, arg3, arg4, arg5, arg6) {
      let reciterId = this.currentReciterId;
      let onTimeUpdate = null;
      let onEnded = null;
      let onError = null;

      if (typeof arg3 === 'string') {
        reciterId = arg3;
        onTimeUpdate = typeof arg4 === 'function' ? arg4 : null;
        onEnded = typeof arg5 === 'function' ? arg5 : null;
        onError = typeof arg6 === 'function' ? arg6 : null;
      } else if (typeof arg3 === 'function') {
        onTimeUpdate = arg3;
        onEnded = typeof arg4 === 'function' ? arg4 : null;
        onError = typeof arg5 === 'function' ? arg5 : null;
      }

      this.currentReciterId = reciterId;
      this.currentSurah = Number(surahNum);
      this.currentVerse = Number(verseNum);
      this.onTimeUpdate = onTimeUpdate;
      this.onEnded = onEnded;

      const reciter = DownloadManager.getReciter(reciterId);

      // Check if full surah is downloaded offline in IndexedDB
      const isDownloaded = await offlineStorage.isSurahDownloaded(reciterId, this.currentSurah);

      if (isDownloaded) {
        const blob = await offlineStorage.getSurahAudioBlob(reciterId, this.currentSurah);
        if (blob) {
          if (this.activeBlobUrl) URL.revokeObjectURL(this.activeBlobUrl);
          this.activeBlobUrl = URL.createObjectURL(blob);
          this.audio.src = this.activeBlobUrl;
          this.isOffline = true;
          try {
            await this.audio.play();
            this.isPlaying = true;
            return;
          } catch (e) {
            console.warn('Offline blob playback failed, falling back to stream:', e);
          }
        }
      }

      // Online stream: high-fidelity verse audio from EveryAyah
      this.isOffline = false;
      const ayahUrl = reciter.ayahUrl(this.currentSurah, this.currentVerse);
      this.audio.src = ayahUrl;

      try {
        await this.audio.play();
        this.isPlaying = true;
      } catch (err) {
        console.warn('Ayah stream failed, trying full surah stream URL:', err);
        try {
          this.audio.src = reciter.surahUrl(this.currentSurah);
          await this.audio.play();
          this.isPlaying = true;
        } catch (e2) {
          console.error('All audio sources failed:', e2);
          if (onError) onError(e2);
        }
      }
    }

    async playSurah(surahNum, reciterId, onTimeUpdate, onEnded, onError) {
      if (reciterId) this.currentReciterId = reciterId;
      this.currentSurah = Number(surahNum);
      this.onTimeUpdate = onTimeUpdate;
      this.onEnded = onEnded;

      const reciter = DownloadManager.getReciter(this.currentReciterId);
      const isDownloaded = await offlineStorage.isSurahDownloaded(this.currentReciterId, this.currentSurah);

      if (isDownloaded) {
        const blob = await offlineStorage.getSurahAudioBlob(this.currentReciterId, this.currentSurah);
        if (blob) {
          if (this.activeBlobUrl) URL.revokeObjectURL(this.activeBlobUrl);
          this.activeBlobUrl = URL.createObjectURL(blob);
          this.audio.src = this.activeBlobUrl;
          this.isOffline = true;
          try {
            await this.audio.play();
            this.isPlaying = true;
            return;
          } catch (e) {
            console.warn('Blob audio play failed:', e);
          }
        }
      }

      this.isOffline = false;
      this.audio.src = reciter.surahUrl(this.currentSurah);
      try {
        await this.audio.play();
        this.isPlaying = true;
      } catch (err) {
        try {
          this.audio.src = reciter.surahBackupUrl(this.currentSurah);
          await this.audio.play();
          this.isPlaying = true;
        } catch (e2) {
          if (onError) onError(e2);
        }
      }
    }

    pause() {
      this.audio.pause();
      this.isPlaying = false;
    }

    resume() {
      if (this.audio.src) {
        this.audio.play().then(() => {
          this.isPlaying = true;
        }).catch(err => console.warn('Resume error:', err));
      }
    }

    stop() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }

    seek(fraction) {
      if (this.audio.duration && !isNaN(this.audio.duration)) {
        this.audio.currentTime = this.audio.duration * Math.max(0, Math.min(1, fraction));
      }
    }

    setPlaybackRate(rate) {
      this.audio.playbackRate = rate;
    }
  }

  // ========== WORD-BY-WORD AUDIO ENGINE ==========
  class WordAudioEngine {
    constructor(storageEngine) {
      this.storage = storageEngine;
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.isPlaying = false;
      this.currentSurah = 1;
      this.currentVerse = 1;
      this.currentWordIdx = 0;
      this.playbackRate = 1.0;
      this.isSequencePlaying = false;
      this.sequenceTimeout = null;
      this.activeBlobUrl = null;
      this.activeElement = null;
      this.sequenceWordsCount = 0;
      this.sequenceCurrentIndex = 0;
      this.onStateChange = null;

      this.audio.addEventListener('ended', () => {
        this.clearActiveHighlight();
        this.isPlaying = false;
        if (this.isSequencePlaying) {
          // Slight natural pause between words (120ms) for pleasant listening
          this.sequenceTimeout = setTimeout(() => {
            this.advanceSequence();
          }, 120);
        } else if (this.onStateChange) {
          this.onStateChange({ status: 'idle' });
        }
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Word audio playback error:', e);
        this.clearActiveHighlight();
        this.isPlaying = false;
        if (this.isSequencePlaying) {
          this.advanceSequence();
        } else if (this.onStateChange) {
          this.onStateChange({ status: 'error', error: e });
        }
      });
    }

    clearActiveHighlight() {
      if (this.activeElement) {
        this.activeElement.classList.remove('word-playing');
        this.activeElement = null;
      }
      document.querySelectorAll('.word-item.word-playing').forEach(el => el.classList.remove('word-playing'));
    }

    setPlaybackRate(rate) {
      this.playbackRate = Number(rate) || 1.0;
      this.audio.playbackRate = this.playbackRate;
    }

    getWordFilename(surah, verse, wordIndex) {
      const sPad = String(surah).padStart(3, '0');
      const vPad = String(verse).padStart(3, '0');
      const wPad = String(wordIndex).padStart(3, '0');
      return `${sPad}_${vPad}_${wPad}.mp3`;
    }

    async getWordAudioSource(surah, verse, wordIndex) {
      const filename = this.getWordFilename(surah, verse, wordIndex);

      // 1. Check offline IndexedDB blob
      try {
        const blob = await this.storage.getWordAudioBlob(surah, verse, wordIndex);
        if (blob) {
          if (this.activeBlobUrl) URL.revokeObjectURL(this.activeBlobUrl);
          this.activeBlobUrl = URL.createObjectURL(blob);
          return { src: this.activeBlobUrl, isOffline: true };
        }
      } catch (e) {
        console.warn('IndexedDB word audio check error:', e);
      }

      // 2. Check pre-bundled asset in app bundle
      const bundledAssetPath = `audio/wbw/${filename}`;
      try {
        const resp = await fetch(bundledAssetPath, { method: 'HEAD' });
        if (resp.ok) {
          return { src: bundledAssetPath, isOffline: true };
        }
      } catch (_) {}

      // 3. Fallback online stream from verified Quran.com CDN
      const cdnUrl = `https://audio.qurancdn.com/wbw/${filename}`;
      // Proactively cache to IndexedDB for seamless subsequent offline usage
      this.cacheWordToStorage(surah, verse, wordIndex, cdnUrl);
      return { src: cdnUrl, isOffline: false };
    }

    async cacheWordToStorage(surah, verse, wordIndex, url) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const blob = await res.blob();
          await this.storage.saveWordAudio(surah, verse, wordIndex, blob, blob.size);
        }
      } catch (_) {}
    }

    async playWord(surah, verse, wordIndex, element) {
      this.clearActiveHighlight();
      if (this.sequenceTimeout) clearTimeout(this.sequenceTimeout);

      this.currentSurah = Number(surah);
      this.currentVerse = Number(verse);
      this.currentWordIdx = Number(wordIndex);

      if (element) {
        this.activeElement = element;
        element.classList.add('word-playing');
      }

      const source = await this.getWordAudioSource(surah, verse, wordIndex);
      this.audio.src = source.src;
      this.audio.playbackRate = this.playbackRate;

      try {
        await this.audio.play();
        this.isPlaying = true;
        if (this.onStateChange) {
          this.onStateChange({ status: 'playing', surah, verse, wordIndex, isOffline: source.isOffline });
        }
      } catch (err) {
        console.warn('Single word play error:', err);
        this.clearActiveHighlight();
        this.isPlaying = false;
        if (this.onStateChange) {
          this.onStateChange({ status: 'error', error: err });
        }
      }
    }

    async playAyahWords(surah, verse, wordsCount, onWordStep, onFinished) {
      this.stop();
      this.currentSurah = Number(surah);
      this.currentVerse = Number(verse);
      this.sequenceWordsCount = Number(wordsCount) || 1;
      this.sequenceCurrentIndex = 0;
      this.isSequencePlaying = true;
      this.onWordStep = onWordStep;
      this.onFinished = onFinished;
      this.advanceSequence();
    }

    async advanceSequence() {
      if (!this.isSequencePlaying) return;

      if (this.sequenceCurrentIndex >= this.sequenceWordsCount) {
        this.stop();
        if (this.onFinished) this.onFinished();
        return;
      }

      this.sequenceCurrentIndex++;
      const wIdx = this.sequenceCurrentIndex;
      const el = document.getElementById(`wbw-card-${wIdx}`) || document.querySelector(`[data-word-idx="${wIdx}"]`);

      if (this.onWordStep) {
        this.onWordStep(wIdx, this.sequenceWordsCount, el);
      }

      this.currentSurah = this.currentSurah;
      this.currentVerse = this.currentVerse;
      this.currentWordIdx = wIdx;

      this.clearActiveHighlight();
      if (el) {
        this.activeElement = el;
        el.classList.add('word-playing');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }

      const source = await this.getWordAudioSource(this.currentSurah, this.currentVerse, wIdx);
      this.audio.src = source.src;
      this.audio.playbackRate = this.playbackRate;

      try {
        await this.audio.play();
        this.isPlaying = true;
      } catch (err) {
        console.warn('Sequence word play error:', err);
        this.clearActiveHighlight();
        // Continue to next word even if one fails
        this.advanceSequence();
      }
    }

    pause() {
      this.isSequencePlaying = false;
      if (this.sequenceTimeout) clearTimeout(this.sequenceTimeout);
      this.audio.pause();
      this.isPlaying = false;
      this.clearActiveHighlight();
      if (this.onStateChange) this.onStateChange({ status: 'paused' });
    }

    resume() {
      if (this.audio.src) {
        this.audio.play().then(() => {
          this.isPlaying = true;
          if (this.onStateChange) this.onStateChange({ status: 'playing' });
        }).catch(err => console.warn('Word audio resume error:', err));
      }
    }

    stop() {
      this.isSequencePlaying = false;
      if (this.sequenceTimeout) clearTimeout(this.sequenceTimeout);
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      this.clearActiveHighlight();
      if (this.onStateChange) this.onStateChange({ status: 'stopped' });
    }

    async downloadSurahWords(surah, onProgress) {
      const meta = window.OfflineQuranDB ? window.OfflineQuranDB.getSurahMeta(surah) : null;
      if (!meta) return false;

      let totalWords = 0;
      const verses = [];
      for (let v = 1; v <= meta.verses; v++) {
        const verseData = window.OfflineQuranDB.getVerseByKey(`${surah}:${v}`);
        const count = (verseData && verseData.words) ? verseData.words.length : 0;
        verses.push({ verse: v, count });
        totalWords += count;
      }

      let downloaded = 0;
      for (const item of verses) {
        for (let w = 1; w <= item.count; w++) {
          const isDown = await this.storage.isWordAudioDownloaded(surah, item.verse, w);
          if (!isDown) {
            const filename = this.getWordFilename(surah, item.verse, w);
            const url = `https://audio.qurancdn.com/wbw/${filename}`;
            try {
              const res = await fetch(url);
              if (res.ok) {
                const blob = await res.blob();
                await this.storage.saveWordAudio(surah, item.verse, w, blob, blob.size);
              }
            } catch (err) {
              console.warn(`Word download failed ${surah}:${item.verse}:${w}`, err);
            }
          }
          downloaded++;
          if (onProgress) onProgress(downloaded, totalWords);
        }
      }
      return true;
    }
  }

  const audioEngineInstance = new UnifiedAudioEngine();
  const wordAudioEngineInstance = new WordAudioEngine(offlineStorage);

  // Export to Global Scope with all expected aliases
  window.QuranDownloadManager = DownloadManager;
  window.OfflineStorageEngine = offlineStorage;
  window.QuranAudioEngine = audioEngineInstance;
  window.UnifiedAudioEngine = audioEngineInstance;
  window.WordAudioEngine = wordAudioEngineInstance;

})(window);
