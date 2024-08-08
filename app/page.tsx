import { Button, Col, Row } from "antd"
import React from "react"
import AboutUsImage from "@/public/images/about-us.jpg"

export default function Homepage() {
  return (
    <div className="container">
      <div className="section">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <img
              src={AboutUsImage.src}
              alt="about-us"
              className="about-us-image expand"
            />
          </Col>
          <Col xs={24} md={12}>
            <h1 className="heading">About Us</h1>
            <p className="paragraph-main">
              We are a dedicated team of professionals committed to providing
              the best service in the real estate industry. Our mission is to
              help you find your dream home with ease and confidence. With years
              of experience and a vast network, we offer a wide range of
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
  )
}
