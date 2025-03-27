'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner"

export default function Create() {
  return (
    <form>
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
              <Input type='text' className='w-full' placeholder='Product Name' />
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Description</Label>
              <Textarea placeholder='Write your Description...' />
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Price</Label>
              <Input type='number' placeholder='$55' />
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Featured Product</Label>
              <Switch />
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Select Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='draft'>Draft</SelectItem>
                  <SelectItem value='published'>Published</SelectItem>
                  <SelectItem value='archived'>Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Product Image</Label>
              <UploadDropzone
                className=" ut-label:text-lg ut-upload-icon:w-14 cursor-pointer py-4 bg-white dark:bg-[#212121] ut-button:text-background rounded-lg ut-button:bg-foreground ut-button:ut-readying:bg-foreground ut-button:px-2 shadow-sm ut-button:shadow-sm"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  toast("Upload Completed")

                }}
                onUploadError={(error: Error) => {
                  toast(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
