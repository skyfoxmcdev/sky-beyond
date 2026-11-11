"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type ServerState = "loading" | "online" | "offline" | "unknown";

type StatusData = {
  state: ServerState;
  players: number | null;
  configured: boolean | null;
};

type StatusContextValue = StatusData & {
  refresh: () => void;
};

const initialState: StatusData = {
  state: "loading",
  players: null,
  configured: null,
};

const StatusContext = createContext<StatusContextValue | null>(null);

function isServerState(value: unknown): value is Exclude<ServerState, "loading"> {
  return value === "online" || value === "offline" || value === "unknown";
}

export function StatusProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StatusData>(initialState);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    let active = true;

    async function load() {
      try {
        const response = await fetch("/api/status", {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Statut indisponible");

        const payload: unknown = await response.json();
        if (!active) return;

        if (!payload || typeof payload !== "object") {
          setData({ state: "unknown", players: null, configured: null });
          return;
        }

        const record = payload as Record<string, unknown>;
        const state = isServerState(record.state) ? record.state : "unknown";
        const players =
          state === "online" && typeof record.players === "number" && Number.isInteger(record.players)
            ? record.players
            : null;
        const configured = typeof record.configured === "boolean" ? record.configured : null;

        setData({ state, players, configured });
      } catch (error) {
        if (!active || (error instanceof DOMException && error.name === "AbortError")) {
          if (active) setData({ state: "unknown", players: null, configured: null });
          return;
        }
        setData({ state: "unknown", players: null, configured: null });
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void load();

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [requestId]);

  const refresh = useCallback(() => {
    setData(initialState);
    setRequestId((id) => id + 1);
  }, []);

  const value = useMemo<StatusContextValue>(() => ({ ...data, refresh }), [data, refresh]);

  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
}

export function useLiveStatus(): StatusContextValue {
  const context = useContext(StatusContext);
  if (!context) throw new Error("useLiveStatus doit être utilisé dans StatusProvider.");
  return context;
}
