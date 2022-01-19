import * as React from "react";

import Image from "react-bootstrap/Image";

import styles from "./HeroBanner.module.scss";

const HeroBanner = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.logo}>
        <Image src="/assets/Plot_Logo_Black.svg" alt="plot logo" />
      </div>

      <div className={styles.track}>
        <Image src="/assets/track-1.png" alt="land visual" />
      </div>

      {/* <div className={styles.track2}>
        <Image src="/assets/track-3.png" alt="land visual" />
      </div> */}
    </div>
  );
};

export default HeroBanner;
