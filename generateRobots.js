/*import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://easy-homes-yt.vercel.app/sitemap.xml",
  }
}
*/
import fs from "fs"

export default async function generateRobots() {
  const robots = `User-agent: *
Allow: /
Sitemap: https://easy-homes-yt.vercel.app/sitemap.xml
`
  fs.writeFileSync("app/robots.txt", robots)
}

generateRobots()
