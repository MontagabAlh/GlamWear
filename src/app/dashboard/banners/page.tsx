import BannerTable from '@/components/Pages/Admin/Banner/BannerTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Banner() {
    return (
        <>
            <div className='flex items-center justify-end'>
                <Button asChild className='flex items-center gap-x-2'>
                    <Link href='/dashboard/banners/create'>
                        <PlusCircle className='w-3.5 h-3.5' />
                        <span>Add Banner</span></Link>
                </Button>
            </div>
            <Card className='mt-5'>
                <CardHeader>
                    <CardTitle>
                        Banner
                    </CardTitle>
                    <CardDescription>
                        Manage your banners
                    </CardDescription>
                </CardHeader>
                <CardContent>
                        <BannerTable/>
                </CardContent>
            </Card>
        </>
    )
}
