"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import { LucideHome, LucideTrendingUp, LucideSun, LucideMoon, LucideLogOut, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function NavContent() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

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
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/dashboard" className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mr-3">
                <LucideSun className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                Renewz
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {user ? (
                // Logged in navigation
                <>
                  <Link
                    href="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 dark:text-green-400 border-b-2 border-green-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideHome className="w-4 h-4 inline mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    href="/projects"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/projects')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideTrendingUp className="w-4 h-4 inline mr-2" />
                    Explore Projects
                  </Link>
                  <Link
                    href="/calculator"
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/calculator')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideTrendingUp className="w-4 h-4 inline mr-2" />
                    Investment Calculator
                  </Link>
                  <Link
                    href="/investments"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/transactions')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideTrendingUp className="w-4 h-4 inline mr-2" />
                    Transactions
                  </Link>
                </>
              ) : (
                // Logged out navigation
                <>
                  <Link
                    href="/"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 dark:text-green-400 border-b-2 border-green-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideHome className="w-4 h-4 inline mr-2" />
                    Home
                  </Link>
                  <Link
                    href="/projects"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/projects')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideTrendingUp className="w-4 h-4 inline mr-2" />
                    Explore Projects
                  </Link>
                  <Link
                    href="/calculator"
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/calculator')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideTrendingUp className="w-4 h-4 inline mr-2" />
                    Investment Calculator
                  </Link>
                  <Link
                    href="/about"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/about')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-yellow-600 dark:text-yellow-400 border-b-2 border-yellow-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    About
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? 
                <LucideSun className="w-5 h-5 text-amber-500" /> : 
                <LucideMoon className="w-5 h-5 text-blue-600" />
              }
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* Profile Circle with Name */}
                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {user.displayName || user.email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Solar Investor</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <LucideLogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              {user ? (
                // Logged in mobile navigation
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/dashboard')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 dark:text-green-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideHome className="w-4 h-4 inline mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    href="/projects"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/projects')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideTrendingUp className="w-4 h-4 inline mr-2" />
                    Explore Projects
                  </Link>
                  <Link
                    href="/calculator"
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/calculator')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideTrendingUp className="w-4 h-4 inline mr-2" />
                    Investment Calculator
                  </Link>
                  <Link
                    href="/investments"
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/investments')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideTrendingUp className="w-4 h-4 inline mr-2" />
                    My Transactions
                  </Link>
                </>
              ) : (
                // Logged out mobile navigation
                <>
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 dark:text-green-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideHome className="w-4 h-4 inline mr-2" />
                    Home
                  </Link>
                  <Link
                    href="/projects"
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/projects')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideTrendingUp className="w-4 h-4 inline mr-2" />
                    Explore Projects
                  </Link>
                  <Link
                    href="/calculator"
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/calculator')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LucideTrendingUp className="w-4 h-4 inline mr-2" />
                    Investment Calculator
                  </Link>
                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/about')
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-yellow-600 dark:text-yellow-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    About
                  </Link>
                </>
              )}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-3 mb-3">
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {darkMode ? 
                      <>
                        <LucideSun className="w-5 h-5 text-amber-500 mr-2" />
                        <span className="text-sm">Light Mode</span>
                      </> : 
                      <>
                        <LucideMoon className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm">Dark Mode</span>
                      </>
                    }
                  </button>
                </div>
                
                {user ? (
                  <>
                    <div className="flex items-center px-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user.displayName || user.email}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Solar Investor</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                    >
                      <LucideLogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/auth/login"
                      onClick={closeMobileMenu}
                      className="block w-full text-center text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-300 dark:border-gray-600"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={closeMobileMenu}
                      className="block w-full text-center bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
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

  // Check if this is a page that needs full-screen treatment
  const isFullScreenPage = pathname === "/" || pathname === "/landing";

  if (isFullScreenPage) {
    return (
      <html lang="en">
        <body className="bg-gradient-to-br from-green-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20 text-gray-900 dark:text-gray-100 min-h-screen">
          <AuthProvider>
            <NavContent />
            {/* Full-screen content without padding/margins */}
            {children}
          </AuthProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-green-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20 text-gray-900 dark:text-gray-100 min-h-screen">
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