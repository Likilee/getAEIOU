import React, {useEffect} from 'react';
import * as PIXI from 'pixi.js';

function Scene(): JSX.Element {
  const app = new PIXI.Application({backgroundColor: 0x1099bb});

  useEffect(() => {
    document.body.appendChild(app.view);
  });
  return (
  );
}

export default Scene;
