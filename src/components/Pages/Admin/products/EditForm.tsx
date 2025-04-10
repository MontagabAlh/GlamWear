"use client"

import { editProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/lib/zodSchemas";
import { UploadDropzone } from "@/utils/uploadthing";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import SubmitButtons from "../Dashboard/SubmitButtons";
import { $Enums } from "@prisma/client";

interface EditFormProps {
    data: {
        images: string[];
        name: string;
        description: string;
        price: number;
        status: $Enums.ProductStatus;
        category: $Enums.Category;
        isFeatured: boolean;
        id: string;
        createdAt: Date;
    }
}



export default function EditForm({ data }: EditFormProps) {
    const [images, setImages] = useState<string[]>(data.images);
    const [lastResult, action] = useActionState(editProduct, undefined)
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
            <input type="hidden" name="productId" value={data.id} />
            <div className='flex items-center gap-4'>
                <Button asChild variant='outline' size='icon'>
                    <Link href='/dashboard/products/'>
                        <ChevronLeft className='h-4 w-4' />
                    </Link>
                </Button>
                <h1 className='text-xl font-semibold tracking-tight'>Edit Product</h1>
            </div>

            <Card className='mt-5'>
                <CardHeader>
                    <CardTitle>
                        Product Details
                    </CardTitle>
                    <CardDescription>In this form can update your product</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                            <Label>Name</Label>
                            <Input
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={data.name}
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
                                defaultValue={data.description}
                                placeholder='Write your Description...' />
                            <p className='text-red-500 text-xs'>{fields.description.errors}</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Label>Price</Label>
                            <Input
                                key={fields.price.key}
                                name={fields.price.name}
                                defaultValue={data.price}
                                type='number'
                                placeholder='$55' />
                            <p className='text-red-500 text-xs'>{fields.price.errors}</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Label>Featured Product</Label>
                            <Switch
                                key={fields.isFeatured.key}
                                name={fields.isFeatured.name}
                                defaultChecked={data.isFeatured} />
                            <p className='text-red-500 text-xs'>{fields.isFeatured.errors}</p>
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-5'>
                            <div className='flex flex-col gap-3 w-full'>
                                <Label>Status</Label>
                                <Select
                                    key={fields.status.key}
                                    name={fields.status.name}
                                    defaultValue={data.status}
                                >
                                    <SelectTrigger className="w-full">
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
                                    defaultValue={data.category}
                                >
                                    <SelectTrigger className="w-full">
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
                                defaultValue={data.images as any} />
                            {images.length < 10 && (
                                <UploadDropzone
                                    className=" ut-label:text-lg ut-upload-icon:w-14 cursor-pointer py-4 bg-white dark:bg-[#151515] ut-button:text-background rounded-lg ut-button:bg-foreground ut-button:ut-readying:bg-foreground ut-button:px-4 ut-button:py-2 shadow-sm  ut-button:text-sm ut-button:font-semibold ut-button:shadow-sm !ut-button:hover:bg-primary/90 ut-upload-icon:text-gray-400 text-gray-400 ut-label:text-foreground"
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        console.log("Files: ", res);
                                        setImages((prevImages) => [...prevImages, ...res.map((r) => r.url)]);
                                        toast.success("Upload Completed")

                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error(`ERROR! ${error.message}`);
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
                                                className='w-fill h-full object-cover rounded-lg border bg-f'
                                            />
                                            <Button onClick={() => handleDelete(index)} type='button' asChild size='icon' variant='secondary' className='bg-red-500 absolute -top-1 -right-1 cursor-pointer hover:bg-red-400'>
                                                <XIcon className='w-7 h-7' />
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
                    <SubmitButtons text="Edit Product" />
                </CardFooter>
            </Card>
        </form>
    )
}
