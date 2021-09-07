import React from 'react';

const Character = ({ characterRef }) => {
  return (
    <div ref={characterRef} className='character' facing='down'>
      <div className='shadow pixel-art'></div>
      <div className='character_spritesheet pixel-art'></div>
    </div>
  );
};

export default Character;
