import { Container } from "pixi.js";
import { Vitality } from "./Vitality/Vitality";

export class VitalityBar {
  constructor(x, y, lifes) {
    this.x = x - 130;
    this.y = y - 45;
    this.lifes = lifes;

    const vitalitys = this.generateVitalitys();
    const renderVitality = vitalitys.map((vitality) => vitality.anim);

    this.vitalitys = vitalitys;
    this.renderVitality = renderVitality;
  }

  damage() {
    if (this.lifes !== 0) {
      this.vitalitys[this.lifes - 1].damage();
      this.lifes -= 1;
    }
  }

  generateVitalitys() {
    const vitalitys = [];

    for (let i = 0; i < 3; i++) {
      vitalitys.push(new Vitality(this.x + i * 25, this.y));
    }

    return vitalitys;
  }
}
