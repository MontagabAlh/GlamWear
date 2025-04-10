import ProductCard from "@/components/Pages/Web/Home/ProductCard"
import { prisma } from "@/lib/prisma"
import { Category } from "@prisma/client"

async function GetData(params: string) {
    const data = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            category: true,
            price: true,
            images: true
        },
        where: {
            status: "published",
            category: params as Category
        }
    })

    return data
}

export default async function CategoresPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params
    const data = await GetData(name)
    return (
        <>
            <h1 className="text-2xl font-extrabold tracking-tight">All <span className="capitalize">{name} </span>Products</h1>
            {
                data.length > 0 ? (
                    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {data.map((product) => (
                            <ProductCard key={product.id} data={product} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full h-[70vh] flex justify-center items-center">
                        <p className="text-lg font-medium tracking-tight">There are no products </p>
                    </div>
                )
            }
        </>
    )
}
