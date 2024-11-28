"use client"

import { getUser } from "@/actions"
import BackButton from "@/components/BackButton"
import PropertyCards from "@/components/PropertyCards"
import { useMessage } from "@/context/MessageContext"
import { PropertyWithImages } from "@/db"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { LoadingOutlined } from "@ant-design/icons"

export default function SavedProperties() {
  const { data: session } = useSession()
  const { showMessage } = useMessage()
  const [isLoading, setIsLoading] = useState(false)
  const [savedProperties, setSavedProperties] = useState<PropertyWithImages[]>(
    []
  )

  console.log(savedProperties)

  useEffect(() => {
    fetchUserProperties()
  }, [session])

  const fetchUserProperties = async () => {
    if (session?.user) {
      setIsLoading(true)
      const user = await getUser(+session.user.id)
      if (user) {
        setSavedProperties(user.savedProperties)
        setIsLoading(false)
      }
    }
  }
  return (
    <div className="container">
      <div className="heading">Saved Properties</div>
      <BackButton />
      {isLoading && <LoadingOutlined className="loading" />}

      <PropertyCards properties={savedProperties} layout={"vertical"} />
    </div>
  )
}
