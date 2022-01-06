/* eslint-disable react/prop-types */
import * as React from "react";

import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

import styles from "./CoordinateUnit.module.scss";

const CoordinateUnit = ({ children }) => {
  const [show, setShow] = React.useState(false);
  const [target, setTarget] = React.useState(null);
  const ref = React.useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <>
      <div ref={ref}>
        <Button className={styles.button} onClick={handleClick}>
          {children}
        </Button>

        <Overlay
          show={show}
          target={target}
          placement="top"
          container={ref}
          containerPadding={20}
        >
          <Popover>
            <Popover.Header as="h3">View Details</Popover.Header>
            <Popover.Body className={styles.popover}>
              <ul>
                <li>Etherscan</li>
                <li>Opensea</li>
              </ul>
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>
    </>
  );
};

export default CoordinateUnit;
