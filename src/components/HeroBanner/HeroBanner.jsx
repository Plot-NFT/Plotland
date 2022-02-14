import * as React from "react";

import Image from "react-bootstrap/Image";

import styles from "./HeroBanner.module.scss";

const HeroBanner = () => {
  const [animate, setAnimate] = React.useState(false);
  React.useEffect(() => {
    let isAnimating = false;
    const logo = document.querySelector("img#logo");

    logo.addEventListener("click", () => {
      if (!animate) {
        setAnimate(true);
      }

      animateLogo();
    });

    const animateLogo = () => {
      if (!isAnimating) {
        logo.classList.add("pin");
        isAnimating = true;

        setTimeout(() => {
          logo.classList.remove("pin");
          isAnimating = false;
        }, 1000);
      }
    };

    window.onkeydown = function (e) {
      if (e.code === "Space") {
        e.preventDefault();

        if (!animate) {
          setAnimate(true);
        }

        animateLogo();
      }
    };

    animateLogo();
  }, [animate]);

  return (
    <div className={styles.hero}>
      {!animate && <p className={styles.info}>Press space to start!</p>}
      {!animate && <p className={styles.infoMobile}>Tap icon to start!</p>}

      <div className={styles.logo}>
        <Image id="logo" src="/assets/Plot_Logo_Black.svg" alt="plot logo" />
      </div>

      <Image
        className={`${styles.triangle} ${animate ? styles.animate : ""}`}
        src="/assets/single-triangle.png"
        alt="single triangle visual"
      />

      <Image
        className={`${styles.doubleTriangle} ${animate ? styles.animate : ""}`}
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
