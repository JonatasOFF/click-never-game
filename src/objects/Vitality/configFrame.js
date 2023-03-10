export const configFrames = {
  frames: {
    life: {
      frame: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    posDamage: {
      frame: { x: 32, y: 0, w: 32, h: 32 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
    noLife: {
      frame: { x: 64, y: 0, w: 32, h: 32 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    },
  },
  meta: {},
  animations: {
    life: ["life", "posDamage", "noLife"], //array of frames by name
  },
};
