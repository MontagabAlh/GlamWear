'use client'

import QuantityInput from '@/components/ui/quantity-input'
import React, { useState, useTransition } from 'react'
import { editQuantityItems } from '@/app/actions'

interface QuentityProps {
    ProductId: string
    ProductQuantity: number
}

export default function Quentity({ ProductId, ProductQuantity }: QuentityProps) {
    const [quantity, setQuantity] = useState(ProductQuantity)
    const [isPending, startTransition] = useTransition()

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity)
        startTransition(() => {
            editQuantityItems(ProductId, newQuantity).catch((err) =>
                console.error('خطأ في تعديل الكمية:', err)
            )
        })
    }

    return (
        <QuantityInput
            setQuantity={handleQuantityChange}
            quantity={quantity}
            isDisabled={isPending}
        />
    )
}
