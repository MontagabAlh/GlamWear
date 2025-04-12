import CustomBreadcrumb from '@/components/Pages/Web/Shared/CustomBreadcrumb';
import React from 'react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';
import { redis } from '@/lib/redis';
import { Cart } from '@/lib/interfaces';
import { Ripple } from '@/components/ui/ripple';
import Image from 'next/image';
import { DollarSign } from 'lucide-react';
import Quentity from '@/components/Pages/Web/Cart/Quentity';
import DeleteButton from '@/components/Pages/Web/Cart/DeleteButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const calculateTotal = (items: Cart['items']) => {
  return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
};

export default async function cart() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect('/');
  }
  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  return (
    <>
      <CustomBreadcrumb
        items={[
          { label: "shop", href: "/shop" },
          { label: "cart" },
        ]}
      />
      <div className="relative flex h-[250px] md:h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
        <p className="z-10 whitespace-pre-wrap text-center text-3xl md:text-5xl font-medium tracking-tighter text-gray-700 dark:text-white">
            Cart
        </p>
        <Ripple />
      </div>

      <div className="md:max-w-7xl mx-auto mt-10 md:px-4 flex flex-col md:flex-row gap-8">
        {cart?.items.length === 0 || cart === null ? (
          <Card className='flex flex-col justify-center items-center gap-3 p-6 w-full'>
            <h1 className="text-2xl text-center w-full">Your cart is empty</h1>
            <p className="text-muted-foreground text-center">
              Add products while you shop, so they{`'`}ll be ready for checkout later.
            </p>
            <Button asChild className="mt-4">
              <Link href='/shop'>Back to Shop</Link>
            </Button>
          </Card>
        ) : (
          <>
            {/* Items Section */}
            <div className="flex-1 space-y-6">
              {cart.items.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-row border rounded-md bg-white dark:bg-[#171717] shadow pr-3"
                >
                  <Image
                    src={product.images}
                    alt='product image'
                    width={112}
                    height={112}
                    className='object-contain object-center rounded-md'
                  />
                  <div className='flex justify-between items-center w-full gap-2'>
                    <div className='flex flex-col justify-between h-full py-4'>
                      <Link href={`/shop/${product.id}`} className='text-md md:text-lg line-clamp-1'>{product.name}</Link>
                      <div className='w-max'>
                        <Quentity ProductId={product.id} ProductQuantity={product.quantity} />
                      </div>
                    </div>
                    <div className='flex flex-col justify-between h-full py-4'>
                      <p className='flex items-center justify-end w-full md:text-lg'>
                        <span className='text-muted-foreground mr-1 text-[16px]'>{product.quantity} x</span>
                        <DollarSign className='w-3 h-3 md:w-4 md:h-4 ' />
                        {product.price}
                      </p>
                      <DeleteButton ProductId={product.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="md:w-96 w-full h-max sticky top-20">
              <Card className="p-6 space-y-4 dark:bg-[#171717] shadow-lg">
                <h2 className="text-xl font-bold border-b pb-2">Order Summary</h2>

                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {calculateTotal(cart.items).toFixed(2)}
                    </span>
                  </div>

                  <Button asChild className="w-full mt-6" size="lg">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
}