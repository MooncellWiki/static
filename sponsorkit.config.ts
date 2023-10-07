import { BadgePreset, defineConfig, presets } from "sponsorkit";

const SKLAND_LOGO = (width: number, y: number) => `
<a xlink:href="https://www.skland.com" class="sponsorkit-link" target="_blank" id="SKLand">
<svg x="${
  (width - 361) / 2
}" y="${y}" width="361" height="86" viewBox="0 0 361 86" fill="none" xmlns="http://www.w3.org/2000/svg">
<image x="0" y="0" width="361" height="86" xlink:href="assets/skland.png"/>
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
      title: "Past Sponsors",
      monthlyDollars: -1,
      preset: past,
    },
    {
      title: "Backers",
      preset: presets.small,
    },
    {
      title: "Sponsors",
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
      title: "Silver Sponsors",
      monthlyDollars: 128,
      preset: presets.medium,
    },
    {
      title: "Gold Sponsors",
      monthlyDollars: 328,
      preset: presets.large,
    },
    {
      title: "Platinum Sponsors",
      monthlyDollars: 648,
      preset: presets.xl,
    },
    {
      title: 'Special Sponsor',
      monthlyDollars: Infinity,
      composeAfter(compose, _, config) {
        if (config.filter?.({ monthlyDollars: Infinity } as any, []) !== false) {
          compose
            .addSpan(20)
            .addText("Special Sponsor", "sponsorkit-tier-title")
            .addSpan(10)
            .addRaw(SKLAND_LOGO(config.width!, compose.height))
            .addSpan(130);
        }
      }
    }
  ],
});
