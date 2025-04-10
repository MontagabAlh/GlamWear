
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from '@/components/ui/button';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function StoreDropdownMenu() {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>

                {user ? (
                    <div className='flex justify-between items-center gap-2 border rounded-md md:pr-2 cursor-pointer bg-white dark:bg-[#151515]'>
                        <div>
                            <Image src={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`} width={35} height={35} alt='userImage' className='rounded-sm md:rounded-none md:rounded-l-sm' />
                        </div>
                        <div className='hidden md:flex flex-col justify-start items-start -mt-1'>
                            <p className='text-sm'>{user.given_name + " " + user.family_name}</p>
                            <p className='text-xs text-muted-foreground mt-[-2px]'>{user.email}</p>
                        </div>

                    </div>
                ) : (
                    <Button variant='outline' size='icon'>
                        <CircleUser className="h-5 w-5" />
                    </Button>
                )}

            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {!user ?
                    (
                        <DropdownMenuLabel>
                            My Account
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className='cursor-pointer'>
                                <LoginLink>Sign in</LoginLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className='cursor-pointer'>
                                <RegisterLink>Sign up</RegisterLink>
                            </DropdownMenuItem>
                        </DropdownMenuLabel>
                    ) : (
                        <DropdownMenuLabel>
                            {user.given_name as string}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className='cursor-pointer'>
                                <Link href={'/account'} className='flexflex-col justify-start items-start gap-2'>
                                    Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className='cursor-pointer'>
                                <Link href={'/dashboard'}>Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className='cursor-pointer'>
                                <LogoutLink className='text-red-600'>Log out</LogoutLink>
                            </DropdownMenuItem>

                        </DropdownMenuLabel>
                    )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
