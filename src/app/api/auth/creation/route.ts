// app/api/auth/creation/route.ts
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // إضافة هذه السطر

export async function GET() {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser();

        // تحقق من وجود المستخدم بشكل صحيح
        if (!user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let dbUser = await prisma.user.findUnique({
            where: { id: user.id }
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

        // إعادة توجيه آمن مع التحقق من وجود البيئة
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