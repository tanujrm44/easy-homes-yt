"use client"

import { getProperties } from "@/actions"
import PropertyCards from "@/components/PropertyCards"
import { PropertyWithImages } from "@/db"
import { Breadcrumb, Col, Form, Row, Select } from "antd"
import React, { useEffect, useState } from "react"

export default function Properties() {
  const [sortOrder, setSortOrder] = useState("latest")
  const [properties, setProperties] = useState<PropertyWithImages[]>([])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await getProperties()
        setProperties(properties)
      } catch (error) {
        console.error("Error fetching Properties", error)
      }
    }
    fetchProperties()
  }, [])
  console.log(properties)
  return (
    <div className="container">
      <h1 className="heading">Properties</h1>
      <Breadcrumb
        className="flex-center"
        items={[
          {
            title: "Home",
            href: "/",
          },
          {
            title: "Properties",
          },
        ]}
      />
      <div className="sticky-container mt-1">
        <Row gutter={[16, 16]} wrap>
          <Col xs={24} md={8} className="sticky-column">
            Filters
          </Col>
          <Col xs={24} md={16} className="scrollable-column">
            <Form.Item label="Sort By" name={"sort_by"} className="mb-1">
              <Select
                defaultValue={"latest"}
                placeholder="Sort By"
                style={{ width: 200 }}
                onChange={(value) => setSortOrder(value)}
                options={[
                  { label: "Latest", value: "latest" },
                  { label: "Price: Low to High", value: "asc" },
                  { label: "Price: High to Low", value: "desc" },
                ]}
              />
            </Form.Item>
            <PropertyCards layout={"horizontal"} properties={properties} />
          </Col>
        </Row>
      </div>
    </div>
  )
}
