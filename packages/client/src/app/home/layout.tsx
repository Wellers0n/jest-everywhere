import React from 'react';

export const metadata = {
  title: 'Home',
  description: 'Home screen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <React.Fragment>{children}</React.Fragment>

}
