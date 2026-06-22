import { Section } from "./Section";
import { RgpdSelfCheck } from "./RgpdSelfCheck";

export function SelfCheck() {
 return (
 <Section
 id="suis-je-en-regle"
 num="15d"
 eyebrow="Partie 3 · Passer à l'action avec méthode"
 title="Et moi — suis-je en règle ?"
 >
 <RgpdSelfCheck />
 </Section>
 );
}
