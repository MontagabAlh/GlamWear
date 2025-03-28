import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export default function page() {
    
    return (
        <div>
            <Button asChild>
                <LoginLink>Sign in</LoginLink>
            </Button>
            <Button asChild>
                <RegisterLink>Sign up</RegisterLink>
            </Button>
            <Button>
                <Link href='/dashboard'>
                    Dashboard
                </Link>
            </Button>
        </div>
    )
}
