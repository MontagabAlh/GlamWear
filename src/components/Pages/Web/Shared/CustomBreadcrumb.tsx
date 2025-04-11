import { HomeIcon } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type BreadcrumbData = {
    label: string
    href?: string
}

interface CustomBreadcrumbProps {
    items: BreadcrumbData[]
}

export default function CustomBreadcrumb({ items }: CustomBreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList className="bg-background rounded-md border px-3 py-2 shadow-xs flex items-center space-x-1 my-2">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                        <HomeIcon size={16} aria-hidden="true" />
                        <span className="sr-only">Home</span>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-1">
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {index === items.length - 1 || !item.href ? (
                                <BreadcrumbPage className="capitalize">{item.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={item.href} className="capitalize">{item.label}</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
