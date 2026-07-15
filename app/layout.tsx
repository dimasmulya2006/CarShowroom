import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'], 
  variable: '--font-heading' 
})

export const metadata: Metadata = {
  title: 'MulyaShowroom | Premium Car Gallery',
  description: 'Temukan Mobil Impian Anda dengan pengalaman interaktif di MulyaShowroom.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark">
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        inter.variable, poppins.variable
      )}>
        {children}
      </body>
    </html>
  )
}
