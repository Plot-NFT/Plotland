import * as React from "react";

import Image from "react-bootstrap/Image";

import styles from "./HeroBanner.module.scss";

const HeroBanner = () => {
  React.useEffect(() => {
    const logo = document.querySelector("img#logo");
    window.onkeydown = function (e) {
      if (e.code === "Space") {
        e.preventDefault();

        logo.classList.add("pin");

        setTimeout(() => {
          logo.classList.remove("pin");
        }, 1000);
      }
    };
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.logo}>
        <Image id="logo" src="/assets/Plot_Logo_Black.svg" alt="plot logo" />
      </div>

      <Image
        className={styles.triangle}
        src="/assets/single-triangle.png"
        alt="single triangle visual"
      />

      <Image
        className={styles.doubleTriangle}
        src="/assets/double-triangle.png"
        alt="double triangle visual"
      />

      <div className={styles.track}>
        <Image
          className={styles.land}
          src="/assets/track.png"
          alt="land visual"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
