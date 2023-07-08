import { Emitter } from "@pixi/particle-emitter";
import { Timer } from "eventemitter3-timer";
import * as PIXI from "pixi.js";
import { Graphics } from "pixi.js";
import { randomNumber } from "../utils/randomNumber";

export class Enemy {
  constructor(x, y, globalDy, onMissClick, onHit) {
    this.x = x;
    this.y = y;
    this.width = 45;
    this.height = 45;
    this.globalDy = globalDy;
    this.dy = 0 + globalDy;
    this.onMissClick = onMissClick;
    this.onHit = onHit;
    this.isDestroyed = false;

    this.buildWeakness();
    this.buildBody();
    this.buildTimerFalling();
    this.buildPositionExplosion();
  }

  destroy() {
    this.timerFall.remove();
    this.body.destroy();
    this.onHit();
    this.isDestroyed = true;
  }

  falling() {
    if (this.y + this.height > window.innerHeight) {
      this.destroy();
      return;
    }
    this.y += this.dy;
    this.updatePosition();
  }

  receiveDamage() {
    this.explosion();
  }

  missClick() {
    this.onMissClick();
  }

  buildBody() {
    const body = new PIXI.Sprite(PIXI.Assets.get("enemy1"));
    body.width = this.width;
    body.height = this.height;
    body.interactive = true;
    body.position = new PIXI.Point(this.x, this.y);

    body.on("pointerup", (e) => this.missClick());

    body.addChild(this.weakness);

    this.body = body;
  }

  buildPositionExplosion() {
    const randomPosition = new PIXI.Point(this.body.x, this.body.y);

    const positionExplosion = new Graphics();
    positionExplosion.position = randomPosition;

    this.positionExplosion = positionExplosion;
  }

  buildWeakness() {
    const weakness = new PIXI.Graphics();

    const randomPosition = new PIXI.Point(
      randomNumber(this.width / 2),
      randomNumber(this.height / 2)
    );

    weakness.interactive = true;

    weakness.beginFill(0xff9900, 0.1);
    weakness.drawRect(10, 10, this.width , this.height);

    weakness.on("pointerup", (e) => this.receiveDamage());

    this.weakness = weakness;
  }

  buildTimerFalling() {
    const timerFall = new Timer(1);
    timerFall.loop = true;
    timerFall.on("repeat", () => this.falling());
    timerFall.start();
    this.timerFall = timerFall;
  }

  updatePosition() {
    this.body.position.y = this.y;
    this.positionExplosion.position.y = this.y;
  }

  explosion() {
    const emitter = new Emitter(this.positionExplosion, {
      lifetime: {
        min: 0.5,
        max: 0.5,
      },
      autoUpdate: true,
      frequency: 0.1,
      spawnChance: 1,
      particlesPerWave: 99,
      emitterLifetime: 0.5,
      maxParticles: 100,
      pos: {
        x: 25,
        y: 25,
      },

      behaviors: [
        {
          type: "alpha",
          config: {
            alpha: {
              list: [
                {
                  value: 1,
                  time: 0,
                },
                {
                  value: 0,
                  time: 1,
                },
              ],
            },
          },
        },
        {
          type: "scale",
          config: {
            scale: {
              list: [
                {
                  value: 0.8,
                  time: 0,
                },
                {
                  value: 0,
                  time: 1,
                },
              ],
            },
          },
        },
        {
          type: "color",
          config: {
            color: {
              list: [
                {
                  value: "fb1010",
                  time: 0,
                },
                {
                  value: "f5b830",
                  time: 1,
                },
              ],
            },
          },
        },
        {
          type: "moveSpeed",
          config: {
            speed: {
              list: [
                {
                  value: 200,
                  time: 0,
                },
                {
                  value: 100,
                  time: 1,
                },
              ],
              isStepped: false,
            },
          },
        },
        {
          type: "rotationStatic",
          config: {
            min: 0,
            max: 360,
          },
        },
        {
          type: "spawnShape",
          config: {
            type: "torus",
            data: {
              x: 0,
              y: 0,
              radius: 10,
            },
          },
        },
        { type: "textureSingle", config: { texture: PIXI.Texture.WHITE } },
      ],
    });
    this.destroy();

    emitter.playOnceAndDestroy(() => {
      this.positionExplosion.destroy();
    });
  }
}
