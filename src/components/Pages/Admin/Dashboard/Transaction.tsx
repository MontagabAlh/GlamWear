import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function Transaction() {
    return (
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle>Transaction</CardTitle>
                <CardDescription>
                    Recent Transaction from your store
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
