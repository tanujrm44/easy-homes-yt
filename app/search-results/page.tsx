"use client"

import { searchResults } from "@/actions"
import BackButton from "@/components/BackButton"
import PropertyCards from "@/components/PropertyCards"
import { PropertyWithImages } from "@/db"
import { useSearchParams } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react"

function SearchResults() {
  const searchParams = useSearchParams()
  const propertyType = searchParams.get("propertyType") || "" // Default to empty string if not found
  const location = searchParams.get("location") || "" // Default to empty string if not found
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
    if (propertyType && location) {
      fetchProperties()
    }
  }, [propertyType, location])

  console.log(properties)

  return (
    <div className="container">
      <h1 className="heading">
        {properties.length || 0} properties in {location} for {propertyType}
      </h1>
      <BackButton />
      <PropertyCards properties={properties} layout={"vertical"} />
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
