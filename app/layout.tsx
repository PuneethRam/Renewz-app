"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import { LucideHome, LucideTrendingUp, LucideLogOut, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function NavContent() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Function to check if link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Renewz
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            // Logged in navigation
            <>
              <Link
                href="/dashboard"
                className={`text-gray-700 hover:text-teal-600 transition-colors font-medium ${
                  isActive('/dashboard') ? 'text-teal-600' : ''
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/projects"
                className={`text-gray-700 hover:text-teal-600 transition-colors font-medium ${
                  isActive('/projects') ? 'text-teal-600' : ''
                }`}
              >
                Projects
              </Link>
              <Link
                href="/calculator"
                className={`text-gray-700 hover:text-teal-600 transition-colors font-medium ${
                  isActive('/calculator') ? 'text-teal-600' : ''
                }`}
              >
                Calculator
              </Link>
              <Link
                href="/investments"
                className={`text-gray-700 hover:text-teal-600 transition-colors font-medium ${
                  isActive('/investments') ? 'text-teal-600' : ''
                }`}
              >
                My Investments
              </Link>

              {/* User Profile Dropdown */}
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user.displayName?.[0] || user.email?.[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-xs text-gray-500">Solar Investor</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    <LucideLogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Logged out navigation
            <>
              <Link
                href="/"
                className={`text-gray-700 hover:text-teal-600 transition-colors font-medium ${
                  isActive('/') ? 'text-teal-600' : ''
                }`}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className={`text-gray-700 hover:text-teal-600 transition-colors font-medium ${
                  isActive('/projects') ? 'text-teal-600' : ''
                }`}
              >
                Projects
              </Link>
              <Link
                href="/calculator"
                className={`text-gray-700 hover:text-teal-600 transition-colors font-medium ${
                  isActive('/calculator') ? 'text-teal-600' : ''
                }`}
              >
                Calculator
              </Link>
              <Link
                href="/about"
                className={`text-gray-700 hover:text-teal-600 transition-colors font-medium ${
                  isActive('/about') ? 'text-teal-600' : ''
                }`}
              >
                About
              </Link>
              <Link 
                href="/auth/login"
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
              >
                Login
              </Link>
              <Link 
                href="/auth/signup"
                className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all hover:shadow-lg"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {user ? (
              // Logged in mobile navigation
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/dashboard')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/projects"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/projects')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/calculator"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/calculator')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  Calculator
                </Link>
                <Link
                  href="/investments"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/investments')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  My Investments
                </Link>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center px-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center text-white font-semibold">
                      {user.displayName?.[0] || user.email?.[0].toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {user.displayName || user.email}
                      </div>
                      <div className="text-xs text-gray-500">Solar Investor</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-gray-50 rounded-md"
                  >
                    <LucideLogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              // Logged out mobile navigation
              <>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/projects')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/calculator"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/calculator')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  Calculator
                </Link>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/about')
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  About
                </Link>
                
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                  <Link
                    href="/auth/login"
                    onClick={closeMobileMenu}
                    className="block w-full text-center text-gray-700 hover:text-teal-600 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={closeMobileMenu}
                    className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // For auth pages, use a simpler layout without navigation
  if (pathname === "/auth/login" || pathname === "/auth/signup") {
    return (
      <html lang="en">
        <body className="bg-gradient-to-br from-green-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20 text-gray-900 dark:text-gray-100 min-h-screen">
          <AuthProvider>
            <div className="relative min-h-screen">
              {/* Decorative Elements */}
              <div className="absolute top-12 left-12 w-32 h-32 bg-green-300 dark:bg-green-700/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
              <div className="absolute bottom-12 right-12 w-32 h-32 bg-blue-300 dark:bg-blue-700/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-200 dark:bg-yellow-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
              {children}
            </div>
          </AuthProvider>
        </body>
      </html>
    );
  }

  // Check if this is the landing page
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return (
      <html lang="en">
        <body className="bg-white text-gray-900 min-h-screen">
          <AuthProvider>
            <NavContent />
            {/* Full-screen content without padding/margins */}
            {children}
          </AuthProvider>
        </body>
      </html>
    );
  }

  // Regular pages with container
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-teal-50 via-cyan-50 to-gray-50 text-gray-900 min-h-screen">
        <AuthProvider>
          <NavContent />
          
          {/* Main content with top padding for fixed navbar */}
          <main className="pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}