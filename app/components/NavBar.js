"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLogged = document.cookie.includes("isLoggedIn=true");
    setLoggedIn(isLogged);
  }, [pathname]);

  return (
    <nav style={styles.nav}>
      <div style={styles.links}>
        <Link href="/home" style={linkStyle(pathname, "/home")}>Home</Link>
        <Link href="/dashboard" style={linkStyle(pathname, "/dashboard")}>Dashboard</Link>
        <Link href="/proposte" style={linkStyle(pathname, "/proposte")}>Proposte</Link>
        <Link href="/radar" style={linkStyle(pathname, "/radar")}>Radar</Link>
        <Link href="/crypto" style={linkStyle(pathname, "/crypto")}>Crypto</Link>
        <Link href="/segnali-wall-street" style={linkStyle(pathname, "/segnali-wall-street")}>Segnali Wall Street</Link>
      </div>

      <div style={styles.right}>
        {loggedIn ? (
          <form action="/logout" method="POST">
            <button type="submit" style={styles.button}>Logout</button>
          </form>
        ) : (
          <>
            <Link href="/login" style={styles.button}>LOG IN</Link>
            <Link href="/signup" style={styles.button}>SIGN IN</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    alignItems: "center",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  right: {
    display: "flex",
    gap: "20px",
  },
  button: {
    color: "#fff",
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "none",
  },
};

function linkStyle(pathname, target) {
  return {
    color: pathname === target ? "#00bfff" : "#fff",
    fontSize: "16px",
    textDecoration: pathname === target ? "underline" : "none",
  };
}

