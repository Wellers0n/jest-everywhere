import React from 'react'

export const metadata = {
  title: 'Wotree - Cadastro',
  description: 'Wotree - Cadastro'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <React.Fragment>{children}</React.Fragment>
}
