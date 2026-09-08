import img_mona_lisa from "@/assets/art/mona-lisa.jpg";
import img_vitruvianischer_mensch from "@/assets/art/vitruvianischer-mensch.jpg";
import img_erschaffung_adams from "@/assets/art/erschaffung-adams.jpg";
import img_wanderer_nebelmeer from "@/assets/art/wanderer-nebelmeer.jpg";
import img_moench_am_meer from "@/assets/art/moench-am-meer.jpg";
import img_impression_sonnenaufgang from "@/assets/art/impression-sonnenaufgang.jpg";
import img_seerosen from "@/assets/art/seerosen.jpg";
import img_sternennacht from "@/assets/art/sternennacht.jpg";
import img_sonnenblumen from "@/assets/art/sonnenblumen.jpg";
import img_komposition_vii from "@/assets/art/komposition-vii.jpg";
import img_komposition_viii from "@/assets/art/komposition-viii.jpg";
import img_gelb_rot_blau from "@/assets/art/gelb-rot-blau.jpg";
import img_schule_von_athen from "@/assets/art/schule-von-athen.jpg";
import img_sixtinische_madonna from "@/assets/art/sixtinische-madonna.jpg";
import img_geburt_der_venus from "@/assets/art/geburt-der-venus.jpg";
import img_primavera from "@/assets/art/primavera.jpg";
import img_duerer_selbstbildnis from "@/assets/art/duerer-selbstbildnis.jpg";
import img_feldhase from "@/assets/art/feldhase.jpg";
import img_arnolfini from "@/assets/art/arnolfini-hochzeit.jpg";
import img_mann_mit_turban from "@/assets/art/mann-mit-turban.jpg";
import img_nachtwache from "@/assets/art/nachtwache.jpg";
import img_rembrandt_selbst from "@/assets/art/rembrandt-selbstbildnis.jpg";
import img_perlenohrring from "@/assets/art/maedchen-mit-perlenohrring.jpg";
import img_milchmagd from "@/assets/art/dienstmagd-mit-milchkrug.jpg";
import img_matthaeus from "@/assets/art/berufung-des-matthaeus.jpg";
import img_judith from "@/assets/art/judith-holofernes.jpg";
import img_las_meninas from "@/assets/art/las-meninas.jpg";
import img_venus_spiegel from "@/assets/art/venus-vor-dem-spiegel.jpg";
import img_kreuzabnahme from "@/assets/art/kreuzabnahme.jpg";
import img_pelzchen from "@/assets/art/das-pelzchen.jpg";
import img_temeraire from "@/assets/art/die-kaempfende-temeraire.jpg";
import img_regen_dampf from "@/assets/art/regen-dampf-geschwindigkeit.jpg";
import img_dritter_mai from "@/assets/art/der-dritte-mai.jpg";
import img_saturn from "@/assets/art/saturn.jpg";
import img_freiheit from "@/assets/art/freiheit-fuehrt-das-volk.jpg";
import img_sardanapal from "@/assets/art/tod-des-sardanapal.jpg";
import img_galette from "@/assets/art/moulin-de-la-galette.jpg";
import img_ruderer from "@/assets/art/fruehstueck-der-ruderer.jpg";
import img_ballettprobe from "@/assets/art/die-ballettprobe.jpg";
import img_absinth from "@/assets/art/der-absinth.jpg";
import img_fruehstueck_gruenen from "@/assets/art/fruehstueck-im-gruenen.jpg";
import img_folies from "@/assets/art/bar-in-den-folies-bergere.jpg";
import img_kinderbad from "@/assets/art/das-bad-des-kindes.jpg";
import img_bootspartie from "@/assets/art/die-bootspartie.jpg";
import img_sainte_victoire from "@/assets/art/mont-sainte-victoire.jpg";
import img_kartenspieler from "@/assets/art/die-kartenspieler.jpg";
import img_woher from "@/assets/art/woher-kommen-wir.jpg";
import img_vision from "@/assets/art/vision-nach-der-predigt.jpg";
import img_grande_jatte from "@/assets/art/sonntagnachmittag-grande-jatte.jpg";
import img_asnieres from "@/assets/art/badende-von-asnieres.jpg";
import img_moulin_warner from "@/assets/art/im-moulin-rouge.jpg";
import img_la_goulue from "@/assets/art/moulin-rouge-la-goulue.jpg";
import img_der_kuss from "@/assets/art/der-kuss.jpg";
import img_adele from "@/assets/art/adele-bloch-bauer.jpg";
import img_schrei from "@/assets/art/der-schrei.jpg";
import img_maedchen_bruecke from "@/assets/art/lebenstanz.jpg";
import img_mondrian_rby from "@/assets/art/komposition-rot-blau-gelb.jpg";
import img_tableau_i from "@/assets/art/tableau-i.jpg";
import img_blaues_pferd from "@/assets/art/blaues-pferd.jpg";
import img_blaue_pferde from "@/assets/art/die-grossen-blauen-pferde.jpg";

import { extraEpochs, extraPainters, extraStyles, extraWorks } from "./art-catalog-extra";

export type WorkData = {
  id: string;
  title: string;
  year: string;
  image: string;
  painter: string;
  museum: string;
  technique: string;
  description: string;
  significance: string;
  reception: string;
  styles: string[];
};

export type PainterData = {
  slug: string;
  name: string;
  life: string;
  origin: string;
  bio: string;
  epoch: string;
  styles: string[];
};

export type EpochData = {
  slug: string;
  name: string;
  period: string;
  description: string;
};

export type Style = {
  slug: string;
  name: string;
  period: string;
  description: string;
};

const baseEpochData: EpochData[] = [
  {
    slug: "renaissance",
    name: "Renaissance",
    period: "ca. 1400–1600",
    description:
      "Die Wiedergeburt der Antike: Zentralperspektive, Anatomie und Humanismus prägen eine Kunst, die den Menschen ins Zentrum stellt.",
  },
  {
    slug: "barock",
    name: "Barock",
    period: "ca. 1600–1750",
    description:
      "Licht gegen Dunkel, Bewegung gegen Ruhe: Der Barock inszeniert das Bild wie eine Bühne – theatralisch, körperlich, überwältigend.",
  },
  {
    slug: "romantik",
    name: "Romantik",
    period: "ca. 1780–1850",
    description:
      "Gefühl statt Vernunft: Die Romantik feiert die Erhabenheit der Natur, die Sehnsucht und das Unendliche – oft mit Rückenfiguren, die den Betrachter ins Bild ziehen.",
  },
  {
    slug: "impressionismus",
    name: "Impressionismus",
    period: "ca. 1860–1900",
    description:
      "Malerei im Freien: Flüchtige Lichtstimmungen, sichtbare Pinselstriche und das moderne Leben lösen die glatte akademische Malerei ab.",
  },
  {
    slug: "postimpressionismus",
    name: "Post-Impressionismus",
    period: "ca. 1880–1905",
    description:
      "Nach dem Augenblick kommt die Struktur: Farbe wird Ausdruck, Form wird Konstruktion – die direkte Vorstufe der Moderne.",
  },
  {
    slug: "moderne",
    name: "Klassische Moderne",
    period: "ca. 1900–1945",
    description:
      "Abschied von der Abbildung: Farbe, Linie und Form werden zu eigenen Sprachen. Die abstrakte Kunst befreit das Bild vom Gegenstand.",
  },
];

const baseStyles: Style[] = [
  {
    slug: "hochrenaissance",
    name: "Hochrenaissance",
    period: "1490–1530",
    description:
      "Ausgewogene Komposition, ideale Proportion und ruhige Monumentalität – die klassische Norm der europäischen Malerei.",
  },
  {
    slug: "fruehrenaissance",
    name: "Frührenaissance",
    period: "1400–1490",
    description:
      "Erste Entdeckung der Perspektive und der antiken Mythologie, noch mit linearer Eleganz und zarter Zeichnung.",
  },
  {
    slug: "nordische-renaissance",
    name: "Nordische Renaissance",
    period: "1420–1580",
    description:
      "Nördlich der Alpen: Ölmalerei in mikroskopischer Genauigkeit, bürgerliche Auftraggeber, Symbolik im Detail.",
  },
  {
    slug: "tenebrismus",
    name: "Tenebrismus / Caravaggismus",
    period: "1600–1650",
    description:
      "Extreme Hell-Dunkel-Kontraste: Figuren treten wie im Scheinwerferlicht aus tiefem Schwarz hervor.",
  },
  {
    slug: "barockmalerei",
    name: "Barockmalerei",
    period: "1600–1750",
    description:
      "Bewegte Diagonalen, üppige Körperlichkeit und dramatische Inszenierung im Dienst von Kirche und Hof.",
  },
  {
    slug: "hollaendisches-goldenes-zeitalter",
    name: "Holländisches Goldenes Zeitalter",
    period: "1600–1680",
    description:
      "Bürgerliche Porträts, Innenräume und Alltagsszenen – gemalt für einen freien Kunstmarkt statt für Fürsten.",
  },
  {
    slug: "romantische-malerei",
    name: "Romantische Malerei",
    period: "1780–1850",
    description:
      "Das Erhabene, das Unheimliche und die Sehnsucht: Natur und Geschichte als Spiegel des Inneren.",
  },
  {
    slug: "impressionistische-malerei",
    name: "Impressionismus",
    period: "1860–1900",
    description:
      "Licht, Atmosphäre und Bewegung, direkt vor dem Motiv gemalt, mit offener, sichtbarer Pinselschrift.",
  },
  {
    slug: "postimpressionistische-malerei",
    name: "Post-Impressionismus",
    period: "1880–1905",
    description:
      "Persönliche Handschrift, symbolische Farbe und konstruktive Form als Antwort auf den Impressionismus.",
  },
  {
    slug: "pointillismus",
    name: "Pointillismus / Neoimpressionismus",
    period: "1884–1905",
    description:
      "Das Bild aus reinen Farbpunkten: eine wissenschaftlich begründete Malweise, die im Auge des Betrachters mischt.",
  },
  {
    slug: "symbolismus",
    name: "Symbolismus",
    period: "1885–1910",
    description:
      "Traum, Mythos und Seelenzustand statt sichtbarer Wirklichkeit – Farbe und Form werden zur Chiffre.",
  },
  {
    slug: "jugendstil",
    name: "Jugendstil / Wiener Secession",
    period: "1895–1915",
    description:
      "Ornament, Fläche und Gold: dekorative Linienkunst zwischen Kunsthandwerk und Malerei.",
  },
  {
    slug: "expressionismus",
    name: "Expressionismus",
    period: "1905–1925",
    description:
      "Gesteigerte Farbe und verzerrte Form als direkter Ausdruck von Angst, Ekstase und innerer Erfahrung.",
  },
  {
    slug: "blauer-reiter",
    name: "Der Blaue Reiter",
    period: "1911–1914",
    description:
      "Münchner Künstlergruppe um Kandinsky und Marc: Farbe als geistige Kraft, Tier und Landschaft als Symbol.",
  },
  {
    slug: "abstrakte-kunst",
    name: "Abstrakte Malerei",
    period: "ab 1910",
    description:
      "Das Bild ohne Gegenstand: Farbe, Linie und Rhythmus tragen die Bedeutung ganz allein.",
  },
  {
    slug: "de-stijl",
    name: "De Stijl / Neoplastizismus",
    period: "1917–1931",
    description:
      "Nur Waagerechte, Senkrechte und Grundfarben: eine radikale Reduktion auf universelle Ordnung.",
  },
  {
    slug: "abstrakter-expressionismus",
    name: "Abstrakter Expressionismus (New Yorker Schule)",
    period: "1943–1965",
    description:
      "New York wird zum Zentrum der Kunstwelt: riesige Formate, Drip Painting und Farbfeldmalerei. Die Werke selbst sind urheberrechtlich geschützt – im Katalog begleitet dich diese Strömung als Kunstreise.",
  },
  {
    slug: "nachkriegsmalerei",
    name: "Nachkriegsmalerei",
    period: "1945–1970",
    description:
      "Zwischen Trauma und Neuanfang: Informel, Tachismus und ZERO in Europa, Klein-Blau und Materialbilder statt Erzählung. Als Kunstreise im Katalog erzählt.",
  },
];

