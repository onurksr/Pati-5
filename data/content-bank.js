'use strict';

const TF_BANK = [
  { d: 'easy', c: 'Genel Kültür', t: 'Dünya’nın en büyük okyanusu Pasifik Okyanusu’dur.', v: true, x: 'Pasifik Okyanusu, tüm kara parçalarının toplamından bile daha geniş bir alanı kaplar.' },
  { d: 'medium', c: 'Bilim', t: 'Ses boşlukta, ışığa göre daha hızlı yayılır.', v: false, x: 'Sesin yayılması için ortama ihtiyaç vardır; boşlukta yayılmaz ve ışık çok daha hızlıdır.' },
  { d: 'hard', c: 'Tarih', t: 'Matbaa Avrupa’da Johannes Gutenberg tarafından 15. yüzyılda geliştirildi.', v: true, x: 'Gutenberg hareketli metal harf baskısını 1450 civarında yaygınlaştırdı.' }
];

const CLOSEST_BANK = [
  { d: 'easy', c: 'Coğrafya', t: 'Türkiye’nin yüzölçümü yaklaşık kaç bin km²’dir?', v: 783, u: 'bin km²', x: 'Türkiye’nin yüzölçümü yaklaşık 783.562 km²’dir.' },
  { d: 'medium', c: 'Uzay', t: 'Mars’ın Güneş’e ortalama uzaklığı kaç milyon km’dir?', v: 228, u: 'milyon km', x: 'Mars, Güneş’ten ortalama yaklaşık 228 milyon km uzaktadır.' },
  { d: 'hard', c: 'Bilim', t: 'Suyun donma noktası Fahrenheit ölçeğinde kaç derecedir?', v: 32, u: '°F', x: 'Su 0 °C’de, yani 32 °F’de donar.' }
];

