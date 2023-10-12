import fs from "fs";
import { BadgePreset, defineConfig, presets } from "sponsorkit";

function toBase64(filePath) {
  const img = fs.readFileSync(filePath);

  return Buffer.from(img).toString("base64");
}

const SKLAND_LOGO = (width: number, y: number) => `
<a xlink:href="https://www.skland.com" class="sponsorkit-link" target="_blank" id="SKLand">
<svg x="${
  (width - 361) / 2
}" y="${y}" width="361" height="86" viewBox="0 0 361 86" fill="none" xmlns="http://www.w3.org/2000/svg">
<image x="0" y="0" width="361" height="86" xlink:href="${
  "data:image/png;base64," + toBase64("assets/skland.png")
}"/>
</svg>
</a>
`;

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
  tiers: [
    {
      title: "过去赞助者",
      monthlyDollars: -1,
      preset: past,
    },
    {
      title: "赞助者",
      preset: presets.small,
    },
    {
      title: "铜牌赞助者",
      monthlyDollars: 68,
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
      monthlyDollars: 128,
      preset: presets.medium,
    },
    {
      title: "金牌赞助者",
      monthlyDollars: 328,
      preset: presets.large,
    },
    {
      title: "铂金赞助者",
      monthlyDollars: 648,
      preset: presets.xl,
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
            .addRaw(SKLAND_LOGO(config.width!, compose.height))
            .addSpan(130);
        }
      },
    },
  ],
});
