import React from 'react'
import { Button } from '@/components/ui/button'
import { Dock, ShoppingBasket } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import { additems } from '@/app/actions';
import { ShoppinButtons } from '../../Admin/Dashboard/SubmitButtons';
import { useRouter } from 'next/navigation';

interface BuyButtonsProps {
    isLoggedIn: boolean;
    quantity: number;
    productId: string;
}
export default function BuyButtons({ isLoggedIn, quantity, productId }: BuyButtonsProps) {
    const router = useRouter();
    const addProducttoCart = additems.bind(null, productId, quantity)
    const buyNow = (e: React.FormEvent) => {
        e.preventDefault();
        addProducttoCart(); 
        router.push('/checkout'); 
    };

    return (
        <div className='w-full'>
            {
                !isLoggedIn ? (
                    <>
                        <div className='flex justify-start items-center gap-6 w-full'>
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
                        </div>
                        <p
                            className="mt-2 text-xs text-red-700"
                            role="region"
                            aria-live="polite"
                        >
                            Please   <LoginLink className="hover:text-red-300 underline">log in</LoginLink> to purchase
                        </p>
                    </>
                ) : (
                    <div className='flex justify-start items-center gap-6 w-full'>
                        <form action={addProducttoCart} className='w-full'>
                            <ShoppinButtons text='Add to Cart' icone={<ShoppingBasket className='w-3 h-3' />} />
                        </form>
                        <form onSubmit={buyNow} className='w-full'>
                            <ShoppinButtons text='Buy Now' icone={<Dock className='w-3 h-3' />} />
                        </form>
                    </div>
                )
            }
        </div>
    )
}
