import { Timer } from "eventemitter3-timer";
import { BaseTexture, Point, Sprite, Spritesheet, Text } from "pixi.js";
import { configFrames } from "./configFrame";

export class Speed {
  constructor(app, game, displayPowerPosition) {
    this.app = app;
    this.game = game;
    this.displayPowerPosition = displayPowerPosition;
    this.isSlowTime = false;
    this.powerDisplay = this.displayPower();
  }

  slowTime() {
    if (this.isSlowTime) return;
    this.game.clicker.speed();

    this.isSlowTime = true;
    this.game.globalDy = 0;
    this.game.spawn = false;
    this.game.enemys.forEach((element) => {
      element.dy = 0;
    });

    const timer = new Timer(5000);

    timer.start();

    timer.on("end", () => {
      this.game.globalDy = 1;
      this.isSlowTime = false;
      this.game.spawn = true;
      this.game.enemys.forEach((element) => {
        element.dy = 1;
      });
      this.game.clicker.speedStop();
    });
  }

  displayPower() {
    const { x, y } = this.displayPowerPosition;

    const speedSpritesheet = new Spritesheet(
      BaseTexture.from("speed"),
      configFrames
    );
    speedSpritesheet.parse();

    const sprite = new Sprite(speedSpritesheet.textures["power"]);
    const text = new Text("1", {
      fill: 0xffffff,
    });
    text.x = 5;
    text.y = 0;

    sprite.addChild(text);

    sprite.interactive = true;
    sprite.buttonMode = true;

    sprite.position = new Point(x, y);
    const textures = speedSpritesheet.textures;

    sprite.on("mousedown", () => {
      this.slowTime();
    });

    sprite.on("mouseover", () => {
      sprite.texture = textures["hover"];
    });

    sprite.on("mouseout", () => {
      sprite.texture = textures["power"];
    });

    return sprite;
  }
}
