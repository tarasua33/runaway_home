import { Graphics } from "pixi.js";
import {
  StandardContainer,
  StandardContainerConfig,
} from "../../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../../libs/utils/PhysicEngine";
import { Body } from "matter-js";

interface CharacterContainerConfig extends StandardContainerConfig {
  physicEngine: PhysicEngine;
}

export class CharacterContainer extends StandardContainer<CharacterContainerConfig> {
  private _body!: Body;
  private _playerSprite!: Graphics;

  public build(): void {
    super.build();

    const { physicEngine } = this._config;

    const playerW = 40;
    const playerH = 150;
    const playerSprite = (this._playerSprite = new Graphics());
    playerSprite.beginFill(0x00ff00).drawRect(0, 0, playerW, playerH).endFill();
    playerSprite.pivot.x = playerW / 2;
    playerSprite.pivot.y = playerH / 2;
    this.addChild(playerSprite);

    playerSprite.x = 200;
    playerSprite.y = 0;

    this._applyPhysic(playerSprite, physicEngine);
  }

  private _applyPhysic(
    playerSprite: Graphics,
    physicEngine: PhysicEngine,
  ): void {
    const body = (this._body = physicEngine.createRectangleBody({
      x: playerSprite.x,
      y: playerSprite.y,
      w: playerSprite.width,
      h: playerSprite.height,
    }));
    body.isStatic = false;
    physicEngine.addBody(body);

    console.log(this._body);

    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;
    console.log(width, height);
  }

  public switchStaticBody(isStatic: boolean): void {
    this._body.isStatic = isStatic;
  }

  public update(dt: number): void {
    super.update(dt);

    this._playerSprite.x = this._body.position.x;
    this._playerSprite.y = this._body.position.y;
    this._playerSprite.rotation = this._body.angle;
  }
}
