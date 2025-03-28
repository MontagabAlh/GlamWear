import EditForm from '@/components/Pages/Admin/products/EditForm';
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation';
import React from 'react';

async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if (!data) {
        notFound(); // يعرض صفحة 404 إذا لم يتم العثور على المنتج
    }

    return data;
}

export default async function EditProduct({ params }: { params: { id: string } }) {
    const data = await getData(params.id);

    return (
        <div>
            <EditForm data={data} />
        </div>
    );
}
