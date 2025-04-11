import EditForm from '@/components/Pages/Admin/products/EditForm';
import CustomBreadcrumb from '@/components/Pages/Web/Shared/CustomBreadcrumb';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!data) notFound();

    return data;
}

export default async function EditProduct({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const data = await getData(id);

    return (
        <div>
            <CustomBreadcrumb
                items={[
                    { label: "dashboard", href: "/dashboard" },
                    { label: "products", href: "/dashboard/products" },
                    { label: `${data.name}` },
                ]}
            />
            <EditForm data={data} />
        </div>
    );
}