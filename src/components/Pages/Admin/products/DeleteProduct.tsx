"use client"

import { useState, useTransition } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { deleteProduct } from "@/app/actions"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface DeleteProductProps {
    productId: string
}

export function DeleteProduct({ productId }: DeleteProductProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = () => {
        startTransition(async () => {
            const message = await deleteProduct(productId) 
            if (message === "Product deleted successfully") {
                toast.success(message)
                setIsOpen(false)
                router.refresh()
            } else {
                toast.error(message)
            }
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem  onSelect={(e) => e.preventDefault()} className="text-red-600 cursor-pointer">
                    Delete
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone,
                        This will permanently delete the product from the servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild onClick={handleDelete} disabled={isPending}>
                        {isPending ? (
                            <Button disabled >
                                <Loader2 className='mr-2 h-4 w-4  animate-spin' />
                                Please Wait
                            </Button>
                        ) : (
                            <Button >
                                Delete
                            </Button>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
