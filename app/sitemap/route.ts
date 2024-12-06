import { getProperties } from "@/actions"

export default async function GET() {
  const properties = await getProperties()

  const propertyUrls = properties.map((p) => ({
    url: `https://easy-homes-yt.vercel.app/properties1/${p.id}`,
    lastModified: new Date().toISOString(),
  }))

  return [
    {
      url: "https://easy-homes-yt.vercel.app",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://easy-homes-yt.vercel.app/properties",
      lastModified: new Date().toISOString(),
    },
    ...propertyUrls,
  ]
}
