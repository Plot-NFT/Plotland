/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import { FaUserSecret } from "react-icons/fa";
import styles from "./Header.module.scss";

const Header = () => {
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
                <li>Home</li>
              </a>
            </Link>

            <Link href="/roadmap">
              <a>
                <li>Roadmap</li>
              </a>
            </Link>

            <Link href="/resources">
              <a>
                <li>Resources</li>
              </a>
            </Link>
          </ul>
        </nav>

        <Link href="/profile">
          <a className={styles.profileButton}>
            <FaUserSecret size="2rem" />
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
