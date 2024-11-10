// src/components/Header.jsx
"use client"; // Necessary for client-side hooks like usePathname

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const Header = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">MyApp</Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/" className={isActive("/") ? styles.active : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={isActive("/about") ? styles.active : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className={isActive("/services") ? styles.active : ""}
            >
              Language
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={isActive("/contact") ? styles.active : ""}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
