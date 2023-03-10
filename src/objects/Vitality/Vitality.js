import * as PIXI from "pixi.js";
import { AnimatedSprite, Point } from "pixi.js";
import { configFrames } from "./configFrame";

export class Vitality {
  constructor(x, y) {
    

    const vitality = new PIXI.Spritesheet(
      PIXI.BaseTexture.from("vitality"),
      configFrames
    );

    vitality.parse();

    const anim = new AnimatedSprite(vitality.animations.life);
    anim.animationSpeed = 0.1;
    anim.loop = false;
    anim.position = new Point(x, y);

    this.vitality = anim;
    this.anim = anim;
  }

  damage() {
    this.anim.play();
  }
}