const basePainterData: PainterData[] = [
  // ---------- Renaissance ----------
  {
    slug: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    life: "1452–1519",
    origin: "Vinci, Italien",
    epoch: "renaissance",
    styles: ["hochrenaissance"],
    bio: "Universalgenie der italienischen Renaissance: Maler, Bildhauer, Architekt und Naturforscher. Seine Sfumato-Technik – weiche, rauchige Übergänge – machte seine Porträts unsterblich.",
  },
  {
    slug: "michelangelo",
    name: "Michelangelo Buonarroti",
    life: "1475–1564",
    origin: "Caprese, Italien",
    epoch: "renaissance",
    styles: ["hochrenaissance"],
    bio: "Bildhauer, Maler und Architekt der Hochrenaissance. Er sah sich vor allem als Bildhauer – sein Deckenfresko der Sixtinischen Kapelle wurde dennoch zum Inbegriff abendländischer Malerei.",
  },
  {
    slug: "raffael",
    name: "Raffael",
    life: "1483–1520",
    origin: "Urbino, Italien",
    epoch: "renaissance",
    styles: ["hochrenaissance"],
    bio: "Der dritte Große der Hochrenaissance neben Leonardo und Michelangelo. Raffael galt Jahrhunderte lang als Maß aller Dinge: klare Komposition, milde Anmut, vollkommene Harmonie.",
  },
  {
    slug: "botticelli",
    name: "Sandro Botticelli",
    life: "1445–1510",
    origin: "Florenz, Italien",
    epoch: "renaissance",
    styles: ["fruehrenaissance"],
    bio: "Maler am Hof der Medici. Seine linear-eleganten Mythologien verbinden antike Dichtung mit christlicher Philosophie – und wurden erst im 19. Jahrhundert wiederentdeckt.",
  },
  {
    slug: "albrecht-duerer",
    name: "Albrecht Dürer",
    life: "1471–1528",
    origin: "Nürnberg, Deutschland",
    epoch: "renaissance",
    styles: ["nordische-renaissance"],
    bio: "Der erste Künstlerstar nördlich der Alpen. Dürer brachte die italienische Theorie nach Deutschland und machte Druckgrafik zum Massenmedium.",
  },
  {
    slug: "jan-van-eyck",
    name: "Jan van Eyck",
    life: "um 1390–1441",
    origin: "Flandern",
    epoch: "renaissance",
    styles: ["nordische-renaissance"],
    bio: "Meister der altniederländischen Malerei. Er perfektionierte die Ölfarbe und erreichte eine Detailschärfe, die Zeitgenossen für Zauberei hielten.",
  },

  // ---------- Barock ----------
  {
    slug: "rembrandt",
    name: "Rembrandt van Rijn",
    life: "1606–1669",
    origin: "Leiden, Niederlande",
    epoch: "barock",
    styles: ["barockmalerei", "hollaendisches-goldenes-zeitalter"],
    bio: "Der große Erzähler des Goldenen Zeitalters. Rembrandt malte Licht als seelischen Vorgang und hielt in rund 80 Selbstbildnissen sein eigenes Altern fest.",
  },
  {
    slug: "vermeer",
    name: "Johannes Vermeer",
    life: "1632–1675",
    origin: "Delft, Niederlande",
    epoch: "barock",
    styles: ["hollaendisches-goldenes-zeitalter"],
    bio: "Nur rund 35 gesicherte Bilder – und doch der stillste Star der Kunstgeschichte. Vermeer malte Innenräume, in denen Zeit stillzustehen scheint.",
  },
  {
    slug: "caravaggio",
    name: "Michelangelo Merisi da Caravaggio",
    life: "1571–1610",
    origin: "Mailand, Italien",
    epoch: "barock",
    styles: ["tenebrismus", "barockmalerei"],
    bio: "Revolutionär und Raufbold. Er holte Heilige von der Straße ins Bild und erfand mit dem Scheinwerferlicht des Tenebrismus eine neue Bildsprache.",
  },
  {
    slug: "velazquez",
    name: "Diego Velázquez",
    life: "1599–1660",
    origin: "Sevilla, Spanien",
    epoch: "barock",
    styles: ["barockmalerei"],
    bio: "Hofmaler Philipps IV. und Malerfürst des spanischen Goldenen Zeitalters. Seine lockere Pinselschrift nahm den Impressionismus um 200 Jahre vorweg.",
  },
  {
    slug: "rubens",
    name: "Peter Paul Rubens",
    life: "1577–1640",
    origin: "Siegen / Antwerpen",
    epoch: "barock",
    styles: ["barockmalerei"],
    bio: "Diplomat, Unternehmer und produktivster Maler des Barock. Sein Antwerpener Atelier lieferte Altarbilder und Zyklen für ganz Europa.",
  },

  // ---------- Romantik ----------
  {
    slug: "caspar-david-friedrich",
    name: "Caspar David Friedrich",
    life: "1774–1840",
    origin: "Greifswald, Deutschland",
    epoch: "romantik",
    styles: ["romantische-malerei"],
    bio: "Der bedeutendste Maler der deutschen Romantik. Seine nebligen Landschaften und einsamen Rückenfiguren sind Meditationen über Natur, Vergänglichkeit und das Unendliche.",
  },
  {
    slug: "william-turner",
    name: "William Turner",
    life: "1775–1851",
    origin: "London, England",
    epoch: "romantik",
    styles: ["romantische-malerei"],
    bio: "Der „Maler des Lichts“. Turner löste Schiffe, Stürme und Sonnen in Farbnebel auf – ein Wegbereiter von Impressionismus und Abstraktion.",
  },
  {
    slug: "francisco-de-goya",
    name: "Francisco de Goya",
    life: "1746–1828",
    origin: "Fuendetodos, Spanien",
    epoch: "romantik",
    styles: ["romantische-malerei"],
    bio: "Hofmaler und schonungsloser Chronist von Krieg und Wahn. Sein Spätwerk gilt als Beginn der modernen, psychologisch aufgeladenen Malerei.",
  },
  {
    slug: "eugene-delacroix",
    name: "Eugène Delacroix",
    life: "1798–1863",
    origin: "Saint-Maurice, Frankreich",
    epoch: "romantik",
    styles: ["romantische-malerei"],
    bio: "Kopf der französischen Romantik. Er setzte gegen die kühle Linie des Klassizismus glühende Farbe, Bewegung und Leidenschaft.",
  },

  // ---------- Impressionismus ----------
  {
    slug: "claude-monet",
    name: "Claude Monet",
    life: "1840–1926",
    origin: "Paris, Frankreich",
    epoch: "impressionismus",
    styles: ["impressionistische-malerei"],
    bio: "Begründer des Impressionismus. Monet malte dasselbe Motiv – Kathedralen, Heuhaufen, Seerosen – immer wieder, um das wechselnde Licht des Augenblicks festzuhalten.",
  },
  {
    slug: "auguste-renoir",
    name: "Pierre-Auguste Renoir",
    life: "1841–1919",
    origin: "Limoges, Frankreich",
    epoch: "impressionismus",
    styles: ["impressionistische-malerei"],
    bio: "Der Maler des heiteren Lebens. Renoir interessierte weniger die Landschaft als der Mensch: tanzende Paare, Sonnenflecken auf Haut und Stoff.",
  },
  {
    slug: "edgar-degas",
    name: "Edgar Degas",
    life: "1834–1917",
    origin: "Paris, Frankreich",
    epoch: "impressionismus",
    styles: ["impressionistische-malerei"],
    bio: "Beobachter der Bühne und der Bars. Degas komponierte wie ein Fotograf: angeschnittene Figuren, steile Perspektiven, beiläufige Momente.",
  },
  {
    slug: "edouard-manet",
    name: "Édouard Manet",
    life: "1832–1883",
    origin: "Paris, Frankreich",
    epoch: "impressionismus",
    styles: ["impressionistische-malerei"],
    bio: "Der Wegbereiter der Moderne. Manet provozierte das Publikum mit flachen Farbflächen und Motiven aus dem Pariser Alltag statt Mythologie.",
  },
  {
    slug: "mary-cassatt",
    name: "Mary Cassatt",
    life: "1844–1926",
    origin: "Pennsylvania, USA",
    epoch: "impressionismus",
    styles: ["impressionistische-malerei"],
    bio: "Amerikanerin in Paris und einzige US-Künstlerin, die mit den Impressionisten ausstellte. Sie machte Mutter-Kind-Szenen zu modernen, unsentimentalen Bildern.",
  },

  // ---------- Post-Impressionismus ----------
  {
    slug: "vincent-van-gogh",
    name: "Vincent van Gogh",
    life: "1853–1890",
    origin: "Zundert, Niederlande",
    epoch: "postimpressionismus",
    styles: ["postimpressionistische-malerei", "expressionismus"],
    bio: "Post-Impressionist mit unverwechselbarer Handschrift: dichte, wogende Pinselstriche und leuchtende Farben. Zu Lebzeiten kaum beachtet, heute einer der bekanntesten Maler der Welt.",
  },
  {
    slug: "paul-cezanne",
    name: "Paul Cézanne",
    life: "1839–1906",
    origin: "Aix-en-Provence, Frankreich",
    epoch: "postimpressionismus",
    styles: ["postimpressionistische-malerei"],
    bio: "„Vater der Moderne“. Cézanne baute die Natur aus Farbflächen wie aus Bausteinen – Picasso und Braque entwickelten daraus den Kubismus.",
  },
  {
    slug: "paul-gauguin",
    name: "Paul Gauguin",
    life: "1848–1903",
    origin: "Paris, Frankreich",
    epoch: "postimpressionismus",
    styles: ["postimpressionistische-malerei", "symbolismus"],
    bio: "Börsenmakler, der Maler wurde, und Europäer, der in der Südsee nach dem „Ursprünglichen“ suchte – eine Suche, die heute kritisch diskutiert wird.",
  },
  {
    slug: "georges-seurat",
    name: "Georges Seurat",
    life: "1859–1891",
    origin: "Paris, Frankreich",
    epoch: "postimpressionismus",
    styles: ["pointillismus", "postimpressionistische-malerei"],
    bio: "Erfinder des Pointillismus. Seurat verband Farbtheorie und Wissenschaft zu einer Methode, die das Bild aus Millionen von Punkten aufbaut.",
  },
  {
    slug: "toulouse-lautrec",
    name: "Henri de Toulouse-Lautrec",
    life: "1864–1901",
    origin: "Albi, Frankreich",
    epoch: "postimpressionismus",
    styles: ["postimpressionistische-malerei"],
    bio: "Chronist des Montmartre. Seine Plakate für Kabaretts machten Lithografie zur Kunst und begründeten die moderne Grafikgestaltung.",
  },

  // ---------- Klassische Moderne ----------
  {
    slug: "wassily-kandinsky",
    name: "Wassily Kandinsky",
    life: "1866–1944",
    origin: "Moskau, Russland",
    epoch: "moderne",
    styles: ["abstrakte-kunst", "blauer-reiter"],
    bio: "Pionier der abstrakten Malerei und Lehrer am Bauhaus. Kandinsky glaubte, Farben und Formen wirken wie Musik direkt auf die Seele.",
  },
  {
    slug: "gustav-klimt",
    name: "Gustav Klimt",
    life: "1862–1918",
    origin: "Wien, Österreich",
    epoch: "moderne",
    styles: ["jugendstil", "symbolismus"],
    bio: "Kopf der Wiener Secession. Klimt verband Porträtmalerei mit Goldgrund, Ornament und Erotik – ein Skandal und Triumph zugleich.",
  },
  {
    slug: "edvard-munch",
    name: "Edvard Munch",
    life: "1863–1944",
    origin: "Løten, Norwegen",
    epoch: "moderne",
    styles: ["expressionismus", "symbolismus"],
    bio: "Der Maler der Seelenzustände. Munch machte Angst, Eifersucht und Sehnsucht sichtbar und wurde damit zum Vorbild des Expressionismus.",
  },
  {
    slug: "piet-mondrian",
    name: "Piet Mondrian",
    life: "1872–1944",
    origin: "Amersfoort, Niederlande",
    epoch: "moderne",
    styles: ["de-stijl", "abstrakte-kunst"],
    bio: "Vom Landschaftsmaler zum radikalsten Abstrakten: Mondrian reduzierte die Welt auf Schwarz, Weiß und die drei Grundfarben.",
  },
  {
    slug: "franz-marc",
    name: "Franz Marc",
    life: "1880–1916",
    origin: "München, Deutschland",
    epoch: "moderne",
    styles: ["blauer-reiter", "expressionismus"],
    bio: "Mitbegründer des Blauen Reiter. Marc malte Tiere als reine, unschuldige Wesen und gab jeder Farbe eine feste geistige Bedeutung.",
  },
];

