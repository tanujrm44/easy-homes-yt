import type { Metadata } from "next"
import "./globals.css"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"
import theme from "@/config/themeConfig"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { rubik } from "@/fonts"
import AuthProvider from "@/components/AuthProvider"
import RequireAuth from "@/components/RequireAuth"
import { MessageProvider } from "@/context/MessageContext"

export const metadata: Metadata = {
  title: {
    default: "Easy Homes",
    template: "%s | Easy Homes",
  },
  description: "Finding your perfect home",
  keywords: [
    "Property search results",
    "Find properties by location",
    "Real estate search tool",
    "Property listing platform",
    "Filter properties by type",
    "Residential and commercial properties",
    "Dynamic property search",
  ],
  openGraph: {
    images: [],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <AuthProvider>
          <ConfigProvider theme={theme}>
            <AntdRegistry>
              <RequireAuth>
                <MessageProvider>
                  <div className="main-container">
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                  </div>
                </MessageProvider>
              </RequireAuth>
            </AntdRegistry>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
