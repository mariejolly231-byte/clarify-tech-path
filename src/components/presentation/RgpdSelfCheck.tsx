import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import samoyede from "@/assets/samoyede-accusateur.png";

export function RgpdSelfCheck() {
  const [revealed, setRevealed] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const formUrl = origin ? `${origin}/sondage-conforme` : "/sondage-conforme";

  return (
    <div className="mb-12 rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
          Avant de donner des leçons
        </div>
        <h3 className="mt-2 font-serif text-2xl text-foreground md:text-3xl">
          « Attendez… suis-je moi-même en règle ? »
        </h3>
        <p className="mt-2 text-sm text-muted-foreground italic">
          Petit moment d'honnêteté avant de vous donner des leçons.
        </p>
      </div>

      {/* TEMPS 1 */}
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <img
            src={samoyede}
            alt="Samoyède cartoon avec lunettes, l'air suspicieux"
            width={1024}
            height={1024}
            loading="lazy"
            className="h-56 w-56 object-contain md:h-72 md:w-72"
          />
          <div className="absolute -top-2 right-0 rounded-2xl border border-border bg-stone-soft px-4 py-2 font-serif text-xl shadow-sm">
            Hmm… 🤔
          </div>
        </div>

        <p className="max-w-xl text-base text-foreground/85 md:text-lg">
          « Depuis le début de cet atelier, j'ai collecté vos données.
          Nom, prénom, activité. <strong>Suis-je en règle ?</strong> »
        </p>

        {!revealed && (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Révéler la réponse →
          </button>
        )}
      </div>

      {/* TEMPS 2 */}
      {revealed && (
        <div className="mt-10 border-t border-border pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-warn/40 bg-warn/10 px-4 py-1.5 text-sm font-medium text-warn">
              ⚠️ NON CONFORME
            </span>
            <p className="max-w-2xl text-lg text-foreground">
              <strong>Non. Pas tout à fait.</strong>
              <br />
              Vos nom, prénom et activité sont des données personnelles — C2.
              Je les ai collectées via le sondage du début sans vous demander
              votre consentement explicite.
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-border bg-background p-5">
            <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Il aurait fallu
            </div>
            <ul className="space-y-2 text-sm text-foreground/85">
              <li className="flex gap-2">
                <span className="text-warn">✗</span>
                Une case à cocher « J'accepte que mes données soient utilisées
                dans le cadre de cet atelier »
              </li>
              <li className="flex gap-2">
                <span className="text-warn">✗</span>
                Un lien vers le registre de traitement des données
              </li>
              <li className="flex gap-2">
                <span className="text-warn">✗</span>
                Une mention claire sur la durée de conservation et vos droits
              </li>
            </ul>
          </div>

          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-caution/40 bg-caution/10 p-5 text-sm text-foreground/85">
            Ce n'est pas une faute grave dans ce contexte.
            Mais c'est exactement le genre d'oubli qui arrive
            quand on ne pense pas RGPD dès le départ.
            <br />
            <strong>Même pour un formulaire simple. Même pour un atelier.</strong>
          </div>

          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-border bg-stone-soft px-5 py-3 text-center font-serif text-lg text-foreground">
            « On corrige ça maintenant — scannez le QR code. »
          </div>

          {/* QR CODE vers le sondage corrigé */}
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
              Formulaire conforme — 30 secondes
            </div>
            <p className="mt-2 text-sm text-foreground/80">
              Tes réponses du sondage initial sont conservées.
              Il te suffit de cocher ton consentement.
            </p>
            <div className="mt-4 inline-flex items-center justify-center rounded-xl bg-white p-3 ring-1 ring-border">
              {origin ? (
                <QRCodeSVG
                  value={formUrl}
                  size={200}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#1a3a3f"
                />
              ) : (
                <div className="h-[200px] w-[200px]" />
              )}
            </div>
            <div className="mt-3 font-mono text-xs break-all text-muted-foreground">
              {formUrl.replace(/^https?:\/\//, "")}
            </div>
            <a
              href="/sondage-conforme"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Accéder au formulaire →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
