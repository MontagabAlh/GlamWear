'use server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { bannerSchema, productSchema } from "@/lib/zodSchemas";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";


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
            isFeatured: submission.value.isFeatured === true ? true : false,
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
            isFeatured: submission.value.isFeatured === true ? true : false,
            price: submission.value.price,
            status: submission.value.status,
            category: submission.value.category,
            images: flattenUrls,
        }
    })

    redirect('/dashboard/products');
}

export async function deleteProduct(productId: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/');
    }

    try {
        await prisma.product.delete({
            where: { id: productId },
        });

        return ("Product deleted successfully");
    } catch (error) {
        console.error("Error deleting product:", error);
        return ("Product deletion failed");
    }
}

// Banner actions ------------------

export async function createBanner(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/');
    }

    const submission = parseWithZod(formData, {
        schema: bannerSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.banner.create({
        data: {
            title: submission.value.title,
            image: submission.value.image,
        }
    })
    redirect('/dashboard/banners')
}


export async function deleteBanner(bannerId: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/');
    }

    try {
        await prisma.banner.delete({
            where: { id: bannerId },
        });

        return ("Banner deleted successfully");
    } catch (error) {
        console.error("Error deleting banner:", error);
        return ("Banner deletion failed");
    }
}


export async function additems(productId: string, quantity: number) {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    if (!user) {
        return redirect('/')
    }

    // eslint-disable-next-line prefer-const
    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    const selectedProduct = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            price: true,
            images: true
        },
        where: {
            id: productId,
        }
    })

    if (!selectedProduct) {
        throw new Error("No Product with this id")
    }

    let myCart = {} as Cart

    if (!cart || !cart.items) {
        myCart = {
            userId: user.id,
            items: [
                {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    images: selectedProduct.images[0],
                    quantity: quantity,
                }
            ]
        }
    } else {
        let itemFound = false;

        myCart.items = cart.items.map((item) => {
            if (item.id === productId) {
                itemFound = true;
                item.quantity += quantity
            }

            return item
        })

        if (!itemFound) {
            myCart.items.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                images: selectedProduct.images[0],
                quantity: quantity,
            })
        }
    }
    await redis.set(`cart-${user.id}`, myCart)

    revalidatePath("/", 'layout')
}

export async function editQuantityItems(productId: string, quantity: number) {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    if (!user) {
        return redirect('/')
    }

    // eslint-disable-next-line prefer-const
    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    const selectedProduct = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            price: true,
            images: true
        },
        where: {
            id: productId,
        }
    })

    if (!selectedProduct) {
        throw new Error("No Product with this id")
    }

    let myCart = {} as Cart

    if (!cart || !cart.items) {
        myCart = {
            userId: user.id,
            items: [
                {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    images: selectedProduct.images[0],
                    quantity: quantity,
                }
            ]
        }
    } else {
        let itemFound = false;

        myCart.items = cart.items.map((item) => {
            if (item.id === productId) {
                itemFound = true;
                item.quantity = quantity
            }
            return item
        })

        if (!itemFound) {
            myCart.items.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                images: selectedProduct.images[0],
                quantity: quantity,
            })
        }
    }
    await redis.set(`cart-${user.id}`, myCart)

    revalidatePath("/", 'layout')
}

export async function removeItemFromCart(productId: string) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        return redirect('/')
    }

    const cartKey = `cart-${user.id}`
    const cart: Cart | null = await redis.get(cartKey)

    if (!cart || !cart.items) {
        return
    }

    const updatedItems = cart.items.filter(item => item.id !== productId)

    const updatedCart = {
        ...cart,
        items: updatedItems,
    }

    await redis.set(cartKey, updatedCart)
    revalidatePath('/', 'layout')
}


export async function Checkout() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        return redirect('/')
    }

    // eslint-disable-next-line prefer-const
    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    if (cart && cart.items) {

        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item) => ({
            price_data: {
                currency: 'usd',
                unit_amount: item.price * 100,
                product_data: {
                    name: item.name,
                    images: [item.images]
                }
            },
            quantity: item.quantity
        }))
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: lineItems,
            success_url: `https://glam-wear.vercel.app/payment/success`,
            cancel_url: `https://glam-wear.vercel.app/payment/cancel`,
        });

        return redirect(session.url as string) 
    }
}
