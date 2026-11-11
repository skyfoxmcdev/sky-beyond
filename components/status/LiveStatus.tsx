"use client";

import { RefreshCw } from "lucide-react";
import { useLiveStatus } from "@/components/status/StatusProvider";
import { cn } from "@/lib/utils";

function getLabel(state: ReturnType<typeof useLiveStatus>["state"]) {
  if (state === "loading") return "Vérification du statut";
  if (state === "online") return "En ligne";
  if (state === "offline") return "Hors ligne";
  return "Statut indisponible";
}

export function LiveStatus({
  variant = "compact",
  className,
}: {
  variant?: "compact" | "panel";
  className?: string;
}) {
  const { state, players, configured, refresh } = useLiveStatus();
  const label = getLabel(state);
  const showPlayers = state === "online" && players !== null;

  if (variant === "compact") {
    return (
      <span className={cn("status", className)} data-state={state} role="status" aria-live="polite">
        <span className="status-dot" aria-hidden="true" />
        <span>{label}</span>
        {showPlayers ? <span aria-hidden="true">· {players}</span> : null}
      </span>
    );
  }

  return (
    <div className={cn("status-panel", className)}>
      <span className="status" data-state={state} role="status" aria-live="polite">
        <span className="status-dot" aria-hidden="true" />
        <span>{label}</span>
      </span>

      {showPlayers ? (
        <div className="status-count">
          <strong>{players}</strong>
          <span>{players === 1 ? "joueur connecté" : "joueurs connectés"}</span>
        </div>
      ) : null}

      {state === "offline" ? (
        <p className="status-detail">Le serveur ne répond pas pour le moment.</p>
      ) : null}

      {state === "unknown" ? (
        <p className="status-detail">
          {configured === false
            ? "L’adresse officielle n’est pas encore configurée."
            : "Le statut n’a pas pu être vérifié. Réessayez plus tard."}
        </p>
      ) : null}

      {state !== "loading" ? (
        <button
          type="button"
          className="status-refresh"
          onClick={refresh}
          aria-label="Actualiser le statut du serveur"
        >
          <RefreshCw aria-hidden="true" />
          Actualiser
        </button>
      ) : null}
    </div>
  );
}
