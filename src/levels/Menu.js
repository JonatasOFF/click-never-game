import { Button } from "@pixi/ui";
import { Assets, Container, Point, Sprite } from "pixi.js";
import { Zen } from "./Zen";

export class Menu {
  constructor(app) {
    this.container = new Container();

    const buttonSprite = new Sprite(Assets.get("play"));

    buttonSprite.position = new Point(370, window.innerHeight / 2);
    const button = new Button(buttonSprite);

    button.onPress.connect(() => {
      this.modeZen();
    });

    this.container.addChild(button.view);
    this.app = app;
    this.app.stage.addChild(this.container);
  }

  modeZen() {
    const zen = new Zen(this.app);
    this.app.stage.addChild(zen.container);
  }
}
