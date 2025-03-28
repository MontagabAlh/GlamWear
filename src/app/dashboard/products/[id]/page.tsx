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
        notFound(); // هذا سيعرض صفحة 404
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
