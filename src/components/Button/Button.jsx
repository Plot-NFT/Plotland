/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import styles from "./Button.module.scss";

const Button = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default Button;
