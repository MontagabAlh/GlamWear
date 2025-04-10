import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navbar from "../../components/Layout/Admin/Navbar";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { ModeToggle } from "@/components/Provider/ModeToggle";
import Link from "next/link";
import StoreDropdownMenu from "@/components/Layout/Web/StoreDropdownMenu";

interface LayoutProps {
    children: React.ReactNode;
};

export default async function DashboardLayout({ children }: LayoutProps) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        redirect('/');
    }
    console.log(user);


    return (
        <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background z-50">
                <nav className="hidden md:flex font-medium md:flex-row md:item-center md:gap-5 md:text-sm lg:gap-6">
                    <Link href={'/'}>
                        <h1 className='text-foreground font-bold text-xl lg:text-3xl'>
                            GlamWear
                        </h1>
                    </Link>
                    <Navbar />
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="shrink-0 md:hidden cursor-pointer" variant='outline' size="icon">
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="flex flex-col gap-6 text-lg font-medium mt-5 px-5">
                            <Navbar />
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-row justify-center items-center gap-4">
                    <StoreDropdownMenu />
                    <ModeToggle />
                </div>
            </header>
            <div className="my-5">
                {children}
            </div>
        </div>
    );
}
