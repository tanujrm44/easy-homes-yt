import { getProperties } from "@/actions"

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
