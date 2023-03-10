import { Timer } from "eventemitter3-timer";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { Config } from "./game/Config";

export class Application {
  static getApp() {
    return this.app;
  }

  async run(config) {
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    this.config = config;
    this.app = new PIXI.Application({
      height: window.innerHeight,
      width: 1000,
    });

    await Assets.init({ manifest: config.manifest });

    document.body.appendChild(this.app.view);

    this.app.ticker.add((delta) => {
      Timer.timerManager.update(this.app.ticker.elapsedMS);
    });

    await Assets.loadBundle("game-screen");
    this.start();
  }

  start() {
    this.app.stage.interactive = true;
    this.scene = new this.config["startScene"](this.app);
  }
}

new Application().run(Config);
