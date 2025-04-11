
import FeaturedItems from "@/components/Pages/Web/Home/FeaturedItems";
import ImageSlider from "@/components/Pages/Web/Home/ImageSlider";
import ProductInfo from "@/components/Pages/Web/Home/ProductInfo";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CustomBreadcrumb from "@/components/Pages/Web/Shared/CustomBreadcrumb";

async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: {
            id: productId
        },
    });

    if (!data) notFound();

    return data;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const data = await getData(id);

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <div>
            <CustomBreadcrumb
                items={[
                    { label: "Shop", href: "/shop" },
                    { label: `${data.category}`, href: `/shop/c/${data.category}` },
                    { label: `${data.name}` },
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
                <ImageSlider images={data.images} />
                <ProductInfo data={data} isLoggedIn={user ? true : false} />
            </div>
            <div className="mt-5">
                <FeaturedItems id={data.id} category={data.category} />
            </div>
        </div>
    );
}