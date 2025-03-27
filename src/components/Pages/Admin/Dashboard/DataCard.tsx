import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
interface DataCard {
    cardTitle: string;
    number: string;
    mutedText: string;
    icon: React.JSX.Element;
}
export default function DataCard({ cardTitle, number, mutedText, icon }: DataCard) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>{cardTitle}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{number}</p>
                <p className="text-xs text-muted-foreground">{mutedText}</p>
            </CardContent>
        </Card>
    )
}
