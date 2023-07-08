import bg from "./src/sprites/bg.png";
import bgSky from "./src/sprites/bg-sky.png";
import clicker from "./src/sprites/clicker.png";
import vitality from "./src/sprites/vitality.png";
import gameover from "./src/sprites/gameover.png";
import speed from "./src/sprites/speed.png";
import play from "./src/sprites/play.png";
import enemy1 from "./src/sprites/enemy1.png";
export const manifest = {
  bundles: [
    {
      name: "game-screen",
      assets: [
        {
          name: "clicker",
          srcs: clicker,
        },
        {
          name: "bg",
          srcs: bg,
        },
        {
          name: "enemy1",
          srcs: enemy1,
        },
        {
          name: "bg-sky",
          srcs: bgSky,
        },
        {
          name: "vitality",
          srcs: vitality,
        },
        {
          name: "gameover",
          srcs: gameover,
        },
        {
          name: "speed",
          srcs: speed,
        },
        {
          name: "play",
          srcs: play,
        },
      ],
    },
  ],
};
