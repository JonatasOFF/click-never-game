import bg from "./src/sprites/bg.png";
import clicker from "./src/sprites/clicker.png";
import vitality from "./src/sprites/vitality.png";
import gameover from "./src/sprites/gameover.png";
import speed from './src/sprites/speed.png'
import play from './src/sprites/play.png'
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
