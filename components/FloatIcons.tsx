"use client"

import { FloatButton, Tooltip } from "antd"
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  ShareAltOutlined,
} from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { PropertyWithImages } from "@/db"
import { useSession } from "next-auth/react"
import { getUser, saveProperty, togglePropertySold } from "@/actions"
import { useMessage } from "@/context/MessageContext"
import { useRouter } from "next/navigation"

export default function FloatIcons({
  property,
}: {
  property: PropertyWithImages
}) {
  const router = useRouter()
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
  const isPropertyOwner = session && +session?.user.id === property.ownerId

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

  return isPropertyOwner ? (
    <>
      <CopyLink />
      <Tooltip title="Edit Property">
        <FloatButton
          icon={<EditOutlined />}
          style={{
            bottom: 100,
          }}
          onClick={() => router.push(`/properties/${property.id}/edit`)}
        />
      </Tooltip>
    </>
  ) : (
    <>
      <CopyLink />
      <Tooltip title="Save Property">
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
            bottom: 100,
          }}
          onClick={() =>
            handleSaveProperty(property.id, session?.user.email as string)
          }
        />
      </Tooltip>
    </>
  )
}

function CopyLink() {
  const { showMessage } = useMessage()
  return (
    <Tooltip title="Copy Link">
      <FloatButton
        icon={<ShareAltOutlined />}
        type="primary"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          showMessage("Link copied to clipboard", "success")
        }}
      />
    </Tooltip>
  )
}
