import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3100/", { waitUntil: "domcontentloaded" });
await new Promise((resolve) => setTimeout(resolve, 2200));

const sections = await page.evaluate(() =>
  [...document.querySelectorAll("[id]")]
    .filter((element) => ["decouvrir", "fonctionnalites", "monde", "factions", "communaute", "actualites", "faq", "rejoindre"].includes(element.id))
    .map((element) => element.id),
);

for (const id of sections) {
  await page.evaluate((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
  }, id);
  await new Promise((resolve) => setTimeout(resolve, 900));
}

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((resolve) => setTimeout(resolve, 2500));

const images = await page.evaluate(() =>
  [...document.images].map((image) => ({
    src: image.currentSrc || image.getAttribute("src") || "",
    alt: image.alt,
    complete: image.complete,
    naturalWidth: image.naturalWidth,
    loading: image.loading,
    section: image.closest("section, footer")?.id || image.closest("section, footer")?.className || "",
  })),
);

console.log(
  JSON.stringify(
    {
      total: images.length,
      pending: images.filter((image) => image.naturalWidth === 0),
    },
    null,
    2,
  ),
);

await browser.close();
