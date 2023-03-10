import { BaseTexture, Point, Sprite, Spritesheet, Text } from "pixi.js";
import { configFrames } from "./configFrame";

export class Speed {
  constructor(x, y, power) {
    this.power = power;

    const speedSpritesheet = new Spritesheet(
      BaseTexture.from("speed"),
      configFrames
    );
    speedSpritesheet.parse();

    const sprite = new Sprite(speedSpritesheet.textures["power"]);
    const text = new Text('1', {
      fill: 0xffffff
    })
    text.x = 5;
    text.y = 0;
    
    sprite.addChild(text)

    sprite.interactive = true;
    sprite.buttonMode = true;

    sprite.position = new Point(x, y);
    this.textures = speedSpritesheet.textures;
    this.sprite = sprite;
    
    this.onClick();
    this.mouseHover();
  }

  onClick() {
    
    this.sprite.on("mousedown", () => {
      
      this.power.slowTime();
    });
  }

  mouseHover() {
    this.sprite.on("mouseover", () => {
      this.sprite.texture = this.textures["hover"];
    });

    this.sprite.on("mouseout", () => {
      this.sprite.texture = this.textures["power"];
    });
  }
}