const baseWorkData: WorkData[] = [
  // Leonardo
  {
    id: "mona-lisa",
    title: "Mona Lisa",
    year: "um 1503–1506",
    image: img_mona_lisa,
    painter: "leonardo-da-vinci",
    museum: "Musée du Louvre, Paris",
    technique: "Öl auf Pappelholz, 77 × 53 cm",
    styles: ["hochrenaissance"],
    description:
      "Das berühmteste Porträt der Welt. Das rätselhafte Lächeln entsteht durch Leonardos Sfumato: feinste Farbschichten ohne harte Konturen.",
    significance:
      "Leonardo löst das Porträt aus der starren Profilansicht: Die Dargestellte wendet sich dem Betrachter zu, Landschaft und Figur verschmelzen zu einer Stimmung. Damit wird das Bildnis erstmals zum Seelenporträt.",
    reception:
      "Erst der Diebstahl von 1911 machte das Bild zur Weltikone; heute diskutiert die Forschung vor allem, wie stark der Mythos den Blick auf die Malerei verstellt.",
  },
  {
    id: "vitruvianischer-mensch",
    title: "Der vitruvianische Mensch",
    year: "um 1490",
    image: img_vitruvianischer_mensch,
    painter: "leonardo-da-vinci",
    museum: "Gallerie dell'Accademia, Venedig",
    technique: "Feder und Tinte auf Papier, 34 × 25 cm",
    styles: ["hochrenaissance"],
    description:
      "Federzeichnung nach den Proportionslehren des römischen Architekten Vitruv: der Mensch als Maß aller Dinge, eingeschrieben in Kreis und Quadrat.",
    significance:
      "Die Zeichnung verbindet Anatomie, Geometrie und Philosophie zu einem einzigen Bild – Sinnbild des Renaissance-Humanismus.",
    reception:
      "Kunst- und Wissenschaftsgeschichte lesen das Blatt heute als frühes Beispiel dafür, dass Forschung und Kunst im 15. Jahrhundert dieselbe Sprache sprachen.",
  },
  // Michelangelo
  {
    id: "erschaffung-adams",
    title: "Die Erschaffung Adams",
    year: "um 1511",
    image: img_erschaffung_adams,
    painter: "michelangelo",
    museum: "Sixtinische Kapelle, Vatikan",
    technique: "Fresko, ca. 280 × 570 cm",
    styles: ["hochrenaissance"],
    description:
      "Ausschnitt aus dem Deckenfresko der Sixtinischen Kapelle: der Moment, in dem Gott Adam mit fast berührenden Fingern Leben einhaucht.",
    significance:
      "Die Lücke zwischen den Fingern ist der berühmteste leere Raum der Kunstgeschichte – Spannung statt Berührung, Erwartung statt Erfüllung.",
    reception:
      "Seit der Restaurierung der 1980er-Jahre streitet die Fachwelt über die überraschend hellen Originalfarben; populär ist die Deutung der Gottesfigur als Umriss eines Gehirns.",
  },
  // Raffael
  {
    id: "schule-von-athen",
    title: "Die Schule von Athen",
    year: "1509–1511",
    image: img_schule_von_athen,
    painter: "raffael",
    museum: "Stanza della Segnatura, Vatikan",
    technique: "Fresko, ca. 500 × 770 cm",
    styles: ["hochrenaissance"],
    description:
      "Ein imaginäres Treffen der antiken Philosophen in einer monumentalen Halle: Platon zeigt nach oben, Aristoteles zur Erde.",
    significance:
      "Perfekte Zentralperspektive im Dienst einer Idee: Das Fresko ordnet das gesamte Wissen der Antike zu einer Architektur des Denkens.",
    reception:
      "Gilt bis heute als Musterbeispiel gelungener Bildkomposition; Kunsthistoriker entziffern seit Jahrhunderten, welcher Kopf welchen Zeitgenossen Raffaels porträtiert.",
  },
  {
    id: "sixtinische-madonna",
    title: "Sixtinische Madonna",
    year: "1512/13",
    image: img_sixtinische_madonna,
    painter: "raffael",
    museum: "Gemäldegalerie Alte Meister, Dresden",
    technique: "Öl auf Leinwand, 265 × 196 cm",
    styles: ["hochrenaissance"],
    description:
      "Maria schreitet mit dem Kind aus geöffneten Vorhängen dem Betrachter entgegen; unten stützen zwei Engel den Bildrand.",
    significance:
      "Raffael verwandelt ein Altarbild in eine Erscheinung: Der Raum des Bildes und der Raum der Kirche gehen ineinander über.",
    reception:
      "Die beiden Engel wurden zum meistreproduzierten Bilddetail überhaupt – ein Musterfall dafür, wie Kunstmarkt und Werbung Werke zerlegen.",
  },
  // Botticelli
  {
    id: "geburt-der-venus",
    title: "Die Geburt der Venus",
    year: "um 1485",
    image: img_geburt_der_venus,
    painter: "botticelli",
    museum: "Uffizien, Florenz",
    technique: "Tempera auf Leinwand, 173 × 279 cm",
    styles: ["fruehrenaissance"],
    description:
      "Venus treibt auf einer Muschel ans Ufer, Windgötter blasen sie an Land, eine Hore hält ihr den Mantel entgegen.",
    significance:
      "Der erste lebensgroße weibliche Akt seit der Antike auf einer nichtreligiösen Leinwand – ein Bruch mit der mittelalterlichen Bildordnung.",
    reception:
      "Nach Jahrhunderten der Vergessenheit machten die englischen Präraffaeliten das Bild im 19. Jahrhundert zur Ikone; heute ist es Symbol für Florenz schlechthin.",
  },
  {
    id: "primavera",
    title: "La Primavera (Der Frühling)",
    year: "um 1480",
    image: img_primavera,
    painter: "botticelli",
    museum: "Uffizien, Florenz",
    technique: "Tempera auf Holz, 202 × 314 cm",
    styles: ["fruehrenaissance"],
    description:
      "Neun mythologische Figuren in einem Orangenhain: Venus in der Mitte, Flora mit Blüten, die Grazien im Reigen.",
    significance:
      "Ein gemaltes Gedicht: Botticelli übersetzt neuplatonische Philosophie der Medici-Kreise in ein Bild über Liebe, Wachstum und Erkenntnis.",
    reception:
      "Botaniker haben über 130 Pflanzenarten bestimmt; über die genaue Bedeutung der Szene streitet die Forschung bis heute.",
  },
  // Dürer
  {
    id: "duerer-selbstbildnis",
    title: "Selbstbildnis im Pelzrock",
    year: "1500",
    image: img_duerer_selbstbildnis,
    painter: "albrecht-duerer",
    museum: "Alte Pinakothek, München",
    technique: "Öl auf Lindenholz, 67 × 49 cm",
    styles: ["nordische-renaissance"],
    description:
      "Frontal, streng symmetrisch und mit erhobener Hand zeigt sich Dürer in einer Haltung, die sonst Christusbildern vorbehalten war.",
    significance:
      "Das Selbstbewusstsein einer neuen Künstlerrolle: Der Maler ist nicht Handwerker, sondern Schöpfer nach göttlichem Vorbild.",
    reception:
      "Gilt als das berühmteste Selbstporträt vor Rembrandt; die Kunstgeschichte sieht darin den Beginn des modernen Künstlermythos.",
  },
  {
    id: "feldhase",
    title: "Feldhase",
    year: "1502",
    image: img_feldhase,
    painter: "albrecht-duerer",
    museum: "Albertina, Wien",
    technique: "Aquarell und Deckfarben, 25 × 23 cm",
    styles: ["nordische-renaissance"],
    description:
      "Ein Hase, Haar für Haar beobachtet, ohne Landschaft, ohne Symbolik – nur das Tier auf leerem Grund.",
    significance:
      "Naturstudie als eigenständiges Kunstwerk: Dürer nimmt den forschenden Blick der Neuzeit vorweg.",
    reception:
      "Eines der meistkopierten Blätter der Kunstgeschichte; aus Konservierungsgründen wird das Original nur selten gezeigt.",
  },
  // van Eyck
  {
    id: "arnolfini-hochzeit",
    title: "Die Arnolfini-Hochzeit",
    year: "1434",
    image: img_arnolfini,
    painter: "jan-van-eyck",
    museum: "National Gallery, London",
    technique: "Öl auf Eichenholz, 82 × 60 cm",
    styles: ["nordische-renaissance"],
    description:
      "Ein Kaufmannspaar in einem Brügger Schlafzimmer, dazu ein Hund, eine Kerze und ein Konvexspiegel, in dem sich der Raum verdoppelt.",
    significance:
      "Van Eyck führt vor, was Ölfarbe kann: Messing, Fell und Stoff bekommen jeweils eigene Lichtqualität. Die Signatur an der Wand macht den Maler zum Zeugen der Szene.",
    reception:
      "Ob Hochzeit, Verlobung oder Gedenkbild – die Deutung ist seit Erwin Panofskys berühmter Studie von 1934 umstritten.",
  },
  {
    id: "mann-mit-turban",
    title: "Mann mit rotem Turban",
    year: "1433",
    image: img_mann_mit_turban,
    painter: "jan-van-eyck",
    museum: "National Gallery, London",
    technique: "Öl auf Eichenholz, 26 × 19 cm",
    styles: ["nordische-renaissance"],
    description:
      "Ein Mann blickt aus dem dunklen Grund direkt heraus; der rote Kopfschmuck ist kunstvoll gebunden.",
    significance:
      "Vermutlich das erste europäische Selbstporträt, bei dem der Dargestellte den Betrachter fixiert – der Beginn des direkten Blickkontakts in der Malerei.",
    reception:
      "Der Rahmenspruch „Als ich can“ gilt als selbstbewusstes Künstlermotto und wird bis heute zitiert.",
  },
  // Rembrandt
  {
    id: "nachtwache",
    title: "Die Nachtwache",
    year: "1642",
    image: img_nachtwache,
    painter: "rembrandt",
    museum: "Rijksmuseum, Amsterdam",
    technique: "Öl auf Leinwand, 379 × 453 cm",
    styles: ["barockmalerei", "hollaendisches-goldenes-zeitalter"],
    description:
      "Eine Amsterdamer Schützenkompanie setzt sich in Bewegung – kein steifes Gruppenbild, sondern eine Szene mitten im Aufbruch.",
    significance:
      "Rembrandt verwandelt das Repräsentationsporträt in ein Handlungsbild mit Licht als Regisseur; die 18 Auftraggeber zahlten je nach Sichtbarkeit.",
    reception:
      "Das Bild wurde beschnitten, mehrfach attackiert und zuletzt öffentlich im Museum restauriert – ein Modellfall moderner Restaurierungsforschung.",
  },
  {
    id: "rembrandt-selbstbildnis",
    title: "Selbstbildnis",
    year: "1659",
    image: img_rembrandt_selbst,
    painter: "rembrandt",
    museum: "National Gallery of Art, Washington",
    technique: "Öl auf Leinwand, 84 × 66 cm",
    styles: ["hollaendisches-goldenes-zeitalter"],
    description:
      "Der gealterte Maler nach dem Bankrott: Falten, müde Augen, kein Prunk, nur Licht auf Stirn und Nase.",
    significance:
      "Rembrandts Selbstbildnisse bilden die erste durchgehende visuelle Autobiografie der Kunstgeschichte.",
    reception:
      "Die Serie gilt Kunsthistorikern und Psychologen gleichermaßen als Studie über Selbstwahrnehmung und Vergänglichkeit.",
  },
  // Vermeer
  {
    id: "maedchen-mit-perlenohrring",
    title: "Mädchen mit dem Perlenohrring",
    year: "um 1665",
    image: img_perlenohrring,
    painter: "vermeer",
    museum: "Mauritshuis, Den Haag",
    technique: "Öl auf Leinwand, 45 × 39 cm",
    styles: ["hollaendisches-goldenes-zeitalter"],
    description:
      "Ein Mädchen wendet den Kopf über die Schulter, Turban und Perle leuchten aus tiefem Dunkel.",
    significance:
      "Kein Porträt, sondern ein „Tronie“: eine Charakterstudie ohne Auftraggeber – deshalb wirkt der Blick so unmittelbar.",
    reception:
      "Technische Untersuchungen zeigten, dass der Hintergrund ursprünglich ein grüner Vorhang war; der Roman und Film von 1999/2003 machten das Bild endgültig zum Popstar.",
  },
  {
    id: "dienstmagd-mit-milchkrug",
    title: "Das Milchmädchen",
    year: "um 1658",
    image: img_milchmagd,
    painter: "vermeer",
    museum: "Rijksmuseum, Amsterdam",
    technique: "Öl auf Leinwand, 46 × 41 cm",
    styles: ["hollaendisches-goldenes-zeitalter"],
    description:
      "Eine Magd gießt Milch in eine Schüssel; das Fenster wirft weiches Licht auf Brot, Krug und Wand.",
    significance:
      "Vermeer adelt eine alltägliche Verrichtung zur monumentalen Ruhe – Arbeit wird zum Andachtsbild.",
    reception:
      "Die Forschung schätzt heute besonders die pointillistisch aufgesetzten Lichttupfer, die eine fast fotografische Unschärfe erzeugen.",
  },
  // Caravaggio
  {
    id: "berufung-des-matthaeus",
    title: "Die Berufung des heiligen Matthäus",
    year: "1599–1600",
    image: img_matthaeus,
    painter: "caravaggio",
    museum: "San Luigi dei Francesi, Rom",
    technique: "Öl auf Leinwand, 322 × 340 cm",
    styles: ["tenebrismus", "barockmalerei"],
    description:
      "In einer dunklen Schenke fällt ein Lichtstrahl auf einen Tisch mit Geldzählern – Christus zeigt auf einen von ihnen.",
    significance:
      "Das Licht selbst wird zum religiösen Ereignis. Caravaggio verlegt die Heilsgeschichte in die Gegenwart seiner Zuschauer.",
    reception:
      "Bis heute streiten Fachleute, welche Figur Matthäus ist – der bärtige Mann oder der junge, der sein Geld zählt.",
  },
  {
    id: "judith-holofernes",
    title: "Judith enthauptet Holofernes",
    year: "um 1599",
    image: img_judith,
    painter: "caravaggio",
    museum: "Palazzo Barberini, Rom",
    technique: "Öl auf Leinwand, 145 × 195 cm",
    styles: ["tenebrismus"],
    description:
      "Der Moment der Tat, ohne Beschönigung: Judith zieht das Schwert, ihr Gesicht zeigt Ekel statt Heldenmut.",
    significance:
      "Caravaggio zeigt Gewalt als körperlichen Vorgang und verlangt vom Betrachter Zeugenschaft – ein Bruch mit der idealisierenden Historienmalerei.",
    reception:
      "Der Vergleich mit Artemisia Gentileschis Fassung ist ein Standardthema feministischer Kunstgeschichte.",
  },
  // Velázquez
  {
    id: "las-meninas",
    title: "Las Meninas",
    year: "1656",
    image: img_las_meninas,
    painter: "velazquez",
    museum: "Museo del Prado, Madrid",
    technique: "Öl auf Leinwand, 318 × 276 cm",
    styles: ["barockmalerei"],
    description:
      "Die Infantin mit Hofstaat, der Maler selbst an einer riesigen Leinwand, das Königspaar nur als Spiegelbild an der Rückwand.",
    significance:
      "Ein Bild über das Sehen: Wer ist Modell, wer Betrachter? Velázquez verschachtelt Blickrichtungen zu einem Rätsel ohne Auflösung.",
    reception:
      "Michel Foucault eröffnete damit sein Buch „Die Ordnung der Dinge“; Picasso malte 58 Variationen. Es gilt vielen als das Gemälde über Malerei.",
  },
  {
    id: "venus-vor-dem-spiegel",
    title: "Venus vor dem Spiegel",
    year: "1647–1651",
    image: img_venus_spiegel,
    painter: "velazquez",
    museum: "National Gallery, London",
    technique: "Öl auf Leinwand, 122 × 177 cm",
    styles: ["barockmalerei"],
    description:
      "Venus liegt mit dem Rücken zum Betrachter, ein Amor hält ihr den Spiegel, in dem ihr Gesicht unscharf erscheint.",
    significance:
      "Ein seltener Akt in der streng katholischen spanischen Malerei – und ein raffiniertes Spiel mit dem verweigerten Blick.",
    reception:
      "1914 von der Suffragette Mary Richardson mit einem Beil beschädigt; der Angriff gilt als frühes Beispiel für Bildaktivismus.",
  },
  // Rubens
  {
    id: "kreuzabnahme",
    title: "Die Kreuzabnahme",
    year: "1612–1614",
    image: img_kreuzabnahme,
    painter: "rubens",
    museum: "Kathedrale, Antwerpen",
    technique: "Öl auf Holz, Mitteltafel 421 × 311 cm",
    styles: ["barockmalerei"],
    description:
      "Der Leichnam Christi gleitet diagonal aus dem Bild heraus, gehalten von acht Figuren in gestaffelten Bewegungen.",
    significance:
      "Musterbeispiel barocker Diagonalkomposition: Der weiße Leichentuch-Streifen zieht das Auge wie ein Blitz durch das Bild.",
    reception:
      "Das Werk machte Rubens nach seiner Rückkehr aus Italien zum führenden Maler Nordeuropas; heute Pilgerziel für Kunstreisende in Flandern.",
  },
  {
    id: "das-pelzchen",
    title: "Das Pelzchen (Helena Fourment)",
    year: "um 1638",
    image: img_pelzchen,
    painter: "rubens",
    museum: "Kunsthistorisches Museum, Wien",
    technique: "Öl auf Holz, 176 × 83 cm",
    styles: ["barockmalerei"],
    description:
      "Rubens' zweite Frau, nur in einen Pelzmantel gehüllt – ein privates Bild, das er bis zu seinem Tod behielt.",
    significance:
      "Zwischen antikem Venus-Typus und intimem Porträt: Rubens malt Haut mit einer Wärme, die die europäische Aktmalerei prägte.",
    reception:
      "Der Begriff „rubensfigürlich“ stammt aus solchen Bildern; die Genderforschung diskutiert sie heute als Beispiel für den Blick des Malers auf seine Ehefrau.",
  },
  // Friedrich
  {
    id: "wanderer-nebelmeer",
    title: "Wanderer über dem Nebelmeer",
    year: "um 1818",
    image: img_wanderer_nebelmeer,
    painter: "caspar-david-friedrich",
    museum: "Hamburger Kunsthalle",
    technique: "Öl auf Leinwand, 95 × 75 cm",
    styles: ["romantische-malerei"],
    description:
      "Sinnbild der Romantik schlechthin: Ein Wanderer blickt von einem Felsgipfel auf ein Meer aus Nebel – Triumph und Einsamkeit zugleich.",
    significance:
      "Die Rückenfigur macht den Betrachter zum Mitreisenden: Wir sehen nicht die Figur an, sondern mit ihr.",
    reception:
      "Vom Buchcover bis zur Werbung dauerpräsent; das Friedrich-Jubiläum 2024 löste eine neue Debatte über Vereinnahmung seiner Bilder aus.",
  },
  {
    id: "moench-am-meer",
    title: "Der Mönch am Meer",
    year: "1808–1810",
    image: img_moench_am_meer,
    painter: "caspar-david-friedrich",
    museum: "Alte Nationalgalerie, Berlin",
    technique: "Öl auf Leinwand, 110 × 172 cm",
    styles: ["romantische-malerei"],
    description:
      "Radikal reduziert: Eine winzige Gestalt vor dem endlosen Himmel. Das Bild gilt als Vorläufer der abstrakten Malerei.",
    significance:
      "Friedrich streicht jede Repoussoir-Kulisse und lässt den Betrachter ohne Halt vor dem Nichts stehen – eine formale Revolution.",
    reception:
      "Heinrich von Kleist schrieb 1810, es sei, „als ob einem die Augenlider weggeschnitten wären“ – bis heute das meistzitierte Urteil zum Bild.",
  },
  // Turner
  {
    id: "die-kaempfende-temeraire",
    title: "Die kämpfende Temeraire",
    year: "1839",
    image: img_temeraire,
    painter: "william-turner",
    museum: "National Gallery, London",
    technique: "Öl auf Leinwand, 91 × 122 cm",
    styles: ["romantische-malerei"],
    description:
      "Ein gespenstisch weißes Segelkriegsschiff wird von einem kleinen schwarzen Dampfschlepper zum Abwracken gezogen.",
    significance:
      "Ein Abschiedsbild für ein ganzes Zeitalter: Segel weicht Dampf, Heldentum weicht Industrie – gemalt in glühendem Sonnenuntergang.",
    reception:
      "In britischen Umfragen mehrfach zum beliebtesten Gemälde des Landes gewählt; es ziert die 20-Pfund-Note mit Turners Porträt.",
  },
  {
    id: "regen-dampf-geschwindigkeit",
    title: "Regen, Dampf und Geschwindigkeit",
    year: "1844",
    image: img_regen_dampf,
    painter: "william-turner",
    museum: "National Gallery, London",
    technique: "Öl auf Leinwand, 91 × 122 cm",
    styles: ["romantische-malerei"],
    description:
      "Eine Dampflok rast über die Maidenhead-Brücke durch einen Regenschleier; Landschaft und Maschine lösen sich in Licht auf.",
    significance:
      "Erstes großes Gemälde, das Geschwindigkeit selbst zum Thema macht – Turner malt nicht den Zug, sondern das Gefühl von Tempo.",
    reception:
      "Für viele Kunsthistoriker der Moment, in dem die Malerei die Moderne betritt; Impressionisten wie Monet studierten Turner in London.",
  },
  // Goya
  {
    id: "der-dritte-mai",
    title: "Der 3. Mai 1808",
    year: "1814",
    image: img_dritter_mai,
    painter: "francisco-de-goya",
    museum: "Museo del Prado, Madrid",
    technique: "Öl auf Leinwand, 268 × 347 cm",
    styles: ["romantische-malerei"],
    description:
      "Ein Mann im weißen Hemd breitet vor dem Erschießungskommando die Arme aus; die Laterne am Boden ist die einzige Lichtquelle.",
    significance:
      "Das erste moderne Antikriegsbild: kein Heldentod, keine Sieger – nur anonyme Gewehre gegen ein Gesicht.",
    reception:
      "Direkte Vorlage für Manets „Erschießung Kaiser Maximilians“ und Picassos „Guernica“; gilt als Beginn politisch engagierter Malerei.",
  },
  {
    id: "saturn",
    title: "Saturn verschlingt seinen Sohn",
    year: "1819–1823",
    image: img_saturn,
    painter: "francisco-de-goya",
    museum: "Museo del Prado, Madrid",
    technique: "Wandbild, auf Leinwand übertragen, 143 × 81 cm",
    styles: ["romantische-malerei"],
    description:
      "Eines der „Schwarzen Bilder“, die der taube Goya direkt auf die Wände seines Hauses malte: der Titan, der sein Kind frisst.",
    significance:
      "Malerei ohne Auftraggeber und ohne Publikum – reine private Verzweiflung, formal so frei, dass sie den Expressionismus vorwegnimmt.",
    reception:
      "Wird als Bild über Machtgier, Alter oder den spanischen Bürgerkrieg gedeutet; die Kunstpsychologie sieht darin ein Schlüsselwerk des Unbewussten.",
  },
  // Delacroix
  {
    id: "freiheit-fuehrt-das-volk",
    title: "Die Freiheit führt das Volk",
    year: "1830",
    image: img_freiheit,
    painter: "eugene-delacroix",
    museum: "Musée du Louvre, Paris",
    technique: "Öl auf Leinwand, 260 × 325 cm",
    styles: ["romantische-malerei"],
    description:
      "Marianne mit Trikolore und Gewehr steigt über Barrikaden und Leichen – neben ihr ein Junge mit Pistolen, ein Bürger mit Zylinder.",
    significance:
      "Allegorie und Reportage in einem Bild: Delacroix verbindet die Julirevolution mit einer zeitlosen Figur der Freiheit.",
    reception:
      "Von der französischen Banknote bis zu Protestplakaten weltweit zitiert; Historiker betonen, wie schnell aus dem Aufruhrbild ein Staatssymbol wurde.",
  },
  {
    id: "tod-des-sardanapal",
    title: "Der Tod des Sardanapal",
    year: "1827",
    image: img_sardanapal,
    painter: "eugene-delacroix",
    museum: "Musée du Louvre, Paris",
    technique: "Öl auf Leinwand, 392 × 496 cm",
    styles: ["romantische-malerei"],
    description:
      "Ein assyrischer König lässt Besitz und Haremsfrauen vor den eigenen Augen töten, während er ruhig auf dem Bett liegt.",
    significance:
      "Farbrausch statt Ordnung: Das Bild war der Skandal des Salons 1827 und die Kampfansage der Romantik an den Klassizismus.",
    reception:
      "Heute wird es zugleich als malerisches Meisterwerk und als Beispiel für den orientalistischen Blick des 19. Jahrhunderts diskutiert.",
  },
  // Monet
  {
    id: "impression-sonnenaufgang",
    title: "Impression, Sonnenaufgang",
    year: "1872",
    image: img_impression_sonnenaufgang,
    painter: "claude-monet",
    museum: "Musée Marmottan Monet, Paris",
    technique: "Öl auf Leinwand, 48 × 63 cm",
    styles: ["impressionistische-malerei"],
    description:
      "Das Bild, das einer ganzen Epoche den Namen gab: der Hafen von Le Havre im Morgendunst, gemalt mit lockeren, schnellen Strichen.",
    significance:
      "Monet malt nicht Gegenstände, sondern Lichtwerte – die orange Sonne hat fast dieselbe Helligkeit wie der Himmel und flimmert deshalb.",
    reception:
      "Der Kritiker Louis Leroy meinte den Titel 1874 als Spott; die Gruppe übernahm den Namen „Impressionisten“ selbstbewusst.",
  },
  {
    id: "seerosen",
    title: "Seerosen",
    year: "1906",
    image: img_seerosen,
    painter: "claude-monet",
    museum: "Art Institute of Chicago",
    technique: "Öl auf Leinwand, 90 × 93 cm",
    styles: ["impressionistische-malerei"],
    description:
      "Aus seinem Garten in Giverny: Über 250 Seerosen-Bilder schuf Monet – die Wasseroberfläche wird zum Spiegel von Licht und Himmel.",
    significance:
      "Kein Horizont, kein Ufer: Das Motiv verliert den Halt und wird zur reinen Farbfläche – ein Vorbild für die abstrakte Malerei der 1950er.",
    reception:
      "Die New Yorker Schule feierte den späten Monet als Vorläufer; das MoMA kaufte 1955 ein Seerosenbild und schrieb damit Kunstgeschichte um.",
  },
  // Renoir
  {
    id: "moulin-de-la-galette",
    title: "Ball im Moulin de la Galette",
    year: "1876",
    image: img_galette,
    painter: "auguste-renoir",
    museum: "Musée d'Orsay, Paris",
    technique: "Öl auf Leinwand, 131 × 175 cm",
    styles: ["impressionistische-malerei"],
    description:
      "Sonntagnachmittag auf dem Montmartre: tanzende Paare unter Bäumen, Sonnenflecken auf Gesichtern und Anzügen.",
    significance:
      "Renoir malt ein großes Figurenbild komplett im Freien – Lichtflecken lösen die Körper fast auf und feiern das moderne Vergnügen.",
    reception:
      "1990 für 78 Millionen Dollar versteigert, damals eines der teuersten Bilder der Welt; Kritiker der Zeit warfen Renoir „schimmelige“ Farben vor.",
  },
  {
    id: "fruehstueck-der-ruderer",
    title: "Das Frühstück der Ruderer",
    year: "1880–1881",
    image: img_ruderer,
    painter: "auguste-renoir",
    museum: "The Phillips Collection, Washington",
    technique: "Öl auf Leinwand, 130 × 173 cm",
    styles: ["impressionistische-malerei"],
    description:
      "Eine ausgelassene Gesellschaft auf der Terrasse eines Restaurants an der Seine, mit Flaschen, Früchten und einem Hündchen.",
    significance:
      "Gruppenporträt der impressionistischen Freundeskreise – die Frau mit Hund ist Aline Charigot, Renoirs spätere Frau.",
    reception:
      "Gilt als Höhepunkt und zugleich Abschied von Renoirs impressionistischer Phase, bevor er zu klareren Konturen zurückkehrte.",
  },
  // Degas
  {
    id: "die-ballettprobe",
    title: "Die Ballettprobe",
    year: "um 1874",
    image: img_ballettprobe,
    painter: "edgar-degas",
    museum: "Musée d'Orsay, Paris",
    technique: "Öl auf Leinwand",
    styles: ["impressionistische-malerei"],
    description:
      "Tänzerinnen im Probensaal: eine korrigiert den Schuh, andere warten gelangweilt, der Ballettmeister lehnt am Stock.",
    significance:
      "Degas zeigt nicht die Aufführung, sondern die Arbeit dahinter – Disziplin, Erschöpfung, Routine.",
    reception:
      "Die Sozialgeschichte der Kunst liest die Serie heute auch als Dokument über die prekäre Lage junger Tänzerinnen der Pariser Oper.",
  },
  {
    id: "der-absinth",
    title: "Der Absinth (Im Café)",
    year: "1875–1876",
    image: img_absinth,
    painter: "edgar-degas",
    museum: "Musée d'Orsay, Paris",
    technique: "Öl auf Leinwand, 92 × 68 cm",
    styles: ["impressionistische-malerei"],
    description:
      "Eine Frau und ein Mann sitzen stumm nebeneinander im Café, vor ihr ein trübes Glas Absinth, der Blick ins Leere.",
    significance:
      "Der angeschnittene Bildausschnitt wirkt wie ein Schnappschuss; Einsamkeit in der Großstadt wird erstmals zum Bildthema.",
    reception:
      "In London 1893 als „hässlich und abstoßend“ verrissen – heute Schlüsselwerk zur Darstellung moderner Entfremdung.",
  },
  // Manet
  {
    id: "fruehstueck-im-gruenen",
    title: "Das Frühstück im Grünen",
    year: "1863",
    image: img_fruehstueck_gruenen,
    painter: "edouard-manet",
    museum: "Musée d'Orsay, Paris",
    technique: "Öl auf Leinwand, 208 × 264 cm",
    styles: ["impressionistische-malerei"],
    description:
      "Zwei angezogene Herren picknicken mit einer nackten Frau, die den Betrachter direkt ansieht.",
    significance:
      "Manet zitiert Tizian und Raffael, ersetzt aber die Göttin durch eine erkennbare Zeitgenossin – der Skandal war programmiert.",
    reception:
      "Im „Salon der Zurückgewiesenen“ 1863 verlacht, gilt es heute als Geburtsstunde der modernen Malerei.",
  },
  {
    id: "bar-in-den-folies-bergere",
    title: "Ein Bar in den Folies-Bergère",
    year: "1882",
    image: img_folies,
    painter: "edouard-manet",
    museum: "Courtauld Gallery, London",
    technique: "Öl auf Leinwand, 96 × 130 cm",
    styles: ["impressionistische-malerei"],
    description:
      "Eine Bardame steht frontal vor einem riesigen Spiegel, in dem der Saal, ein Gast und ihr eigener Rücken erscheinen – geometrisch unmöglich.",
    significance:
      "Manets letztes großes Werk macht die Widersprüche der Wahrnehmung selbst zum Thema und stellt die Frage nach dem Platz des Betrachters.",
    reception:
      "Die „falsche“ Spiegelung ist einer der meistdiskutierten Kunstgriffe der Kunstgeschichte – Absicht, nicht Fehler, darüber ist man sich heute einig.",
  },
  // Cassatt
  {
    id: "das-bad-des-kindes",
    title: "Das Bad des Kindes",
    year: "1893",
    image: img_kinderbad,
    painter: "mary-cassatt",
    museum: "Art Institute of Chicago",
    technique: "Öl auf Leinwand, 100 × 66 cm",
    styles: ["impressionistische-malerei"],
    description:
      "Von oben gesehen: Eine Frau wäscht einem Kind die Füße, gestreifter Stoff und gemusterter Teppich treffen aufeinander.",
    significance:
      "Cassatt übernimmt Aufsicht und Flächigkeit japanischer Holzschnitte und macht Fürsorge zum modernen, ernsten Bildthema.",
    reception:
      "Die feministische Kunstgeschichte hebt hervor, dass Cassatt die häusliche Sphäre nicht verklärt, sondern als Arbeit zeigt.",
  },
  {
    id: "die-bootspartie",
    title: "Die Bootspartie",
    year: "1893/94",
    image: img_bootspartie,
    painter: "mary-cassatt",
    museum: "National Gallery of Art, Washington",
    technique: "Öl auf Leinwand, 90 × 117 cm",
    styles: ["impressionistische-malerei"],
    description:
      "Ein Ruderer in dunkler Silhouette, ihm gegenüber Mutter und Kind; das Segelboot schneidet den Bildrand.",
    significance:
      "Kühne Flächen und ein extremer Bildausschnitt zeigen, wie stark der Japonismus die Impressionisten prägte.",
    reception:
      "Gilt als Cassatts ehrgeizigstes Gemälde; es wurde 1929 der US-Nation vermacht und ist bis heute ihr bekanntestes Werk.",
  },
  // van Gogh
  {
    id: "sternennacht",
    title: "Die Sternennacht",
    year: "1889",
    image: img_sternennacht,
    painter: "vincent-van-gogh",
    museum: "Museum of Modern Art, New York",
    technique: "Öl auf Leinwand, 74 × 92 cm",
    styles: ["postimpressionistische-malerei", "expressionismus"],
    description:
      "Blick aus dem Fenster der Anstalt von Saint-Rémy: Ein wirbelnder Nachthimmel über einem stillen Dorf – gemalt aus Erinnerung und Imagination.",
    significance:
      "Van Gogh malt keinen Himmel, sondern eine innere Bewegung; der Zypressenbaum verbindet Erde und Kosmos.",
    reception:
      "Astronomen haben Mondphase und Venusstand rekonstruiert; das MoMA erwarb das Bild 1941 und machte es zur globalen Ikone.",
  },
  {
    id: "sonnenblumen",
    title: "Sonnenblumen",
    year: "1888",
    image: img_sonnenblumen,
    painter: "vincent-van-gogh",
    museum: "National Gallery, London",
    technique: "Öl auf Leinwand, 92 × 73 cm",
    styles: ["postimpressionistische-malerei"],
    description:
      "Teil einer Serie für das Gelbe Haus in Arles. Für van Gogh symbolisierten die Blumen Dankbarkeit und Freundschaft.",
    significance:
      "Ein Bild fast nur aus Gelbtönen: Van Gogh testet, wie weit eine einzige Farbe eine Komposition tragen kann.",
    reception:
      "Konservatoren beobachten, dass das Chromgelb nachdunkelt; die Serie ist zugleich Zugpferd von Ausstellungen und Ziel von Klimaprotesten.",
  },
  // Cézanne
  {
    id: "mont-sainte-victoire",
    title: "Der Mont Sainte-Victoire",
    year: "um 1897",
    image: img_sainte_victoire,
    painter: "paul-cezanne",
    museum: "Sammlungen weltweit (Serie)",
    technique: "Öl auf Leinwand",
    styles: ["postimpressionistische-malerei"],
    description:
      "Cézannes Hausberg bei Aix, mehr als 30-mal gemalt: Fels, Kiefern und Ebene, aufgebaut aus rechteckigen Farbflecken.",
    significance:
      "Cézanne sucht die „Logik“ hinter dem Sehen: Farbe modelliert Raum ohne Perspektivlinien – die Grundlage des Kubismus.",
    reception:
      "Picasso nannte ihn „den Vater von uns allen“; die Serie gilt als Beginn systematischer Motivvariation in der Moderne.",
  },
  {
    id: "die-kartenspieler",
    title: "Die Kartenspieler",
    year: "1890–1895",
    image: img_kartenspieler,
    painter: "paul-cezanne",
    museum: "Musée d'Orsay, Paris (u. a.)",
    technique: "Öl auf Leinwand",
    styles: ["postimpressionistische-malerei"],
    description:
      "Zwei Bauern sitzen konzentriert am Tisch, eine Flasche genau in der Mitte – reduziert bis zur Monumentalität.",
    significance:
      "Cézanne nimmt ein Genremotiv und entleert es von Anekdote; übrig bleibt reine Bildarchitektur.",
    reception:
      "Eine Fassung wurde 2011 für rund 250 Millionen Dollar an Katar verkauft – lange der höchste bekannte Preis für ein Gemälde.",
  },
  // Gauguin
  {
    id: "woher-kommen-wir",
    title: "Woher kommen wir? Wer sind wir? Wohin gehen wir?",
    year: "1897/98",
    image: img_woher,
    painter: "paul-gauguin",
    museum: "Museum of Fine Arts, Boston",
    technique: "Öl auf Sackleinen, 139 × 375 cm",
    styles: ["postimpressionistische-malerei", "symbolismus"],
    description:
      "Ein friesartiges Panorama von rechts nach links: Säugling, Pflückende, alte Frau – die Stationen eines Lebens.",
    significance:
      "Gauguins Vermächtnisbild, gemalt in Tahiti nach einem Suizidversuch: Farbe wird Symbol, nicht Beschreibung.",
    reception:
      "Heute doppelt gelesen: als Hauptwerk des Symbolismus und als Dokument kolonialer Aneignung, das Museen zunehmend kritisch kontextualisieren.",
  },
  {
    id: "vision-nach-der-predigt",
    title: "Vision nach der Predigt",
    year: "1888",
    image: img_vision,
    painter: "paul-gauguin",
    museum: "National Galleries of Scotland, Edinburgh",
    technique: "Öl auf Leinwand, 73 × 92 cm",
    styles: ["symbolismus", "postimpressionistische-malerei"],
    description:
      "Bretonische Frauen sehen nach der Predigt den Kampf Jakobs mit dem Engel – auf einer knallroten Wiese.",
    significance:
      "Der rote Boden trennt Realität und Vision: Gauguin erfindet den Cloisonnismus, flächige Farbfelder mit dunklen Konturen.",
    reception:
      "Für die Forschung der Startpunkt des Symbolismus in der Malerei und der Bruch mit dem Impressionismus.",
  },
  // Seurat
  {
    id: "sonntagnachmittag-grande-jatte",
    title: "Ein Sonntagnachmittag auf der Insel La Grande Jatte",
    year: "1884–1886",
    image: img_grande_jatte,
    painter: "georges-seurat",
    museum: "Art Institute of Chicago",
    technique: "Öl auf Leinwand, 208 × 308 cm",
    styles: ["pointillismus"],
    description:
      "Pariser aller Klassen erholen sich am Seine-Ufer, erstarrt wie antike Reliefs – gemalt aus Millionen kleiner Farbpunkte.",
    significance:
      "Zwei Jahre Arbeit nach Farbtheorien von Chevreul: Der Impressionismus wird von der Improvisation in ein System überführt.",
    reception:
      "Der Kritiker Félix Fénéon prägte dafür den Begriff „Neoimpressionismus“; das Bild inspirierte Musical, Film und unzählige Parodien.",
  },
  {
    id: "badende-von-asnieres",
    title: "Badende von Asnières",
    year: "1884",
    image: img_asnieres,
    painter: "georges-seurat",
    museum: "National Gallery, London",
    technique: "Öl auf Leinwand, 201 × 300 cm",
    styles: ["pointillismus", "postimpressionistische-malerei"],
    description:
      "Arbeiter ruhen am Flussufer vor den Fabrikschloten von Clichy; alles ist ruhig, klar und monumental.",
    significance:
      "Seurat gibt einfachen Leuten das Format der Historienmalerei – soziale Realität in klassischer Würde.",
    reception:
      "Vom offiziellen Salon abgelehnt; heute Gegenstück zur „Grande Jatte“ und Beleg für Seurats sozialen Blick.",
  },
  // Toulouse-Lautrec
  {
    id: "im-moulin-rouge",
    title: "Im Moulin Rouge",
    year: "1892",
    image: img_moulin_warner,
    painter: "toulouse-lautrec",
    museum: "Art Institute of Chicago",
    technique: "Öl auf Leinwand, 123 × 141 cm",
    styles: ["postimpressionistische-malerei"],
    description:
      "Nachtleben im berühmtesten Tanzlokal von Paris: grelles Gaslicht, gepuderte Gesichter, Blicke aneinander vorbei.",
    significance:
      "Lautrec malt das Vergnügungsviertel von innen, ohne Moral und ohne Verklärung – als teilnehmender Beobachter.",
    reception:
      "Seine Nachtszenen gelten als Vorläufer moderner Reportagefotografie und prägten das Bild der Belle Époque bis heute.",
  },
  {
    id: "moulin-rouge-la-goulue",
    title: "Moulin Rouge: La Goulue",
    year: "1891",
    image: img_la_goulue,
    painter: "toulouse-lautrec",
    museum: "Musée Toulouse-Lautrec, Albi",
    technique: "Farblithografie, 191 × 117 cm",
    styles: ["postimpressionistische-malerei"],
    description:
      "Das Plakat, das über Nacht berühmt machte: die Tänzerin La Goulue im Licht, davor die Silhouette von Valentin le Désossé.",
    significance:
      "Drei Farben, Flächen und Schrift als Bildelemente – die Geburtsstunde des modernen Plakats.",
    reception:
      "Sammler rissen die Plakate schon 1891 von den Wänden; Grafikdesign-Kurse behandeln das Blatt bis heute als Gründungsdokument.",
  },
  // Kandinsky
  {
    id: "komposition-vii",
    title: "Komposition VII",
    year: "1913",
    image: img_komposition_vii,
    painter: "wassily-kandinsky",
    museum: "Tretjakow-Galerie, Moskau",
    technique: "Öl auf Leinwand, 200 × 300 cm",
    styles: ["abstrakte-kunst", "blauer-reiter"],
    description:
      "Kandinskys größtes und komplexestes Frühwerk: ein Sturm aus Farben und Linien, komponiert wie eine Sinfonie.",
    significance:
      "Nach über 30 Vorstudien in vier Tagen gemalt – ein Höhepunkt der frühen Abstraktion, thematisch um Apokalypse und Neubeginn kreisend.",
    reception:
      "Gilt vielen als das erste vollständig abstrakte Großformat der Kunstgeschichte und als Beleg für Kandinskys Synästhesie.",
  },
  {
    id: "komposition-viii",
    title: "Komposition VIII",
    year: "1923",
    image: img_komposition_viii,
    painter: "wassily-kandinsky",
    museum: "Solomon R. Guggenheim Museum, New York",
    technique: "Öl auf Leinwand, 140 × 201 cm",
    styles: ["abstrakte-kunst"],
    description:
      "Aus der Bauhaus-Zeit: strenge Geometrie – Kreise, Dreiecke, Geraden – in präzisem Gleichgewicht.",
    significance:
      "Der Wechsel vom Farbrausch zur Konstruktion zeigt den Einfluss von Bauhaus und russischem Konstruktivismus.",
    reception:
      "Kandinsky selbst hielt es für sein wichtigstes Nachkriegswerk; es prägt bis heute das Bild der Bauhaus-Ästhetik.",
  },
  {
    id: "gelb-rot-blau",
    title: "Gelb-Rot-Blau",
    year: "1925",
    image: img_gelb_rot_blau,
    painter: "wassily-kandinsky",
    museum: "Centre Pompidou, Paris",
    technique: "Öl auf Leinwand, 128 × 202 cm",
    styles: ["abstrakte-kunst"],
    description:
      "Die drei Grundfarben treffen aufeinander: links helle, flächige Klarheit, rechts dunkle, kreisende Formen – ein Bild über Gegensätze.",
    significance:
      "Kandinsky führt seine Farbenlehre vor: Gelb drängt nach vorn, Blau zieht in die Tiefe, Rot hält die Mitte.",
    reception:
      "Ein Schlüsselwerk für die Theorie der Abstraktion und Standardbeispiel in kunstpädagogischen Farblehren.",
  },
  // Klimt
  {
    id: "der-kuss",
    title: "Der Kuss",
    year: "1907/08",
    image: img_der_kuss,
    painter: "gustav-klimt",
    museum: "Belvedere, Wien",
    technique: "Öl und Blattgold auf Leinwand, 180 × 180 cm",
    styles: ["jugendstil", "symbolismus"],
    description:
      "Ein Paar auf einer Blumenwiese, eingehüllt in einen goldenen Mantel aus Rechtecken und Kreisen.",
    significance:
      "Höhepunkt von Klimts „Goldener Periode“: Ornament und Figur verschmelzen, byzantinische Mosaike treffen auf Wiener Moderne.",
    reception:
      "Vom Staat schon 1908 angekauft; heute das meistbesuchte Bild Österreichs und Dauerthema der Debatte über Kitsch und Kunst.",
  },
  {
    id: "adele-bloch-bauer",
    title: "Bildnis Adele Bloch-Bauer I",
    year: "1907",
    image: img_adele,
    painter: "gustav-klimt",
    museum: "Neue Galerie, New York",
    technique: "Öl, Silber und Gold auf Leinwand, 138 × 138 cm",
    styles: ["jugendstil"],
    description:
      "Die Wiener Salonnière verschwindet fast in einem Feld aus goldenen Augen-, Spiral- und Dreiecksformen.",
    significance:
      "Porträt als Ikone: Klimt löst den Körper in Ornament auf und lässt nur Gesicht und Hände realistisch.",
    reception:
      "Nach jahrelangem Rechtsstreit 2006 an die Erbin Maria Altmann restituiert – ein Meilenstein der Restitutionsdebatte, verfilmt als „Die Frau in Gold“.",
  },
  // Munch
  {
    id: "der-schrei",
    title: "Der Schrei",
    year: "1893",
    image: img_schrei,
    painter: "edvard-munch",
    museum: "Nasjonalmuseet, Oslo",
    technique: "Öl, Tempera und Pastell auf Karton, 91 × 73 cm",
    styles: ["expressionismus", "symbolismus"],
    description:
      "Eine Figur auf einer Brücke hält sich die Ohren zu, während Himmel und Fjord in blutroten Wellen brennen.",
    significance:
      "Munch malt kein Ereignis, sondern eine Panikattacke: „Ich fühlte einen unendlichen Schrei durch die Natur gehen.“",
    reception:
      "Zweimal spektakulär gestohlen und wiedergefunden; die versteckte Bleistiftnotiz „Kann nur von einem Verrückten gemalt worden sein“ stammt laut Museum von Munch selbst.",
  },
  {
    id: "lebenstanz",
    title: "Die Mädchen auf der Brücke",
    year: "1901",
    image: img_maedchen_bruecke,
    painter: "edvard-munch",
    museum: "Nasjonalmuseet, Oslo",
    technique: "Öl auf Leinwand",
    styles: ["symbolismus", "expressionismus"],
    description:
      "Drei junge Frauen stehen an einem Brückengeländer und blicken ins Wasser; ein dunkler Baum spiegelt sich darin.",
    significance:
      "Munch variiert das Motiv über Jahrzehnte: Freundschaft, Warten und Melancholie in einer einzigen Konstellation.",
    reception:
      "Eine Fassung erzielte 2016 rund 54 Millionen Dollar; die Serie gilt als sein zugänglichstes und beliebtestes Thema.",
  },
  // Mondrian
  {
    id: "komposition-rot-blau-gelb",
    title: "Komposition mit Rot, Blau und Gelb",
    year: "1930",
    image: img_mondrian_rby,
    painter: "piet-mondrian",
    museum: "Kunsthaus Zürich",
    technique: "Öl auf Leinwand, 46 × 46 cm",
    styles: ["de-stijl", "abstrakte-kunst"],
    description:
      "Schwarze Linien teilen die weiße Fläche; ein großes Rot, ein kleines Blau und ein kleines Gelb halten sie im Gleichgewicht.",
    significance:
      "Mondrians Neoplastizismus sucht eine universelle Harmonie ohne jede Anspielung auf die sichtbare Welt.",
    reception:
      "Von Yves Saint Laurents Kleidern bis zu App-Icons endlos zitiert – Beispiel dafür, wie radikale Kunst zur Designsprache wird.",
  },
  {
    id: "tableau-i",
    title: "Tableau I",
    year: "1921",
    image: img_tableau_i,
    painter: "piet-mondrian",
    museum: "Museum Ludwig, Köln",
    technique: "Öl auf Leinwand",
    styles: ["de-stijl"],
    description:
      "Eine frühe Fassung des Rastersystems: Grau, Rot, Blau und Gelb, noch mit sichtbaren Pinselspuren.",
    significance:
      "Zeigt den Moment, in dem Mondrian seine Formensprache endgültig festlegt – jede spätere Arbeit variiert dieses Prinzip.",
    reception:
      "Für die Forschung ein Schlüsselbild zur Entstehung von De Stijl, jener Bewegung, die auch Bauhaus und moderne Architektur prägte.",
  },
  // Franz Marc
  {
    id: "blaues-pferd",
    title: "Blaues Pferd I",
    year: "1911",
    image: img_blaues_pferd,
    painter: "franz-marc",
    museum: "Lenbachhaus, München",
    technique: "Öl auf Leinwand, 112 × 85 cm",
    styles: ["blauer-reiter", "expressionismus"],
    description:
      "Ein junges Pferd in leuchtendem Blau vor roten und gelben Hügeln, den Kopf nachdenklich gesenkt.",
    significance:
      "Für Marc war Blau das „männliche, geistige“ Prinzip: Farbe ist hier keine Beschreibung, sondern ein Bekenntnis.",
    reception:
      "Ikone des Blauen Reiter und Publikumsliebling des Lenbachhauses; die Nationalsozialisten diffamierten Marcs Werk später als „entartet“.",
  },
  {
    id: "die-grossen-blauen-pferde",
    title: "Die großen blauen Pferde",
    year: "1911",
    image: img_blaue_pferde,
    painter: "franz-marc",
    museum: "Walker Art Center, Minneapolis",
    technique: "Öl auf Leinwand, 106 × 181 cm",
    styles: ["blauer-reiter", "expressionismus"],
    description:
      "Drei Pferde bilden mit den Hügeln eine einzige wogende Linie – Tier und Landschaft verschmelzen zu einem Rhythmus.",
    significance:
      "Marcs Ideal einer Welt ohne Trennung von Kreatur und Natur, kurz vor dem Ersten Weltkrieg, in dem er 1916 fiel.",
    reception:
      "Gilt als Höhepunkt seines Werks; Ausstellungen zum Blauen Reiter zeigen es regelmäßig als Gegenstück zu Kandinskys Abstraktionen.",
  },
];

