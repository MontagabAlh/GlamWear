import { ModeToggle } from '@/components/Provider/ModeToggle'
import Link from 'next/link'
import React from 'react'
import NavbarLinks from './NavbarLinks'
import StoreDropdownMenu from './StoreDropdownMenu'
import { Button } from '@/components/ui/button'
import { MenuIcon, ShoppingBagIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'


export default function Navbar() {

    return (
        <nav className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between sticky top-0  h-16 border-b bg-background z-50'>
            <div className='flex items-center justify-center gap-2'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="shrink-0 md:hidden cursor-pointer" variant='outline' size="icon">
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="flex flex-col gap-6 text-lg font-medium mt-5 px-5">
                            <NavbarLinks />
                        </nav>
                    </SheetContent>
                </Sheet>
                <nav className="hidden md:flex font-medium md:flex-row md:item-center md:gap-5 md:text-sm lg:gap-6">
                    <Link href={'/'}>
                        <h1 className='text-foreground font-bold text-xl lg:text-3xl'>
                            GlamWear
                        </h1>
                    </Link>
                    <NavbarLinks />
                </nav>
            </div>
            <div className='flex items-center gap-4'>
                <StoreDropdownMenu />
                <Button variant='outline' size='icon' className='relative'>
                    <Link href="/cart" >
                        <ShoppingBagIcon className="h-5 w-5" />
                    </Link>
                    <span className='absolute -top-2 -right-2 rounded-full min-w-5 min-h-4 bg-foreground text-background flex justify-center items-center'>50</span>
                </Button>
                <ModeToggle />
            </div>
        </nav>
    )
}
