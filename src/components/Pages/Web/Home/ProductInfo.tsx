'use client'

import { Category } from '@prisma/client';
import { DollarSign, StarIcon } from 'lucide-react';
import React, { useState } from 'react'
import QuantityInput from '@/components/quantity-input';
import BuyButtons from './BuyButtons';


interface ProductInfoProps {
    data: {
        name: string;
        id: string;
        description: string;
        price: number;
        images: string[];
        category: Category;
    }
    isLoggedIn: boolean;
}
export default function ProductInfo({ data , isLoggedIn }: ProductInfoProps) {

    const [quantity, setQuantity] = useState<number>(1)
    return (
        <div className='flex flex-col items-start gap-6  h-full '>
            <div className='flex flex-col justify-start items-start gap-6'>
                <h1 className='font-semibold text-4xl'>{data.name}</h1>
                <div className='flex items-center gap-1'>
                    <StarIcon className='h-4 w-4 text-yellow-500 fill-amber-500' />
                    <StarIcon className='h-4 w-4 text-yellow-500 fill-amber-500' />
                    <StarIcon className='h-4 w-4 text-yellow-500 fill-amber-500' />
                    <StarIcon className='h-4 w-4 text-yellow-500 fill-amber-500' />
                    <StarIcon className='h-4 w-4 text-yellow-500 fill-amber-500' />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <p className='inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xl font-medium text-primary ring-1 ring-inset ring-primary/10'><DollarSign className='w-4 h-4' /> {data.price}</p>
                    <p className='inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xl font-medium text-primary ring-1 ring-inset ring-primary/10 '>{data.category}</p>
                </div>
                <p className='text-lg  mt-2 text-gray-400'>{data.description}</p>
                <QuantityInput setQuantity={setQuantity} quantity={quantity} />
            </div>
            <BuyButtons isLoggedIn={isLoggedIn} quantity={quantity} productId={data.id}/>
        </div>
    )
}
