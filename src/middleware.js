import { NextRequest, NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
// export const config = {
//   matcher: "/api/:path*",
// };

const protectedRoutes = ['/dashboard'];

export function middleware(request) {
  const xapikey = request.headers.get('xapikey');
  const token = request.cookies.get('pay-token');
  const { pathname, origin } = request.nextUrl;
  if (pathname.includes('/api/')) { 
    if (!xapikey || xapikey != process.env.XAPI_KEY) {
      return Response.json(
          { success: false, message: "Authentication failed" },
          { status: 401 }
        );
    }
  } else if (protectedRoutes.includes(pathname) && !token) {
    const absoluteURL = new URL("/", origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  
  const response = NextResponse.next();
  return response;
}
