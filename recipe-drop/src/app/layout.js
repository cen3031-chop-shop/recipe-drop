export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}
// sets basic structure and hides scrollbar
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body className="[&::-webkit-scrollbar]:hidden">{children}</body>
    </html>
  )
}
