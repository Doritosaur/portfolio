import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aman Adhikari — Full Stack Engineer",
    short_name: "Aman Adhikari",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#121212",
    icons: [{ src: "/me.jpg", sizes: "any", type: "image/jpeg" }],
  };
}
