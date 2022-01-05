/* eslint-disable react/react-in-jsx-scope */
import SocialMedia from "./SocialMedia/SocialMedia";
import styles from "./Footer.module.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>Follow Us</p>
      <SocialMedia />

      <p>&copy;Plot. {year}.</p>
    </footer>
  );
};

export default Footer;
