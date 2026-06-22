import { Section } from "./Section";
import portrait from "@/assets/marie-portrait.jpg.asset.json";
import logoAsset from "@/assets/summit-flow-logo.png.asset.json";

const POSTURE = [
 { k: "Simplicité", d: "Faire mieux avec moins. Quelques bons outils, bien utilisés." },
 { k: "Valeur métier", d: "Partir du terrain et du gain réel, pas de l'outil." },
 { k: "Adoption terrain", d: "Co-construire pour que les équipes s'approprient." },
];

export function About() {
 return (
 <Section id="qui" num="02" eyebrow="Le guide" title="Le guide">
 <div className="grid gap-12 md:grid-cols-[300px_1fr] md:gap-16">
 <div className="space-y-5">
 <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
 <img src={portrait.url} alt="Marie Jolly" className="aspect-[4/5] w-full object-cover" />
 </div>
 <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
 <img src={logoAsset.url} alt="" className="h-10 w-10 rounded-full" />
 <div className="text-xs leading-tight">
 <div className="font-serif text-base text-primary">Marie Jolly</div>
 <div className="text-muted-foreground">Fondatrice — Summit Flow</div>
 </div>
 </div>
 </div>

 <div className="space-y-5 text-[15px] leading-relaxed text-foreground/85">
 <p className="text-lg text-foreground">
 Je suis <span className="font-medium">Marie Jolly</span>, fondatrice de{" "}
 <span className="font-medium">Summit Flow</span>. J'accompagne les PME sur le no-code,
 l'automatisation, l'IA et les agents IA — avec une approche simple, concrète et
 orientée valeur métier.
 </p>
 <p>
 Aspirante guide de montagne et ingénieure industrielle forte de 10 ans d'expérience,
 j'ai appris à conjuguer rigueur, méthode et sens de l'efficacité — que ce soit dans
 l'ascension des sommets ou dans la conception de solutions technologiques.
 </p>
 <p>
 Dix ans en production, qualité et conduite de projets m'ont montré de l'intérieur ce
 qui freine vraiment les PME industrielles et techniques : outils mal adaptés, process
 implicites, quotidien sous tension. Je comprends les contraintes réelles de délais,
 de marges, de coordination et d'adoption terrain.
 </p>
 <p>
 Après une reconversion intensive vers le no-code et l'IA (certification RNCP niveau 6,
 Bac+3/4), j'ai créé Summit Flow pour mettre cette double culture industrie + tech au
 service de dirigeants qui veulent <em>simplifier</em> leur organisation au lieu de la
 complexifier.
 </p>
 <p className="text-muted-foreground">
 Basée en Occitanie, au sud de Toulouse. J'interviens sur site dans la région et à
 distance partout en France. Comme en montagne, je ne crois pas aux solutions « clé en
 main » : on pose la carte ensemble, on allège le sac des outils inutiles, et on évite
 les fausses bonnes routes.
 </p>

 <div className="mt-8 grid gap-3 sm:grid-cols-3">
 {POSTURE.map((p) => (
 <div
 key={p.k}
 className="rounded-xl border border-border bg-stone-soft px-4 py-4"
 >
 <div className="mb-1 font-serif text-base text-primary">{p.k}</div>
 <div className="text-xs leading-relaxed text-muted-foreground">{p.d}</div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </Section>
 );
}
