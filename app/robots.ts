import type { MetadataRoute } from "next"

export default function GET(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://easy-homes-yt.vercel.app/sitemap.xml",
  }
}
