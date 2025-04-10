'use client'

import React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel"
import Image from "next/image"
import { useState, useEffect } from "react"

interface ImageSliderProps {
    images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const handleThumbnailClick = (index: number) => {
        if (api) {
            api.scrollTo(index)
        }
    }

    return (
        <div className="grid gap-6 md:gap-3 items-start">
            <Carousel
                setApi={setApi}
                opts={{ align: "center" }}
                className="w-full overflow-hidden rounded-md"
            >
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className='relative flex justify-center items-center  h-[400px]'>
                                <Image
                                    src={image}
                                    alt={`Product ${index}`}
                                    fill
                                    className='object-contain object-centerTake three timer phone number. '
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-md' />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='ml-16 !rounded-md border-none dark:bg-gray-900/60 hover:dark:bg-gray-900/90 ' />
                <CarouselNext className='mr-16 !rounded-md border-none dark:bg-gray-900/60 hover:dark:bg-gray-900/90' />
            </Carousel>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`h-[70px] w-[70px] cursor-pointer rounded-lg border p-1 hover:border-primary transition-all duration-100 ease-in-out ${current === index ? "border-primary" : "border"
                            }`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <Image
                            src={image}
                            alt={`Thumbnail ${index}`}
                            width={60}
                            height={60}
                            className="object-cover rounded-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
