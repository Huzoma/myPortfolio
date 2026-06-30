import './globals.css'
import Chatbot from '@/components/Chatbot'

export const metadata = {
  title: 'Uzo | Full Stack Developer',
  description: 'Industrial minimalism portfolio.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-white font-sans antialiased">
        {children}
        <Chatbot />
      </body>
    </html>
  )
}
