"use server"

import { db } from "@/db"

async function getProperties() {
  try {
    const properties = await db.property.findMany({
      include: {
        images: true,
      },
      where: {
        isSold: false,
      },
    })
    return properties
  } catch (error) {
    throw error
    console.error(error)
  }
}

export { getProperties }
