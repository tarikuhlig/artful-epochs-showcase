import bauhausTools from "@/assets/atelier/bauhaus-tools.png";
import brushes from "@/assets/atelier/brushes.png";
import easel from "@/assets/atelier/easel.png";
import gildingTools from "@/assets/atelier/gilding-tools.png";
import ink from "@/assets/atelier/ink.png";
import oldMasterPalette from "@/assets/atelier/old-master-palette.png";
import pastelChalks from "@/assets/atelier/pastel-chalks.png";
import perspectiveTools from "@/assets/atelier/perspective-tools.png";
import pigmentGrinding from "@/assets/atelier/pigment-grinding.png";
import pleinAirKit from "@/assets/atelier/plein-air-kit.png";
import printmakingTools from "@/assets/atelier/printmaking-tools.png";
import tube from "@/assets/atelier/tube.png";

export type AtelierTool = {
  image: string;
  name: string;
  role: string;
  use: string;
};

const tool = {
  grinding: {
    image: pigmentGrinding,
    name: "Reibstein & Läufer",
    role: "Aus Mineralbrocken wird feines Farbpulver.",
    use: "Das Pigment wird mit kreisenden Bewegungen immer feiner gerieben. Erst danach mischt der Maler es mit Ei, Öl oder Kalkwasser.",
  },
  gilding: {
    image: gildingTools,
    name: "Punze & Achatpolierer",
    role: "Goldgrund bekommt Glanz und eingeprägte Muster.",
    use: "Blattgold wird auf den vorbereiteten Grund gelegt, mit Achat verdichtet und anschließend mit Punzen rhythmisch gemustert.",
  },
  perspective: {
    image: perspectiveTools,
    name: "Zirkel, Lot & Richtscheit",
    role: "Geometrie baut einen glaubwürdigen Bildraum.",
    use: "Lot und Schnur legen Senkrechte und Fluchtlinien fest. Der Zirkel überträgt Maße, bevor Konturen in Putz oder Grund geritzt werden.",
  },
  drawing: {
    image: ink,
    name: "Feder & Tinte",
    role: "Entwürfe, Konturen und Reisebeobachtungen werden festgehalten.",
    use: "Mit der zugeschnittenen Feder entstehen feine Linien und kräftige Schraffuren. Verdünnte Tinte kann zusätzlich wie eine transparente Farbe laviert werden.",
  },
  printmaking: {
    image: printmakingTools,
    name: "Stichel, Nadel & Druckplatte",
    role: "Eine Zeichnung wird vervielfältigbar.",
    use: "Der Stichel schneidet direkt in Metall; die Radiernadel öffnet eine Schutzschicht. Farbe bleibt in den Vertiefungen und wird unter Druck auf Papier übertragen.",
  },
  palette: {
    image: oldMasterPalette,
    name: "Palette, Pinsel & Malstock",
    role: "Farbe wird gemischt und kontrolliert aufgetragen.",
    use: "Der Malstock stützt die ruhige Hand vor der noch nassen Leinwand. Weiche Pinsel lasieren, kräftige Borsten setzen sichtbare Spuren.",
  },
  brushes: {
    image: brushes,
    name: "Haar- und Borstenpinsel",
    role: "Die Pinselspur entscheidet über Oberfläche und Ausdruck.",
    use: "Feines Tierhaar hält viel dünne Farbe für glatte Übergänge. Steife Borsten bewegen dickere Farbe und lassen den einzelnen Zug sichtbar stehen.",
  },
  easel: {
    image: easel,
    name: "Staffelei",
    role: "Der Bildträger steht aufrecht und lässt sich aus Abstand prüfen.",
    use: "Der Maler tritt immer wieder zurück. So erkennt er, ob große Formen, Licht und Proportionen auch aus der späteren Betrachterdistanz funktionieren.",
  },
  pastel: {
    image: pastelChalks,
    name: "Pastell- und Zeichenkreiden",
    role: "Fast reines Pigment erzeugt samtige, unmittelbare Farbe.",
    use: "Kreide wird direkt auf raues Papier gesetzt, mit Fingern oder Wischern verrieben und wegen ihrer empfindlichen Oberfläche anschließend geschützt.",
  },
  pleinAir: {
    image: pleinAirKit,
    name: "Tragbarer Malkasten",
    role: "Das Atelier zieht hinaus vor das Motiv.",
    use: "Farben, Palette und Bildträger reisen in einem Kasten. Zusammen mit der Klappstaffelei können Wetter und wechselndes Licht direkt beobachtet werden.",
  },
  tube: {
    image: tube,
    name: "Zinn-Farbtube",
    role: "Ölfarbe bleibt unterwegs frisch und transportierbar.",
    use: "Seit 1841 lässt sich fertige Farbe luftdicht verschließen. Maler müssen Pigmente nicht mehr täglich anreiben und können kräftige Töne ins Freie mitnehmen.",
  },
  bauhaus: {
    image: bauhausTools,
    name: "Schablone, Winkel & Spritzpistole",
    role: "Gestaltung wird präzise, seriell und technisch.",
    use: "Schablonen wiederholen geometrische Formen, Winkel sichern klare Konstruktionen und die Spritzpistole verteilt Farbe ohne sichtbare Handschrift.",
  },
} satisfies Record<string, AtelierTool>;

/** Historisch passende Auswahl für jede der 30 Stationen. */
const stationToolKeys = [
  ["grinding", "gilding"], ["gilding", "drawing"], ["grinding", "brushes"],
  ["perspective", "brushes"], ["perspective", "printmaking"], ["drawing", "perspective"],
  ["drawing", "printmaking"], ["printmaking", "drawing"], ["perspective", "brushes"],
  ["palette", "brushes"], ["pastel", "drawing"], ["palette", "perspective"],
  ["palette", "easel"], ["palette", "brushes"], ["printmaking", "palette"],
  ["perspective", "drawing"], ["palette", "easel"], ["drawing", "palette"],
  ["pastel", "easel"], ["pastel", "printmaking"], ["easel", "brushes"],
  ["printmaking", "palette"], ["pleinAir", "drawing"], ["pleinAir", "tube"],
  ["printmaking", "drawing"], ["palette", "pleinAir"], ["tube", "pleinAir"],
  ["tube", "palette"], ["printmaking", "gilding"], ["bauhaus", "tube"],
] as const;

export function toolsForStation(stationIndex: number): AtelierTool[] {
  const keys = stationToolKeys[stationIndex] ?? ["palette"];
  return keys.map((key) => tool[key]);
}