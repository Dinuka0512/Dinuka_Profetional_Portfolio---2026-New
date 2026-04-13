"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.png";

const inter = Inter({
  subsets: ["latin"],
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Me", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Service", href: "#service" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed z-10 opacity-95 w-full px-6 md:px-10 py-5 flex items-center justify-between text-white bg-[#101010]">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" onClick={closeMenu}>
          <Image src={logo} alt="logo" width={120} height={40} className="cursor-pointer" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul
        className={`${inter.className} hidden md:flex gap-8 text-sm uppercase tracking-wide`}
      >
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="hover:text-gray-400 transition-colors duration-200 cursor-pointer"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu (overlay/slide-in) */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-64 bg-[#101010] shadow-lg z-20 transition-transform duration-300 ease-in-out md:hidden pt-20 px-6`}
      >
        <ul className={`${inter.className} flex flex-col gap-6 text-sm uppercase tracking-wide`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="block hover:text-gray-400 transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay when mobile menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
}