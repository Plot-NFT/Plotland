/* eslint-disable react/prop-types */
import * as React from "react";
import Image from "next/image";

import styles from "./CoordinateUnit.module.scss";

const CoordinateUnit = ({ children }) => {
  return (
    <div className={styles.flipCard}>
      <div className={styles.innerCard}>
        <div className={styles.frontCard}>
          <div>
            <Image
              src="/assets/Plot_Logo_Black.svg"
              alt="logo plotland"
              height={80}
              width={80}
            />

            <p>{children}</p>
          </div>
        </div>
        <div className={styles.backCard}>
          <div className={styles.backWrapper}>
            <Image
              src="/assets/Plot_Logo_Black.svg"
              alt="logo plotland"
              height={80}
              width={80}
            />

            <ul className="mt-3">
              <li>
                Longitude: <strong>25</strong>
              </li>
              <li>
                Latitude: <strong>-5</strong>
              </li>
              <li>
                Quadrant: <strong>1</strong>
              </li>
            </ul>

            <div className={styles.externalLink}>
              <a
                href="https://www.polygonscan.com"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/assets/matic.png"
                  alt="logo matic"
                  height={40}
                  width={40}
                />
              </a>

              <a href="https://www.opensea.io" target="_blank" rel="noreferrer">
                <Image
                  src="/assets/opensea.png"
                  alt="logo opensea"
                  height={40}
                  width={40}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinateUnit;
