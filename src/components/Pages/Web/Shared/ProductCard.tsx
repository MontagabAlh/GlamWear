import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { DollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


interface ProductCardProps {
    data: {
        name: string;
        id: string;
        description: string;
        price: number;
        category: string;
        images: string[];
    }
}
export default function ProductCard({ data }: ProductCardProps) {
    return (
        <div className="rounded-md ">
            <Carousel className='w-full mx-auto  rounded-md'>
                <CarouselContent>
                    {data.images.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className='relative flex justify-center items-center  h-[300px]'>
                                <Image
                                    src={item}
                                    alt='Product Image'
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
            <div >
                <div className='flex items-center justify-between mt-2'>
                    <h1 className='font-semibold line-clamp-1'>{data.name}</h1>
                    <div className='flex justify-end items-center gap-2'>
                        <p className='inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10 capitalize'>{data.category}</p>
                        <p className='inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10 '><DollarSign className='w-3 h-3' />{data.price}</p>
                    </div>
                </div>
                <p className='text-sm text-m  mt-2 line-clamp-3'>{data.description}</p>
                <Button asChild className='w-full mt-5'>
                    <Link href={`/shop/${data.id}`}>Learn More</Link>
                </Button>
            </div>
        </div>
    )
}
