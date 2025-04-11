import ProductCard from "@/components/Pages/Web/Shared/ProductCard"
import CustomBreadcrumb from "@/components/Pages/Web/Shared/CustomBreadcrumb"
import { prisma } from "@/lib/prisma"
import { Category } from "@prisma/client"
import { Ripple } from "@/components/ui/ripple"
import { TextAnimate } from "@/components/ui/text-animate"

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
            <CustomBreadcrumb
                items={[
                    { label: "Shop", href: "/shop" },
                    { label: `${name}` },
                ]}
            />
            <div className="relative flex h-[250px] md:h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
                <p className="z-10 whitespace-pre-wrap text-center text-3xl md:text-5xl font-medium tracking-tighter  text-gray-700 dark:text-white capitalize">
                    <TextAnimate animation="blurIn" as="h1" once={true}>
                        {name}
                    </TextAnimate>
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
