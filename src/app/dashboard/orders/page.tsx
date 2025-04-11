import OrdersTable from '@/components/Pages/Admin/Orders/OrdersTable'
import CustomBreadcrumb from '@/components/Pages/Web/Shared/CustomBreadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function Orders() {
    return (
        <>
        <CustomBreadcrumb
                items={[
                    { label: "dashboard", href: "/dashboard" },
                    { label: "orders" },
                ]}
            />
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
        </>
    )
}
