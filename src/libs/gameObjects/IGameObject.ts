import { Container } from "pixi.js";
import { ITicker } from "../utils/ITicker";

export interface IGameObject extends Container {
  build(): void;

  update(icker: ITicker): void;

  reset(): void;

  resize(): void;
}
