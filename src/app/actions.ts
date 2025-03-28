'use server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "@/lib/zodSchemas";
import { prisma } from "@/lib/prisma";
export async function createProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    if (!user) {
        return redirect('/')
    }

    const submission = parseWithZod(formData, {
        schema: productSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((uslString) => uslString.split(",").map((url) => url.trim()))

    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            price: submission.value.price,
            status: submission.value.status,
            images: flattenUrls,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured,
        }
    })
    redirect('/dashboard/products')
}

export async function editProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    if (!user) {
        return redirect('/')
    }

    const submission = parseWithZod(formData, {
        schema: productSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply()
    }
    const productId = formData.get("productId") as string
    const flattenUrls = submission.value.images.flatMap((uslString) => uslString.split(",").map((url) => url.trim()))
    await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            name: submission.value.name,
            description: submission.value.description,
            isFeatured: submission.value.isFeatured,
            price: submission.value.price,
            status: submission.value.status,
            category: submission.value.category,
            images: flattenUrls,
        }
    })
    redirect('/dashboard/products');
}

export async function deleteProduct(productId: string) {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    if (!user) {
        return redirect('/')
    }
    await prisma.product.delete({
        where: {
            id: productId,
        }
    });

    redirect('/dashboard/products');
}