import { Button } from "@pixi/ui";
import { Timer } from "eventemitter3-timer";
import { BaseTexture, Container, Point, Sprite, Spritesheet } from "pixi.js";
import { Clicker } from "../objects/Clicker";
import { Combo } from "../objects/Combo";
import { Enemy } from "../objects/Enemy";
import { Power } from "../powers/Power";
import { Background } from "../objects/Background";
import { Speed } from "../powers/Speed";
import { randomNumber } from "../utils/randomNumber";
import { setCursorScreen } from "../utils/setCursorScreen";

export class Zen {
  constructor(app) {
    this.app = app;
    setCursorScreen(false)
    this.createWorld();
  }

  createBackground() {
    this.bg = new Background().bg;
    this.secondary.addChild(this.bg);
    this.secondary.addChild(this.combo.text);
    this.secondary.addChild(this.speedPower.sprite);
  }

  createClicker() {
    this.container.addChild(this.clicker.clickerSprite);
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
    this.secondary.addChild(enemy.body);
    this.secondary.addChild(enemy.positionExplosion);
  }

  createWorld() {
    this.container = new Container();
    this.secondary = new Container();
    this.container.sortChildren();
    this.secondary.sortChildren();
    this.container.addChild(this.secondary);

    this.enemys = [];
    this.life = 3;
    this.isSpawnEnemys = true;
    this.globalDy = 1;

    const power = new Power(this.app, this);
    const speedPower = new Speed(12, window.innerHeight - 76, power);
    const combo = new Combo();
    const clicker = new Clicker(this.app, this);
    const timerSpawnEnemy = new Timer(400);
    timerSpawnEnemy.loop = true;

    this.combo = combo;
    this.power = power;
    this.speedPower = speedPower;
    this.clicker = clicker;
    this.combo.text.x = 32;

    this.createBackground();
    this.createClicker();

    window.addEventListener("keydown", (e) => {
      if (e.key === "1") {
        this.power.slowTime();
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
