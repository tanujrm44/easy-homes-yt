"use client"

import { FloatButton, Tooltip } from "antd"
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { PropertyWithImages } from "@/db"
import { useSession } from "next-auth/react"
import { getUser, saveProperty, togglePropertySold } from "@/actions"
import { useMessage } from "@/context/MessageContext"
import { useRouter } from "next/navigation"

export default function SaveProperty({
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
  const [isSold, setIsSold] = useState<boolean>(property.isSold)

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

  async function handleTogglePropertySold(propertyId: number) {
    try {
      const response = await togglePropertySold(propertyId)
      if (response) {
        showMessage(response, "success")
      }
    } catch (error) {
      showMessage("Error updating the property status", "error")
    }
  }

  return isPropertyOwner ? (
    <>
      <Tooltip title="Edit Property">
        <FloatButton
          icon={<EditOutlined />}
          style={{
            position: "absolute",
            top: 10,
            right: 60,
          }}
          onClick={() => router.push(`/properties/${property.id}/edit`)}
        />
      </Tooltip>
      {isSold ? (
        <Tooltip title="Activate Property">
          <FloatButton
            icon={<CheckCircleFilled />}
            style={{
              position: "absolute",
              top: 10,
              right: 15,
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Mark As Sold">
          <FloatButton
            icon={<CheckCircleOutlined />}
            style={{
              position: "absolute",
              top: 10,
              right: 15,
            }}
          />
        </Tooltip>
      )}
    </>
  ) : (
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
          position: "absolute",
          top: 10,
          right: 20,
        }}
        onClick={() =>
          handleSaveProperty(property.id, session?.user.email as string)
        }
      />
    </Tooltip>
  )
}
