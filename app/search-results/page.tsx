"use client"

import { searchResults } from "@/actions"
import PropertyCards from "@/components/PropertyCards"
import { PropertyWithImages } from "@/db"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const propertyType = searchParams.get("propertyType") as string
  const location = searchParams.get("location") as string
  const [properties, setProperties] = useState<PropertyWithImages[]>([])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await searchResults(propertyType, location)
        if (properties) setProperties(properties)
      } catch (error) {
        console.error("Error fetching properties:", error)
      }
    }
    fetchProperties()
  }, [propertyType, location])

  console.log(properties)

  return (
    <div className="container">
      <h1 className="heading">
        {properties.length || 0} properties in {location} for {propertyType}
      </h1>

      <PropertyCards properties={properties} layout={"vertical"} />
    </div>
  )
}
