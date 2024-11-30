import { Button, Col, Row } from "antd"
import React from "react"
import AboutUsImage from "@/public/images/about-us.jpg"
import Image from "next/image"
import { db } from "@/db"
import PropertyCards from "@/components/PropertyCards"
import Link from "next/link"
import { rubik } from "@/fonts"
import ctaImage from "../public/images/cta.avif"

export default async function Homepage() {
  const featuredProperties = await db.property.findMany({
    where: {
      isFeatured: true,
    },
    include: { images: true },
    take: 3,
  })
  console.log("homepage")

  const propertiesWithMessageCount = await db.property.findMany({
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
      images: true,
    },
  })

  const onDemandProperties = propertiesWithMessageCount
    .sort((a, b) => b._count.messages - a._count.messages)
    .slice(0, 3)

  console.log(onDemandProperties)
  return (
    <>
      <div className="container">
        <div className="section">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src={AboutUsImage.src}
                alt="about-us"
                className="about-us-image expand"
                priority
              />
            </Col>
            <Col xs={24} md={12}>
              <h1 className="heading">About Us</h1>
              <p className="paragraph-main">
                We are a dedicated team of professionals committed to providing
                the best service in the real estate industry. Our mission is to
                help you find your dream home with ease and confidence. With
                years of experience and a vast network, we offer a wide range of
                properties to suit all your needs.
              </p>
              <h1 className="title">Our Mission</h1>
              <p className="paragraph">
                Our mission is to simplify the process of buying, selling, and
                renting properties. We aim to provide transparent and efficient
                services to ensure a smooth experience for all our clients.
              </p>
              <h1 className="title">Why Choose Us</h1>
              <p className="paragraph">
                - Extensive Network of Properties
                <br />
                - Professional and Experienced Team
                <br />
                - Commitment to Customer Satisfaction
                <br />- Transparent and Honest Services
              </p>
            </Col>
          </Row>
        </div>
      </div>
      <div className="section container-padding featured-properties">
        <h1 className="heading"> Featured Properties</h1>
        <p className="paragraph mb-1 text-center">
          Explore our featured properties that are currently available for sale
          and rent
        </p>
        <PropertyCards properties={featuredProperties} layout={"vertical"} />
        <Link href={"/properties"} className="flex-center">
          <Button type="primary" className="view-btn" size="large">
            View Properties
          </Button>
        </Link>
      </div>
      <div className="section container">
        <h1 className="heading"> Properties on Demand</h1>
        <p className="paragraph mb-1 text-center">
          Check out out most popular properties that are high on demand.
        </p>
        <PropertyCards properties={onDemandProperties} layout={"vertical"} />
      </div>
      <div className="section container-padding cta">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={16}>
            <div className="cta-container">
              <h2 className={rubik.className}>
                {" "}
                Ready to Find Your <strong>Dream Home?</strong>
              </h2>
              <p className={`cta-subtitle ${rubik.className}`}>
                We offer a wide range of properties to suit all your needs.
                <br />
                Whether you're looking to buy, sell, or rent, we are here to
                help.
              </p>
              <Link href="/properties" className="flex-center">
                <Button type="primary" size="large" className="view-btn">
                  View Properties
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Image
              src={ctaImage}
              width={0}
              height={0}
              sizes="100vw"
              alt="About Us"
              className="cta-image expand"
            />
          </Col>
        </Row>
      </div>
    </>
  )
}
