// GLOBAL AI FUNCTIONS - Outside DOMContentLoaded for immediate access
var aiResponses = {
        'klima e1': 'E1 hatası: Algılayıcı arızası. Oda sıcaklık sensörü veya evaporatör sensörü arızalı olabilir. Sensörü kontrol edin veya değiştirin. Batman Diyar Teknik olarak E1 hatası için yerinde diagnose hizmeti sunuyoruz.',
        'klima e2': 'E2 hatası: İletişim hatası. İç ve dış ünite arasında iletişim problemi var. Kablo bağlantılarını kontrol edin.',
        'klima ısıtmıyor': 'Klima ısıtmıyorsa: 1) Termostat ayarını kontrol edin (ısıtma modunda olmalı), 2) Filtreler temiz olmalı, 3) Gaz basıncı normal olmalı. 0543 884 72 84 üzerinden randevu alabilirsiniz.',
        'klima soğutmuyor': 'Klima soğutmama sorunu: • Filtre tıkanıklığı en sık neden • Gaz eksikliği • Dış ünite yeterli havalanmıyor • Kompresör arızası. Önce filtre temizliği yapın.',
        'kombi arızası': 'Kombi arızası için: E1-E8 arası hata kodları olabilir. En sık E1 (ateşleme) ve E4 (düşük basınç) görülür. 0543 884 72 84 arayabilirsiniz.',
        'kombi petek ısınmıyor': 'Petekler ısınmıyorsa: 1) Tüm vanalar açık mı? 2) Kombi basıncı 1-2 bar mı? 3) Peteklerde hava var mı? Hava alma işlemi yapın.',
        'buzdolabı soğutmuyor': 'Buzdolabı soğutmuyor: • Termostat ayarı (3-4 olmalı) • Kapı contası sıkı mı? • Arka bobinler temiz mi? • Kompresör çalışıyor mu?',
        'çamaşır makinesi su almıyor': 'Çamaşır makinesi su almıyorsa: • Musluklar açık mı? • Hortum katlanmış mı? • Su basıncı yeterli mi? • Valf arızası olabilir.',
        'fiyat bilgi': 'Fiyatlarımız için bizi arayabilirsiniz: 0543 884 72 84',
        'servis talebi': 'Batman Diyar Teknik Beyaz Eşya - 15 yılı aşkın deneyim. 7/24 acil servis. Randevu: 0543 884 72 84',
        'servis': 'Batman Diyar Teknik Beyaz Eşya - 15 yılı aşkın deneyim. 7/24 acil servis. Randevu: 0543 884 72 84'
    };

    function aiGetResponse(message) {
        message = message.toLowerCase().trim();
        for (var key in aiResponses) {
            if (message.indexOf(key) !== -1) {
                return aiResponses[key];
            }
        }
        return 'Sorunuz için teşekkürler! Klima, kombi ve beyaz eşya ile ilgili her türlü sorunuzda size yardımcı olabilirim. Daha spesifik bir soru sorabilir veya doğrudan 0543 884 72 84 numaralı hattımızdan bize ulaşabilirsiniz. 📞';
    }

    function askQuestion(question) {
        try {
            var modal = document.getElementById('aiModal');
            var messages = document.getElementById('aiMessages');
            var input = document.getElementById('aiInput');
            
            if (!modal) {
                alert('Modal bulunamadı!');
                return;
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            if (!messages) {
                alert('Mesaj kutusu bulunamadı!');
                return;
            }
            
            var userMsg = document.createElement('div');
            userMsg.className = 'ai-message user';
            userMsg.innerHTML = '<p>' + question + '</p>';
            messages.appendChild(userMsg);
            messages.scrollTop = messages.scrollHeight;
            
            setTimeout(function() {
                var response = aiGetResponse(question);
                var botMsg = document.createElement('div');
                botMsg.className = 'ai-message bot';
                botMsg.innerHTML = '<p>' + response + '</p>';
                messages.appendChild(botMsg);
                messages.scrollTop = messages.scrollHeight;
            }, 400);
            
            if (input) {
                setTimeout(function() { input.focus(); }, 200);
            }
        } catch (e) {
            alert('Hata: ' + e.message);
        }
    }

    window.askQuestion = askQuestion;

document.addEventListener('DOMContentLoaded', function() {
    const aiModal = document.getElementById('aiModal') || document.getElementById('aiModalOverlay');
    const aiAsistanBtn = document.getElementById('aiAsistanBtn');
    const aiModalClose = document.getElementById('aiModalClose');
    const headerCtaBtn = document.getElementById('headerCtaBtn');
    const aiForm = document.getElementById('aiForm');
    const aiInput = document.getElementById('aiInput');
    const aiMessages = document.getElementById('aiMessages');

    // Keep original responses for internal use
    const responses = {
        // KLİMA ARIZA KODLARI
        'klima e1': 'E1 hatası: Algılayıcı arızası. Oda sıcaklık sensörü veya evaporatör sensörü arızalı olabilir. Sensörü kontrol edin veya değiştirin. Batman Diyar Teknik olarak E1 hatası için yerinde diagnose hizmeti sunuyoruz.',
        'klima e2': 'E2 hatası: İletişim hatası. İç ve dış ünite arasında iletişim problemi var. Kablo bağlantılarını kontrol edin. Sorun devam ederse PCB kart arızası olabilir.',
        'klima e3': 'E3 hatası: Faz koruma. Dış ünite motor veya kompresör sorunu. Elektrik bağlantılarını kontrol edin. Aşırı yüklenme olmuş olabilir.',
        'klima e4': 'E4 hatası: Gaz kaçağı tespiti. Soğutucu akışkan eksik veya kompresör arızası. Gaz basıncı ölçümü yapılmalı. R410A veya R32 gaz dolumu gerekebilir.',
        'klima e5': 'E5 hatası: Düşük basınç koruması. Gaz eksikliği veya evaporator tıkanıklığı. Filtre temizliği ve gaz kontrolü önerilir.',
        'klima e6': 'E6 hatası: Yüksek basınç koruması. Dış ünite fanı çalışmıyor veya kondenser kirliliği. Dış ünite temizliği yapılmalı.',
        'klima f1': 'F1 hatası: İletişim hatası. PCB kart arası bağlantı sorunu. Kabloları kontrol edin.',
        'klima f2': 'F2 hatası: Kompresör faz hatası. Kompresör motoru arızalı veya sargı kontrolü gerekli.',
        'klima f3': 'F3 hatası: Dış ünite fan motoru arızası. Fan motoru değişimi veya PCB kontrolü gerekli.',
        'klima f4': 'F4 hatası: Kompresör overheating. Yetersiz soğutma veya gaz problemi. Klimayı kapatıp 15 dk dinlendirin.',
        'klima p1': 'P1 hatası: Düşük gaz basıncı. Gaz dolumu gerekli veya kaçak tespiti. Profesyonel kontrol önerilir.',
        'klima p2': 'P2 hatası: Yüksek gaz basıncı. Gaz fazlası veya kondenser sorunu. Uzman kontrolü şart.',
        'klima p3': 'P3 hatası: Akım koruma. Kompresör aşırı akım çekiyor. Elektrik tesisatı kontrol edilmeli.',
        'klima p4': 'P4 hatası: Sıcaklık koruması. Kompresör çok ısınmış. Dış ünite havalandırmasını kontrol edin.',

        // KLİMA GENEL SORUNLAR
        'klima ısıtmıyor': 'Klima ısıtmıyorsa: 1) Termostat ayarını kontrol edin (ısıtma modunda olmalı), 2) Filtreler temiz olmalı, 3) Gaz basıncı normal olmalı, 4) Dış ünite çalışıyor olmalı. Sorun devam ediyorsa gaz eksikliği veya kompresör arızası olabilir. 0543 884 72 84 üzerinden randevu alabilirsiniz.',
        'klima soğutmuyor': 'Klima soğutmama sorunu: • Filtre tıkanıklığı en sık neden • Gaz eksikliği (R410A/R32) • Dış ünite yeterli havalanmıyor • Kompresör arızası • Termostat hatası. Önce filtre temizliği yapın, düzelmezse servis çağırın.',
        'klima soğuk': 'Klima aşırı soğutuyorsa termostat ayarını düşürün (24-26°C ideal). Kapı veya pencere açık kalmasın. Sensör arızası da olabilir.',
        'klima sıcak': 'Klima sıcak hava üretiyorsa: Isıtma modunda olduğunu kontrol edin. Ters çalışma yoksa gaz dolumu veya valf arızası olabilir.',
        'klima su damlatıyor': 'Klima su damlaması normal mi? Az miktarda normaldir. Aşırı damlamada: • Drenaj hattı tıkanmış • Filtre çok kirli • Gaz fazlası • Eğim problemi. Drenaj temizliği ve filtre yıkama önerilir.',
        'klima su akıyor': 'Klima içinden su akıyorsa drenaj tıkanıklığı kesin. Drenaj hortumunu kontrol edin, gerekirse makaronla temizleyin.',
        'klima gürültülü': 'Gürültü kaynakları: • Fan motoru (metal ses) • Kompresör (vurunma sesi) • Titreşim (gevşek montaj) • Su sesi (normal). Sürekli gürültüde servisi arayın.',
        'klima koku': 'Koku nedenleri: • Küf mantarı (en sık) • Yanmış plastik • Deterjan kalıntısı. Filtre temizliği, antibakteriyel spreyler ve düzenli bakım ile önlenir.',
        'klima kapatma': 'Klima kapatma yapmıyorsa uzaktan kumanda pili kontrol edin. PCB kart arızası olabilir. Zorla kapatmak için ana şalteri kapatabilirsiniz.',
        'klima çalışmıyor': 'Klima çalışmıyor: • Priz/elektrik kontrolü • Uzaktan kumanda pili • Devre kesici • PCB kart. Hiçbir ışık yanmıyorsa elektrik problemi var.',
        'klima ışık yanıyor': 'Klima ışığı yanıp sönüyorsa arıza kodunu gösterir. Blink sayısını sayın ve bize bildirin.',

        // KLİMA MARKAYA GÖRE SORUNLAR
        'ariston klima': 'Ariston klimalar: İtalya menşeli, kaliteli ancak parça tedavisi zor. E1-E6 arası kodlar sık. Yetkili servis önerilir.',
        'bosch klima': 'Bosch klimalar: Alman kalitesi, uzun ömürlü. F1-F4 kodları sık görülür. Yedek parça pahalı olabilir.',
        'samsung klima': 'Samsung klimalar: Akıllı özellikler, WiFi kontrol. CE hata kodu yaygın. Filtre temizliği önemli.',
        'lg klima': 'LG klimalar: İnverter teknolojisi iyi. CH hata kodu yaygın. Compressor garantisi 10 yıl.',
        'vestel klima': 'Vestel klimalar: Türk markası, uygun fiyat. E1-E4 kodları sık. Yerli destek güçlü.',
        'arçelik klima': 'Arçelik klimalar: Türkiye\'nin en çok satanı. A1-A5 kodları. Yedek parça bol ve uygun fiyatlı.',
        'beko klima': 'Beko klimalar: Arçelik ile aynı servis ağı. F3 kodu sık. Garanti kapsamı geniş.',
        'mitsubishi klima': 'Mitsubishi klimalar: Japon kalitesi, pahalı ama güvenilir. Zımmermann markası ile işbirliği. Professional bakım şart.',
        'daikin klima': 'Daikin klimalar: Dünya lideri. R-32 gaz kullanır. Akıllı inverter sistemi. P1-P4 kodları önemli.',

        // KLİMA BAKIM VE MONTAJ
        'klima bakım': 'Klima bakımı neden önemli? • Verimlilik %30 artar • Enerji tasarrufu • Ömrü uzar • Arıza önleme. Bakımda: filtre temizliği, gaz kontrolü, elektrik bağlantıları, temizlik, drenaj kontrolü yapılır. Yılda 2 kez önerilir.',
        'klima bakım ne zaman': 'Klima bakım zamanı: • Yaz öncesi (Nisan-Mayıs) - en ideal • Kış öncesi (Eylül-Ekim) • Kullanım sırasında sorun olduğunda. Batman\'da bakım için randevu: 0543 884 72 84',
        'klima bakım fiyat': 'Klima bakım fiyatları: Standart bakım 500-800₺, Gaz dolumu 800-1500₺, Arıza tespit 300-500₺. Detaylı bilgi için iletişime geçin.',
        'klima montaj': 'Klima montajı çok önemli! Doğru montaj: • Performans %100 • Enerji tasarrufu • Arıza riski düşük • Garanti geçerli. Profesyonel ekip şart.',
        'klima montaj fiyat': 'Klima montaj fiyatı: Duvar tipi 800-1500₺, Kaset tipi 1500-2500₺, Multi split 2000-4000₺. Malzeme hariç.',
        'klima gaz dolumu': 'Klima gaz dolumu: R410A, R32 veya R22 gaz tiplerine göre işlem. Fiyat gaz tipi ve miktarına göre değişir (1500-3000₺). Kaçak tespiti sonrası dolum yapılır.',
        'klima gaz': 'Klima gaz tipleri: R410A (eski, yaygın), R32 (yeni, çevre dostu), R22 (çok eski, yasak). Gaz seviyesi profesyonel ölçümle belirlenir.',
        'klima r410a': 'R410A gaz: Eski tip klimalarda kullanılır. Basınç değeri yüksek. Dolum sırasında dikkatli olunmalı.',
        'klima r32': 'R32 gaz: Yeni nesil, daha çevre dostu. A3 yanıcı sınıfında. Özel eğitimli teknisyen şart.',
        'klima filtre': 'Klima filtre temizliği: • 2-4 haftada bir temizleyin • Ilık su + hafif deterjan • Tam kurutun • Takın. Kirli filtre = yüksek elektrik faturası + sağlık sorunları.',

        // KOMBİ ARIZA KODLARI
        'kombi e1': 'E1 hatası: Ateşleme başarısız. • Gaz vanası kapalı • Ateşleme elektrodu arızalı • Gaz basıncı düşük • İyonization elektrodu kontrol edilmeli. Vanası açık olmalı.',
        'kombi e2': 'E2 hatası: Aşırı ısınma. • Düşük su basıncı • Pompa çalışmıyor • Termostat sorunu. Basınç 1-2 bar olmalı.',
        'kombi e3': 'E3 hatası: NTC sensör arızası. Su sıcaklık sensörü arızalı veya bağlantısı kopuk. Değişim gerekli.',
        'kombi e4': 'E4 hatası: Düşük su basıncı. • Su kaçağı • Otomatik doldurma valfi • Genleşme tankı. Basıncı kontrol edin.',
        'kombi e5': 'E5 hatası: Gaz vanası arızası. Gaz valfi kontrolü veya değişimi gerekli. Yetkili teknisyen şart.',
        'kombi e6': 'E6 hatası: Fan motoru arızası. Fan çalışmıyor veya PCB sorunu. Ses varsa fan motoru, sessizse PCB.',
        'kombi e7': 'E7 hatası: Su basınç sensörü. Basınç transduser arızası veya bağlantı problemi.',
        'kombi e8': 'E8 hatası: Pompa arızası. Pompa çalışmıyor veya tıkanıklık. Reset deneyin, düzelmezse değişim.',
        'kombi ea': 'EA hatası: Ateşleme sorunu. Gaz basıncı düşük veya elektrot problemi. Kombiye gaz geliyor mu?',
        'kombi ec': 'EC hatası: Gaz valfi açılmıyor. Gaz valfi arızası veya PCB. Acil servis önerilir.',

        // KOMBİ GENEL SORUNLAR
        'kombi ısıtmıyor': 'Kombi ısıtmıyorsa: 1) Petek vanaları açık mı? 2) Kombi basıncı 1-2 bar mı? 3) Termostat ayarı doğru mu? 4) Peteklerde hava var mı? Hepsi normalse pomp veya eşanjör sorunu.',
        'kombi sesli': 'Kombi gürültülü çalışıyorsa: • Tıkırtı = pompa/tahliye sorunu • Vınlama = fan motoru • Şırıltı = su akışı. Düzelmezse servis.',
        'kombi ses': 'Kombi sesli çalışma: • Rutin çalışma sesi normal • Tıkırtı = hava • Şırıltı = normal • Gürültü = arıza. Petek havası alın.',
        'kombi çalışmıyor': 'Kombi çalışmıyorsa: • Elektrik var mı? • Ekran yanıyor mu? • Reset butonuna basın. Düzelmezse PCB kart sorunu.',
        'kombi sıcak su yok': 'Kombi sıcak su vermiyorsa: • Boyler sensörü arızası • Boyler eşanjör tıkanıklığı • Su giriş vanası kontrolü. Duş sıcaklığı ayarına bakın.',
        'kombi petek ısınmıyor': 'Petekler ısınmıyorsa: • Tüm vanalar açık mı? • Kombi basıncı yeterli mi? • Peteklerde hava var mı? Tüm peteklerde sorun varsa pompa.',
        'kombi petek': 'Petek sorunları: • Alt soğuk üst sıcak = hava • Bir petek ısınmıyor = vanası kapalı • Tüm petekler soğuk = pompa/pcp. Hava alma şart.',
        'kombi basınç': 'Kombi basıncı: Normal 1-2 bar. Düşükse su doldurun (max 2 bar). Yüksekse tahliye yapın. Sürekli düşüyorsa kaçak var.',
        'kombi su basıncı': 'Kombi su basıncı: 1-2 bar ideal. Düşük: radyatörlerde kaçak, genleşme tankı, otomatik doldurma. Yüksek: emniyet valfi açabilir.',
        'kombi su': 'Kombiye su ekleme: Altta mavi/yeşil doldurma musluğu var. Saat yönünde çevirerek 1.5-2 bar arası doldurun.',
        'kombi sıcaklık': 'Kombi sıcaklık ayarı: Kışın 50-60°C (petek sıcaklığı), Yazın sıcak su için 40-50°C. Oda termostatı varsa ondan ayarlayın.',

        // KOMBİ BAKIM
        'kombi bakım': 'Kombi bakımı şart! Yılda en az 1 kez. Bakımda: • Yanma odası temizliği • Elektrot kontrolü • Gaz basıncı • Emniyet ventili • Kontrol kalıbı • Su basıncı. Kış öncesi yaptırın.',
        'kombi bakım fiyat': 'Kombi bakım fiyatı: 800-1500₺ arası. Marka ve modele göre değişir. Kapsamlı bakım + temizlik + ayar. Parça değişimi ayrı.',
        'kombi yıllık bakım': 'Kombi yıllık bakım: Zorunlu değil ama çok önemli. Periyodik bakım = arıza riski %80 azalır + enerji tasarrufu + garanti devamı. Kış öncesi şart.',
        'kombi petek temizliği': 'Petek temizliği: Kimyasal veya mekanik temizlik. 5-7 yılda bir önerilir. Fiyat 1500-3000₺. Temiz petek = %20-30 tasarruf.',
        'kombi garanti': 'Kombi garantisi: İlk 2 yıl tamir. Yetkili servis dışında açılan cihazlar garanti dışı kalır. İşçilik 1 yıl, parça 2 yıl garanti.',

        // KOMBİ MARKA
        'ariston kombi': 'Ariston kombi: İtalyan, yaygın. E1, E2 hataları sık. Yedek parça orta fiyat. Yetkili servis: Batman Diyar Teknik.',
        'bosch kombi': 'Bosch kombi: Alman kalitesi. E3, E6 kodları. Parça pahalı ama dayanıklı. Servis ağı geniş.',
        'vaillant kombi': 'Vaillant kombi: Alman, üst segment. E1, EA kodları. Ekran karmaşık. Yetkili servis önerilir.',
        'buderus kombi': 'Buderus kombi: Bosch grubu. Dayanıklı. E4, E5 kodları. Yedek parça Bosch ile ortak.',
        'demirdöküm kombi': 'Demirdöküm kombi: Türk markası, uygun. E2, E4 kodları. Parça bol ve uygun fiyatlı.',
        'baymak kombi': 'Baymak kombi: Türk markası. Farklı model serileri var. E1, E3 yaygın. Uygun fiyat.',
        'vitopend kombi': 'Viessmann Vitopend: Üst segment. Güvenilir. E1, E2 kodları. Pahalı ama kaliteli.',

        // BUZDOLABI
        'buzdolabı soğutmuyor': 'Buzdolabı soğutmuyor: • Termostat ayarı (3-4 olmalı) • Kapı contası sıkı mı? • Arka bobinler temiz mi? • Kompresör çalışıyor mu? Hiç soğuk değilse gaz kaçağı.',
        'buzdolabı donduruyor': 'Buzdolabı aşırı soğutuyorsa termostat ayarını yükseltin. 5-7 arası deneyin. Düzelmezse termostat sensörü arızası.',
        'buzdolabı gürültülü': 'Buzdolabı gürültüsü: • Hışırtı = normal (gaz akışı) • Vınlama = kompresör • Tıkırtı = defrost zamanı. Sürekli gürültü = arıza.',
        'buzdolabı su damlatıyor': 'Buzdolabı su damlatıyorsa: • Drenaj tıkanıklığı (en sık) • Drenaj pompası arızası • Buz çözme sorunu. Drenaj hattını temizleyin.',
        'buzdolabı koku': 'Buzdolabı kokusu: • Karbonat kasesi koyun • Sirkeli suyla silin • Gıdaları paketleyin • Çürük gıda kontrolü. Düzenli temizlik şart.',
        'buzdolabı elektrik': 'Buzdolabı elektrik kesiyorsa: • Priz/priz kablosu kontrolü • Kompresör rölesi • Aşırı yük. Ampermetre ile ölçüm yapın.',
        'buzdolabı no frost': 'No Frost buz çözme: Otomatik. Fan, ısıtıcı ve timer ile çalışır. Düzenli temizlik şart. Arıza olursa servis.',
        'buzdolabı donmuş': 'Buzdolabı içi buzlanmış: • Kapı sıkı kapanmıyor • Drenaj tıkanık • Defrost arızası. Kapatıp erimesini bekleyin, düzelmezse servis.',
        'buzdolabı yiyecek': 'Buzdolabı yiyecek saklama: • Et/balık = en alt raf • Sebze = çekmeceler • Süt/yoğurt = orta raf • Kolay bozulacak = kapı değil iç kısım.',

        // ÇAMAŞIR MAKINESİ
        'çamaşır makinesi su almıyor': 'Çamaşır makinesi su almıyorsa: • Musluklar açık mı? • Hortum katlanmış mı? • Su basıncı yeterli mi? • Valf arızası. Su giriş vanasını kontrol.',
        'çamaşır makinesi boşaltmıyor': 'Çamaşır makinesi boşaltmıyorsa: • Pompa tıkanıklığı • Drainage hortumı • Pompa arızası. Filtreyi temizleyin, düzelmezse pompa.',
        'çamaşır makinesi dönmüyor': 'Çamaşır makinesi dönmüyorsa: • Motor kayışı kopmuş • Motor arızası • elektronik kart • Yüksek yükleme. Reset atın.',
        'çamaşır makinesi sesli': 'Çamaşır makinesi gürültülü: • Metal ses = metal cisim • Vınlama = motor • Takırtı = amortisör/rulman. Yıkama öncesi cepler kontrol.',
        'çamaşır makinesi yıkamıyor': 'Çamaşır makinesi yıkamıyorsa: • Deterjan bölmesi tıkalı • Program sorunu • Motor problemi. Deterjan çekmecesini temizleyin.',
        'çamaşır makinesi sıkmıyor': 'Çamaşır makinesi sıkmıyorsa: • Pompa tıkanıklığı • Motor güç kaybı • Elektronik kart. Boş çalıştırma yapın.',
        'çamaşır makinesi hata': 'Çamaşır makinesi hata kodu: E1 = su almama, E2 = boşaltma, E3 = kapı, E4 = su baskını, E5 = ısıtma. Kullanım kılavuzuna bakın.',
        'çamaşır makinesi yük': 'Çamaşır makinesi yükü: Kadın = 3-4 kg, Erkek = 4-5 kg, Çocuk = 2-3 kg. Aşırı yükleme = arıza. İç dönme boşluk bırakın.',

        // BULAŞIK MAKINESİ
        'bulaşık makinesi yıkamıyor': 'Bulaşık makinesi yıkamıyorsa: • Filtre tıkalı • Deterjan bitmiş • Püskürtme kolları tıkalı • Su basıncı düşük. Filtre temizliği + kontrol.',
        'bulaşık makinesi su almıyor': 'Bulaşık makinesi su almıyorsa: • Musluk kapalı • Hortum tıkalı • Su valfi arızası. Musluğu açın, hortumu kontrol edin.',
        'bulaşık makinesi boşaltmıyor': 'Bulaşık makinesi boşaltmıyorsa: • Pompa tıkanıklığı • Drainage hortumu • Pompa arızası. Filtreyi temizleyin.',
        'bulaşık makinesi kurutmuyor': 'Bulaşık makinesi kurutmuyorsa: • Kurutma ısıtıcısı arızası • Yanlış program • Kapı açık. Eco dry programı deneyin.',
        'bulaşık makinesi koku': 'Bulaşık makinesi kokusu: • Atık su tıkanıklığı • Filtre kirli • Deterjan kalıntısı. Sirke + karbonat ile temizleyin.',
        'bulaşık makinesi bulaşık': 'Bulaşık makinesi bulaşık bırakıyorsa: • Filtre tıkalı • Püskürtme kolu tıkalı • Deterjan yetersiz • Su sıcaklığı düşük. Temizlik + kontrol.',
        'bulaşık makinesi leke': 'Bulaşık makinesi leke bırakıyorsa: • Cam lekesi = tuz eksik • Beyaz leke =Parlakcı eksik • Sarı = deterjan fazlası. Ayarları kontrol.',
        'bulaşık makinesi kapı': 'Bulaşık makinesi kapı kapanmıyorsa: • Kilit mekanizması arızası • Kapı lastiği • Elektronik kart. Kilit kontrolü yapın.',

        // FİYAT VE SERVİS
        'fiyat': 'Fiyatlarımız için bizi arayabilirsiniz: 0543 884 72 84',
        'fiyat bilgi': 'Fiyat bilgisi için bizi arayabilirsiniz: 0543 884 72 84',
        'fiyatları': 'Fiyatlarımız için bizi arayabilirsiniz: 0543 884 72 84',
        'ne kadar': 'Fiyatlarımız için bizi arayabilirsiniz: 0543 884 72 84',
        
        'fiyatlandırma': 'Fiyatlandırma için bizi arayabilirsiniz: 0543 884 72 84',
        'kaç para': 'Fiyatlarımız için bizi arayabilirsiniz: 0543 884 72 84',
        'fiyat sor': 'Fiyatlarımız için bizi arayabilirsiniz: 0543 884 72 84',
        'servis': 'Batman Diyar Teknik Beyaz Eşya - 15 yılı aşkın deneyim. 7/24 acil servis. Tüm markalara hizmet. Randevu: 0543 884 72 84',
        'randevu': 'Randevu almak için: 0543 884 72 84 WhatsApp veya arama. Aynı gün servis imkanı.',
        'acilservis': '7/24 Acil servis: Gece, hafta sonu, tatil günleri bile hizmet. Acil arızalar için hemen arayın: 0543 884 72 84',
        'keşif': 'Keşif için: Evinize gelip arızayı tespit ediyoruz. Tamir kararı sizin. 0543 884 72 84',
        'garanti': 'Garantili işçilik: Tüm işlerimiz 6 ay garanti. Parça değişiminde orijinal yedek parça. Garanti belgesi veriyoruz.',

        // TEKNİK TERİMLER
        'inverter': 'Inverter klima: Kompresör hızını ayarlayarak enerji tasarrufu sağlar. %50\'ye varan tasarruf. Daha sessiz. Başlangıç fiyatı daha yüksek.',
        'a++': 'Enerji sınıfı: A++ en verimli, G en az verimli. Klimada A++ = %40 tasarruf. Fatura artışı varsa klimayı değiştirmeyi düşünün.',
        'btu': 'BTU: Klima kapasitesi. 12000 BTU = 35m², 18000 BTU = 50m², 24000 BTU = 70m². Oda büyüklüğüne göre seçim şart.',
        'kapasite': 'Klima kapasitesi: Oda m² x 500 = gerekli BTU. 20m² = 10000 BTU, 30m² = 15000 BTU, 40m² = 18000 BTU. Büyük oda = güçlü klima.',
        'eER': 'EER: Soğutma verimliliği. Yüksek EER = az enerji tüketimi. 3.0 üstü iyi. Renkli ürünlerde daha yüksek.',
        'cop': 'COP: Isıtma verimliliği. 3.5 üstü iyi. Inverter klimalar yüksek COP değerine sahip.',
        'gaz kaçağı': 'Gaz kaçağı: Tehlikeli! Koku, performans düşüşü, ses değişikliği. Önce kapatın, pencere açın, hemen servis arayın. Kendiniz tamir etmeyin.',

        // ENERJİ TASARRUFU
        'enerji tasarrufu': 'Enerji tasarrufu için: 1) Filtreleri 2-4 haftada temizleyin 2) 24-26°C ayarLAYIN 3) Klimayı gereksiz açık bırakmayın 4) Kapı/pencereler kapalı 5) Yıllık bakım 6) Inverter model kullanın',
        'elektrik faturası': 'Elektrik faturası yüksekse: Klimayı az kullanın, sıcaklık düşük tutmayın (26°C), inverter kullanın, bakım yaptırın. Gece tarifesi avantajlı.',
        'klima tasarruf': 'Klima tasarruf ipuçları: • A++ ve üzeri • Doğru boyut • Düzenli bakım • Kapalı oda • Gece modu • Timer kullanımı. %40 tasarruf mümkün.',

        // HIZLI SORULAR
        'nasıl çalışır': 'Nasıl çalışıyoruz: 1) Arızanızı dinliyoruz 2) Yerinde keşif yapıyoruz 3) Fiyat teklifi veriyoruz 4) Onay alıyoruz 5) Tamir ediyoruz 6) Garanti belgesi veriyoruz.',
        'neredesiniz': 'Konumumuz: Batman Merkez, Bağlar Mah. 2030 Sok. No:12. Tüm Batman ve ilçelerine servis. Eve geliyoruz.',
        'çalışma saat': 'Çalışma saatleri: 7/24 acil servis. Hafta içi/sonu, gece, bayram tatili fark etmez. Her zaman ulaşabilirsiniz.',
        'kaç yıldır': '15 yılı aşkın süredir Batman\'da klima, kombi ve beyaz eşya servisi yapıyoruz. Binlerce mutlu müşteri.',
        'hangi marka': 'Hangi markalara bakıyoruz: Ariston, Bosch, Samsung, LG, Vestel, Arçelik, Beko, Siemens, Electrolux, Daikin, Mitsubishi, Panasonic ve daha fazlası.',
        'nasıl ulaşırım': 'Bize ulaşım: 📞 0543 884 72 84, 💬 WhatsApp, 📍 Batman Merkez. Her zaman yardımcı oluruz!',
        'teşekkür': 'Teşekkür ederim! Herhangi başka bir sorunuz varsa sormaktan çekinmeyin. Size yardımcı olmaktan mutluluk duyarız! 😊',
        'teşekkürler': 'Rica ederim! Batman Diyar Teknik olarak her zaman hizmetinizdeyiz. İyi günler! 👋',
        'tamam': 'Tamam, yardımcı olabilecek başka bir konu var mı?',
        'olur': 'Harika! Başka bir sorunuz olursa çekinmeden sorun. İyi günler! 😊',
        'evet': 'Harika! Başka ne ile yardımcı olabilirim?',
        'hayır': 'Tamam, herhangi bir sorunuz olduğunda buradayım. İyi günler! 👋'
    };

    function getResponse(message) {
        message = message.toLowerCase().trim();
        console.log('getResponse çalışıyor, mesaj:', message);
        
        var bestMatch = null;
        var bestScore = 0;
        
        for (var keyword in responses) {
            if (responses.hasOwnProperty(keyword)) {
                var keywordLower = keyword.toLowerCase();
                
                if (message.indexOf(keywordLower) !== -1) {
                    var score = keywordLower.length;
                    console.log('Eşleşme bulundu:', keyword, 'score:', score);
                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = responses[keyword];
                    }
                }
            }
        }
        
        if (bestMatch) {
            console.log('En iyi eşleşme:', bestMatch.substring(0, 50) + '...');
            return bestMatch;
        } else {
            console.log('Eşleşme bulunamadı, varsayılan yanıt dönüyor');
            return 'Sorunuz için teşekkürler! Klima, kombi ve beyaz eşya ile ilgili her türlü sorunuzda size yardımcı olabilirim. Daha spesifik bir soru sorabilir veya doğrudan 0543 884 72 84 numaralı hattımızdan bize ulaşabilirsiniz. 📞';
        }
    }

    function addMessage(text, type) {
        if (!aiMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${type}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        aiMessages.appendChild(messageDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function openModal() {
        if (aiModal) {
            aiModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (aiInput) {
                setTimeout(() => aiInput.focus(), 100);
            }
        }
    }

    function closeModal() {
        if (aiModal) {
            aiModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (aiAsistanBtn) {
        console.log('AI Asistan butonu bulundu, tıklama dinleyicisi ekleniyor');
        aiAsistanBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('AI butona tıklandı, modal açılıyor');
            openModal();
        });
    } else {
        console.log('AI Asistan butonu bulunamadı!');
    }

    if (headerCtaBtn) {
        headerCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    if (aiModalClose) {
        aiModalClose.addEventListener('click', closeModal);
    }

    if (aiModal) {
        aiModal.addEventListener('click', function(e) {
            if (e.target === aiModal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && aiModal && aiModal.classList.contains('active')) {
            closeModal();
        }
    });

    if (aiForm) {
        console.log('Form handler ayarlandı');
        aiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submit edildi');
            var message = aiInput ? aiInput.value.trim() : '';
            console.log('Mesaj:', message);
            
            if (message) {
                // Kullanıcı mesajını ekle
                var userDiv = document.createElement('div');
                userDiv.className = 'ai-message user';
                userDiv.innerHTML = '<p>' + message + '</p>';
                if (aiMessages) {
                    aiMessages.appendChild(userDiv);
                    aiMessages.scrollTop = aiMessages.scrollHeight;
                }
                
                if (aiInput) aiInput.value = '';

                setTimeout(function() {
                    console.log('Bot yanıtı aranıyor...');
                    var response = getResponse(message);
                    console.log('Bot yanıtı:', response.substring(0, 30));
                    
                    var botDiv = document.createElement('div');
                    botDiv.className = 'ai-message bot';
                    botDiv.innerHTML = '<p>' + response + '</p>';
                    if (aiMessages) {
                        aiMessages.appendChild(botDiv);
                        aiMessages.scrollTop = aiMessages.scrollHeight;
                    }
                }, 400);
            }
        });
    } else {
        console.log('Form bulunamadı!');
    }

    window.askQuestion = function(question) {
        console.log('askQuestion çağrıldı:', question);
        
        var modal = document.getElementById('aiModal');
        console.log('Modal element:', modal);
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            console.error('Modal bulunamadı!');
            return;
        }
        
        var messagesContainer = document.getElementById('aiMessages');
        console.log('Messages container:', messagesContainer);
        
        if (!messagesContainer) {
            console.error('aiMessages bulunamadı!');
            return;
        }
        
        if (question) {
            var userDiv = document.createElement('div');
            userDiv.className = 'ai-message user';
            userDiv.innerHTML = '<p>' + question + '</p>';
            messagesContainer.appendChild(userDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            console.log('Kullanıcı mesajı eklendi');
            
            setTimeout(function() {
                console.log('Bot yanıtı aranıyor:', question);
                var response = getResponse(question);
                console.log('Bot yanıtı:', response.substring(0, 50) + '...');
                
                var botDiv = document.createElement('div');
                botDiv.className = 'ai-message bot';
                botDiv.innerHTML = '<p>' + response + '</p>';
                messagesContainer.appendChild(botDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                console.log('Bot mesajı eklendi');
            }, 400);
        }
        
        var input = document.getElementById('aiInput');
        if (input) {
            setTimeout(function() { input.focus(); }, 150);
        }
    };

    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            header.style.padding = currentScroll > 100 ? '10px 0' : '15px 0';
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerElement = document.querySelector('.header');
                    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
                    window.scrollTo({
                        top: target.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

window.openAIModal = function() {
    const modal = document.getElementById('aiModal');
    const input = document.getElementById('aiInput');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (input) input.focus();
        console.log('Modal açıldı');
    } else {
        console.log('Modal bulunamadı!');
    }
};

// Global error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('JavaScript Hatası:', msg);
    console.error('Satır:', lineNo, 'Sütun:', columnNo);
    console.error('URL:', url);
    return false;
};

console.log('Script.js yüklendi - AI Asistan hazır');