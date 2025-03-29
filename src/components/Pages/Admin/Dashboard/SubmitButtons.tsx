import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

interface SubmitButtonsProps {
    text: string,
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
