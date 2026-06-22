import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PARTICIPANTS, PARTICIPANTS_BY_ID, type Participant } from "@/lib/participants";

export const Route = createFileRoute("/sondage-conforme")({
  head: () => ({
    meta: [
      { title: "Sondage conforme — Summit Flow" },
      { name: "description", content: "On corrige le tir : consentement RGPD explicite." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SondageConformePage,
});

const STORAGE_KEY = "summitflow.participant_id";
const CONSENT_KEY = "summitflow.rgpd_consent";

type Response = {
  id: string;
  participant_id: string | null;
  nocode_def: string[] | null;
  ai_def: string[] | null;
  ai_usage: string[] | null;
  tools_automation: string | null;
  tools_tested: string[] | null;
  tools_other: string | null;
  goals: string[] | null;
  repetitive_task: string | null;
  created_at: string;
};

function SondageConformePage() {
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<Response | null>(null);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && PARTICIPANTS_BY_ID.has(saved)) setParticipantId(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (!participantId) {
      setLoading(false);
      return;
    }
    supabase
      .from("workshop_responses")
      .select("*")
      .eq("participant_id", participantId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        setResponse((data as Response | null) ?? null);
        setLoading(false);
      });
  }, [participantId]);

  const me: Participant | null = participantId
    ? PARTICIPANTS_BY_ID.get(participantId) ?? null
    : null;

  const onSelectParticipant = (p: Participant) => {
    setParticipantId(p.id);
    try {
      localStorage.setItem(STORAGE_KEY, p.id);
    } catch {}
  };

  const onConfirm = async () => {
    if (!consent || !participantId) return;
    setSubmitting(true);
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ participant_id: participantId, at: new Date().toISOString() }),
      );
    } catch {}
    // Si on n'a pas de réponse précédente, on n'insère rien — on enregistre juste le consentement local.
    setSubmitting(false);
    setDone(true);
    toast.success("Consentement enregistré, merci !");
  };

  // 1) Sélection du participant si inconnu
  if (!participantId) {
    return (
      <div className="min-h-screen bg-sand/40 px-4 py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Formulaire conforme
            </div>
            <h1 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              Qui es-tu ?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              On retrouve tes réponses du premier sondage pour les conserver.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {PARTICIPANTS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onSelectParticipant(p)}
                  className="group flex w-full flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gradient-to-b from-stone-soft to-accent/30 ring-1 ring-border">
                    <img
                      src={p.image}
                      alt={`${p.prenom} ${p.nom}`}
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-foreground">
                      {p.prenom} {p.nom}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand/40 text-sm text-muted-foreground">
        Chargement de tes réponses…
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-sand/40 px-6 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          {me && (
            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gradient-to-b from-stone-soft to-accent/30 ring-1 ring-border">
              <img
                src={me.image}
                alt={`${me.prenom} ${me.nom}`}
                className="h-full w-full object-contain p-1"
              />
            </div>
          )}
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-go">
            ✓ Conforme
          </div>
          <h1 className="mt-3 font-serif text-3xl text-foreground">
            Merci{me ? `, ${me.prenom}` : ""} — c'est en règle.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Tes réponses du sondage initial sont conservées.
            Ton consentement explicite est enregistré.
          </p>
          <a
            href="/registre"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-primary underline-offset-2 hover:underline"
          >
            Voir le registre de traitement →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand/40 px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
            On corrige le tir
          </div>
          <h1 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Formulaire conforme RGPD
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            On reprend tes réponses du sondage initial — il te suffit
            d'ajouter ton consentement explicite.
          </p>

          {me && (
            <div className="mx-auto mt-5 inline-flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-b from-stone-soft to-accent/30 ring-1 ring-border">
                <img
                  src={me.image}
                  alt={`${me.prenom} ${me.nom}`}
                  className="h-full w-full object-contain p-0.5"
                />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium leading-tight">
                  {me.prenom} {me.nom}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setParticipantId(null);
                    try {
                      localStorage.removeItem(STORAGE_KEY);
                    } catch {}
                  }}
                  className="text-[11px] text-muted-foreground underline-offset-2 hover:underline"
                >
                  Ce n'est pas moi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Récap des réponses */}
        <div className="mb-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-primary">
            Tes réponses conservées
          </div>
          {response ? (
            <dl className="space-y-3 text-sm">
              <Row label="No-code" value={response.nocode_def?.join(", ")} />
              <Row label="IA générative" value={response.ai_def?.join(", ")} />
              <Row label="Usage IA" value={response.ai_usage?.join(", ")} />
              <Row label="Automatisation" value={response.tools_automation} />
              <Row
                label="Outils testés"
                value={[
                  ...(response.tools_tested ?? []),
                  response.tools_other ? `(${response.tools_other})` : null,
                ]
                  .filter(Boolean)
                  .join(", ")}
              />
              <Row label="Objectifs" value={response.goals?.join(", ")} />
              <Row label="Tâche répétitive" value={response.repetitive_task} />
            </dl>
          ) : (
            <p className="text-sm text-muted-foreground">
              Aucune réponse précédente trouvée pour ton profil — pas de souci,
              on enregistre juste ton consentement.
            </p>
          )}
        </div>

        {/* Bloc consentement */}
        <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl leading-none" aria-hidden>
              🐾
            </span>
            <div className="space-y-3 text-sm text-foreground/85">
              <p>
                En confirmant ci-dessous, tu acceptes que tes données
                (prénom, nom, activité, réponses au sondage) soient utilisées
                par Summit Flow pour animer cet atelier et adapter son contenu.
                Aucun usage commercial. Suppression sous 30 jours.
              </p>
              <a
                href="/registre"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-primary underline-offset-2 hover:underline"
              >
                En savoir plus sur le traitement de vos données →
              </a>
              <label className="flex cursor-pointer items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 cursor-pointer accent-primary"
                />
                <span className="font-medium text-foreground">
                  J'ai compris et j'accepte explicitement
                </span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onConfirm}
          disabled={!consent || submitting}
          className="mt-5 w-full rounded-md bg-primary px-6 py-4 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Enregistrement…" : "Confirmer mon consentement"}
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 border-b border-border/60 pb-2 last:border-0">
      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="text-foreground/85">{value}</dd>
    </div>
  );
}
