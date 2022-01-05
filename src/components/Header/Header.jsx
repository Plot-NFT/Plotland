/* eslint-disable react/react-in-jsx-scope */
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.header}>
        <a href="/">
          <img src="/assets/Plot_Logo_Black.svg" alt="Plot Logo" />
        </a>
      </div>
    </header>
  );
};

export default Header;
