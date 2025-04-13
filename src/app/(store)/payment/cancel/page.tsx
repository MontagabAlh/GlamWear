import { Checkout } from '@/app/actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-md mx-auto text-center space-y-6">
                <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                    <svg
                        className="h-12 w-12 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Payment Cancelled</h1>
                <p className="text-muted-foreground">
                    Your payment was cancelled. You can try the payment again by returning to the checkout page.
                </p>
                <div className="flex gap-2">
                    <form action={Checkout}>
                        <Button className="w-full" size="lg">
                            Return to Checkout
                        </Button>
                    </form>
                    <Button asChild className="w-max" size="lg" variant="outline">
                        <Link
                            href="/shop"
                        >
                            Continue Shopping
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
