import { defineConfig, tierPresets, type BadgePreset } from "@mooncellwiki/sponsorkit";
import fs from "fs";

function toBase64(filePath: string) {
  const img = fs.readFileSync(filePath);

  return Buffer.from(img).toString("base64");
}

const SKLAND_LOGO = (width: number, y: number) => `
<a xlink:href="https://www.skland.com/" class="sponsorkit-link" target="_blank" id="SKLand">
<svg x="${
  width / 2 - 361
}" y="${y}" width="361" height="86" viewBox="0 0 361 86" fill="none" xmlns="http://www.w3.org/2000/svg">
<image x="0" y="0" width="361" height="86" xlink:href="${
  "data:image/png;base64," + toBase64("assets/skland.png")
}"/>
</svg>
</a>
`;

const HORAIN_LOGO = (width: number, y: number) => `
<a xlink:href="https://www.horain.net/" class="sponsorkit-link" target="_blank" id="Horain">
<svg x="${
  width / 2 - 43
}" y="${y}" width="361" height="86" viewBox="0 0 361 86" fill="none" xmlns="http://www.w3.org/2000/svg">
<image x="0" y="0" width="361" height="86" xlink:href="${
  "data:image/png;base64," + toBase64("assets/horain/340x100.png")
}"/>
</svg>
</a>
`;

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;

const date = `${year}-${month.toString().padStart(2, "0")}`;
const past: BadgePreset = {
  avatar: {
    size: 20,
  },
  boxWidth: 22,
  boxHeight: 22,
  container: {
    sidePadding: 35,
  },
};

export default defineConfig({
  outputDir: ".",
  formats: ["svg", "png"],
  tiers: [
    {
      title: "过去赞助者",
      monthlyDollars: -1,
      preset: past,
    },
    {
      title: "赞助者",
      preset: tierPresets.small,
    },
    {
      title: "铜牌赞助者",
      monthlyDollars: 5,
      preset: {
        avatar: {
          size: 42,
        },
        boxWidth: 52,
        boxHeight: 52,
        container: {
          sidePadding: 30,
        },
      },
    },
    {
      title: "银牌赞助者",
      monthlyDollars: 10,
      preset: tierPresets.medium,
    },
    {
      title: "金牌赞助者",
      monthlyDollars: 25,
      preset: tierPresets.large,
    },
    {
      title: "铂金赞助者",
      monthlyDollars: 50,
      preset: tierPresets.xl,
    },
    {
      title: "特别赞助",
      monthlyDollars: Infinity,
      composeAfter(compose, _, config) {
        if (
          config.filter?.({ monthlyDollars: Infinity } as any, []) !== false
        ) {
          compose
            .addSpan(20)
            .addText("特别赞助", "sponsorkit-tier-title")
            .addSpan(10)
            .addRaw(SKLAND_LOGO(config.width!, compose.height)+HORAIN_LOGO(config.width!+100, compose.height))
            .addSpan(130);
        }
      },
    },
  ],
  renders: [
    {
      name: `sponsors.${date}`,
      width: 1000,
      includePastSponsors: false,
      renderer: "circles",
    },
    {
      name: "sponsors.all",
      width: 1000,
      includePastSponsors: true,
      renderer: "circles",
    },
    {
      name: "sponsors",
      width: 800,
      includePastSponsors: true,
      renderer: "tiers",
    },
    {
      name: "sponsors.wide",
      width: 1800,
      includePastSponsors: true,
      renderer: "tiers",
    },
    {
      name: "sponsors.part1",
      width: 800,
      includePastSponsors: true,
      renderer: "tiers",
      filter(sponsor) {
        return sponsor.monthlyDollars >= 9.9;
      },
    },
    {
      name: "sponsors.part2",
      width: 800,
      includePastSponsors: true,
      renderer: "tiers",
      filter(sponsor) {
        return sponsor.monthlyDollars < 9.9;
      },
    },
  ],
});
