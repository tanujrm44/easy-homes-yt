"use client"

import { postProperty } from "@/actions"
import { Property } from "@prisma/client"
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
} from "antd"
import { useSession } from "next-auth/react"
import React from "react"

export default function AddProperty() {
  const { data: session } = useSession()

  console.log(session)

  const onFinish = async (values: Property) => {
    try {
      const response = await postProperty(values, session?.user?.id)
      console.log(response)
    } catch (error) {
      console.log("Error creating property", error)
    }
  }
  return (
    <div className="formContainer">
      <h1 className="heading">List Your Property</h1>
      <p className="paragraph mb-1 text-center">
        List your property for free and reach out to our potential buyers and
        sellers.
      </p>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Card>
          <Form.Item
            label="Type"
            name={"type"}
            rules={[
              {
                required: true,
                message: "Please input the property type",
              },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={"RENT"}>Rent</Radio.Button>
              <Radio.Button value={"SALE"}>Sale</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please input the property name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name={"description"}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Street"
            name={"street"}
            rules={[
              {
                required: true,
                message: "Please input the property street",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="City"
            name={"city"}
            rules={[
              {
                required: true,
                message: "Please input the property city",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="State"
            name={"state"}
            rules={[
              {
                required: true,
                message: "Please input the property state",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Zipcode"
            name={"zipcode"}
            rules={[
              {
                required: true,
                message: "Please input the property zipcode",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name={"price"}
            rules={[
              {
                required: true,
                message: "Please input the property price",
              },
            ]}
          >
            <InputNumber addonBefore={"Rs"} />
          </Form.Item>
          <Form.Item
            label="BHK"
            name={"bhk"}
            rules={[
              {
                required: true,
                message: "Please input the property BHK",
              },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="ONE_RK">1RK</Radio.Button>
              <Radio.Button value="ONE_BHK">1BHK</Radio.Button>
              <Radio.Button value="TWO_BHK">2BHK</Radio.Button>
              <Radio.Button value="THREE_BHK">3BHK</Radio.Button>
              <Radio.Button value="FOUR_BHK">4BHK</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Area"
            name={"area"}
            rules={[
              {
                required: true,
                message: "Please input the property area",
              },
            ]}
          >
            <InputNumber addonAfter={"sqft"} />
          </Form.Item>
          <Form.Item
            label="Parking"
            name={"parking"}
            rules={[
              {
                required: true,
                message: "Please input the property parking",
              },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={"YES"}>Yes</Radio.Button>
              <Radio.Button value={"NO"}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Preferred Tenants"
            name={"preferredTenants"}
            rules={[
              {
                required: true,
                message: "Please input the property preferred tenants",
              },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={"FAMILY"}>Family</Radio.Button>
              <Radio.Button value={"BACHELORS"}>Bachelors</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Property Type"
            name={"propertyType"}
            rules={[
              {
                required: true,
                message: "Please input the property type",
              },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={"APARTMENT"}>Apartment</Radio.Button>
              <Radio.Button value={"INDEPENDENT"}>Independent</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Available From"
            name={"availableFrom"}
            rules={[
              {
                required: true,
                message: "Please input the Available From",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button>Reset</Button>
          </Space>
        </Card>
      </Form>
    </div>
  )
}
