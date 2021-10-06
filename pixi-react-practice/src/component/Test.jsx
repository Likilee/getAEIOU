import React, {useEffect} from 'react';
import * as PIXI from 'pixi.js';
import {randomInt} from 'crypto';

function Test() {
  useEffect(() => {
    const app = new PIXI.Application({
      width: 512,
      height: 512,
      antialias: true,
      transparent: false,
      resolution: 1,
    });
    document.body.appendChild(app.view);

    //토끼 머리,몸통,팔 텍스쳐 추가
    const texBunyHead = PIXI.Texture.from('assets/bunny_head.png');
    const texBunyBody = PIXI.Texture.from('assets/bunny_body.png');
    const texBunyArm = PIXI.Texture.from('assets/bunny_arm.png');

    //토끼 컨테이너 만들기
    const containerBunnys = new PIXI.Container();
    containerBunnys.x = app.screen.width / 2;
    containerBunnys.y = app.screen.height / 2;
    containerBunnys.pivot.x = containerBunnys.width / 2;
    containerBunnys.pivot.y = containerBunnys.height / 2;

    //스프라이트 생성
    const bunnyHead = new PIXI.Sprite(texBunyHead);
    const bunnyBody = new PIXI.Sprite(texBunyBody);
    const bunnyLeftArm = new PIXI.Sprite(texBunyArm);
    const bunnyRightArm = new PIXI.Sprite(texBunyArm);
    const bunnyLeftLeg = new PIXI.Sprite(texBunyArm);
    const bunnyRightLeg = new PIXI.Sprite(texBunyArm);

    containerBunnys.addChild(bunnyLeftArm);
    containerBunnys.addChild(bunnyLeftLeg);
    containerBunnys.addChild(bunnyBody);
    containerBunnys.addChild(bunnyRightArm);
    containerBunnys.addChild(bunnyRightLeg);
    containerBunnys.addChild(bunnyHead);

    bunnyHead.anchor.set(0.45, 0.95);

    bunnyBody.anchor.set(0.5, 0);

    bunnyLeftArm.anchor.set(0.5, 0.2);
    bunnyLeftArm.position.set(16, 10);

    bunnyLeftLeg.anchor.set(0.5, 0.2);
    bunnyLeftLeg.position.set(18, 85);

    bunnyRightArm.anchor.set(0.5, 0.2);
    bunnyRightArm.position.set(-16, 10);

    bunnyRightLeg.anchor.set(0.5, 0.2);
    bunnyRightLeg.position.set(-16, 85);

    app.stage.addChild(containerBunnys);
    let elapsed = 0.0;
    app.ticker.add(delta => {
      elapsed += delta;

      bunnyRightLeg.angle += Math.cos(elapsed / 5.0) * 5 * delta;
      bunnyRightArm.angle -= Math.cos(elapsed / 5.0) * 10 * delta;
      bunnyLeftLeg.angle -= Math.cos(elapsed / 5.0) * 5 * delta;
      bunnyLeftArm.angle += Math.cos(elapsed / 5.0) * 10 * delta;
      bunnyHead.angle += Math.cos(elapsed / 10.0) * 0.5 * delta;
    });
  });

  return <div></div>;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export default Test;
