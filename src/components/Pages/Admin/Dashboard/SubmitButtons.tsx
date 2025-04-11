import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React, { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

interface SubmitButtonsProps {
    text: string,
    icone?: ReactNode;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
}
export default function SubmitButtons({ text, variant }: SubmitButtonsProps) {
    const { pending } = useFormStatus()

    return (
        <>
            {pending ? (
                <Button disabled variant={variant}>
                    <Loader2 className='mr-2 h-4 w-4  animate-spin' />
                    Please Wait
                </Button>
            ) : (
                <Button type='submit' variant={variant ? variant : "default"}>
                    {text}
                </Button>
            )}
        </>
    )
}

export function ShoppinButtons({ text, icone }: SubmitButtonsProps) {
    const { pending } = useFormStatus()

    return (
        <>
            {pending ? (
                <Button size="lg" className='w-full' disabled type='submit'>
                    <Loader2 className='w-3 h-3' />
                    Please Wait
                </Button>
            ) : (
                <Button size="lg" className='w-full'>
                    {icone}
                    {text}
                </Button>
            )}
        </>
    )
}
