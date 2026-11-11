"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyAddress({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    setFailed(false);

    try {
      let copiedToClipboard = false;

      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(value);
          copiedToClipboard = true;
        } catch {
          copiedToClipboard = false;
        }
      }

      if (!copiedToClipboard) {
        const area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        copiedToClipboard = document.execCommand("copy");
        document.body.removeChild(area);
      }

      if (!copiedToClipboard) throw new Error("Copie impossible");
      setCopied(true);
    } catch {
      setFailed(true);
    }
  }

  return (
    <>
      <button
        type="button"
        className="copy-button"
        data-copied={copied}
        onClick={copy}
        aria-label={`Copier l’adresse du serveur : ${value}`}
        title="Copier l’adresse"
      >
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Adresse copiée dans le presse-papiers." : null}
        {failed ? "La copie a échoué. Sélectionnez l’adresse manuellement." : null}
      </span>
    </>
  );
}
