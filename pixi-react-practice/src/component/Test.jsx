import React, {useEffect} from 'react';
import * as PIXI from 'pixi.js';
import {randomInt} from 'crypto';
import Keyboard from './keyboard.js';

function Test() {
  useEffect(() => {
    const Application = PIXI.Application,
      Container = PIXI.Container,
      loader = PIXI.Loader.shared,
      resources = PIXI.Loader.shared.resources,
      renderer = PIXI.AbstractRenderer,
      Sprite = PIXI.Sprite;

    const app = new Application({
      width: 1024,
      height: 1024,
      antialias: true,
      transparent: false,
      resolution: 1,
      backgroundColor: '#000000',
    });

    document.body.appendChild(app.view);

    //Texture Asset들 로드
    loader
      .add('assets/bunny_head.png')
      .add('assets/bunny_body.png')
      .add('assets/bunny_arm.png')
      .add('assets/background.png')
      .load(setup);

    function setup() {
      //플레이어 만들기
      const player = new Container();
      player.x = app.screen.width / 2;
      player.y = app.screen.height / 2;
      player.pivot.x = player.width / 2;
      player.pivot.y = player.height / 2;

      //플레이어 스프라이트(머리,몸,팔다리) 생성
      const head = new Sprite(resources['assets/bunny_head.png'].texture);
      const body = new Sprite(resources['assets/bunny_body.png'].texture);
      const leftArm = new Sprite(resources['assets/bunny_arm.png'].texture);
      const rightArm = new Sprite(resources['assets/bunny_arm.png'].texture);
      const leftLeg = new Sprite(resources['assets/bunny_arm.png'].texture);
      const rightLeg = new Sprite(resources['assets/bunny_arm.png'].texture);

      player.addChild(leftArm);
      player.addChild(leftLeg);
      player.addChild(body);
      player.addChild(rightArm);
      player.addChild(rightLeg);
      player.addChild(head);

      head.anchor.set(0.45, 0.95);

      body.anchor.set(0.5, 0);

      leftArm.anchor.set(0.5, 0.2);
      leftArm.position.set(8, 5);

      leftLeg.anchor.set(0.5, 0.2);
      leftLeg.position.set(9, 42);

      rightArm.anchor.set(0.5, 0.2);
      rightArm.position.set(-8, 5);

      rightLeg.anchor.set(0.5, 0.2);
      rightLeg.position.set(-8, 42);

      player.vx = 0;
      player.vy = 0;

      //Map 컨테이너 생성
      const map = new Container();

      //배경 스프라이트 생성
      const background = new Sprite(resources['assets/background.png'].texture);

      //배경 컨테이너에 추가
      map.addChild(background);

      //카메라 컨테이너 만들기
      const camera = new Container();
      camera.position.set(app.screen.width / 2, app.screen.height / 2);
      camera.pivot.copyFrom(player.position);

      //EVERY FRAME

      app.ticker.add(() => {
        let targetPivot = player.position;

        //LERP IT, dt is something between 0 and 1.
        // i use dt = 1 - Math.exp(-deltaInMillis / 100);
        // or you can just assign targetpivot to pivot
        // camera.pivot.x = (targetPivot.x - camera.pivot.x) * dt + camera.pivot.x;
        camera.pivot.x = targetPivot.x - camera.pivot.x + camera.pivot.x;
        camera.pivot.y = targetPivot.y - camera.pivot.y + camera.pivot.y;

        //big square

        let mapRect = new PIXI.Rectangle();
        mapRect.x = camera.pivot.x - app.screen.width / 2;
        mapRect.y = camera.pivot.x - app.screen.height / 2;
        mapRect.width = app.screen.width;
        mapRect.height = app.screen.height;
        mapRect.pad(400, 400); // -this line was updated

        //every time camera changes position

        let newRect = new PIXI.Rectangle();
        newRect.x = camera.pivot.x - app.screen.width / 2;
        newRect.y = camera.pivot.x - app.screen.height / 2;
        newRect.width = app.screen.width;
        newRect.height = app.screen.height;
        if (
          newRect.x < mapRect.x ||
          newRect.right > mapRect.right ||
          newRect.y < mapRect.y ||
          newRect.bottom > mapRect.bottom
        ) {
          mapRect = newRect;
          //ADJUST THE BACKGROUND AND STUFF
          //CLEAR AND FILL THE TILEMAP: https://github.com/pixijs/pixi-tilemap
        }
      });

      //스테이징 단계
      app.stage.addChild(map);
      app.stage.addChild(player);
      app.stage.addChild(camera);

      //** 키보드에 따라 움직이게 만들기 **

      //키보드 추가
      const left = Keyboard(37),
        up = Keyboard(38),
        right = Keyboard(39),
        down = Keyboard(40);

      //Left arrow key `press` method
      left.press = () => {
        player.vx -= 5;
        player.scale.x = -1;
      };

      left.release = () => {
        player.vx += 5;
      };

      up.press = () => {
        player.vy -= 5;
      };
      up.release = () => {
        player.vy += 5;
      };

      right.press = () => {
        player.vx += 5;
        player.scale.x = 1;
      };
      right.release = () => {
        player.vx -= 5;
      };

      down.press = () => {
        player.vy += 5;
      };
      down.release = () => {
        player.vy -= 5;
      };

      //게임 상태
      let state = stand;
      //게임 시간 값
      let elapsed = 0.0;

      function gameLoop(delta) {
        //Update the current game state:
        if (left.isDown || right.isDown || up.isDown || down.isDown) {
          state = move;
          rightLeg.angle = 0;
          rightArm.angle = 0;
          leftLeg.angle = 0;
          leftArm.angle = 0;
          head.angle = 0;
        } else {
          state = stand;
          rightLeg.angle = 0;
          rightArm.angle = 0;
          leftLeg.angle = 0;
          leftArm.angle = 0;
          head.angle = 0;
        }
        state(delta);
      }

      function move(delta) {
        //Use the player's velocity to make it move
        if (player.x > 1024 || player.x < 0) player.x = 0;
        player.x += player.vx;
        player.y += player.vy;

        playerMoveGesture(delta);
      }

      function stand(delta) {
        playerStandGesture(delta);
      }
      // function stand(delta) {}
      //Ticker 추가 토끼 팔흔드는 Ticker 추가

      function playerMoveGesture(delta) {
        elapsed += delta;
        rightLeg.angle += Math.cos(elapsed / 5.0) * 20 * delta;
        rightArm.angle -= Math.cos(elapsed / 5.0) * 30 * delta;
        leftLeg.angle -= Math.cos(elapsed / 5.0) * 20 * delta;
        leftArm.angle += Math.cos(elapsed / 5.0) * 30 * delta;
        head.angle += Math.cos(elapsed / 5.0) * 4 * delta;
      }

      function playerStandGesture(delta) {
        elapsed += delta;
        // rightLeg.angle += Math.cos(elapsed / 10.0) * 5 * delta;
        rightArm.angle -= Math.cos(elapsed / 15.0) * 20 * delta;
        // leftLeg.angle -= Math.cos(elapsed / 10.0) * 5 * delta;
        leftArm.angle += Math.cos(elapsed / 15.0) * 20 * delta;
        head.angle += Math.cos(elapsed / 15) * delta;
      }
      //Start the game loop
      app.ticker.add(delta => gameLoop(delta));
    }
  });

  return <div></div>;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export default Test;
