"use client"
import { DashbordLinks } from '@/components/Menu/Links'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      {DashbordLinks.map((link, index) => (
        <Link key={index} href={link.Link} className={cn(link.Link === pathname ? 'text-foreground transition-all duration-300 ease-in-out' : 'text-muted-foreground hover:text-foreground transition-all duration-300 ease-in-out')}>
          {link.name}
        </Link>
      ))}
    </>
  )
}
