"use client"
import { StoreLinks } from '@/components/Menu/Links'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavbarLinks() {
  const pathname = usePathname();
  return (
    <>
      <Link href={'/'} className='md:hidden'>
        <h1 className='text-foreground font-bold text-xl lg:text-3xl'>
          GlamWear
        </h1>
      </Link>
      <div className='font-medium flex flex-col md:flex-row justify-center  md:items-center gap-x-2 mt-3 md:mt-auto md:ml-5 md:item-center md:gap-5 md:text-sm lg:gap-6'>
        {StoreLinks.map((link, index) => (
          <Link key={index} href={link.Link} className={cn(link.Link === pathname ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground hover:bg-muted ', "transition-all duration-300 ease-in-out group p-2 font-medium rounded-md")}>
            {link.name}
          </Link>
        ))}
      </div>
    </>
  )
}
