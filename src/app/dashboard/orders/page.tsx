import OrdersTable from '@/components/Pages/Admin/Orders/OrdersTable'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function Orders() {
    return (
        <Card>
            <CardHeader className='px-7 '>
                <CardTitle>
                    Orders
                    <CardDescription>
                        Recent Orders From your store!
                    </CardDescription>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <OrdersTable />
            </CardContent>
        </Card>
    )
}
