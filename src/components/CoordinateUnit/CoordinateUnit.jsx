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
            <Image src="/assets/Plot_Logo_Black.svg" height={30} width={30} />

            <p>{children}</p>
          </div>
        </div>
        <div className={styles.backCard}>
          <ul>
            <li>Longitude: 25</li>
            <li>Latitude: -5</li>
            <li>Quadrant: 1</li>
            <li>
              <a href="https://www.polygonscan.com">Polygonscan</a>
            </li>
            <li>
              <a href="https://www.opensea.com">Opeansea</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoordinateUnit;
