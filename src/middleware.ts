// import { authMiddleware } from "@kinde-oss/kinde-auth-nextjs/server";
import { authMiddleware } from "@clerk/nextjs";

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth-callback", "/notes/:path*"],
// };

// export default authMiddleware;

export default authMiddleware({
  // Ensure that locale specific sign-in pages are public
  publicRoutes: ["/", "/:locale/sign-in"],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/auth-callback",
    "/dashboard/:path*",
  ],
};
