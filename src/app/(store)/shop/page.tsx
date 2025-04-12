import CustomBreadcrumb from "@/components/Pages/Web/Shared/CustomBreadcrumb";
import ProductCard from "@/components/Pages/Web/Shared/ProductCard";
import { Ripple } from "@/components/ui/ripple";
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
            <div className="relative flex h-[250px] md:h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
                <p className="z-10 whitespace-pre-wrap text-center text-3xl md:text-5xl font-medium tracking-tighter  text-gray-700 dark:text-white">

                        Shop
                </p>
                <Ripple />
            </div>
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
