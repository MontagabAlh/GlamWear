import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { prisma } from '@/lib/prisma'
import Image from 'next/image';
import React from 'react'

async function GetData() {
    const data = await prisma.banner.findMany();
    return data;
}

export default async function Hero() {
    const data = await GetData();
    return (
        <Carousel>
            <CarouselContent >
                {data.map((item) => (
                    <CarouselItem key={item.id}>
                        <div className='relative h-[60vh] lg:h-[80vh]'>
                            <Image
                                src={item.image}
                                alt='Banner'
                                fill
                                className='object-cover w-full h-full rounded-xl'
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='ml-16 !rounded-md dark:bg-[#151515] hover:dark:bg-[#252525]'/>
            <CarouselNext className='mr-16 !rounded-md dark:bg-[#151515] hover:dark:bg-[#252525]'/>
        </Carousel>
    )
}
