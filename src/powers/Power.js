import { Timer } from "eventemitter3-timer";

export class Power {
  constructor(app, game) {
    this.app = app;
    this.game = game;
    this.isSlowTime = false;
  }

  slowTime() {
    
    if(this.isSlowTime) return;
    this.game.clicker.speed()
    
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
      this.game.clicker.speedStop()
    });
  }
}
