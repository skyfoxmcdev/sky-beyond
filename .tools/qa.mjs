import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.QA_URL ?? "http://localhost:3100";
const OUT_DIR = path.resolve(".tools/shots");
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--font-render-hinting=none",
  ],
});

const report = {
  consoleErrors: [],
  pageErrors: [],
  overflow: {},
  interactions: {},
  images: {},
  shots: [],
};
const page = await browser.newPage();

page.on("console", (message) => {
  if (message.type() === "error") report.consoleErrors.push(message.text());
});
page.on("pageerror", (error) => report.pageErrors.push(String(error)));

async function prime() {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const step = Math.max(360, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 250));
    await Promise.all(
      Array.from(document.images).map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
          window.setTimeout(resolve, 4000);
        });
      }),
    );
    document.activeElement?.blur();
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
}

async function visit(url = "/", width = 1440, height = 900) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(`${BASE_URL}${url}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((resolve) => setTimeout(resolve, 300));
  await prime();
}

async function shot(name, fullPage = false) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage });
  report.shots.push(file);
}

async function shotAt(name, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + window.scrollY - 72));
  }, selector);
  await new Promise((resolve) => setTimeout(resolve, 450));
  await shot(name);
}

async function measure(label) {
  report.overflow[label] = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    documentHeight: document.documentElement.scrollHeight,
  }));
}

function watchImages(label) {
  return page.evaluate((name) => {
    return Array.from(document.images).map((image) => ({
      page: name,
      src: image.currentSrc,
      alt: image.alt,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      width: Math.round(image.getBoundingClientRect().width),
      height: Math.round(image.getBoundingClientRect().height),
    }));
  }, label);
}

// Desktop
await visit("/", 1440, 900);
await measure("desktop");
report.heroPanel = await page.evaluate(() => {
  const el = document.querySelector(".hero-aside");
  if (!el) return { missing: true };
  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  return {
    display: cs.display,
    opacity: cs.opacity,
    visibility: cs.visibility,
    zIndex: cs.zIndex,
    animation: `${cs.animationName} ${cs.animationDuration} ${cs.animationDelay} ${cs.animationFillMode}`,
    rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
  };
});
report.images.desktop = await watchImages("desktop");
await shot("viewport-desktop-hero");
for (const [name, selector] of [
  ["viewport-desktop-manifesto", "#decouvrir"],
  ["viewport-desktop-features", "#fonctionnalites"],
  ["viewport-desktop-world", "#monde"],
  ["viewport-desktop-factions", ".factions"],
  ["viewport-desktop-community", "#communaute"],
  ["viewport-desktop-news", "#actualites"],
  ["viewport-desktop-faq", "#faq"],
  ["viewport-desktop-join", "#rejoindre"],
  ["viewport-desktop-footer", ".footer"],
]) {
  await shotAt(name, selector);
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((resolve) => setTimeout(resolve, 500));
await shot("desktop-full", true);

// Tablet
await visit("/", 1024, 900);
await measure("tablet-1024");
await shot("tablet-1024-full", true);

await visit("/", 768, 1024);
await measure("tablet-768");
await shot("tablet-768-full", true);

// Mobile
await visit("/", 390, 844);
await measure("mobile-390");
report.images.mobile = await watchImages("mobile");
await shot("viewport-mobile-hero");
for (const [name, selector] of [
  ["viewport-mobile-manifesto", "#decouvrir"],
  ["viewport-mobile-features", "#fonctionnalites"],
  ["viewport-mobile-world", "#monde"],
  ["viewport-mobile-factions", ".factions"],
  ["viewport-mobile-community", "#communaute"],
  ["viewport-mobile-news", "#actualites"],
  ["viewport-mobile-faq", "#faq"],
  ["viewport-mobile-join", "#rejoindre"],
  ["viewport-mobile-footer", ".footer"],
]) {
  await shotAt(name, selector);
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((resolve) => setTimeout(resolve, 400));
await shot("mobile-full", true);

// Mobile menu.
await page.click(".menu-toggle");
await new Promise((resolve) => setTimeout(resolve, 450));
report.interactions.menuOpen = {
  expanded: await page.$eval(".menu-toggle", (el) => el.getAttribute("aria-expanded")),
  dialogVisible: await page.$eval("#menu-mobile", (el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }),
  bodyOverflow: await page.evaluate(() => document.body.style.overflow),
  focused: await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40)),
};
await shot("mobile-menu");
await page.keyboard.press("Escape");
await new Promise((resolve) => setTimeout(resolve, 300));
report.interactions.menuClosed = {
  dialogGone: (await page.$("#menu-mobile")) === null,
  expanded: await page.$eval(".menu-toggle", (el) => el.getAttribute("aria-expanded")),
  focusReturned: await page.evaluate(() => document.activeElement?.className),
};

// FAQ interaction.
await page.evaluate(() => {
  const el = document.getElementById("faq");
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 72);
});
await new Promise((resolve) => setTimeout(resolve, 400));
const faqSummaries = await page.$$("#faq details summary");
if (faqSummaries[1]) {
  await faqSummaries[1].click();
  await new Promise((resolve) => setTimeout(resolve, 350));
}
report.interactions.faq = await page.$$eval("#faq details", (items) =>
  items.map((item) => item.hasAttribute("open")),
);
await shot("mobile-faq-open");

// Keyboard skip link.
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((resolve) => setTimeout(resolve, 300));
await page.keyboard.press("Tab");
report.interactions.firstFocus = await page.evaluate(() => {
  const el = document.activeElement;
  if (!el) return null;
  const style = getComputedStyle(el);
  return {
    text: el.textContent?.trim().slice(0, 60),
    className: el.className,
    outline: `${style.outlineWidth} ${style.outlineStyle} ${style.outlineColor}`,
    top: Math.round(el.getBoundingClientRect().top),
  };
});
await shot("mobile-skip-link-focused");

// Copy button (only when configured).
const copyButton = await page.$(".copy-button");
if (copyButton) {
  await copyButton.click();
  await new Promise((resolve) => setTimeout(resolve, 300));
  report.interactions.copy = {
    copied: await page.$eval(".copy-button", (el) => el.getAttribute("data-copied")),
    announcement: await page.$eval(".copy-button + .sr-only", (el) => el.textContent),
  };
} else {
  report.interactions.copy = "Adresse non configurée : bouton absent";
}

// News index and article.
for (const [name, url, width, height] of [
  ["desktop-news-index", "/actualites", 1440, 900],
  ["desktop-article", "/actualites/2026-11-11-bienvenue-a-bord", 1440, 900],
  ["mobile-news-index", "/actualites", 390, 844],
  ["mobile-article", "/actualites/2026-11-11-bienvenue-a-bord", 390, 844],
]) {
  await visit(url, width, height);
  await measure(`${url}-${width}`);
  await shot(name, true);
  report.images[name] = await watchImages(name);
}

report.meta = await page.evaluate(() => ({
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
  ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
  h1: document.querySelector("h1")?.textContent?.trim(),
}));

fs.writeFileSync(path.join(OUT_DIR, "report.json"), JSON.stringify(report, null, 2));
await browser.close();
console.log(JSON.stringify(report, null, 2));
