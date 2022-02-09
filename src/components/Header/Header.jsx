/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserSecret, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.scss";

const Header = () => {
  const { pathname } = useRouter();
  const [mobile, setMobile] = React.useState(false);

  return (
    <header className={styles.wrapper}>
      <div className={styles.header}>
        <Link href="/">
          <a>
            <img src="/assets/Plot_Logo_Black.svg" alt="Plot Logo" />
          </a>
        </Link>

        <nav className={styles.navigation}>
          <ul>
            <Link href="/">
              <a>
                <li className={pathname === "/" ? styles.active : ""}>Home</li>
              </a>
            </Link>

            <Link href="/roadmap">
              <a>
                <li className={pathname === "/roadmap" ? styles.active : ""}>
                  Roadmap
                </li>
              </a>
            </Link>

            <Link href="/resources">
              <a>
                <li className={pathname === "/resources" ? styles.active : ""}>
                  Resources
                </li>
              </a>
            </Link>
          </ul>
        </nav>

        <Link href="/profile">
          <a className={styles.profileButton}>
            <FaUserSecret size="2rem" />
          </a>
        </Link>

        <button onClick={() => setMobile(true)} className={styles.mobileMenu}>
          <FaBars size="2rem" />
        </button>

        <nav className={`${styles.navMobile} ${mobile ? styles.active : ""}`}>
          <button
            onClick={() => setMobile(false)}
            className={styles.mobileMenu}
          >
            <FaTimes size="2rem" />
          </button>

          <Link href="/profile">
            <a className={styles.profileButtonMobile}>
              <FaUserSecret size="2rem" />
            </a>
          </Link>

          <ul>
            <Link href="/">
              <a>
                <li className={pathname === "/" ? styles.active : ""}>Home</li>
              </a>
            </Link>

            <Link href="/roadmap">
              <a>
                <li className={pathname === "/roadmap" ? styles.active : ""}>
                  Roadmap
                </li>
              </a>
            </Link>

            <Link href="/resources">
              <a>
                <li className={pathname === "/resources" ? styles.active : ""}>
                  Resources
                </li>
              </a>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
