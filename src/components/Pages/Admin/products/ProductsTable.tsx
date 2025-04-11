import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
import { prisma } from '@/lib/prisma'
import { MoreHorizontal, StarIcon, StarOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteProduct } from './DeleteProduct'

async function getData() {
    return await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc',
        }
    })
}

export default async function ProductsTable() {
    const data = await getData()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>isFeatured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((product) => {
                    return (
                        <TableRow key={product.id}>
                            <TableCell className='max-w-[130px] '>
                                <div className='flex justify-start items-center gap-1 h-[70px]'>
                                    <Image
                                        src={product.images[0]}
                                        width={60}
                                        height={80}
                                        alt="Product Image"
                                        className=" object-cover object-center rounded-lg border p-1"
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="truncate max-w-48 capitalize">{product.name}</TableCell>
                            <TableCell className='capitalize'>{product.status}</TableCell>
                            <TableCell className='capitalize'>{product.category}</TableCell>
                            <TableCell>${product.price}.00</TableCell>
                            <TableCell>{new Intl.DateTimeFormat("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric"
                            }).format(new Date(product.createdAt)).replace(/\//g, "-")}
                            </TableCell>
                            <TableCell>
                                {!product.isFeatured ? <StarOff /> : <StarIcon />}
                            </TableCell>
                            <TableCell className="text-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild className='cursor-pointer'>
                                            <Link href={`/shop/${product.id}`}>
                                                View
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className='cursor-pointer'>
                                            <Link href={`/dashboard/products/${product.id}`}>Edit</Link>
                                        </DropdownMenuItem>
                                        <DeleteProduct productId={product.id} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
