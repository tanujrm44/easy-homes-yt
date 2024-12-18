import { getProperties, getPropertyById } from "@/actions"
import { Breadcrumb, Card, Carousel, Col, Divider, Flex, Row } from "antd"
import {
  HomeOutlined,
  KeyOutlined,
  LayoutOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons"
import Image from "next/image"
import React from "react"
import Contact from "@/components/Contact"
import Map from "@/components/Map"
import BackButton from "@/components/BackButton"
import FloatIcons from "@/components/FloatIcons"

export async function generateStaticParams() {
  const properties = await getProperties()
  return properties.map((p) => ({
    id: p.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = await getPropertyById(+params.id)
  return {
    title: `${property?.name} | Easy Homes`,
    description: property?.description,
  }
}

export default async function PropertyPage({
  params,
}: {
  params: { id: string }
}) {
  const id = +params.id
  const property = await getPropertyById(id)
  console.log("🚀 ~ property:")

  return (
    <div className="container">
      <h1 className="heading">Property Details</h1>
      <Breadcrumb
        className="flex-center mb-1"
        items={[
          {
            title: "Home",
            href: "/",
          },
          {
            title: "Properties",
            href: "/properties",
          },
          {
            title: "Property Details",
          },
        ]}
      />
      <BackButton />

      <Carousel autoplay arrows>
        {property?.images.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            alt="property image"
            width={0}
            height={500}
            sizes="100vw"
            objectFit="cover"
            priority
            className="image-br"
          />
        ))}
      </Carousel>
      <Row gutter={[16, 16]} className="my">
        <Col xs={24} md={16}>
          <Card>
            <div className="card-header">
              <h2 className="heading">{property?.name}</h2>
              <p className="card-header-price">
                ₹{property?.price.toLocaleString()}
                {property?.type === "RENT" && "/month"}
              </p>
            </div>
            <p className="paragraph mb-1">
              {property?.street}, {property?.city}, {property?.state},{" "}
              {property?.zipcode}
            </p>
            <Card className="m-1">
              <Flex justify="space-around" wrap>
                <div className="card-item">
                  <KeyOutlined className="card-icon" />
                  <p className="icon-text">{property?.type}</p>
                </div>
                <Divider type="vertical" className="icon-divider" />
                <div className="card-item">
                  <HomeOutlined className="card-icon" />
                  <p className="icon-text">{property?.propertyType}</p>
                </div>
                <Divider type="vertical" className="icon-divider" />
                <div className="card-item">
                  <KeyOutlined className="card-icon" />
                  <p className="icon-text">
                    {property?.bhk.split("_").join(" ")}
                  </p>
                </div>
                <Divider type="vertical" className="icon-divider" />
                <div className="card-item">
                  <LayoutOutlined className="card-icon" />
                  <p className="icon-text">{property?.area} SQFT</p>
                </div>
                <Divider type="vertical" className="icon-divider" />
                <div className="card-item">
                  <UsergroupAddOutlined className="card-icon" />
                  <p className="icon-text">{property?.preferredTenants}</p>
                </div>
              </Flex>
            </Card>
          </Card>
          <Card className="mt-1">
            <h3>Description</h3>
            <p>{property?.description}</p>
          </Card>
          {/* <Map
            address={`${property?.street}, ${property?.city}, ${property?.state}, ${property?.zipcode}`}
          /> */}
        </Col>
        <Col xs={24} md={8}>
          <Contact property={property ? property : null} />
        </Col>
      </Row>
      {property && <FloatIcons property={property} />}
    </div>
  )
}
