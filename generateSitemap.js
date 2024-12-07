/*import { getProperties } from "@/actions"

export default async function sitemap() {
  const properties = await getProperties()

  const propertyUrls = properties.map((p) => ({
    url: `https://easy-homes-yt.vercel.app/properties1/${p.id}`,
    lastModified: new Date(),
  }))
  return [
    {
      url: "https://easy-homes-yt.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://easy-homes-yt.vercel.app/properties",
      lastModified: new Date(),
    },

    ...propertyUrls,
  ]
}
*/

import fs from "fs"

export default async function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
    <url>
        <loc>https://easy-homes-yt.vercel.app</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
        <loc>https://easy-homes-yt.vercel.app/properties</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </url>
</urlset>
`
  fs.writeFileSync("app/sitemap.xml", sitemap)
}

generateSitemap()
