import React, {useEffect} from 'react';
import * as PIXI from 'pixi.js';
import Keyboard from './keyboard.js';
import {couldStartTrivia} from 'typescript';

function ViewportTest() {
  useEffect(() => {
    const Application = PIXI.Application,
      Container = PIXI.Container,
      loader = PIXI.Loader.shared,
      resources = PIXI.Loader.shared.resources,
      renderer = PIXI.AbstractRenderer,
      Sprite = PIXI.Sprite;

    const app = new Application({
      width: 512,
      height: 512,
      antialias: true,
      transparent: false,
      resolution: 1,
      backgroundColor: '#012d0',
    });

    document.body.appendChild(app.view);

    //Texture Asset들 로드
    loader
      .add('assets/test_background.png')
      .add('assets/test_player.png')
      .add('assets/test_viewport.png')
      .load(setup);

    function setup() {
      const camera = new Container();

      //배경 만들기
      const background = new Container();
      const background_sprite = new Sprite(
        resources['assets/test_background.png'].texture,
      );
      background.addChild(background_sprite);
      background.x = app.screen.width / 2;
      background.y = app.screen.width / 2;
      background.pivot.x = background.width / 2;
      background.pivot.y = background.height / 2;
      background.addChild(background_sprite);

      //플레이어 만들기
      const player = new Container();
      const player_sprite = new Sprite(
        resources['assets/test_player.png'].texture,
      );
      player.x = app.screen.width / 2;
      player.y = app.screen.height / 2;
      player.pivot.x = player.width / 2;
      player.pivot.y = player.height / 2;
      player.addChild(player_sprite);

      // const viewport = new Container();
      // const viewport_sprite = new Sprite(
      //   resources['assets/test_viewport.png'].texture,
      // );
      // viewport.addChild(viewport_sprite);
      // viewport.position.set(app.screen.width / 2, app.screen.height / 2);
      // viewport.pivot.copyFrom(player.position);
      camera.addChild(background);
      camera.addChild(player);
      // app.stage.addChild(background);
      // app.stage.addChild(viewport);
      // app.stage.addChild(player);

      let mapRect = new PIXI.Rectangle();
      mapRect.x = camera.pivot.x - app.screen.width / 2;
      mapRect.y = camera.pivot.x - app.screen.height / 2;
      mapRect.width = app.screen.width;
      mapRect.height = app.screen.height;
      mapRect.pad(400, 400); // -this line was updated
      // camera.addChild(mapRect);
      camera.position.set(app.screen.width / 2, app.screen.height / 2);
      camera.pivot.copyFrom(player.position);
      app.stage.addChild(camera);
      app.ticker.add(delta => {
        const targetPivot = player.position;
        camera.pivot.set(targetPivot);

        const newRect = new PIXI.Rectangle();
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

      //** 키보드에 따라 움직이게 만들기 **
      player.vx = 0;
      player.vy = 0;

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
      let state = move;
      //게임 시간 값
      let elapsed = 0.0;

      function gameLoop(delta) {
        //Update the current game state:
        state(delta);
      }

      function move(delta) {
        //Use the player's velocity to make it move
        if (player.x > 1024 || player.x < 0) player.x = 0;
        player.x += player.vx;
        player.y += player.vy;
      }
      //Start the game loop

      app.ticker.add(delta => gameLoop(delta));
    }
  });

  return <div></div>;
}

export default ViewportTest;
