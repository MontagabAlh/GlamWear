import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  async function middleware(req: { kindeAuth: unknown; }) {
    console.log("look at me", req.kindeAuth);
  },
  {
    isReturnToCurrentPage: true,
    loginPage: "/login",
    publicPaths: ["/"],
    isAuthorized: ({ token }: { token: { permissions: string[] } }) => {
      // The user will be considered authorized if they have the permission 'eat:chips'
      return token.permissions.includes("eat:chips");
    }
  }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}