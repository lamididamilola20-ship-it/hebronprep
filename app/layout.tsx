export const metadata = {
  title: 'HebronPrep',
  description: 'HebronPrep Web Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
