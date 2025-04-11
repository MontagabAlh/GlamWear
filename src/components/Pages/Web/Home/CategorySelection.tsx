import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import all from "../../../../../public/shose.png"
import men from "../../../../../public/men.png"
import women from "../../../../../public/women.png"

const product = [
    { image: men, title: 'Product For Men', link: '/shop/c/men' },
    { image: women, title: 'Product For Women', link: '/shop/c/women' },
]

export default function CategorySelection() {
    return (
        <div className='py-24 sm:py-32'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-extrabold tracking-tight'>Shop by Category</h2>
                <Link href='/shop' className='hidden md:block text-sm font-semibold text-primary hover:text-primary/80'>
                    Browse All Products &rarr;
                </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6  lg:gap-8">
                <Link href='/shop' className='group relative aspect-[2.12] md:aspect-[1] rounded-xl overflow-hidden'>
                    <Image
                        src={all}
                        alt='product'
                        fill
                        className='object-contain object-center transition-transform duration-300 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent' />
                    <div className='absolute bottom-0 left-0 right-0 p-4 text-start'>
                        <div className='inline-block'>
                            <h3 className='text-lg font-bold text-white drop-shadow-lg'>
                                All Products
                            </h3>
                            <p className='mt-1 text-sm text-white/90 hover:text-white'>
                                Shop Now
                            </p>
                        </div>
                    </div>
                </Link>
                <div className='grid grid-cols-1 gap-6  lg:gap-8'>
                    {product.map((item, index) => (
                        <Link href={item.link} key={index} className='group relative aspect-[2.12] rounded-xl overflow-hidden'>
                            <Image
                                src={item.image}
                                alt='product'
                                fill
                                className='object-contain object-center transition-transform duration-300 group-hover:scale-105'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent' />
                            <div className='absolute bottom-0 left-0 right-0 p-4 text-start'>
                                <div className='inline-block'>
                                    <h3 className='text-lg font-bold text-white drop-shadow-lg'>
                                        {item.title}
                                    </h3>
                                    <p className='mt-1 text-sm text-white/90 hover:text-white'>
                                        Shop Now
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
