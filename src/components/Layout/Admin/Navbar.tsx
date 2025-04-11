"use client"
import { DashbordLinks } from '@/utils/Links'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <Link href={'/'} className='md:hidden'>
        <h1 className='text-foreground font-bold text-xl lg:text-3xl'>
          GlamWear
        </h1>
      </Link>
      <div className='flex flex-col md:flex-row  md:items-center justify-center gap-4 mt-3 md:mt-auto'>
        {DashbordLinks.map((link, index) => (
          <Link key={index} href={link.Link} className={cn(link.Link === pathname ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground hover:bg-muted ', "transition-all duration-300 ease-in-out group p-2 font-medium rounded-md")}>
            {link.name}
          </Link>
        ))}
      </div>
    </>
  )
}
