import React, { useEffect, useRef, useState } from "react";
import Camera from "../components/Camera";
import Character from "../components/Character";
import Corner from "../components/Corner";
import useMove from "../hook/useMove";

const Frame = () => {
  const { step, mapRef, characterRef } = useMove();

  useEffect(() => {
    step();
  }, []);

  return (
    <div className="frame">
      <Corner />
      <Camera mapRef={mapRef}>
        <Character characterRef={characterRef} />
        {/* <ButtonLayout /> */}
      </Camera>
    </div>
  );
};

export default Frame;
