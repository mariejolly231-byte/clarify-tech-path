import { Section } from "./Section";
import { RgpdSelfCheck } from "./RgpdSelfCheck";

export function SelfCheck() {
 return (
 <Section
 id="suis-je-en-regle"
 num="15d"
 eyebrow="Acte 4 · Sécuriser la cordée"
 title="Et moi — suis-je en règle ?"
 >
 <RgpdSelfCheck />
 </Section>
 );
}
