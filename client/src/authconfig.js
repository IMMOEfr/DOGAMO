
export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({auth, request}) {  
          const isLoggedIn = !!auth?.user;
          const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
          } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', request.nextUrl));
          }
          console.log("Not authenticated");
          return true;
        },
      },
    providers: [],
} 