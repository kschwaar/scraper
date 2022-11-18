export type TitleType = "hero" | "featured" | "standard" | "side";

export const matchCategories: { type: TitleType; regex: RegExp }[] = [
  {
    type: "standard",
    regex: /(?<=<h3>).*(?=<\/h3>)/g,
  },
  {
    type: "hero",
    regex: /(?<=<div class="hero-title">).*(?=<\/div>)/g,
  },
  {
    type: "featured",
    regex: /(?<=<span class="featured-title">).*(?=<\/span>)/g,
  },
  {
    type: "side",
    regex: /(?<=<span class="cn-text-inner">).*(?=<\/span>)/g,
  },
];
