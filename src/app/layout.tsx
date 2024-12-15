import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css"; // Import precompiled Bootstrap css for entire project
import "./globals.css"; // Import global css file (including bootstrap css overrides)
import { Inter } from "next/font/google";

// Optimize performance by specifying subsets and weights
const inter = Inter({
  subsets: ["latin"], // Loads only the Latin subset
  weight: ["400", "500", "600", "700"], // Add the weights you need
  display: "swap", // Add display swap for better performance
});

export const metadata: Metadata = {
  title: "MAZ Tashjee/Tambeeh",
  description: "Home Page",
  icons: [
    { rel: "icon", url: "/favicon_16x16.png", sizes: "16x16" },
    { rel: "icon", url: "/favicon_32x32.png", sizes: "32x32" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "icon", url: "/favicon_32x32.png" }, // Fallback icon
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container-fluid bg-primary">
          <div className="row d-flex align-items-center">
            {/* Logo Section - Left aligned */}
            <div className="col-2 d-flex justify-content-start">
              <Image src="/maz_logo_banner.png" alt="logo" width={60} height={60} />
            </div>
            {/* Navbar Section - Right aligned */}
            <div className="col-10">
              <nav className="navbar navbar-expand navbar-light">
                <div className="container-fluid">
                  {/* Navbar Links - Right-aligned */}
                  <div className="navbar-nav ms-auto d-flex justify-content-start">
                    <Link className="nav-link fs-4 fs-sm-5 fs-md-6" href="/">
                      Home
                    </Link>
                    <Link className="nav-link fs-4 fs-sm-5 fs-md-6" href="/form">
                      Form
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        {children}
      </body>
    </html>
  );
}
