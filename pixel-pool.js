'use strict';
const RAW = [
  ['Futbolcular', 'easy', 'Lionel Messi, Cristiano Ronaldo, Neymar, Kylian Mbappé, Erling Haaland, Mohamed Salah, Zlatan Ibrahimović, Arda Turan, Hakan Şükür, Burak Yılmaz, Hakan Çalhanoğlu, Arda Güler, Mesut Özil, Wayne Rooney, David Beckham, Ronaldinho, Zinedine Zidane, Diego Maradona'],
  ['Futbolcular', 'medium', 'Pelé, Robert Lewandowski, Luka Modrić, Kevin De Bruyne, Harry Kane, Sergio Ramos, Gianluigi Buffon, Andrés Iniesta, Xavi, Thierry Henry, Didier Drogba, Rivaldo, Rüştü Reçber, Emre Belözoğlu, Tuncay Şanlı, Nihat Kahveci, Cenk Tosun, Hamit Altıntop, Tugay Kerimoğlu, Okan Buruk'],
  ['Futbolcular', 'hard', 'Roberto Baggio, Michel Platini, Johan Cruyff, Franz Beckenbauer, Gerd Müller, Eusébio, Paolo Maldini, Francesco Totti, Iker Casillas, Gheorghe Hagi, Lothar Matthäus, Marco van Basten, Dennis Bergkamp, Eric Cantona'],
  ['Şarkıcılar', 'easy', 'Tarkan, Sezen Aksu, Sertab Erener, Hadise, Ajda Pekkan, Müslüm Gürses, Barış Manço, Cem Karaca, Ebru Gündeş, Kenan Doğulu, Mustafa Sandal, Gülşen, Demet Akalın, Serdar Ortaç, Murat Boz, Yıldız Tilbe, Michael Jackson, Madonna, Eminem, Beyoncé'],
  ['Şarkıcılar', 'medium', 'Ceza (rapper), Sagopa Kajmer, Ezhel, Oğuzhan Koç, Mabel Matiz, Aleyna Tilki, Hande Yener, Teoman, Haluk Levent, Rihanna, Shakira, Adele, Ed Sheeran, Taylor Swift, Justin Bieber, Lady Gaga, Bruno Mars, The Weeknd, Elvis Presley, Freddie Mercury'],
  ['Şarkıcılar', 'hard', 'John Lennon, Bob Marley, Katy Perry, Britney Spears, Celine Dion, Billie Eilish, Dua Lipa, Ariana Grande, Harry Styles, Kanye West, Snoop Dogg, 50 Cent, Jay-Z, Bob Dylan, David Bowie'],
  ['Oyuncular', 'easy', 'Tom Hanks, Leonardo DiCaprio, Brad Pitt, Johnny Depp, Will Smith, Robert Downey Jr., Chris Evans, Scarlett Johansson, Angelina Jolie, Jennifer Lawrence, Keanu Reeves, Morgan Freeman, Jackie Chan, Arnold Schwarzenegger, Tom Cruise, Daniel Radcliffe, Emma Watson, Dwayne Johnson'],
  ['Oyuncular', 'medium', 'Al Pacino, Robert De Niro, Sylvester Stallone, Jason Statham, Ryan Reynolds, Hugh Jackman, Margot Robbie, Kıvanç Tatlıtuğ, Haluk Bilginer, Cem Yılmaz, Şener Şen, Kemal Sunal, Tarık Akan, Türkan Şoray, Hülya Avşar, Tuba Büyüküstün, Kenan İmirzalıoğlu, Beren Saat'],
  ['Oyuncular', 'hard', 'Çağatay Ulusoy, Engin Akyürek, Halit Ergenç, Okan Yalabık, Cüneyt Arkın, Fatma Girik, Adile Naşit, Münir Özkul, Ayhan Işık, Audrey Hepburn, Marilyn Monroe, Charlie Chaplin, Marlon Brando, Jack Nicholson'],
  ['Tarihî Kişiler', 'easy', 'Mustafa Kemal Atatürk, Albert Einstein, Isaac Newton, Nikola Tesla, Marie Curie, Charles Darwin, Leonardo da Vinci, Napoleon, Stephen Hawking, Mehmed the Conqueror=Fatih Sultan Mehmet|Fatih, Suleiman the Magnificent=Kanuni Sultan Süleyman|Kanuni, İsmet İnönü, Winston Churchill, Abraham Lincoln, Nelson Mandela, Mahatma Gandhi, Thomas Edison, Aziz Sancar'],
  ['Tarihî Kişiler', 'medium', 'Galileo Galilei, Cahit Arf, Piri Reis, Mimar Sinan, Julius Caesar, Cleopatra, Alexander the Great=Büyük İskender|İskender, Martin Luther King Jr., Rumi=Mevlana|Rumi, Yunus Emre, Evliya Çelebi, Avicenna=İbn-i Sina|Ibn Sina, Alexander Graham Bell, Sigmund Freud, Karl Marx, Aristotle=Aristoteles|Aristo, Plato=Eflatun|Platon, Pythagoras, Archimedes'],
  ['Tarihî Kişiler', 'hard', 'Ali Kuşçu, Ulugh Beg=Uluğ Bey, Al-Khwarizmi=Harezmi, Ibn Battuta=İbn Battuta, Hurrem Sultan=Hürrem Sultan|Hürrem, Murad IV=IV. Murat, Abdul Hamid II=II. Abdülhamid|Abdülhamid, Selim I=Yavuz Sultan Selim|Yavuz, Enver Pasha=Enver Paşa, Fevzi Çakmak, Kâzım Karabekir, Halide Edib Adıvar, Namık Kemal, Ziya Gökalp, Sabiha Gökçen, Nâzım Hikmet, Orhan Veli Kanık, Yaşar Kemal, Aziz Nesin, Sait Faik Abasıyanık, Oktay Sinanoğlu'],
  ['Sporcular', 'easy', 'Michael Jordan, LeBron James, Kobe Bryant, Roger Federer, Rafael Nadal, Novak Djokovic, Serena Williams, Usain Bolt, Michael Phelps, Muhammad Ali, Mike Tyson, Lewis Hamilton'],
  ['Sporcular', 'medium', 'Michael Schumacher, Max Verstappen, Tiger Woods, Naim Süleymanoğlu, Halil Mutlu, Hidayet Türkoğlu, Mehmet Okur, Stephen Curry, Magic Johnson, Larry Bird'],
  ['Sporcular', 'hard', 'Ayrton Senna, Niki Lauda, Carl Lewis, Nadia Comăneci, Sachin Tendulkar, Bruce Lee, Shaquille O'Neal, Dirk Nowitzki'],
  ['Yapılar ve Yerler', 'easy', 'Eiffel Tower=Eyfel Kulesi|Eyfel, Statue of Liberty=Özgürlük Heykeli, Big Ben, Colosseum=Kolezyum, Taj Mahal=Tac Mahal, Great Wall of China=Çin Seddi, Giza pyramid complex=Gize Piramitleri|Piramit, Hagia Sophia=Ayasofya, Sultan Ahmed Mosque=Sultanahmet Camii|Sultanahmet|Mavi Cami, Galata Tower=Galata Kulesi|Galata, Maiden's Tower=Kız Kulesi, Anıtkabir, Cappadocia=Kapadokya, Pamukkale'],
  ['Yapılar ve Yerler', 'medium', 'Topkapı Palace=Topkapı Sarayı|Topkapı, Dolmabahçe Palace=Dolmabahçe Sarayı|Dolmabahçe, Mount Ararat=Ağrı Dağı|Ağrı, Ephesus=Efes, Sümela Monastery=Sümela Manastırı|Sümela, Machu Picchu, Christ the Redeemer (statue)=Kurtarıcı İsa Heykeli, Sydney Opera House=Sidney Opera Binası, Burj Khalifa=Burj Khalifa|Burç Halife, Golden Gate Bridge=Golden Gate Köprüsü, Leaning Tower of Pisa=Pisa Kulesi, Sagrada Família=Sagrada Familia, Stonehenge, Petra, Mount Fuji=Fuji Dağı|Fuji, Niagara Falls=Niagara Şelaleleri|Niagara, Tower Bridge=Tower Köprüsü'],
  ['Hayvanlar', 'easy', 'Lion=Aslan, Tiger=Kaplan, African elephant=Fil, Giraffe=Zürafa, Plains zebra=Zebra, Giant panda=Panda, Koala, Red kangaroo=Kanguru, Emperor penguin=Penguen, Polar bear=Kutup ayısı, Bottlenose dolphin=Yunus, Golden eagle=Kartal, Barn owl=Baykuş, Greater flamingo=Flamingo, Indian peafowl=Tavus kuşu|Tavus'],
  ['Hayvanlar', 'medium', 'Panther chameleon=Bukalemun, Cheetah=Çita, Leopard=Leopar|Pars, Gray wolf=Kurt, Red fox=Tilki, European hedgehog=Kirpi, Dromedary=Deve, Gorilla=Goril, Chimpanzee=Şempanze, Hippopotamus=Su aygırı|Hipopotam, White rhinoceros=Gergedan, Nile crocodile=Timsah, Green sea turtle=Deniz kaplumbağası|Kaplumbağa, Red panda=Kırmızı panda, Meerkat=Mirket'],
];
const items = [];
for (const [c, d, list] of RAW) {
  for (const e of list.split(',')) {
    const [t, a] = e.split('=');
    const title = t.trim();
    if (!title || items.some(x => x.title === title)) continue;
    const name = (a ? a.split('|')[0] : title.replace(/\s*\(.*\)$/, '')).trim();
    const ans = a ? a.split('|').map(x => x.trim()) : [name];
    if (!a) { const w = name.split(' ').pop(); if (name.includes(' ') && w.length >= 4) ans.push(w); }
    items.push({ id: 'px:' + title, title, name, ans, c, d });
  }
}
module.exports = items;
