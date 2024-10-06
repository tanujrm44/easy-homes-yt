"use client"

import { FloatButton } from "antd"
import { HeartOutlined, HeartFilled } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { PropertyWithImages } from "@/db"
import { useSession } from "next-auth/react"
import { getUser, saveProperty } from "@/actions"
import { useMessage } from "@/context/MessageContext"

export default function SaveProperty({
  property,
}: {
  property: PropertyWithImages
}) {
  const { data: session } = useSession()
  const { showMessage } = useMessage()
  const [savedProperties, setSavedProperties] = useState<PropertyWithImages[]>(
    []
  )

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

  const isPropertySaved = savedProperties.some((p) => p.id === property.id)

  const handleSaveProperty = async (propertyId: number, email: string) => {
    if (!email) {
      return showMessage("Please sign in to save properties", "info")
    }
    try {
      const response = await saveProperty(propertyId, email)
      if (response?.status) {
        showMessage(response.status, "success")
      }
      fetchUserProperties()
    } catch (error) {
      showMessage("Error saving property", "error")
    }
  }

  return (
    <FloatButton
      icon={
        isPropertySaved ? (
          <HeartFilled
            style={{
              color: "red",
            }}
          />
        ) : (
          <HeartOutlined />
        )
      }
      style={{
        position: "absolute",
        top: 10,
        right: 20,
      }}
      onClick={() =>
        handleSaveProperty(property.id, session?.user.email as string)
      }
    />
  )
}
