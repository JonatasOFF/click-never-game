export const configFrames = {
  frames: {
    power: {
      frame: { x: 0, y: 0, w: 64, h: 64 },
      sourceSize: { w: 64, h: 64 },
      spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
    },
    hover: {
      frame: { x: 64, y: 0, w: 64, h: 64 },
      sourceSize: { w: 64, h: 64 },
      spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
    }
  },
  meta: {},
  animations: {
    life: ["power", "hover"], //array of frames by name
  },
};
