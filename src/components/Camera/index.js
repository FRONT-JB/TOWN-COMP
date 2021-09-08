import React from "react";

const Camera = ({ children, mapRef }) => {
  return (
    <div className="camera">
      <div ref={mapRef} className="map pixel-art">
        {children}
      </div>
    </div>
  );
};

export default Camera;
