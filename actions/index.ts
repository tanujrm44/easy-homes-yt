"use server"

import { db } from "@/db"
import { FilterValues } from "@/types"
import { Prisma } from "@prisma/client"

async function getProperties(filters: FilterValues) {
  const filterConditions: Prisma.PropertyWhereInput = {
    type: filters.type as Prisma.EnumTypeFilter,
    propertyType: filters.apartment_type as Prisma.EnumPropertyTypeFilter,
    bhk: (filters.bhk
      ? {
          in: filters.bhk,
        }
      : undefined) as Prisma.EnumBHKFilter,
    price: filters.price
      ? {
          gte: +filters.price.split("-")[0],
          lte: +filters.price.split("-")[1],
        }
      : undefined,
    area: filters.area
      ? {
          gte: +filters.area.split("-")[0],
          lte: +filters.area.split("-")[1],
        }
      : undefined,
    preferredTenants:
      filters.preferred_tenants as Prisma.EnumPreferredTenantsFilter,
    isSold: false,
  }
  console.log(filterConditions)
  try {
    const properties = await db.property.findMany({
      include: {
        images: true,
      },
      where: filterConditions,
    })
    return properties
  } catch (error) {
    throw error
    console.error(error)
  }
}

export { getProperties }
