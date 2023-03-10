import { Timer } from "eventemitter3-timer";
import { Assets, Text } from "pixi.js";

export class Combo {
  constructor() {
    this.count = 0;
    this.fontSize = 40;
    this.text = new Text(this.count, {
      fontSize: this.fontSize,
      lineHeight: 70,
      fill: 0xf5c944,
      align: "center",
      wordWrap: true,
      whiteSpace: "normal",
      padding: 50,
    });

    this.text.scale.set(1);
  }

  increment() {
    this.count += 1;
    this.animationCombo();
    this.text.text = this.count;
  }

  reset() {
    this.count = 0;
    this.text.text = this.count;
  }

  animationCombo() {
    const timerA = new Timer(1);
    const timerB = new Timer(1);

    timerA.repeat = 10;
    timerB.repeat = 10;

    timerB.on("repeat", () => {
      this.fontSize -= 0.8;

      this.text.style = {
        ...this.text.style,
        fontSize: this.fontSize,
      };
    });

    timerA.on("repeat", (e) => {
      this.fontSize += 0.8;
      this.text.style = {
        ...this.text.style,
        fontSize: this.fontSize,
      };
    });

    timerA.on("end", (e) => {
      timerB.start();
    });

    timerA.start();
  }
}
