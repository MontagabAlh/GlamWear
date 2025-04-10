import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser();
        if (!user || user === null || !user?.id) {
            throw new Error("Something went wrong...")
        }

        let dbUser = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    id: user.id,
                    firstName: user.given_name?.trim() || "",
                    lastName: user.family_name?.trim() || "",
                    email: user.email?.trim() || "",
                    profileImage: user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.given_name || "U")}`,
                }
            });
        }
        const redirectUrl = process.env.KINDE_SITE_URL || 'http://localhost:3000/';
        return NextResponse.redirect(new URL(redirectUrl));

    } catch (error) {
        console.error("Error in auth creation:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}