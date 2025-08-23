import { Graphics } from "pixi.js";
import {
  StandardContainer,
  StandardContainerConfig,
} from "../../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../../libs/utils/PhysicEngine";
import { Body } from "matter-js";

interface CharacterConfig extends StandardContainerConfig {
  physicEngine: PhysicEngine;
  characterSize: { w: number; h: number };
}

const JUMP_Y_FORCE = -0.5;

export class Character extends StandardContainer<CharacterConfig> {
  private _body!: Body;
  private _physicEngine!: PhysicEngine;

  public build(): void {
    super.build();

    const { physicEngine, characterSize } = this._config;
    this._physicEngine = physicEngine;

    const playerW = characterSize.w;
    const playerH = characterSize.h;
    const playerView = new Graphics();
    playerView.beginFill(0x00ff00).drawRect(0, 0, playerW, playerH).endFill();
    playerView.pivot.x = playerW / 2;
    playerView.pivot.y = playerH / 2;
    this.addChild(playerView);

    this.x = 300;
    this.y = 0;

    this._applyPhysic(playerView, physicEngine);
  }

  private _applyPhysic(playerView: Graphics, physicEngine: PhysicEngine): void {
    const body = (this._body = physicEngine.createRectangleBody({
      x: this.x,
      y: this.y,
      w: playerView.width,
      h: playerView.height,
    }));
    body.isStatic = false;
    physicEngine.addBody(body);

    // const width = body.bounds.max.x - body.bounds.min.x;
    // const height = body.bounds.max.y - body.bounds.min.y;
    // console.log(width, height);

    physicEngine.disableInertia(body);
  }

  public switchStaticBody(isStatic: boolean): void {
    this._body.isStatic = isStatic;
  }

  public update(dt: number): void {
    super.update(dt);

    this.x = this._body.position.x;
    this.y = this._body.position.y;
    this.rotation = this._body.angle;
  }

  public jump(): void {
    this._physicEngine.applyForce(this._body, { x: 0, y: JUMP_Y_FORCE });
  }
}
