import { Container } from "pixi.js";

export interface IGameObject extends Container {
  buildObject(): void;

  update(dt: number): void;

  reset(): void;

  resize(): void;
}
