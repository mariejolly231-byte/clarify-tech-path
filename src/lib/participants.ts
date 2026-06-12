import s01 from "@/assets/samoyedes/01-bador.png.asset.json";
import s02 from "@/assets/samoyedes/02-bouchard.png.asset.json";
import s03 from "@/assets/samoyedes/03-chadelle.png.asset.json";
import s04 from "@/assets/samoyedes/04-davidoff.png.asset.json";
import s05 from "@/assets/samoyedes/05-desousa.png.asset.json";
import s06 from "@/assets/samoyedes/06-diaz.png.asset.json";
import s07 from "@/assets/samoyedes/07-dumestier.png.asset.json";
import s08 from "@/assets/samoyedes/08-duplouy.png.asset.json";
import s09 from "@/assets/samoyedes/09-garciae.png.asset.json";
import s10 from "@/assets/samoyedes/10-garciat.png.asset.json";
import s11 from "@/assets/samoyedes/11-hwang.png.asset.json";
import s12 from "@/assets/samoyedes/12-maffre.png.asset.json";
import s13 from "@/assets/samoyedes/13-martin.png.asset.json";
import s14 from "@/assets/samoyedes/14-portes.png.asset.json";
import s15 from "@/assets/samoyedes/15-raymond.png.asset.json";
import s16 from "@/assets/samoyedes/16-razes.png.asset.json";
import s17 from "@/assets/samoyedes/17-zamore.png.asset.json";

export type Participant = {
  id: string;
  prenom: string;
  nom: string;
  activite: string;
  image: string;
};

export const PARTICIPANTS: Participant[] = [
  { id: "bador", prenom: "Anthony", nom: "Bador", activite: "Consultant recrutement", image: s01.url },
  { id: "bouchard", prenom: "Emeline", nom: "Bouchard", activite: "Formation CSE, dirigeants & RH", image: s02.url },
  { id: "chadelle", prenom: "Mickaël", nom: "Chadelle", activite: "Community manager & sites vitrine", image: s03.url },
  { id: "davidoff", prenom: "Cyndia", nom: "Davidoff", activite: "Sophrologue — maladies inflammatoires", image: s04.url },
  { id: "desousa", prenom: "Cristiano", nom: "De Sousa Valente", activite: "Sites, apps & automatisation", image: s05.url },
  { id: "diaz", prenom: "Patricia", nom: "Diaz", activite: "Couturière — produits lavables", image: s06.url },
  { id: "dumestier", prenom: "Florine Anne", nom: "Dumestier", activite: "Communication bien-être", image: s07.url },
  { id: "duplouy", prenom: "Katéry Myriam", nom: "Duplouy", activite: "Illustratrice & coloriste", image: s08.url },
  { id: "garciae", prenom: "Emilie", nom: "Garcia", activite: "Gestion & coordination de projets", image: s09.url },
  { id: "garciat", prenom: "Tahidys", nom: "Garcia", activite: "Services à la personne", image: s10.url },
  { id: "hwang", prenom: "Soo Jin", nom: "Hwang", activite: "Traiteur asiatique en distributeur", image: s11.url },
  { id: "maffre", prenom: "Stéphany", nom: "Maffre", activite: "Legal design & copywriting", image: s12.url },
  { id: "martin", prenom: "Fleur", nom: "Martin", activite: "Tapisserie d'ameublement", image: s13.url },
  { id: "portes", prenom: "Jordi", nom: "Portes", activite: "Plateforme FLE — enseignement du français", image: s14.url },
  { id: "raymond", prenom: "Fabienne", nom: "Raymond", activite: "Coach professionnelle & formatrice", image: s15.url },
  { id: "razes", prenom: "Michèle", nom: "Razes Lafont", activite: "Sublim'objets ML — flocage tout support", image: s16.url },
  { id: "zamore", prenom: "Gaëlle", nom: "Zamore", activite: "Soins minceur & bien-être à domicile", image: s17.url },
];

export const PARTICIPANTS_BY_ID = new Map(PARTICIPANTS.map((p) => [p.id, p]));
