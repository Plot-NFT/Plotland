/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import styles from "./Container.module.scss";

const Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
