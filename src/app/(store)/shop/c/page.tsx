'use client'

import ProductCardLoading from "@/components/Pages/Web/Loading/ProductCardLoading";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation"

export default function page() {
    redirect('/shop');

    return (
        <div>
            <Skeleton className='h-10 w-full rounded-md my-2' />
            <Skeleton className='h-[250px] md:h-[300px] w-full  rounded-lg' />
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
            </div>
        </div>
    )
}
