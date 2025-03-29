import EditForm from '@/components/Pages/Admin/products/EditForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

type EditProductProps = {
    params: {
        id: string;
    };
};

async function getData({ params }: EditProductProps) {
    const productId = params.id;
    const data = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if (!data) {
        notFound();
        return null; // تأكد من إيقاف التنفيذ بعد `notFound()`
    }

    return data;
}

export default async function EditProduct({ params }: { params: { id: string } }) {
    const data = await getData({ params });

    if (!data) return null; // في حال `notFound` تم استدعاؤه

    return (
        <div>
            <EditForm data={data} />
        </div>
    );
}
