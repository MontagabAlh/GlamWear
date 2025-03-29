import EditForm from '@/components/Pages/Admin/products/EditForm';
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
            <EditForm data={data} />
        </div>
    );
}