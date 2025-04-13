import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function ProductCardLoading() {
    return (
        <div className='flex flex-col'>
            <Skeleton className='w-full h-[330px] rounded-md'/>
            <div className='flex flex-col mt-2 gap-y-2'>
                <Skeleton className='w-full h-4 '/>
                <Skeleton className='w-full h-6 '/>
            </div>
            <Skeleton className='w-full h-10 mt-5'/>
        </div>
    )
}
