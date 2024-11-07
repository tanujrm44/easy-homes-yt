"use client"

import { getUser, getUserProperties } from "@/actions"
import PropertyCards from "@/components/PropertyCards"
import { PropertyWithImages } from "@/db"
import { Card, Col, Empty, Row } from "antd"
import { useSession } from "next-auth/react"
import Image from "next/image"
import React, { useEffect, useState } from "react"

export default function Profile() {
  const { data: session } = useSession()
  const [properties, setProperties] = useState<PropertyWithImages[]>([])

  useEffect(() => {
    fetchUserProperties()
  }, [session])

  const fetchUserProperties = async () => {
    if (session?.user) {
      const properties = await getUserProperties(+session.user.id)

      if (properties) {
        setProperties(properties)
      }
    }
  }

  return (
    <div className="container">
      <Row gutter={[32, 32]}>
        <Col sm={24} lg={8}>
          <h1 className="heading">My Profile</h1>
          <Card>
            <Image
              src={session?.user.image as string}
              alt="User"
              width={100}
              height={100}
              className="profile-img mb-1"
            />
            <h3 className="mb-1 mt-1">{session?.user.name}</h3>
            <p>{session?.user.email}</p>
          </Card>
        </Col>
        <Col sm={24} lg={16}>
          <h1 className="heading">My property listings</h1>
          {properties.length !== 0 ? (
            <PropertyCards properties={properties} layout={"horizontal"} />
          ) : (
            <Empty description="No Listed Properties" />
          )}
        </Col>
      </Row>
    </div>
  )
}
