'use client'
import { createBanner } from '@/app/actions'
import SubmitButtons from '@/components/Pages/Admin/Dashboard/SubmitButtons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { bannerSchema } from '@/lib/zodSchemas'
import { UploadDropzone } from '@/utils/uploadthing'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { ChevronLeft, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

export default function CreateBanner() {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [lastResult, action] = useFormState(createBanner, undefined)

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: bannerSchema });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'
    })

    const handleDelete = () => {
        setImage(undefined)
    }
    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <div className='flex items-center gap-4'>
                <Button asChild variant='outline' size='icon'>
                    <Link href='/dashboard/banners/'>
                        <ChevronLeft className='h-4 w-4' />
                    </Link>
                </Button>
                <h1 className='text-xl font-semibold tracking-tight'>New Banner</h1>
            </div>
            <Card className='mt-5'>
                <CardHeader>
                    <CardTitle>
                        Banner Details
                    </CardTitle>
                    <CardDescription>
                        Create your banner right Hear
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-y-6 '>
                        <div className='flex flex-col gap-3'>
                            <Label>Title</Label>
                            <Input
                                key={fields.title.key}
                                name={fields.title.name}
                                defaultValue={fields.title.initialValue}
                                type='text'
                                placeholder='Create Title for Banner' />
                            <p className='text-red-500 text-xs'>{fields.title.errors}</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Label>Images</Label>
                            <input type='hidden'
                                value={image}
                                key={fields.image.key}
                                name={fields.image.name}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                defaultValue={fields.image.initialValue as any} />
                            {image === undefined ? (
                                <UploadDropzone
                                    className=" ut-label:text-lg ut-upload-icon:w-14 cursor-pointer py-4 bg-white dark:bg-[#151515] ut-button:text-background rounded-lg ut-button:bg-foreground ut-button:ut-readying:bg-foreground ut-button:px-4 ut-button:py-2 shadow-sm  ut-button:text-sm ut-button:font-semibold ut-button:shadow-sm !ut-button:hover:bg-primary/90 ut-upload-icon:text-gray-400 text-gray-400 ut-label:text-foreground"
                                    endpoint="bannerImageUploader"
                                    onClientUploadComplete={(res) => {
                                        setImage(res[0].url);
                                        toast.success("Upload Completed")

                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error(`ERROR! ${error.message}`);
                                    }}

                                />
                            ) : (
                                <div className='flex gap-5'>
                                    <div className='relative w-full'>
                                        <Image
                                            src={image}
                                            width={900}
                                            height={400}
                                            alt='Product Image'
                                            className='w-full h-full object-cover rounded-lg border '
                                        />
                                        <Button onClick={() => handleDelete()} type='button' variant='link' asChild size='icon' className='bg-red-500 absolute -top-1 -right-1 cursor-pointer hover:bg-red-400'>
                                            <XIcon className='w-8 h-8' />
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <p className='text-red-500 text-xs'>{fields.image.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButtons text='Creat Banner' />
                </CardFooter>
            </Card>
        </form>

    )
}
