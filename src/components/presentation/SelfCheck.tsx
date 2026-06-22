import { Section } from "./Section";
import { RgpdSelfCheck } from "./RgpdSelfCheck";

export function SelfCheck() {
 return (
 <Section
 id="suis-je-en-regle"
 num="15d"
 eyebrow="Acte 4 · Passer à l'action"
 title="Et moi — suis-je en règle ?"
 >
 <RgpdSelfCheck />
 </Section>
 );
}
