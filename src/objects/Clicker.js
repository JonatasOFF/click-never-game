import { Emitter } from "@pixi/particle-emitter";
import { Timer } from "eventemitter3-timer";
import * as PIXI from "pixi.js";
import { Assets, Rectangle } from "pixi.js";
import { VitalityBar } from "./VitalityBar";

export class Clicker {
  constructor(app, game) {
    this.app = app;
    this.game = game;
    this.clickerSprite = new PIXI.Sprite(Assets.get("clicker"));
    this.clickerSprite.interactive = false;
    this.clickerSprite.interactiveChildren = false;
    this.isClickerDown = false;
    this.isSpeed = false;

    const vitalityBar = new VitalityBar(150, 50, 3);

    this.vitalityBar = vitalityBar;

    this.clickerSprite.addChild(...vitalityBar.renderVitality);

    this.clickerSprite.hitArea = new Rectangle(0, 0, 0, 0);

    this.app.stage.on("pointermove", (e) => {
      const [mouseX, mouseY] = [e.data.global.x, e.data.global.y];

      this.updatePosition(mouseX, mouseY);
    });

    this.app.stage.on("pointerdowncapture", (e) => {
      const [mouseX, mouseY] = [e.data.global.x, e.data.global.y];

      this.updatePosition(mouseX, mouseY);
    });
  }

  updatePosition(x, y) {
    this.clickerSprite.position = new PIXI.Point(x, y);
  }

  speed() {
    const emitter = new Emitter(this.game.secondary, {
      lifetime: {
        min: 1,
        max: 1,
      },
      autoUpdate: true,
      frequency: 0.1,
      spawnChance: 1,
      emitterLifetime: 1,
      particlesPerWave: 1,
      emitterLifetime: 0,
      maxParticles: 100,
      pos: {
        x: 0,
        y: 0,
      },

      behaviors: [
        {
          type: "alpha",
          config: {
            alpha: {
              list: [
                {
                  value: 0.3,
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
          type: "spawnShape",
          config: {
            type: "torus",
            data: {
              x: 12,
              y: 12,
              radius: 0,
            },
          },
        },
        { type: "textureSingle", config: { texture: Assets.get("clicker") } },
      ],
    });
    

    const speedTimer = new Timer(100);
    this.speedTimer = speedTimer;
    speedTimer.loop = true;

    this.isSpeed = true;

    speedTimer.on("repeat", () => {
      emitter.playOnceAndDestroy();
      emitter.updateSpawnPos(this.clickerSprite.position.x, this.clickerSprite.position.y);
    });

    speedTimer.on("end", () => {
      emitter.destroy();
    });

    this.emitter = emitter;
    speedTimer.start();
  }

  speedStop() {
    this.speedTimer.stop();
    this.emitter.destroy();
  }
}
