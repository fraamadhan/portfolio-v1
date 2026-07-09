'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'

export default function HeaderFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const hideHeaderFooter = pathname === '/' || pathname?.startsWith('/cms')

  if (hideHeaderFooter) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
