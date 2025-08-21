import { Container } from "pixi.js";

export interface IGameObject extends Container {
  build(): void;

  update(dt: number): void;

  reset(): void;

  resize(): void;
}
