import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreHorizontal, UserIcon } from 'lucide-react'
import React from 'react'

export default function ProductsTable() {
    const products = [
        { name: 'Nike air', status: 'Active', price: '$120.00', date: '2024-3-12' },
        { name: 'Nike air', status: 'Active', price: '$120.00', date: '2024-3-12' },
        { name: 'Nike air', status: 'Active', price: '$120.00', date: '2024-3-12' },
        { name: 'Nike air', status: 'Active', price: '$120.00', date: '2024-3-12' }
    ]
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <UserIcon className='h-16 w-16' />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.status}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.date}</TableCell>
                        <TableCell className='text-end'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size='icon' variant='ghost'>
                                        <MoreHorizontal className='h-4 w-4' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    )
}
