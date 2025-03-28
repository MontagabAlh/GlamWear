'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, XIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useActionState, useState } from 'react'
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner"
import { createProduct } from '@/app/actions'
import { useForm } from "@conform-to/react"
import { parseWithZod } from '@conform-to/zod'
import { productSchema } from '@/lib/zodSchemas'
import Image from 'next/image'
import SubmitButtons from '@/components/Pages/Admin/Dashboard/SubmitButtons'

export default function CreateProduct() {
  const [images, setImages] = useState<string[]>([]);
  const [lastResult, action] = useActionState(createProduct, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema })
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: "onInput",
  })

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className='flex items-center gap-4'>
        <Button asChild variant='outline' size='icon'>
          <Link href='/dashboard/products/'>
            <ChevronLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-xl font-semibold tracking-tight'>New Product</h1>
      </div>

      <Card className='mt-5'>
        <CardHeader>
          <CardTitle>
            Product Details
          </CardTitle>
          <CardDescription>In this form can create your product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <Label>Name</Label>
              <Input
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
                type='text'
                className='w-full'
                placeholder='Product Name' />
              <p className='text-red-500 text-xs'>{fields.name.errors}</p>
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
                placeholder='Write your Description...' />
              <p className='text-red-500 text-xs'>{fields.description.errors}</p>
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Price</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={fields.price.initialValue}
                type='number'
                placeholder='$55' />
              <p className='text-red-500 text-xs'>{fields.price.errors}</p>
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Featured Product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultValue={fields.isFeatured.initialValue} />
              <p className='text-red-500 text-xs'>{fields.isFeatured.errors}</p>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-center gap-5'>
              <div className='flex flex-col gap-3 w-full'>
                <Label>Status</Label>
                <Select
                  key={fields.status.key}
                  name={fields.status.name}
                  defaultValue={fields.status.initialValue}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='draft'>Draft</SelectItem>
                    <SelectItem value='published'>Published</SelectItem>
                    <SelectItem value='archived'>Archived</SelectItem>
                  </SelectContent>
                </Select>
                <p className='text-red-500 text-xs'>{fields.status.errors}</p>
              </div>
              <div className='flex flex-col gap-3 w-full'>
                <Label>Category</Label>
                <Select
                  key={fields.category.key}
                  name={fields.category.name}
                  defaultValue={fields.category.initialValue}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='men'>men</SelectItem>
                    <SelectItem value='women'>Women</SelectItem>
                    <SelectItem value='kids'>Kids</SelectItem>
                  </SelectContent>
                </Select>
                <p className='text-red-500 text-xs'>{fields.category.errors}</p>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Product Image</Label>
              <input type='hidden'
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                defaultValue={fields.images.initialValue as any} />
              {images.length < 10 && (
                <UploadDropzone
                  className=" ut-label:text-lg ut-upload-icon:w-14 cursor-pointer py-4 bg-white dark:bg-[#212121] ut-button:text-background rounded-lg ut-button:bg-foreground ut-button:ut-readying:bg-foreground ut-button:px-4 ut-button:py-2 shadow-sm  ut-button:text-sm ut-button:font-semibold ut-button:shadow-sm !ut-button:hover:bg-primary/90 ut-upload-icon:text-gray-400 text-gray-400 ut-label:text-foreground"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    setImages((prevImages) => [...prevImages, ...res.map((r) => r.url)]);
                    toast("Upload Completed")

                  }}
                  onUploadError={(error: Error) => {
                    toast(`ERROR! ${error.message}`);
                  }}

                />
              )}
              {images.length > 0 && (
                <div className='flex gap-5'>
                  {images.map((image, index) => (
                    <div key={index} className='relative w-[100px] h-[100px]'>
                      <Image
                        src={image}
                        width={100}
                        height={100}
                        alt='Product Image'
                        className='w-fill h-full object-cover rounded-lg border '
                      />
                      <Button onClick={() => handleDelete(index)} type='button' asChild size='icon' variant='secondary' className='bg-red-500 absolute -top-1 -right-1 cursor-pointer hover:bg-red-400'>
                        <XIcon className='w-5 h-5 ' />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <p className='text-red-500 text-xs'>{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButtons text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  )
}

