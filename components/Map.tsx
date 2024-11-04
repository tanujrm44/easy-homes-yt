"use client"

import React, { memo, useEffect, useState } from "react"
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api"
import { Skeleton } from "antd"

function Map({ address }: { address: string }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 })

  const geocodeAddress = async (address: string) => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0].geometry.location) {
        const location = results[0].geometry.location
        setMarkerPosition({
          lat: location.lat(),
          lng: location.lng(),
        })
        if (map) {
          map.panTo(location)
        }
      } else {
        console.error("Failed to get co-codinates", status)
      }
    })
  }

  useEffect(() => {
    if (isLoaded && address) {
      geocodeAddress(address)
    }
  }, [isLoaded, address])

  if (!isLoaded) {
    return <Skeleton />
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "400px",
      }}
      center={markerPosition}
      zoom={15}
      onLoad={(map) => setMap(map)}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  )
}

export default memo(Map)
