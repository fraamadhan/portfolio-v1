import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/cms/gateway',
  },
})

// Memproteksi rute /cms/admin dan semua sub-rutenya
export const config = {
  matcher: ['/cms/admin/:path*'],
}
