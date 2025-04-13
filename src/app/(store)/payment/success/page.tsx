/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRef, useEffect } from "react";
import { Confetti, type ConfettiRef } from '@/components/ui/confetti'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
    const confettiRef = useRef<ConfettiRef>(null);

    useEffect(() => {
        // Fire confetti when component mounts
        confettiRef.current?.fire({});
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-md mx-auto text-center space-y-6">
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                    <svg
                        className="h-12 w-12 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <Confetti
                        ref={confettiRef}
                        className="absolute left-0 top-0 z-0 size-full"
                    />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Payment Successful!</h1>
                <p className="text-muted-foreground">
                    Thank you for your purchase. Your payment has been processed successfully.
                    We{"'"}ll send you an email confirmation shortly.
                </p>
                <div className="flex gap-2">
                    <Button 
                        asChild 
                        className="w-max relative z-10" 
                        size="lg"
                    >
                        <Link href="/shop">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
