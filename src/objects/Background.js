import { Timer } from "eventemitter3-timer";
import { Assets, Point, Sprite, TilingSprite } from "pixi.js";

export class Background {
  constructor(x, y) {
    this.bg = new TilingSprite(Assets.get("bg"));
    this.bg.width = 1000;
    this.bg.height = window.innerHeight;
    

    this.movementBackground()
  }

  movementBackground() {
    const timer = new Timer(100);
    timer.loop = true;

    timer.on("start", () => {});

    timer.on("repeat", () => {
      
      this.bg.tilePosition.y += 0.5;
    });

    timer.start();
  }
}
