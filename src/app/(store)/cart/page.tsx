import CustomBreadcrumb from '@/components/Pages/Web/Shared/CustomBreadcrumb'
import React from 'react'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';
import { redis } from '@/lib/redis';
import { Cart } from '@/lib/interfaces';
import { Ripple } from '@/components/ui/ripple';
import { TextAnimate } from '@/components/ui/text-animate';
import Image from 'next/image';
import { DollarSign } from 'lucide-react';

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
        <p className="z-10 whitespace-pre-wrap text-center text-3xl md:text-5xl font-medium tracking-tighter  text-gray-700 dark:text-white">
          <TextAnimate animation="blurIn" as="p">
            Cart
          </TextAnimate>
        </p>
        <Ripple />
      </div>
      <div className='max-w-2xl mx-auto mt-10 min-h-[55vh]'>
        {cart?.items.length === 0 ?
          (
            <div>
              <h1>nothing in the Cart</h1>
            </div>
          ) : (
            <>
            {
              cart?.items.map((product , index) => (
                <div key={index} className='flex'>
                  <div className='w-24 h-24 sm:w-32 sm:h-32 relative'>
                    <Image
                    src={product.images}
                    alt='image product'
                    fill
                    className='object-contain object-center rounded-md'
                    />
                  </div>
                  <div className='ml-5 flex justify-between w-full font-medium'>
                    <p>{product.name}</p>
                    <div className='flex flex-col justify-between h-full'>
                        <div className='flex items-center gap-3'>
                          <p>{product.quantity}</p>
                          <p className='flex items-center'><DollarSign className='w-3 h-3' /> {product.price}</p>
                        </div>
                    </div>
                  </div>
                </div>
              ))
            }
            </>
          )
        }
      </div>

    </>
  )
}
