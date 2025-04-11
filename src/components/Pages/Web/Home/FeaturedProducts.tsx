import { prisma } from "@/lib/prisma"
import ProductCard from '../Shared/ProductCard';

async function GetData() {
    const data = await prisma.product.findMany({
        where: {
            status: 'published',
        },
        select: {
            id: true,
            name: true,
            description: true,
            category: true,
            images: true,
            price: true,
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 3
    })
    return data;
}

export default async function FeaturedProducts() {
    const data = await GetData();
    return (
        <>
            <h1 className="text-2xl font-extrabold tracking-tight">Featured Item</h1>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.map((product) => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </div>
        </>
    )
}
