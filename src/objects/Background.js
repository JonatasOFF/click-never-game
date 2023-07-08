import { Timer } from "eventemitter3-timer";
import { Assets, Point, Sprite, TilingSprite } from "pixi.js";

export class Background {
  constructor(x, y) {
    this.bg = new TilingSprite(Assets.get("bg"), 1000, window.innerHeight);
    this.bg.name = "background1";
    this.bg.tilePosition.set(0, window.innerHeight);

    this.movementBackground();
  }

  movementBackground() {
    const timer = new Timer(1);
    timer.loop = true;

    timer.on("start", () => {});

    timer.on("repeat", () => {
      this.bg.tilePosition.y += 0.5;
      if (
        this.bg.tilePosition.y >= window.innerHeight + 450 &&
        this.bg.name !== "background2"
      ) {
        this.updatebackground();
      }
    });

    timer.start();
  }

  updatebackground() {
    this.bg.texture = Assets.get("bg-sky");
    this.bg.name = "background2";
  }
}