const QUIZ_BANK = [
  { d: 'easy', c: 'Genel Kültür', t: 'Hangi renk ana renklerden biri değildir?', o: ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı'], v: 2, x: 'Geleneksel boya ana renkleri kırmızı, sarı ve mavidir.' },
  { d: 'medium', c: 'Coğrafya', t: 'En uzun nehir olarak bilinen akarsu hangisidir?', o: ['Nil', 'Kızılırmak', 'Tuna', 'Tigre'], v: 0, x: 'Nil Nehri en uzun nehirler arasında yer alır.' },
  { d: 'hard', c: 'Bilim', t: 'Işık yılı neyi ölçer?', o: ['Zaman', 'Mesafe', 'Hız', 'Parlaklık'], v: 1, x: 'Işık yılı, ışığın bir yılda kat ettiği mesafeyi ifade eder.' }
];

const LIAR_BANK = [
  { d: 'easy', c: 'Doğa', t: 'Hangisi yanlıştır?', o: ['Penguenler kuş türüdür', 'Yarasalar uçabilen memelidir', 'Ahtapotların tek kalbi vardır', 'Balinalar memelidir'], v: 2, x: 'Ahtapotların üç kalbi bulunur.' },
  { d: 'medium', c: 'Teknoloji', t: 'Hangisi yanlıştır?', o: ['HTML bir programlama dili değildir', 'RAM geçici bellektir', 'HTTP web protokolüdür', 'SSD mekanik diskten yavaştır'], v: 3, x: 'SSD’ler genellikle geleneksel mekanik HDD’lerden çok daha hızlıdır.' }
];

const WYR_BANK = [
  { d: 'easy', c: 'Günlük', t: 'Hangisini seçerdin?', o: ['Sınırsız seyahat', 'Sınırsız kitap'], v: null, x: 'Çoğunluğun seçtiği seçenek puan kazandırır!' },
  { d: 'medium', c: 'Günlük', t: 'Hangisini seçerdin?', o: ['Geçmişi görmek', 'Geleceği görmek'], v: null, x: 'Çoğunluğun seçtiği seçenek puan kazandırır!' }
];

const ML_BANK = [
  { d: 'easy', c: 'Grup', t: 'Odada kim daha olası: En iyi şarkı söyleyen?', o: [], v: null, x: 'Arkadaşlarını oyla!' },
  { d: 'medium', c: 'Grup', t: 'Odada kim daha olası: En stratejik düşünen?', o: [], v: null, x: 'Arkadaşlarını oyla!' }
];

const EMOJI_BANK = [
  { d: 'easy', c: 'Film', t: '🦁👑🌅', a: ['aslan kral', 'the lion king', 'lion king'], x: 'Aslan Kral' },
  { d: 'medium', c: 'Film', t: '🕶️💊🐇', a: ['matrix', 'the matrix'], x: 'The Matrix' },
  { d: 'hard', c: 'Film', t: '⏳🚀🕳️', a: ['interstellar', 'yildizlararasi', 'yıldızlararası'], x: 'Interstellar' }
];

const CODENAMES_WORDS = {
  easy: ['KAPI', 'DENİZ', 'GÜNEŞ', 'KEDİ', 'KÖPEK', 'AĞAÇ', 'MASA', 'KİTAP', 'YILDIZ', 'BULUT', 'EV', 'YOL', 'SU', 'ATEŞ', 'TOPRAK', 'HAVA', 'AY', 'BALIK', 'KUŞ', 'ÇİÇEK', 'ELMA', 'EKMEK', 'SAAT', 'AYNA', 'KÖPRÜ'],
  medium: ['GÖLGE', 'PUSU', 'AJAN', 'KASIRGA', 'KULE', 'HARİTA', 'PUSULA', 'MASKARA', 'SİNYAL', 'RADAR', 'DÜŞÜNCE', 'KİLİT', 'ŞİFRE', 'AKINTI', 'VOLKAN', 'VAHŞİ', 'MİRAS', 'EFSANE', 'KÖK', 'DALGA', 'MERCEK', 'TİTREŞİM', 'KAFES', 'SINIR', 'İPUCU'],
  hard: ['PARADOKS', 'ANOMALİ', 'ENTROPİ', 'İRONİ', 'DİALEKTİK', 'SİMÜLASYON', 'KONSEPT', 'DOKTRİN', 'HEGEMONYA', 'ALGORİTMA', 'SPEKÜLASYON', 'METAFOR', 'KRONOLOJİ', 'İDEOLOJİ', 'PARADİGMA', 'SENSÖR', 'FREKANS', 'KONSENSÜS', 'REFORM', 'SENTEZ', 'ANALİZ', 'KRİTER', 'VARYANS', 'TENDANS', 'SPEKTRUM']
};

const IMPOSTER_BANK = [
  { d: 'easy', c: 'Yiyecek', common: 'Pizza', imposter: 'Lahmacun' },
  { d: 'easy', c: 'Mekan', common: 'Sinema', imposter: 'Tiyatro' },
  { d: 'medium', c: 'Doğa', common: 'Orman', imposter: 'Park' },
  { d: 'hard', c: 'Kavram', common: 'Rüya', imposter: 'Kâbus' }
];

const MUSIC_BANK = [
  { id: 'm1', title: 'Şıkıdım', artist: 'Tarkan', lang: 'tr', genres: ['Türkçe Pop', '2000\'ler'], year: 1999, d: 'easy', pop: 'high' },
  { id: 'm2', title: 'Gülümse', artist: 'Sezen Aksu', lang: 'tr', genres: ['Türkçe Pop', 'Türkçe Slow'], year: 1991, d: 'easy', pop: 'high' },
  { id: 'm3', title: 'Senden Daha Güzel', artist: 'Duman', lang: 'tr', genres: ['Rock', 'Alternatif'], year: 2002, d: 'medium', pop: 'high' },
  { id: 'm4', title: 'Blinding Lights', artist: 'The Weeknd', lang: 'en', genres: ['Yabancı Pop', '2020 ve sonrası'], year: 2019, d: 'easy', pop: 'high' },
  { id: 'm5', title: 'Bohemian Rhapsody', artist: 'Queen', lang: 'en', genres: ['Rock', 'Yabancı Slow'], year: 1975, d: 'easy', pop: 'high' }
];

const FILM_BANK = [
  { id: 'f1', title: 'Inception', en: 'Inception', year: 2010, region: 'hollywood', categories: ['Hollywood', 'Bilim Kurgu', 'Aksiyon', 'Tüm Zamanların Popüler Filmleri'], series: '', d: 'easy', pop: 'high', answers: ['inception', 'baslangic', 'başlangıç'] },
  { id: 'f2', title: 'The Dark Knight', en: 'The Dark Knight', year: 2008, region: 'hollywood', categories: ['Hollywood', 'DC', 'Aksiyon', 'Tüm Zamanların Popüler Filmleri'], series: 'Batman', d: 'easy', pop: 'high', answers: ['the dark knight', 'dark knight', 'kara sovalye', 'kara şövalye'] },
  { id: 'f3', title: 'Ayla', en: 'Ayla: The Daughter of War', year: 2017, region: 'tr', categories: ['Türk Sineması', 'Dram', 'Yeni Filmler'], series: '', d: 'easy', pop: 'high', answers: ['ayla'] },
  { id: 'f4', title: 'Avengers: Endgame', en: 'Avengers: Endgame', year: 2019, region: 'hollywood', categories: ['Hollywood', 'Marvel', 'Aksiyon', 'Bilim Kurgu', 'Tüm Zamanların Popüler Filmleri'], series: 'Marvel Sinematik Evreni', d: 'easy', pop: 'high', answers: ['avengers endgame', 'endgame', 'avengers'] }
];

const TURKISH_ARTISTS = ['Tarkan', 'Sezen Aksu', 'Duman', 'Manga', 'Barış Manço', 'Teoman', 'Simge', 'Ezhel', 'Ceza', 'Sagopa Kajmer'];
const FOREIGN_ARTISTS = ['The Weeknd', 'Ed Sheeran', 'Billie Eilish', 'Queen', 'Linkin Park', 'Eminem', 'Adele', 'Coldplay'];
const MUSIC_CATEGORIES = ['Türkçe Pop', 'Yabancı Pop', 'Türkçe Rap', 'Yabancı Rap', 'Rock', 'Alternatif', 'Arabesk', 'Türkçe Slow', 'Yabancı Slow', '2000\'ler', '2010\'lar', '2020 ve sonrası', 'Film müzikleri', 'Dizi müzikleri', 'Oyun müzikleri', 'Karışık'];
const FILM_CATEGORIES = ['Hollywood', 'Türk Sineması', 'Marvel', 'DC', 'Animasyon', 'Disney', 'Pixar', 'Harry Potter', 'Bilim Kurgu', 'Aksiyon', 'Komedi', 'Korku', 'Gerilim', 'Fantastik', 'Dram', 'Romantik', 'Macera', 'Suç ve Polisiye', 'Eski Klasikler', 'Yeni Filmler', 'Tüm Zamanların Popüler Filmleri'];
const FILM_SERIES = ['Marvel Sinematik Evreni', 'DC Evreni', 'Harry Potter', 'Yüzüklerin Efendisi', 'Hızlı ve Öfkeli', 'Karayip Korsanları', 'Transformers', 'Jurassic Park', 'Mission Impossible', 'Star Wars', 'John Wick', 'Spider-Man', 'Batman'];

module.exports = {
  TF_BANK,
  CLOSEST_BANK,
  QUIZ_BANK,
  LIAR_BANK,
  WYR_BANK,
  ML_BANK,
  EMOJI_BANK,
  CODENAMES_WORDS,
  IMPOSTER_BANK,
  MUSIC_BANK,
  FILM_BANK,
  TURKISH_ARTISTS,
  FOREIGN_ARTISTS,
  MUSIC_CATEGORIES,
  FILM_CATEGORIES,
  FILM_SERIES
};
