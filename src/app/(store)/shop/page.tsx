import CustomBreadcrumb from "@/components/Pages/Web/Shared/CustomBreadcrumb";
import ProductCard from "@/components/Pages/Web/Shared/ProductCard";
import { prisma } from "@/lib/prisma"

async function GetData() {
    const data = await prisma.product.findMany({
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
        where: {
            status: "published",
        }
    })
    return data;
}

export default async function Products() {
    const data = await GetData();
    return (
        <>
            <CustomBreadcrumb
                items={[
                    { label: "Shop", href: "/shop" },
                ]}
            />
            <h1 className="text-2xl font-extrabold tracking-tight">All Products</h1>
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
