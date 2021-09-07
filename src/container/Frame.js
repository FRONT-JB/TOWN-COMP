import React, { useCallback, useEffect, useRef, useState } from 'react';
import Camera from '../components/Camera';
import Character from '../components/Character';
import Corner from '../components/Corner';
import { CURRENT_DIRECTIONS, PRESS_KEYS } from '../constant/index';

const Frame = () => {
  const [direction, setDirection] = useState([]);
  const speedRef = useRef(1);
  const characterRef = useRef(null);
  const xRef = useRef(90);
  const yRef = useRef(34);
  const mapRef = useRef(null);

  const handleCharacter = useCallback(() => {
    const heldDirection = direction[0];
    const pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--pixel-size'
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
      characterRef.current.setAttribute('facing', heldDirection);
    }
    characterRef.current.setAttribute(
      'walking',
      heldDirection ? 'true' : 'false'
    );

    const LEFT_LIMIT = -8;
    const RIGHT_LIMIT = 16 * 11 + 8;
    const TOP_LIMIT = -8 + 32;
    const BOTTOM_LIMIT = 16 * 7;
    const CAMERA_LEFT = pixelSize * 66;
    const CAMERA_TOP = pixelSize * 42;

    if (xRef.current < LEFT_LIMIT) {
      xRef.current = LEFT_LIMIT;
    }

    if (xRef.current > RIGHT_LIMIT) {
      xRef.current = RIGHT_LIMIT;
    }

    if (yRef.current < TOP_LIMIT) {
      yRef.current = TOP_LIMIT;
    }

    if (yRef.current > BOTTOM_LIMIT) {
      yRef.current = BOTTOM_LIMIT;
    }

    mapRef.current.style.transform = `translate3d( ${
      -xRef.current * pixelSize + CAMERA_LEFT
    }px, ${-yRef.current * pixelSize + CAMERA_TOP}px, 0 )`;
    characterRef.current.style.transform = `translate3d( ${
      xRef.current * pixelSize
    }px, ${yRef.current * pixelSize}px, 0 )`;
  }, [xRef, yRef]);

  const step = () => {
    handleCharacter();
    window.requestAnimationFrame(() => {
      step();
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      var dir = PRESS_KEYS[e.which];
      if (dir && direction?.indexOf(dir) === -1) {
        const newDirection = direction.unshift(dir);
        setDirection(newDirection);
      }
    });

    document.addEventListener('keyup', (e) => {
      var dir = PRESS_KEYS[e.which];
      var index = direction.indexOf(dir);
      if (index > -1) {
        const newDirection = direction.splice(index, 1);
        setDirection(newDirection);
      }
    });
  }, []);

  useEffect(() => {
    step();
  }, []);

  return (
    <>
      <Corner />
      <Camera mapRef={mapRef}>
        <Character characterRef={characterRef} />
        {/* <ButtonLayout /> */}
      </Camera>
    </>
  );
};

export default Frame;