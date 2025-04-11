import CustomBreadcrumb from '@/components/Pages/Web/Shared/CustomBreadcrumb'
import React from 'react'

export default function page() {
  return (
    <>
      <CustomBreadcrumb
        items={[
          { label: "shop", href: "/shop" },
          { label: "cart" },
        ]}
      />
      <p>Cart</p>
    </>
  )
}
