/* eslint-disable jsx-a11y/alt-text */
"use client"

import { cn } from '@/lib/utils'
import { Image, LayoutDashboard, Package, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


export const DashbordLinks = [
  { name: "Dashboard", Link: "/dashboard", icon: <LayoutDashboard className='h-4 w-4' /> },
  { name: "Orders", Link: "/dashboard/orders", icon: <ShoppingBag className='h-4 w-4' /> },
  { name: "Products", Link: "/dashboard/products", icon: <Package className='h-4 w-4' /> },
  { name: "Banners", Link: "/dashboard/banners", icon: <Image className='h-4 w-4' /> },
]


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
          <Link key={index} href={link.Link} className={cn(link.Link === pathname ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground hover:bg-muted ', "transition-all duration-300 ease-in-out group p-2 font-medium rounded-md flex items-center gap-2")}>
            <span>
              {link.icon}
            </span>
            {link.name}
          </Link>
        ))}
      </div>
    </>
  )
}
