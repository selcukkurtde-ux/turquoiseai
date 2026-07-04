/* TURQUOISE AI — EN/DE/TR switcher. English is captured from the DOM;
   dictionary holds [German, Turkish] per key. */
(function () {
  var T = {
    "nav.case": ["Der Fall", "Gerekçe"],
    "nav.terms": ["Kleingedrucktes", "İnce yazı"],
    "nav.climate": ["Klima", "İklim"],
    "nav.work": ["Die Arbeit", "İşler"],
    "nav.system": ["Das System", "Sistem"],
    "nav.models": ["Modelle", "Modeller"],
    "nav.cta": ["Erstgespräch buchen", "Görüşme planla"],

    "hero.eyebrow": ["München — lokale LLM-Systeme für regulierte Kanzleien und Praxen", "Münih — regüle sektörler için yerel LLM sistemleri"],
    "hero.t1": ["KI, die niemals", "Binadan asla"],
    "hero.t2": ["das Haus", "çıkmayan"],
    "hero.t3": ['verlässt<span class="title-dot">.</span>', 'yapay zekâ<span class="title-dot">.</span>'],
    "hero.s1": ["Wir planen, bauen und betreiben Sprachmodell-Systeme innerhalb Ihrer Wände —", "Dil modeli sistemlerini sizin duvarlarınızın içinde kuruyor ve işletiyoruz —"],
    "hero.s2": ["für Häuser, deren Akten das Grundstück nicht verlassen dürfen. Recht. Steuern. Medizin.", "dosyaları dışarı çıkamayan firmalar için. Hukuk. Vergi. Tıp."],
    "hero.cta1": ["Erstgespräch buchen", "Görüşme planla"],
    "hero.cta2": ["Warum die Cloud tabu ist", "Bulut neden yasak"],
    "hero.tab1": ["0 Byte verlassen das Haus", "0 bayt dışarı çıkar"],
    "hero.tab2": ["§ 203 StGB per Architektur", "§ 203 StGB mimariyle sağlanır"],
    "hero.tab3": ["Arbeitet die Nacht durch", "Bütün gece çalışır"],

    "m.label": ["Das Mandat", "Yasal zorunluluk"],
    "m.h2": ["Die Cloud ist nicht billiger.<br>Und sie ist tabu.", "Bulut daha ucuz değil.<br>Üstelik yasak."],
    "m.lede": ["Token-Preise wirken winzig, bis man sie zusammenrechnet: pro Platz, pro Monat, für immer — zu Preisen, die ein anderer erhöht, sobald Sie abhängig sind. Über die Lebensdauer schlägt die eigene Maschine die gemietete Intelligenz. Und selbst wenn nicht: <strong>Ihre Akten dürfen ohnehin nicht raus.</strong>", "Token fiyatları toplayana kadar küçük görünür: koltuk başına, her ay, sonsuza dek — ve bağımlı olduğunuz an fiyatı başkası artırır. Makineye sahip olmak, zekâyı damla damla kiralamaktan ucuza gelir. Kaldı ki: <strong>dosyalarınızın dışarı çıkması zaten yasak.</strong>"],
    "m.tag": ["Ehrliche Rechnung", "Dürüst hesap"],
    "m.note": ["Hardware amortisiert sich in vier Jahren und läuft weiter — Abos enden nie. Gemessen an Personalzeit (60–80 T€ pro Routine-Vollzeitstelle und Jahr) rechnet sich das System im ersten Jahr. Wir zeigen Ihnen die Tabelle.", "Donanım dört yılda amorti olur, sonra çalışmaya devam eder — abonelik hiç bitmez. Personel maliyetiyle (rutin işler için yılda 60–80 bin €/FTE) kıyaslandığında sistem ilk yıl kendini öder. Tabloyu birlikte açarız."],
    "m.c1h": ["StGB — Berufsgeheimnis", "StGB — meslek sırrı"],
    "m.c1p": ["Anwälte, Steuerberater und Ärzte haften strafrechtlich für offengelegte Mandanten- und Patientengeheimnisse. Akten in eine fremdkontrollierte Cloud zu geben, ist ein Risiko, das kein Mandatsvertrag wegwischen kann.", "Avukatlar, mali müşavirler ve hekimler müvekkil sırlarının ifşasından cezai olarak sorumludur. Dosyaları yabancı kontrolündeki buluta vermek, hiçbir sözleşmenin silemeyeceği bir risktir."],
    "m.c2h": ["DSGVO — besondere Kategorien", "GDPR — özel nitelikli veri"],
    "m.c2p": ["Gesundheitsdaten und Rechtsangelegenheiten unterliegen den strengsten Verarbeitungsregeln Europas. Der sicherste Auftragsverarbeiter ist der, der die Daten nie erhält.", "Sağlık kayıtları ve hukuki dosyalar Avrupa'nın en katı işleme kurallarına tabidir. En güvenli veri işleyici, veriyi hiç almayandır."],
    "m.c3h": ["US CLOUD Act — fremder Zugriff", "US CLOUD Act — yabancı erişim"],
    "m.c3p": ["US-Anbieter können gezwungen werden, Daten herauszugeben — auch aus einem Frankfurter Rechenzentrum. Der Serverstandort beendet das Risiko nicht. Eigentum schon.", "ABD'li sağlayıcılar, veri nerede olursa olsun teslim etmeye zorlanabilir — Frankfurt'taki veri merkezi dahil. Sunucunun yeri riski bitirmez. Sahiplik bitirir."],

    "t.label": ["Das Kleingedruckte", "İnce yazı"],
    "t.h2": ["Diese Bedingungen würden Sie<br>nirgendwo sonst unterschreiben.", "Bu şartları başka hiçbir<br>sözleşmede imzalamazdınız."],
    "t.lede": ["Lassen Sie das Gesetz kurz beiseite und lesen Sie den Deal selbst. Jedes Cloud-KI-Abo trägt dieselben sechs Klauseln — die meisten bemerken sie erst, wenn sie abhängig sind.", "Yasayı bir an kenara koyun ve anlaşmanın kendisini okuyun. Her bulut yapay zekâ aboneliği aynı altı maddeyi taşır — çoğu firma bunları ancak bağımlı olduktan sonra fark eder."],
    "t.n1": ["Klausel 01", "Madde 01"],
    "t.c1k": ["Gerichtsstand", "Yargı yetkisi"],
    "t.c1h": ["Der Schalter steht in Amerika", "Düğme Amerika'da"],
    "t.c1p": ["Die stärksten Cloud-Modelle betreiben amerikanische Firmen unter amerikanischem Recht. Was Sie darauf bauen, erbt diese Jurisdiktion — und ihre Politik.", "En güçlü bulut modellerini Amerikan şirketleri, Amerikan hukuku altında işletir. Üzerine kurduğunuz her şey o yargı yetkisini — ve siyasetini — miras alır."],
    "t.n2": ["Klausel 02", "Madde 02"],
    "t.c2k": ["Kündigung", "Fesih"],
    "t.c2h": ["Der Zugang kann über Nacht enden", "Erişim bir gecede kesilebilir"],
    "t.c2p": ["Exportregeln verschärfen sich, Richtlinien ändern sich, Konten werden automatisch gesperrt. Jeder Cloud-Vertrag erlaubt dem Anbieter, den Dienst nach eigenem Ermessen auszusetzen. Ihr Workflow läuft auf Zusehen hin.", "İhracat kuralları sıkılaşır, politikalar değişir, hesaplar otomatik sistemlerce işaretlenir. Her bulut sözleşmesi, sağlayıcıya hizmeti keyfince askıya alma hakkı tanır. İş akışınız onların insafına çalışır."],
    "t.n3": ["Klausel 03", "Madde 03"],
    "t.c3k": ["Verwahrung", "Emanet"],
    "t.c3h": ["Ihre Akten werden zur Angriffsfläche", "Dosyalarınız saldırı yüzeyine dönüşür"],
    "t.c3p": ["Alles, was Sie senden, wird übertragen, protokolliert und auf Infrastruktur „zur Missbrauchskontrolle“ vorgehalten, die Sie nie prüfen werden. Datenlecks treffen die größten Namen der Branche. Daten, die nie das Haus verlassen, können unterwegs nicht abfließen.", "Gönderdiğiniz her şey iletilir, loglanır ve asla denetleyemeyeceğiniz bir altyapıda “kötüye kullanım izleme” adına saklanır. Sızıntılar sektörün en büyük isimlerinin başına geliyor. Hiç dışarı çıkmayan veri, yolda sızamaz."],
    "t.n4": ["Klausel 04", "Madde 04"],
    "t.c4k": ["Preise", "Fiyatlandırma"],
    "t.c4h": ["Heutige Preise sind eine Promotion", "Bugünkü fiyatlar promosyon"],
    "t.c4p": ["Token-Preise werden mit Risikokapital subventioniert, um Marktanteile zu gewinnen. Jede subventionierte Plattform der Geschichte hat die Preise erhöht, sobald die Kunden gebunden waren. Kalkulieren Sie mit dem Preis nach der Promotion.", "Token fiyatları pazar payı için risk sermayesiyle sübvanse ediliyor. Tarihteki her sübvansiyonlu platform, müşteriler bağlandıktan sonra zam yaptı. Bütçenizi promosyon sonrası fiyata göre yapın."],
    "t.n5": ["Klausel 05", "Madde 05"],
    "t.c5k": ["Ewigkeit", "Süreklilik"],
    "t.c5h": ["Die Miete endet nie", "Kira asla bitmez"],
    "t.c5p": ["Ein Abo summiert sich ewig und kauft Ihnen nichts. Hardware amortisiert sich in vier Jahren — und läuft weiter. Nur eines davon steht am Ende als Vermögenswert in Ihrer Bilanz.", "Abonelik sonsuza dek birikir ve size hiçbir şey kazandırmaz. Donanım dört yılda amorti olur — sonra çalışmaya devam eder. Bilançonuza varlık olarak yalnızca biri yazılır."],
    "t.n6": ["Klausel 06", "Madde 06"],
    "t.c6k": ["Kontrolle", "Kontrol"],
    "t.c6h": ["Das Modell ändert sich unter Ihnen", "Model altınızdan değişir"],
    "t.c6p": ["Cloud-Modelle werden abgekündigt, ausgetauscht und still nachjustiert. Das Modell, das Sie im Januar validiert haben, antwortet im Juni womöglich anders. Auf eigener Hardware ändert sich nichts, bis Sie es entscheiden.", "Bulut modelleri emekliye ayrılır, değiştirilir, sessizce yeniden ayarlanır. Ocak'ta doğruladığınız model Haziran'da farklı cevap verebilir. Kendi donanımınızda siz karar verene kadar hiçbir şey değişmez."],
    "t.mk": ["Die Kurzfassung", "Kısa özet"],
    "t.mq": ["Besitzen ist attraktiv. Mieten ist Abhängigkeit mit monatlicher Rechnung.", "Sahip olmak çekicidir. Kiralamak, aylık faturalı bağımlılıktır."],

    "cl.label": ["Der Fußabdruck", "Karbon ayak izi"],
    "cl.h2": ["Cloud-KI ist nicht<br>klimafreundlich.", "Bulut yapay zekâ<br>iklim dostu değil."],
    "cl.lede": ["Hyperscale-KI läuft mit dem Strom, der am schnellsten zu bauen ist. Die EU geht den anderen Weg: Mit der Nachhaltigkeits-Berichtspflicht und dem Energieeffizienzgesetz wird ein unkontrollierter KI-Fußabdruck bald zum Kostenpunkt. Ein Rack im eigenen Haus ist ein Fußabdruck, den Sie kontrollieren — und Schritt für Schritt nachhaltig machen können.", "Dev veri merkezleri en hızlı kurulan enerjiyle çalışır. AB ters yöne gidiyor: sürdürülebilirlik raporlaması ve Alman Enerji Verimliliği Yasası ile ölçülmeyen yapay zekâ ayak izi yakında faturasını ödeyeceğiniz bir kaleme dönüşecek. Kendi binanızdaki kabin, kontrol edebildiğiniz — ve adım adım sürdürülebilir kılabileceğiniz — bir ayak izidir."],
    "cl.c1h": ["Winterwärme, wiederverwendet", "Kışın ısı geri kazanılır"],
    "cl.c1p": ["Ein arbeitendes Rack ist ein 3–5-kW-Heizkörper. Im Winter speist seine Abwärme Ihre Gebäudeheizung statt eines Kühlturms — genau die Wärmenutzung, die das deutsche Rechenzentrumsrecht heute belohnt.", "Çalışan bir kabin 3–5 kW'lık bir ısıtıcıdır. Kışın atık ısısı soğutma kulesi yerine binanızın ısıtma devresini besler — Alman veri merkezi mevzuatının bugün ödüllendirdiği ısı geri kazanımı tam da budur."],
    "cl.c2h": ["Strom vom eigenen Dach", "Enerji güneş panellerinden"],
    "cl.c2p": ["Kombinieren Sie das System mit Solarpanelen: Tagsüber läuft die Inferenz auf eigenem Strom, die Nachtschicht zieht günstigen Schwachlaststrom. Ihr Energiemix ist Ihre Entscheidung — der der Cloud nicht.", "Sistemi güneş panelleriyle eşleştirin: gündüz çıkarım kendi ürettiğiniz elektrikle, gece vardiyası ucuz gece tarifesiyle çalışır. Enerji karışımınız sizin seçiminizdir — bulutunki değil."],
    "cl.c3h": ["Gemessen, berichtet, Ihrer", "Ölçülür, raporlanır, sizindir"],
    "cl.c3p": ["Eine Maschine, ein Zähler: Sie können Ihren KI-Fußabdruck in jedem ESG- oder CSRD-Bericht auf die Kilowattstunde genau ausweisen. Versuchen Sie, diese Zahl von einem Hyperscaler zu bekommen.", "Tek makine, tek sayaç: yapay zekâ ayak izinizi her ESG veya CSRD raporunda kilovat-saat hassasiyetiyle beyan edebilirsiniz. Bu rakamı bir hyperscaler'dan almayı bir deneyin."],

    "w.label": ["Die Arbeit", "İşler"],
    "w.h2": ["Absichtlich langweilig.", "Bilerek sıkıcı."],
    "w.lede": ["Keine Agenten, keine Mondmissionen. Diese Systeme erledigen die repetitive Sprachauswertung, die qualifizierte Stunden frisst — jede Nacht, unbeaufsichtigt.", "Ajan yok, ay projesi yok. Bu sistemler, nitelikli personelin saatlerini yiyen tekrarlı dil işlerini yapar — her gece, başında kimse olmadan."],
    "w.c1k": ["ZUSAMMENFASSEN", "ÖZETLE"],
    "w.c1h": ["Aus Akten werden Vermerke", "Dosyadan özete"],
    "w.c1p": ["Eine 214-seitige Akte geht hinein. Ein zweiseitiger Vermerk mit Fundstellen-Zitaten kommt heraus.", "214 sayfalık dosya girer. Kaynak sayfa atıflı iki sayfalık özet çıkar."],
    "w.c2k": ["ENTWERFEN", "TASLAK"],
    "w.c2h": ["Erstentwürfe für Korrespondenz", "İlk taslak yazışmalar"],
    "w.c2p": ["Standardschreiben und Mandanten-Mails, aus der Akte entworfen, prüfbereit — nie ungeprüft versendet.", "Standart yazılar ve müvekkil e-postaları dosyadan taslaklanır, incelemeye hazır — incelenmeden asla gönderilmez."],
    "w.c3k": ["EXTRAHIEREN", "VERİ ÇIKAR"],
    "w.c3h": ["Aus Scans werden Strukturdaten", "Taramadan yapılandırılmış veriye"],
    "w.c3p": ["Namen, Daten, Beträge und Fristen aus gescannten Dokumenten direkt in Ihre Aktenverwaltung.", "İsimler, tarihler, tutarlar ve süreler taranmış belgelerden dosya yönetim alanlarınıza aktarılır."],
    "w.c4k": ["ÜBERSETZEN", "ÇEVİR"],
    "w.c4h": ["DE ⇄ EN, im Haus", "DE ⇄ EN, bina içinde"],
    "w.c4p": ["Verträge und Korrespondenz innerhalb Ihrer Wände übersetzt, Terminologie über die ganze Akte konsistent.", "Sözleşmeler ve yazışmalar duvarlarınızın içinde çevrilir, terminoloji dosya boyunca tutarlı kalır."],
    "w.c5k": ["BERICHTEN", "RAPORLA"],
    "w.c5h": ["Aus Akten werden Berichte", "Dosyadan rapora"],
    "w.c5p": ["Wiederkehrende Statusberichte aus der Akte, in Ihrer Vorlage, auf Ihrem Briefkopf.", "Düzenli durum raporları dosyadan derlenir; sizin şablonunuzla, sizin antetli kâğıdınızda."],
    "w.c6n": ["WEITERGELEITET", "YÖNLENDİRİLDİ"],
    "w.c6k": ["AN MENSCHEN", "İNSANA"],
    "w.c6h": ["Urteilen bleibt Menschensache", "Muhakeme insanda kalır"],
    "w.c6p": ["Braucht eine Aufgabe Urteilsvermögen, leitet das System sie an einen Menschen weiter. Diese Routing-Pipeline ist 80 % dessen, was wir bauen.", "Bir iş muhakeme gerektiriyorsa sistem onu bir insana yönlendirir. O yönlendirme hattı, kurduğumuz işin %80'idir."],

    "n.label": ["Die Nachtschicht", "Gece vardiyası"],
    "n.h2": ["Ihr Büro schläft.<br>Die Warteschlange nicht.", "Ofisiniz uyur.<br>Kuyruk uyumaz."],
    "n.lede": ["Nächtliche Batch-Verarbeitung ist das ehrliche Betriebsmodell für lokale Hardware: Der Rückstand des Tages wird bei Geschäftsschluss eingereiht und bis zum Morgen abgearbeitet. Rund 500 Dokumente pro Nacht decken die Routinelast von ein bis zwei Vollzeitstellen.", "Gece toplu işleme, yerel donanım için dürüst çalışma modelidir: günün birikimi mesai sonunda kuyruğa girer, sabaha kadar işlenir. Gecede ~500 belge, bir-iki tam zamanlı çalışanın rutin yükünü karşılar."],
    "n.cl": ["Dokumente verarbeitet", "belge işlendi"],
    "n.s1": ["<strong>14 h</strong> Verarbeitungsfenster", "<strong>14 sa</strong> işleme penceresi"],
    "n.s2": ["<strong>~500</strong> Dokumente pro Nacht, konservativ", "<strong>~500</strong> belge/gece, muhafazakâr tahmin"],
    "n.s3": ["<strong>09:00</strong> von Ihrem Team beim Kaffee geprüft", "<strong>09:00</strong> ekibiniz kahve eşliğinde inceler"],

    "sy.label": ["Das System", "Sistem"],
    "sy.h2": ["Dimensioniert nach Aktenlast,<br>nicht nach Hype.", "Dosya yükünüze göre,<br>abartıya göre değil."],
    "sy.lede": ["Die meisten Häuser brauchen den Referenzausbau nicht — und wir sagen das auch. Hardware ist die leichten 20 % des Projekts. Die anderen 80 % sind Orchestrierung: Warteschlangen, Validierung und das Routing, das alles Unsichere einem Menschen übergibt.", "Çoğu firmanın referans kuruluma ihtiyacı yok — bunu açıkça söyleriz. Donanım projenin kolay %20'sidir. Kalan %80 orkestrasyondur: kuyruklar, doğrulama ve emin olunamayan her şeyi insana devreden yönlendirme."],
    "sy.cap": ["Referenzausbau — 768 GB VRAM gesamt, ein Rack, kein Uplink nötig.", "Referans kurulum — toplam 768 GB VRAM, tek kabin, dış bağlantı gerekmez."],
    "sy.t1h": ["Pilot", "Pilot"],
    "sy.t1pr": ["0 € Hardware", "0 € donanım"],
    "sy.t1p": ["Zwei Wochen auf einer gemieteten EU-GPU, gebenchmarkt an anonymisierten Proben Ihrer echten Dokumente. Sie sehen Durchsatzzahlen, bevor Sie irgendetwas kaufen.", "Kiralık AB GPU'sunda iki hafta; gerçek belgelerinizin anonimleştirilmiş örnekleriyle test edilir. Hiçbir şey satın almadan önce gerçek hız rakamlarını görürsünüz."],
    "sy.tag": ["Hier landen die meisten", "Çoğu firma burada"],
    "sy.t2h": ["Kanzlei", "Büro"],
    "sy.t2p": ["Ein Server, zwei 96-GB-GPUs, der komplette Orchestrierungs-Stack. Reicht für 10–50 Berufsträger, mit Reserven.", "Tek sunucu, iki 96 GB GPU, tam orkestrasyon yığını. 10–50 kişilik bir ofisi fazlasıyla karşılar."],
    "sy.t3h": ["Referenz", "Referans"],
    "sy.t3p": ["8× 96-GB-GPUs, 768 GB VRAM, EPYC-Kopfknoten. Für Gruppen, die zehntausende Dokumente pro Nacht verarbeiten.", "8× 96 GB GPU, 768 GB VRAM, EPYC ana düğüm. Gecede on binlerce belge işleyen gruplar için."],

    "mo.label": ["Die Modelle", "Modeller"],
    "mo.h2": ["Offene Gewichte, gemessen.", "Açık ağırlıklar, ölçülmüş."],
    "mo.lede": ["Jedes Modell hier ist open-weight: Sie laden die Datei, sie läuft auf Ihrem Rack, und niemand kann sie zurücknehmen. Die offene Front — GLM, DeepSeek, Kimi, Qwen, Mistral — liegt nur noch Monate hinter den geschlossenen Laboren. Für Büroarbeit spielt dieser Abstand keine Rolle mehr.", "Buradaki her model açık ağırlıklı: dosyayı indirirsiniz, kendi kabininizde çalışır ve kimse geri alamaz. Açık cephe — GLM, DeepSeek, Kimi, Qwen, Mistral — kapalı laboratuvarların artık yalnızca aylar gerisinde. Ofis işleri için bu fark önemini yitirdi."],
    "mo.bh": ["SWE-Bench Pro · % gelöste Aufgaben", "SWE-Bench Pro · çözülen görev %"],
    "mo.note": ["Ein Modell, das Sie besitzen können, liegt heute zwischen GPT-5.5 und dem geschlossenen Spitzenreiter. Herstellerangaben mit Agent-Gerüst — unabhängige Prüfung steht aus. Ein Benchmark ist ein Signal, kein Urteil: Schritt 02 misst alles an Ihren Dokumenten nach.", "Sahip olabileceğiniz bir model bugün GPT-5.5 ile kapalı liderin arasında duruyor. Üretici beyanı, ajan iskelesiyle — bağımsız doğrulama bekleniyor. Tek benchmark bir sinyaldir, hüküm değil: Adım 02 her şeyi sizin belgelerinizde yeniden ölçer."],
    "mo.c1l": ["Open-Weight-Gesamtwertung, Juli 2026", "açık ağırlık genel sıralaması, Temmuz 2026"],
    "mo.c1p": ["Führt die offenen Ranglisten über Logik, Code und Wissen an. Kandidat als Arbeitspferd der Referenzstufe.", "Akıl yürütme, kod ve bilgide açık sıralamaların lideri. Referans kademesinin iş atı adayı."],
    "mo.c2p": ["Die offene Spitze im logischen Schließen — für Extraktions- und Analyseläufe, bei denen das Modell nicht raten darf.", "Açık modellerde akıl yürütme lideri — modelin tahmin etmemesi gereken çıkarım ve analiz geçişleri için."],
    "mo.c3l": ["Token Kontextfenster", "token bağlam penceresi"],
    "mo.c3p": ["Ganze Akten in einem Durchlauf — kein Stückeln, keine verlorenen Querverweise. 59,0 % SWE-Bench Pro.", "Koca dosyalar tek geçişte — bölme yok, kaybolan çapraz atıf yok. SWE-Bench Pro %59,0."],
    "mo.c4p": ["Das Arbeitspferd der Kanzleistufe: ~3B aktive Parameter, Ergebnisse nahe der Front, schnell auf einer einzelnen GPU.", "Büro kademesinin iş atı: ~3B aktif parametre, sınıra yakın sonuçlar, tek GPU'da hızlı."],
    "mo.c5l": ["mehrsprachiges MMLU", "çok dilli MMLU"],
    "mo.c5p": ["Das europäische Flaggschiff — 675B MoE unter Apache-2.0, stärkste offene Option für deutschsprachige Arbeit.", "Avrupa'nın amiral gemisi — Apache-2.0 lisanslı 675B MoE, Almanca işler için en güçlü açık seçenek."],
    "mo.c6l": ["VRAM genügen ihm", "VRAM yeterli"],
    "mo.c6p": ["Der kompakte Router: sortiert die Warteschlange und erledigt einfache Aufgaben, damit die großen Modelle ihre Watt verdienen.", "Kompakt yönlendirici: kuyruğu ayıklar, basit işleri bitirir; büyük modeller vatlarını hak eder."],
    "g.ow": ["Offene Gewichte", "Açık ağırlıklar"],
    "g.sc": ["Serverklasse", "Sunucu sınıfı"],
    "g.pc": ["Kanzleiklasse", "Büro sınıfı"],
    "g.wc": ["Workstation-Klasse", "İş istasyonu sınıfı"],
    "mo.pt": ["Herkunft, ehrlich behandelt", "Menşe meselesi, dürüstçe"],
    "mo.p1": ["Die meisten Open-Weight-Spitzenreiter kommen aus chinesischen Laboren. Auf Ihrem Rack ist das eine Präferenzfrage, keine Datenfrage: Gewichte sind statische Dateien hinter einem Air-Gap, nichts telefoniert nach Hause. Wenn Ihre Hauspolitik trotzdem Europa oder Amerika verlangt — Mistral und Gemma bleiben auf der Bank.", "Açık ağırlık liderlerinin çoğu Çinli laboratuvarlardan. Kendi kabininizde bu bir tercih sorusudur, veri sorusu değil: ağırlıklar hava boşluğunun arkasında duran statik dosyalardır, hiçbir şey eve telefon etmez. Kurum politikanız yine de Avrupa veya Amerika diyorsa — Mistral ve Gemma yedek kulübesinde hazır."],
    "mo.p2": ["Auch keine Modelltreue: Der Stack wird vierteljährlich an Ihren eigenen Dokumenten nachgemessen; was gewinnt, läuft. Quellen: öffentliche Ranglisten und Herstellerberichte, Juli 2026 — vor dem Kauf auf Ihrer Hardware nachgeprüft.", "Model sadakati de yok: yığın üç ayda bir kendi belgelerinizle yeniden ölçülür; kazanan çalışır. Kaynaklar: kamuya açık sıralamalar ve üretici raporları, Temmuz 2026 — satın almadan önce sizin donanımınızda doğrulanır."],

    "pr.label": ["Der Ablauf", "Süreç"],
    "pr.h2": ["Vier Schritte.<br>Keiner wird übersprungen.", "Dört adım.<br>Hiçbiri atlanmaz."],
    "pr.s1h": ["Scoping", "Kapsam"],
    "pr.s1p": ["Ein Gespräch, eine Woche. Wir ordnen Ihre wiederkehrenden Aufgaben dem zu, was lokale Modelle wirklich gut können — mit Rechtsgrundlage neben jeder einzelnen.", "Bir görüşme, bir hafta. Tekrarlayan işlerinizi yerel modellerin gerçekten iyi yaptıklarıyla eşleştiririz — her birinin yanına yasal dayanağını koyarız."],
    "pr.s2h": ["Benchmark", "Benchmark"],
    "pr.s2p": ["Anonymisierte Proben, eine gemietete EU-GPU, ein unterschriebener Durchsatzbericht. Sie sehen echte Zahlen, bevor ein Euro in Hardware fließt.", "Anonim örnekler, kiralık AB GPU'su, imzalı bir hız raporu. Donanıma tek euro harcamadan gerçek rakamları görürsünüz."],
    "pr.s3h": ["Aufbau", "Kurulum"],
    "pr.s3p": ["Hardware in Ihrem Rack, Modelle auf Ihre Dokumenttypen abgestimmt, Warteschlange und Prüf-Pipeline in Ihre Aktenverwaltung eingebunden.", "Donanım sizin kabininizde, modeller belge türlerinize göre ayarlı, kuyruk ve inceleme hattı dosya yönetiminize bağlı."],
    "pr.s4h": ["Betrieb", "İşletme"],
    "pr.s4p": ["Ein Wartungs-Retainer: Monitoring, Modell-Updates, vierteljährliche Nachmessungen. Das System wird besser, so wie die offenen Modelle es werden.", "Bakım anlaşması: izleme, model güncellemeleri, üç aylık yeniden ölçümler. Açık modeller geliştikçe sistem de gelişir."],

    "tk.s1": ["Der europäische Weg der KI-Entwicklung — frei von Amerika & anderen", "Avrupa usulü yapay zekâ — Amerika'dan ve diğerlerinden bağımsız"],
    "tk.s2": ["KI dort, wo sie wirklich zählt", "Yapay zekâ, gerçekten önemli olduğu yerde"],
    "tk.s3": ["Die Zukunft sind lokale LLMs, nicht gigantische Rechenzentren", "Gelecek yerel LLM'lerde, devasa veri merkezlerinde değil"],

    "c.h2": ["Bringen Sie das Modell<br>zu den Daten.", "Modeli veriye<br>getirin."],
    "c.lede": ["Ein 30-minütiges Erstgespräch zeigt, ob On-Premise für Ihr Haus sinnvoll ist. Wenn nicht, sagen wir es Ihnen im Gespräch.", "30 dakikalık bir görüşme, on-premise'in firmanız için mantıklı olup olmadığını gösterir. Değilse, bunu görüşmede açıkça söyleriz."],
    "c.b1": ["Erstgespräch buchen", "Görüşme planla"],
    "c.b2": ["Kontakt — selcuk.kurt.de@gmail.com", "İletişim — selcuk.kurt.de@gmail.com"],

    "f.l1": ["TURQUOISE AI — On-Premise-Sprachsysteme · München", "TURQUOISE AI — yerinde dil sistemleri · Münih"],
    "f.c": ["Kontakt", "İletişim"]
  };

  var els = document.querySelectorAll('[data-i18n]');
  var en = {};
  els.forEach(function (el) { if (!(el.dataset.i18n in en)) en[el.dataset.i18n] = el.innerHTML; });

  function apply(lang) {
    els.forEach(function (el) {
      var k = el.dataset.i18n;
      if (lang === 'en') el.innerHTML = en[k];
      else if (T[k]) el.innerHTML = T[k][lang === 'de' ? 0 : 1];
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.lang === lang);
    });
    try { localStorage.setItem('tq-lang', lang); } catch (e) {}
  }

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { apply(b.dataset.lang); });
  });

  var saved = 'en';
  try { saved = localStorage.getItem('tq-lang') || 'en'; } catch (e) {}
  if (saved !== 'en' && (saved === 'de' || saved === 'tr')) apply(saved);
})();
