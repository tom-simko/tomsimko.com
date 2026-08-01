import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tomáš Šimko — Products, Systems and Businesses",
    short_name: "Tomáš Šimko",
    description: "Products, systems and the operations behind them.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F3EE",
    theme_color: "#F5F3EE",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
