import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

export default function OrdersTable() {
    const orders = [
        { name: 'Montagab Al-Hamawy', email: 'hi@gmail.com', type: 'Sale', status: 'Successful', date: '2024-5-20', amount: '$250.00' },
        { name: 'Ali Revsl', email: 'boo@test.com', type: 'Sale', status: 'pending', date: '2024-4-1', amount: '$320.00' },
        { name: 'Mohammed Jobar', email: 'las@mail.com', type: 'Sale', status: 'Successful', date: '2024-3-25', amount: '$200.00' },
        { name: 'Nour Taklet', email: 'sedd@yahoo.com', type: 'book', status: 'Failed', date: '2024-3-19', amount: '$150.00' },
        { name: 'Ahmad Al-Fared', email: 'adee@gmail.com', type: 'Sale', status: 'Successful', date: '2024-2-22', amount: '$50.00' },
        { name: 'Deaa Kaled', email: 'cdd@gmail.com', type: 'book', status: 'Failed', date: '2024-1-29', amount: '$190.00' },
        { name: 'Deaa Kaled', email: 'cdd@gmail.com', type: 'book', status: 'Failed', date: '2024-1-29', amount: '$190.00' },
        { name: 'Deaa Kaled', email: 'cdd@gmail.com', type: 'book', status: 'Failed', date: '2024-1-29', amount: '$190.00' },
        { name: 'Deaa Kaled', email: 'cdd@gmail.com', type: 'book', status: 'Failed', date: '2024-1-29', amount: '$190.00' },
        { name: 'Deaa Kaled', email: 'cdd@gmail.com', type: 'book', status: 'Failed', date: '2024-1-29', amount: '$190.00' },
        { name: 'Deaa Kaled', email: 'cdd@gmail.com', type: 'book', status: 'Failed', date: '2024-1-29', amount: '$190.00' },
    ]
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Customar</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order, index) => (
                    <TableRow key={index} className='cursor-pointer'>
                        <TableCell>
                            <p>{order.name}</p>
                            <p className='hidden md:flex text-sm text-muted-foreground'>{order.email}</p>
                        </TableCell>
                        <TableCell>{order.type}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell className='text-right'>{order.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