// ---------- Hydrated model (kept compatible with existing routes) ----------

export type Painter = PainterData & { works: WorkData[] };
export type Work = Omit<WorkData, "painter"> & { painter: Painter; epoch: Epoch };
export type Epoch = EpochData & { painters: Painter[] };

export const epochData: EpochData[] = [...baseEpochData, ...extraEpochs];
export const styles: Style[] = [...baseStyles, ...extraStyles];
export const painterData: PainterData[] = [
  ...basePainterData,
  ...extraPainters.filter((p) => !basePainterData.some((b) => b.slug === p.slug)),
];
export const workData: WorkData[] = [
  ...baseWorkData,
  ...extraWorks.filter((w) => !baseWorkData.some((b) => b.id === w.id)),
];

const painters: Painter[] = painterData.map((p) => ({
  ...p,
  works: workData.filter((w) => w.painter === p.slug),
}));

export const epochs: Epoch[] = epochData.map((e) => ({
  ...e,
  painters: painters.filter((p) => p.epoch === e.slug),
}));

export const allPainters: (Omit<Painter, "epoch"> & { epoch: Epoch })[] = epochs.flatMap(
  (epoch) => epoch.painters.map((p) => ({ ...p, epoch })),
);

export const allWorks: Work[] =
  epochs.flatMap((epoch) =>
    epoch.painters.flatMap((painter) =>
      painter.works.map((work) => ({ ...work, painter, epoch })),
    ),
  );

export function findEpoch(slug: string) {
  return epochs.find((e) => e.slug === slug);
}

export function findPainter(slug: string) {
  return allPainters.find((p) => p.slug === slug);
}

export function findWork(id: string) {
  return allWorks.find((w) => w.id === id);
}

export function findStyle(slug: string) {
  return styles.find((s) => s.slug === slug);
}

export function worksByStyle(slug: string) {
  return allWorks.filter((w) => w.styles.includes(slug));
}

export function paintersByStyle(slug: string) {
  return allPainters.filter((p) => p.styles.includes(slug));
}
