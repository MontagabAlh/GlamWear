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
import { MoreHorizontal } from 'lucide-react'
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
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            <div className='flex justify-start items-center gap-1'>
                                <Image
                                    src={product.images[0]}
                                    width={90}
                                    height={80}
                                    alt="Product Image"
                                    className="w-fill h-full object-cover rounded-lg border p-1"
                                />
                                <div
                                    className={`hidden md:grid ${(product.images.length - 1) % 2 === 0 ? "grid-cols-1" : "grid-cols-2"
                                        } gap-1`}
                                >
                                    {product.images.slice(1, 5).map((image, index) => (
                                        <Image
                                            key={index}
                                            src={image}
                                            width={25}
                                            height={25}
                                            alt="Product Image"
                                            className="w-full h-full object-cover rounded-lg border p-1"
                                        />
                                    ))}
                                </div>

                            </div>
                        </TableCell>
                        <TableCell className="truncate max-w-40">{product.name}</TableCell>
                        <TableCell>{product.status}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}.00</TableCell>
                        <TableCell>{new Intl.DateTimeFormat("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric"
                        }).format(new Date(product.createdAt)).replace(/\//g, "-")}
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
                                    <DropdownMenuItem>View</DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/dashboard/products/${product.id}`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <DeleteProduct productId={product.id} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
