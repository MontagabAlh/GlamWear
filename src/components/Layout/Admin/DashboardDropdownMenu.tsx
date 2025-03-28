import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from '@/components/ui/button';
import { CircleUser } from 'lucide-react';
export default function DashboardDropdownMenu() {
  return (
    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='icon'>
                            <CircleUser className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                            My Account
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogoutLink className='text-red-600'>Log out</LogoutLink>
                            </DropdownMenuItem>
                        </DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
  )
}
