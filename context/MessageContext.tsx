"use client"
import React, { createContext, useContext } from "react"
import { message } from "antd"

const MessageContext = createContext(
  {} as {
    showMessage: (
      content: string,
      variant: "success" | "error" | "info"
    ) => void
  }
)

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const showMessage = (
    content: string,
    variant: "success" | "error" | "info"
  ) => {
    message[variant](content)
  }

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessage = () => {
  const context = useContext(MessageContext)
  return context
}
