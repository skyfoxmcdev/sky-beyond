import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function Logo() {
  if (siteConfig.logo.src) {
    return (
      <Image
        src={siteConfig.logo.src}
        alt={siteConfig.name}
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        className="logo-image"
        priority
      />
    );
  }

  return (
    <span className="logo-wordmark">
      <span className="logo-sky">Sky</span>
      <span className="logo-amp" aria-hidden="true">
        &amp;
      </span>
      <span className="logo-beyond">Beyond</span>
    </span>
  );
}
