/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import styles from "./Counter.module.scss";

const Counter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className={styles.counterWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.counterBox}>
          <div className={styles.time}>{days}</div>

          <div className={styles.label}>Days</div>
        </div>

        <div className={styles.timeDivider}>:</div>

        <div className={styles.counterBox}>
          <div className={styles.time}> {hours}</div>

          <div className={styles.label}>Hours</div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.timeDividerHI}>:</div>

        <div className={styles.counterBox}>
          <div className={styles.time}>{minutes}</div>

          <div className={styles.label}>Minutes</div>
        </div>

        <div className={styles.timeDivider}>:</div>

        <div className={styles.counterBox}>
          <div className={styles.time}>{seconds}</div>
          <div className={styles.label}>Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
