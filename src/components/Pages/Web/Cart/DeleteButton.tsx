'use client'
import { removeItemFromCart } from '@/app/actions';
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react';
import React, { useTransition } from 'react'

interface DeleteButtonProps {
    ProductId: string;
}

export default function DeleteButton({ ProductId }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition()
    const handleDelete = (productId: string) => {

        startTransition(() => {
            removeItemFromCart(productId).catch((err) =>
                console.error('حدث خطأ أثناء حذف المنتج', err)
            )
        })
    };

    return (
        <>
            {isPending ? (
                <Button disabled >
                    <Loader2 className='mr-1 h-4 w-4  animate-spin' />
                    Wait
                </Button>
            ) : (
                <Button onClick={() => handleDelete(ProductId)}>
                    Delete
                </Button>
            )}
        </>
    )
}
