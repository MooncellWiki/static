import { BadgePreset, defineConfig, presets } from "sponsorkit";

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
      title: "Special Sponsors",
      monthlyDollars: 5000,
      preset: presets.xl,
    },
  ],
});
