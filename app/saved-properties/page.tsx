"use client"

import { getUser } from "@/actions"
import PropertyCards from "@/components/PropertyCards"
import { useMessage } from "@/context/MessageContext"
import { PropertyWithImages } from "@/db"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"

export default function SavedProperties() {
  const { data: session } = useSession()
  const { showMessage } = useMessage()
  const [savedProperties, setSavedProperties] = useState<PropertyWithImages[]>(
    []
  )

  console.log(savedProperties)

  useEffect(() => {
    fetchUserProperties()
  }, [session])

  const fetchUserProperties = async () => {
    if (session?.user) {
      const user = await getUser(+session.user.id)
      if (user) {
        setSavedProperties(user.savedProperties)
      }
    }
  }
  return (
    <div className="container">
      <div className="heading">Saved Properties</div>
      <PropertyCards properties={savedProperties} layout={"vertical"} />
    </div>
  )
}
