import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// 1. Configure Inter (Sans Serif)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', 
})

// 2. Configure JetBrains Mono (Monospace)
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono', 
})

export const metadata = {
  title: 'Uzo | Full Stack Developer',
  description: 'Industrial minimalism portfolio.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`bg-[#121212] text-white font-sans antialiased ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
