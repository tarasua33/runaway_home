import { StandardSprite } from "../libs/gameObjects/StandardSprite";

export class Hero extends StandardSprite {
  public update(dt: number): void {
    this.rotation = this.rotation + dt * 0.01;
  }
}
