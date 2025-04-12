import CustomBreadcrumb from '@/components/Pages/Web/Shared/CustomBreadcrumb'
import { Ripple } from '@/components/ui/ripple'
import React from 'react'

export default function page() {
  return (
    <>
      <CustomBreadcrumb
        items={[
          { label: "shop", href: "/shop" },
          { label: "checkout" },
        ]}
      />
      <div className="relative flex h-[250px] md:h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
        <p className="z-10 whitespace-pre-wrap text-center text-3xl md:text-5xl font-medium tracking-tighter  text-gray-700 dark:text-white">
            Checkout
        </p>
        <Ripple />
      </div>
      <p>checkout</p>
    </>
  )
}
