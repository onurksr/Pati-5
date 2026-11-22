# Parti Odası – Müzik ve Film güncellemesi

## Render'da çalıştırma
1. Dosyaları GitHub reposuna yükle (index.html, server.js, package.json, data/ klasörü).
2. Render → New Web Service → repoyu seç. Build: `npm install`, Start: `npm start`.
3. **Film oyunu için:** themoviedb.org'da ücretsiz hesap aç → Settings → API → anahtar al.
   Render → Environment → `TMDB_API_KEY` = anahtarın (v3 anahtarı veya v4 "eyJ…" token).
   Anahtar yoksa film oyunu başlatılmaz (uyarı gösterilir); şarkı oyunu anahtarsız çalışır.
4. Sunucuda dışarıya çıkış (internet) açık olmalı (Render ücretsiz planda açık).

## Nasıl çalışıyor
- **Şarkı:** Sunucu, iTunes Search API'den (yedek: Deezer) şarkının resmî 30 sn önizlemesini bulur,
  rastgele bir kesit (seek) ve başlangıç zamanını (playAt) belirler; tüm telefonlar aynı anda çalar.
  Şarkı/sanatçı adı istemciye turun sonuna kadar gönderilmez.
- **Film:** TMDB'den filmin metinsiz (dilsiz) arka plan görselleri çekilir, her turda farklı 5 kare
  seçilir ve süre içinde sırayla açılır. Kare puanı: 100/80/60/40/20.
- Yönetici panelinden film eklerken en az 3 `https` görsel URL'si verilirse TMDB yerine onlar kullanılır.
- iOS Safari için ses kilidi ilk dokunuşta açılır; çalmazsa "Başlat" butonu çıkar.

## Bu sürümde değişenler
- Tur seçenekleri: 5, 10, 15, 20, 25, 30, 40, 50 ve Sınırsız (oda sahibi "Oyunu bitir" ile bitirir).
- İçerik havuzları `data/bonus-content.js` ile genişletildi; havuz bitince içerikler baştan, tekrarsız döngüyle gelir.
- Ortam değişkeni: `TMDB_API_KEY` (yalnızca Film oyunu için). `PORT` Render tarafından verilir.

## Pikseli Aç, şarkı ve test (v3.1)
- **Pikseli Aç:** görseller çalışma anında İngilizce Vikipedi'den çözülür; yalnızca Wikimedia Commons (özgür lisanslı) görseller kabul edilir, her çözünürlük adımı sunucuda yüklenebiliyor mu diye doğrulanır, doğrulanamayan kayıt oyuna girmez. Havuzdaki kaç kaydın gerçekten çözüldüğünü görmek için sunucu açıkken `/pixel-check` adresini aç, birkaç dakika sonra `/pixel-stats` adresine bak (`ok`/`fail`).
- **Şarkı:** parça artık tur bitene kadar çalar (iTunes/Deezer önizlemesi en çok 30 sn).
- **Kategori seçimi:** soru oyunlarında ve Pikseli Aç'ta oda sahibi kategori seçebilir.
- **Gerçek Socket.IO testi:** `npm install && npm test` (8 istemci; sunucuyu kendisi başlatır).
