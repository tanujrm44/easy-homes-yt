"use client"

import React from "react"
import logo from "@/public/images/logo.png"
import { Button, Divider, Flex } from "antd"
import { GoogleOutlined } from "@ant-design/icons"
import SearchProperties from "./SearchProperties"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Header() {
  const pathname = usePathname()
  return (
    <nav className="nav">
      <div className="flex-between">
        <div
          className="flex-align-center"
          style={{
            gap: 16,
          }}
        >
          <Link href={"/"}>
            <img src={logo.src} alt="logo" width={200} className="pointer" />
          </Link>
          <Link href={"/properties"}>
            <Button ghost>Properties</Button>
          </Link>
        </div>
        <Button icon={<GoogleOutlined />}>Login or Register</Button>
      </div>
      {pathname === "/" && (
        <>
          <hr />
          <div className="hero">
            <h1 className="hero-title">
              Finding your <span className="color-sec">perfect home</span>{" "}
            </h1>
            <p className="hero-subtitle">
              Search for your perfect home in the best locations around the
              world
            </p>
            <SearchProperties />
            <Flex justify="center" gap={8}>
              <Link href={"/properties"}>
                <Button>Browse Properties</Button>
              </Link>
              <Button>List Property</Button>
            </Flex>
          </div>
        </>
      )}
    </nav>
  )
}
