import { connection, NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

const STATUS_ENDPOINT = "https://api.mcsrvstat.us/3";
const ADDRESS_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9.-]{0,251}[a-zA-Z0-9])?(?::\d{1,5})?$/;
const CACHE_TTL_MS = 5 * 60 * 1000;

type StatusPayload = {
  state: "online" | "offline" | "unknown";
  players: number | null;
  configured: boolean;
};

function respond(payload: StatusPayload, cacheable: boolean) {
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": cacheable
        ? "public, s-maxage=300, stale-while-revalidate=600"
        : "public, s-maxage=60",
    },
  });
}

let lastResult: { payload: StatusPayload; expiresAt: number } | null = null;

export async function GET() {
  await connection();

  const address = siteConfig.minecraft.address.trim();

  if (!address) {
    return respond({ state: "unknown", players: null, configured: false }, true);
  }

  if (!ADDRESS_PATTERN.test(address)) {
    return respond({ state: "unknown", players: null, configured: false }, false);
  }

  if (lastResult && lastResult.expiresAt > Date.now()) {
    return respond(lastResult.payload, true);
  }

  try {
    const response = await fetch(`${STATUS_ENDPOINT}/${encodeURIComponent(address)}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": `SkyAndBeyondWebsite/1.0 (+${siteConfig.url})`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(6500),
    });

    if (!response.ok) {
      return respond({ state: "unknown", players: null, configured: true }, false);
    }

    const data: unknown = await response.json();
    if (!data || typeof data !== "object") {
      return respond({ state: "unknown", players: null, configured: true }, false);
    }

    const record = data as Record<string, unknown>;
    const online = record.online === true;
    const rawPlayers =
      record.players && typeof record.players === "object"
        ? (record.players as Record<string, unknown>).online
        : null;

    const players =
      online && typeof rawPlayers === "number" && Number.isInteger(rawPlayers) && rawPlayers >= 0
        ? rawPlayers
        : null;

    const payload: StatusPayload = {
      state: online ? "online" : "offline",
      players: online ? players : null,
      configured: true,
    };

    lastResult = { payload, expiresAt: Date.now() + CACHE_TTL_MS };
    return respond(payload, true);
  } catch {
    return respond({ state: "unknown", players: null, configured: true }, false);
  }
}
