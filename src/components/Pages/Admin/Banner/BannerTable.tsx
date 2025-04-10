import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import { DeleteBanner } from './DeleteBanner'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

async function getData() {
    return await prisma.banner.findMany({})
}

export default async function BannerTable() {
    const data = await getData()
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className='text-end'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((banner, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Image
                                    src={banner.image}
                                    width={400}
                                    height={64}
                                    alt="Product Image"
                                    className="w-40 h-20 rounded-lg p-1"
                                />
                            </TableCell>
                            <TableCell className='font-medium'>{banner.title}</TableCell>
                            <TableCell className='text-end'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DeleteBanner bannerId={banner.id} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
