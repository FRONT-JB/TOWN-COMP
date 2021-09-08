import { useEffect, useRef, useState } from "react";
import { CURRENT_DIRECTIONS, PRESS_KEYS, LIMIT_VALUES } from "../constant";

const useMove = () => {
  const [direction, setDirection] = useState([]);
  const characterRef = useRef(null);
  const mapRef = useRef(null);
  const speedRef = useRef(1);
  const xRef = useRef(90);
  const yRef = useRef(34);

  const handleCharacter = () => {
    const heldDirection = direction[0];
    const pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--pixel-size"
      )
    );

    if (heldDirection) {
      if (heldDirection === CURRENT_DIRECTIONS.right) {
        xRef.current = xRef.current + speedRef.current;
      }

      if (heldDirection === CURRENT_DIRECTIONS.left) {
        xRef.current = xRef.current - speedRef.current;
      }

      if (heldDirection === CURRENT_DIRECTIONS.down) {
        yRef.current = yRef.current + speedRef.current;
      }

      if (heldDirection === CURRENT_DIRECTIONS.up) {
        yRef.current = yRef.current - speedRef.current;
      }
      characterRef?.current?.setAttribute("facing", heldDirection);
    }
    characterRef?.current?.setAttribute(
      "walking",
      heldDirection ? "true" : "false"
    );

    const CAMERA_LEFT = pixelSize * 66;
    const CAMERA_TOP = pixelSize * 42;

    if (xRef.current < LIMIT_VALUES.left) {
      xRef.current = LIMIT_VALUES.left;
    }

    if (xRef.current > LIMIT_VALUES.right) {
      xRef.current = LIMIT_VALUES.right;
    }

    if (yRef.current < LIMIT_VALUES.top) {
      yRef.current = LIMIT_VALUES.top;
    }

    if (yRef.current > LIMIT_VALUES.bottom) {
      yRef.current = LIMIT_VALUES.bottom;
    }

    mapRef.current.style.transform = `translate3d( ${
      -xRef.current * pixelSize + CAMERA_LEFT
    }px, ${-yRef.current * pixelSize + CAMERA_TOP}px, 0 )`;
    characterRef.current.style.transform = `translate3d( ${
      xRef.current * pixelSize
    }px, ${yRef.current * pixelSize}px, 0 )`;
  };

  const step = () => {
    handleCharacter();
    window.requestAnimationFrame(() => {
      step();
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      const dir = PRESS_KEYS[e.which];
      if (dir && direction?.indexOf(dir) === -1) {
        const newDirection = direction.unshift(dir);
        setDirection(newDirection);
      }
    });

    document.addEventListener("keyup", (e) => {
      const dir = PRESS_KEYS[e.which];
      const index = direction.indexOf(dir);
      if (index > -1) {
        const newDirection = direction.splice(index, 1);
        setDirection(newDirection);
      }
    });
  }, []);

  return { step, mapRef, characterRef };
};

export default useMove;
