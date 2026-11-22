// Ek içerik (content-bank.js ile aynı şema). d: easy | medium | hard
const tf = (d, c, t, v, x) => ({ d, c, t, v, x });
const cl = (d, c, t, v, u, x) => ({ d, c, t, v, u, x });
const qz = (d, c, t, o, v, x) => ({ d, c, t, o, v, x });
const wy = (d, a, b) => ({ d, c: 'Günlük', t: 'Hangisini seçerdin?', o: [a, b], v: null, x: 'Çoğunluğun seçtiği seçenek puan kazandırır!' });
const ml = (d, t) => ({ d, c: 'Grup', t: 'Odada kim daha olası: ' + t + '?', o: [], v: null, x: 'Arkadaşlarını oyla!' });
const em = (d, c, t, a, x) => ({ d, c, t, a, x });
module.exports = {
  TF_BANK: [
    tf('easy', 'Doğa', 'Yunuslar memelidir.', true, 'Yunuslar süt verir ve akciğerleriyle nefes alır.'),
    tf('easy', 'Coğrafya', 'Türkiye’nin başkenti İstanbul’dur.', false, 'Başkent, 1923’ten beri Ankara’dır.'),
    tf('medium', 'Fizik', 'Elmas, bilinen en sert doğal maddedir.', true, 'Mohs sertlik ölçeğinde elmas en üsttedir.'),
    tf('medium', 'Tarih', 'Osmanlı Devleti geleneksel kabule göre 1299’da kuruldu.', true, '1299, kuruluş için en yaygın kabul gören tarihtir.'),
    tf('medium', 'Biyoloji', 'Kediler tatlı tadını alamaz.', true, 'Kedilerde tatlı tat reseptörünün geni çalışmaz.'),
    tf('medium', 'Uzay', 'Güneş Sistemi’nin en büyük gezegeni Jüpiter’dir.', true, 'Jüpiter, diğer gezegenlerin toplam kütlesinden daha ağırdır.'),
    tf('hard', 'Fizik', 'Su donarken genleşir.', true, 'Buz, sıvı sudan daha az yoğundur; bu yüzden yüzer.'),
    tf('hard', 'Tarih', 'Berlin Duvarı’nın yıkılışı 1989’da başladı.', true, 'Duvar 9 Kasım 1989’da açıldı.'),
    tf('hard', 'Genel Kültür', 'Mona Lisa’yı Michelangelo yaptı.', false, 'Mona Lisa, Leonardo da Vinci’nin eseridir.'),
    tf('hard', 'Coğrafya', 'Sahra, dünyanın en büyük sıcak çölüdür.', true, 'En büyük çöl Antarktika’dır; en büyük sıcak çöl ise Sahra’dır.'),
  ],
  CLOSEST_BANK: [
    cl('easy', 'Dünya', 'Türkiye’de kaç il vardır?', 81, '', 'Türkiye’de 81 il vardır.'),
    cl('easy', 'Dünya', 'Satranç tahtasında toplam kaç kare vardır?', 64, '', '8 × 8 = 64 kare.'),
    cl('medium', 'Uzay', 'Güneş ışığı Dünya’ya yaklaşık kaç dakikada ulaşır?', 8, 'dk', 'Yaklaşık 8 dakika 20 saniye sürer.'),
    cl('medium', 'Tarih', 'Birinci Dünya Savaşı hangi yılda başladı?', 1914, '', 'Savaş, Temmuz 1914’te başladı.'),
    cl('medium', 'Biyoloji', 'Yetişkin bir insanda kaç kemik bulunur?', 206, '', 'Yetişkinlerde 206 kemik vardır.'),
  ],
  QUIZ_BANK: [
    qz('easy', 'Uzay', 'Dünya’nın doğal uydusu hangisidir?', ['Mars', 'Ay', 'Venüs', 'Titan'], 1, 'Ay, Dünya’nın tek doğal uydusudur.'),
    qz('easy', 'Coğrafya', 'Japonya’nın başkenti neresidir?', ['Osaka', 'Kyoto', 'Tokyo', 'Nagoya'], 2, 'Osaka ve Kyoto büyük şehirlerdir ama başkent Tokyo’dur.'),
    qz('medium', 'Uzay', 'Hangi gezegen “Kızıl Gezegen” olarak bilinir?', ['Mars', 'Jüpiter', 'Satürn', 'Merkür'], 0, 'Yüzeyindeki demir oksit ona kırmızımsı rengini verir.'),
    qz('medium', 'Edebiyat', 'Sefiller romanının yazarı kimdir?', ['Victor Hugo', 'Charles Dickens', 'Honoré de Balzac', 'Émile Zola'], 0, 'Victor Hugo, romanı 1862’de yayımladı.'),
    qz('medium', 'Sanat', 'Çığlık tablosunun ressamı kimdir?', ['Edvard Munch', 'Vincent van Gogh', 'Claude Monet', 'Salvador Dalí'], 0, 'Edvard Munch, Çığlık’ın ilk versiyonunu 1893’te yaptı.'),
    qz('medium', 'Müzik', 'Standart bir piyanoda kaç tuş bulunur?', ['66', '76', '88', '98'], 2, '88 tuş: 52 beyaz ve 36 siyah.'),
    qz('hard', 'Bilim', 'Periyodik tabloda “Fe” simgesi hangi elemente aittir?', ['Flor', 'Fermiyum', 'Demir', 'Fosfor'], 2, 'Fe, Latince “ferrum” (demir) sözcüğünden gelir.'),
    qz('hard', 'Teknoloji', 'İlk iPhone hangi yıl tanıtıldı?', ['2005', '2007', '2009', '2010'], 1, 'Steve Jobs, iPhone’u Ocak 2007’de tanıttı.'),
  ],
  WYR_BANK: [
    wy('easy', 'Sınırsız internet', 'Sınırsız pizza'), wy('easy', 'Hiç yağmur yağmasın', 'Hiç kar yağmasın'),
    wy('easy', 'Işınlanabilmek', 'Zamanı durdurabilmek'), wy('easy', 'Sadece tatlı yemek', 'Sadece tuzlu yemek'),
    wy('medium', 'Her şeyi bilmek', 'Her şeyi yapabilmek'), wy('medium', 'Bir ay telefonsuz yaşamak', 'Bir ay müziksiz yaşamak'),
    wy('medium', 'Sevdiğin dizide oynamak', 'Sevdiğin takımda oynamak'), wy('medium', 'Her gün erken kalkmak', 'Her gün geç yatmak'),
  ],
  ML_BANK: [
    ml('easy', 'Yolda giderken kaybolan'), ml('easy', 'Her şeyi son dakikaya bırakan'), ml('easy', 'Telefonunu en çok kaybeden'),
    ml('easy', 'Sürpriz parti planlayan'), ml('medium', 'Filmin sonunu önceden söyleyen'), ml('medium', 'Mesajlara en geç cevap veren'),
    ml('medium', 'Sinemada ilk ağlayan'), ml('medium', 'Her gün kahve içen'),
  ],
  EMOJI_BANK: [
    em('easy', 'Film', '🕷️👨', ['örümcek adam', 'orumcek adam', 'spiderman', 'spider man'], 'Örümcek Adam'),
    em('easy', 'Film', '🚢🧊❤️', ['titanic'], 'Titanic'),
    em('easy', 'Film', '🐠🔍', ['kayıp balık nemo', 'kayip balik nemo', 'balık nemo', 'nemo', 'finding nemo'], 'Kayıp Balık Nemo'),
    em('easy', 'Film', '❄️👸⛄', ['karlar ülkesi', 'karlar ulkesi', 'frozen'], 'Karlar Ülkesi'),
    em('medium', 'Film', '⚡👓🧹', ['harry potter'], 'Harry Potter'),
    em('medium', 'Dizi', '🦑🔴🔺', ['squid game', 'kalamar oyunu'], 'Squid Game'),
  ],
};
const W = s => s.trim().split(/\s+/);
module.exports.CODENAMES_WORDS = {
  easy: W(`masa sandalye kapı pencere duvar çatı bahçe sokak köprü yol araba otobüs tren uçak gemi bisiklet motosiklet kamyon taksi bilet kitap defter kalem silgi çanta cüzdan anahtar kilit saat telefon bilgisayar klavye ekran kamera radyo televizyon lamba ayna halı perde yatak yastık battaniye dolap çekmece fırın ocak tencere tava kaşık çatal bıçak tabak bardak fincan çaydanlık şişe kutu sepet ip makas çekiç testere çivi vida matkap boya fırça merdiven asansör kule kale saray cami kilise müze okul hastane market pazar park stadyum havuz plaj deniz göl nehir dağ tepe vadi orman çöl ada mağara şelale bulut yağmur kar rüzgar fırtına şimşek güneş yıldız gezegen elma armut muz çilek kiraz karpuz üzüm portakal limon domates patates soğan havuç biber salatalık ekmek peynir zeytin yumurta süt bal çay kahve şeker tuz pizza makarna çorba pilav kebap baklava dondurma çikolata kek börek simit kedi köpek inek koyun keçi tavuk horoz balık kuş kartal aslan kaplan fil maymun ayı kurt tilki tavşan yılan kurbağa arı karınca kelebek örümcek şapka gözlük ayakkabı çorap ceket pantolon etek elbise kravat atkı eldiven kemer şemsiye sabun havlu tarak diş göz kulak burun ağız el ayak parmak kalp`),
  medium: W(`doktor hemşire öğretmen avukat mühendis pilot şoför aşçı garson berber terzi çiftçi balıkçı asker polis itfaiyeci casus ressam yazar şair oyuncu şarkıcı sporcu hakem kaptan kral kraliçe prens prenses şövalye korsan hırsız dedektif cadı büyücü melek şeytan hayalet vampir canavar ejderha cüce dev peri robot uzaylı astronot kaşif müzisyen gitar piyano keman davul flüt trompet orkestra konser sahne film sinema tiyatro opera balo festival karnaval maske kostüm tuval heykel resim fotoğraf harita pusula teleskop mikroskop termometre kasa banka para altın gümüş elmas mücevher yüzük kolye taç hazine sandık bayrak kalkan kılıç mızrak ok yay top tüfek tank denizaltı roket füze uydu istasyon fabrika enerji elektrik pil kablo anten sinyal internet yazılım şifre virüs dosya program oyun puan seviye takım şampiyon kupa madalya rekor maç gol penaltı forvet kaleci antrenör tribün turnuva ralli maraton yarış hız fren direksiyon benzin lastik garaj liman iskele fener dalga akıntı kıyı körfez boğaz yarımada kıta okyanus buzdağı volkan deprem çığ sel mevsim ilkbahar sonbahar kış`),
  hard: W(`özgürlük adalet barış savaş sınır göç miras gelenek efsane destan masal bilmece atasözü sır rüya kâbus hafıza hayal umut korku öfke kıskançlık merak sabır cesaret vicdan dürüstlük nezaket kibir dayanışma ittifak anlaşma kriz devrim reform imparatorluk cumhuriyet monarşi demokrasi anayasa meclis senato hükümet bakan elçi konsolos istihbarat diplomasi sansür propaganda ekonomi enflasyon borsa hisse vergi bütçe faiz kredi ihracat ithalat gümrük sermaye tekel rekabet reklam patent icat keşif deney teori kanıt formül denklem olasılık istatistik geometri cebir evren galaksi asteroit atom molekül proton elektron radyasyon yerçekimi sürtünme hücre gen evrim bağışıklık aşı salgın tedavi teşhis ameliyat röntgen sinir beyin akciğer karaciğer böbrek iskelet kas damar alfabe gramer noktalama roman hikâye şiir mısra kafiye belgesel gazete dergi editör muhabir skandal gösteri ödül yarışma sergi koleksiyon antika arkeoloji fosil dinozor mamut kristal mineral maden kömür petrol doğalgaz jeotermal baraj kanal tünel viyadük otoyol kavşak trafik radar sensör algoritma veritabanı sunucu tarayıcı donanım çip devre transistör lazer mercek prizma yankı titreşim frekans`),
};
