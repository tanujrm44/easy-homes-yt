import { searchResults } from "@/actions"
import BackButton from "@/components/BackButton"
import PropertyCards from "@/components/PropertyCards"
import { PropertyWithImages } from "@/db"
import { useSearchParams } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react"

async function SearchResultsPage({
  searchParams,
}: {
  searchParams: { propertyType?: string; location?: string }
}) {
  const propertyType = searchParams.propertyType || "" // Default to empty string
  const location = searchParams.location || "" // Default to empty string

  const properties =
    propertyType && location ? await searchResults(propertyType, location) : []

  return (
    <div className="container">
      <h1 className="heading">
        {properties?.length || 0} properties in {location} for {propertyType}
      </h1>
      <BackButton />
      {properties && (
        <PropertyCards properties={properties} layout={"vertical"} />
      )}
    </div>
  )
}

export default function SearchResultsPageContainer({
  searchParams,
}: {
  searchParams: { propertyType?: string; location?: string }
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!loading && <SearchResultsPage searchParams={searchParams} />}
    </Suspense>
  )
}
