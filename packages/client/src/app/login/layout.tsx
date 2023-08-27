import React from 'react';

export const metadata = {
  title: 'Login',
  description: 'Login',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <React.Fragment>{children}</React.Fragment>

}
