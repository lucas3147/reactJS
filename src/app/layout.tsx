import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Whatsapp Clone',
  description: 'Meu clone do whatsapp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-greenish-white m-0 font-sans text-black">
        <div className={inter.className}>
          {children}
        </div>
      </body>
    </html>
  )
}
