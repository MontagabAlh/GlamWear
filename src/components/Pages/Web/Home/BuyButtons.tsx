import React from 'react'
import { Button } from '@/components/ui/button'
import { Dock, ShoppingBasket } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

interface BuyButtonsProps {
    isLoggedIn: boolean;
}
export default function BuyButtons({ isLoggedIn }: BuyButtonsProps) {
    return (
        <div className='flex justify-start items-center gap-6 w-full'>
            {
                !isLoggedIn ? (
                    <>
                        <TooltipProvider >
                            <Tooltip>
                                <TooltipTrigger className='w-[100%]' >
                                    <Button size="lg" className='w-[100%]' disabled><ShoppingBasket className='w-3 h-3' /> Add to Cart</Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>You must be logged in to be able to purchase</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider >
                            <Tooltip>
                                <TooltipTrigger className='w-[100%]' >
                                    <Button size="lg" className='w-[100%]' disabled><Dock className='w-3 h-3' /> Buy Now</Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>You must be logged in to be able to purchase</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </>) : (<>
                        <Button size="lg" className='w-[47%]'><ShoppingBasket className='w-3 h-3' /> Add to Cart</Button>
                        <Button size="lg" className='w-[47%]'><Dock className='w-3 h-3' /> Buy Now</Button>
                    </>)
            }
        </div>
    )
}
