import { prisma } from '@/lib/prisma'
import React from 'react'
import ProductCard from './ProductCard'
import { Category } from '@prisma/client'

interface FeaturedItemsProps {
    id: string,
    category: Category 
}

async function GetData(id: string, category: string) {
    const data = await prisma.product.findMany({
        where: {
            category: category as Category,
            NOT: {
                id: id
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 3
    })

    return data
}

export default async function FeaturedItems({ id, category }: FeaturedItemsProps) {
    const data = await GetData(id, category)

    return (
        <>
            <h1 className="text-2xl font-extrabold tracking-tight">Similar Products</h1>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.map((product) => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </div>
        </>
    )
}
