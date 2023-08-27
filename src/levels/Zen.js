import { Button } from "@pixi/ui";
import { Timer } from "eventemitter3-timer";
import { BaseTexture, Container, Point, Sprite, Spritesheet } from "pixi.js";
import { Clicker } from "../objects/Clicker";
import { Combo } from "../objects/Combo";
import { Enemy } from "../objects/Enemy";
import { Speed } from "../powers/Speed";
import { Background } from "../objects/Background";
import { randomNumber } from "../utils/randomNumber";
import { setCursorScreen } from "../utils/setCursorScreen";

export class Zen {
  constructor(app) {
    this.app = app;
    setCursorScreen(false);
    this.createWorld();
  }

  createBackground() {
    this.bg = new Background().bg;
    this.bg.zIndex = 9;
    this.combo.text.zIndex = 9999;
    this.speed.powerDisplay.zIndex = 9999;
    this.secondary.addChild(this.bg);
    this.secondary.addChild(this.combo.text);
    this.secondary.addChild(this.speed.powerDisplay);
    this.secondary.sortChildren();
  }

  createClicker() {
    this.clicker.clickerSprite.zIndex = 999
    this.container.addChild(this.clicker.clickerSprite);
    this.container.sortChildren()
  }

  createSpawnEnemy() {
    if (this.spawnEnemys) return;

    const randomAreaX = randomNumber(this.secondary.width - 60);
    const areaY = -50;
    const enemy = new Enemy(
      randomAreaX,
      areaY,
      this.globalDy,
      () => this.onMissClick(),
      () => this.onHit()
    );

    this.enemys.push(enemy);
    enemy.body.zIndex = 999
    enemy.positionExplosion.zIndex = 9
    this.secondary.addChild(enemy.body);
    this.secondary.addChild(enemy.positionExplosion);
    this.secondary.sortChildren()
  }

  createWorld() {
    this.container = new Container();
    this.secondary = new Container();
    this.container.addChild(this.secondary);
    this.container.sortChildren();
    this.secondary.sortChildren();

    this.enemys = [];
    this.life = 3;
    this.isSpawnEnemys = true;
    this.globalDy = 1;

    const speed = new Speed(this.app, this, {
      x: 12,
      y: window.innerHeight - 76,
    });

    const combo = new Combo();
    const clicker = new Clicker(this.app, this);
    const timerSpawnEnemy = new Timer(400);
    timerSpawnEnemy.loop = true;

    this.combo = combo;
    this.speed = speed;
    this.clicker = clicker;
    this.combo.text.x = 32;

    this.createBackground();
    this.createClicker();

    window.addEventListener("keydown", (e) => {
      if (e.key === "1") {
        this.speed.slowTime();
      }

      if (e.key === "2") {
        this.reset();
      }
    });

    timerSpawnEnemy.on("repeat", () => {
      this.createSpawnEnemy();
    });

    timerSpawnEnemy.start();

    this.app.stage.addChild(this.container);
  }

  onMissClick() {
    this.clicker.vitalityBar.damage();
    this.combo.reset();

    const isDead = this.clicker.vitalityBar.lifes === 0;

    if (isDead) {
      this.spawn = false;
      this.onModalDead();
    }
  }

  onModalDead() {
    const modalX = this.secondary.width / 2 - 200;
    const modalY = window.innerHeight / 2 - 100;

    const shet = new Spritesheet(BaseTexture.from("gameover"), {
      frames: {
        enemy1: {
          frame: { x: 0, y: 0, w: 300, h: 80 },
        },
        enemy2: {
          frame: { x: 0, y: 80, w: 45, h: 30 },
        },
      },
      meta: {},
    });

    shet.parse();
    const modal = new Sprite(shet.textures["enemy1"]);
    const buttonSprite = new Sprite(shet.textures["enemy2"]);

    buttonSprite.position = new Point(5, 20);
    const button = new Button(buttonSprite);

    button.onPress.connect(() => {
      this.reset();
    });

    modal.addChild(button.view);
    modal.position = new Point(modalX, modalY);
    this.secondary.addChild(modal);
  }

  onHit() {
    this.combo.increment();
  }

  reset() {
    this.container.destroy();
    this.createWorld();
  }
}
