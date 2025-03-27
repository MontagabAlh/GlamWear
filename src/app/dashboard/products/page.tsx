import ProductsTable from '@/components/Pages/Admin/products/ProductsTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function products() {
    return (
        <>
            <div className='flex items-center justify-end'>
                <Button asChild className='flex items-center gap-x-2'>
                    <Link href='/dashboard/products/create'>
                        <PlusCircle className='w-3.5 h-3.5' />
                        <span>Add Product</span></Link>
                </Button>
            </div>
            <Card className='mt-5 '>
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your Products and view their sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductsTable/>
                </CardContent>
            </Card>
        </>
    )
}
