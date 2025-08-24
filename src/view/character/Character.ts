import { Graphics } from "pixi.js";
import {
  StandardContainer,
  StandardContainerConfig,
} from "../../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../../libs/physic/PhysicEngine";
import { IPhysicBody } from "../../libs/physic/IPhysicBody";
import { Signal } from "../../libs/utils/Signal";
// import { Body } from "matter-js";

interface CharacterConfig extends StandardContainerConfig {
  physicEngine: PhysicEngine;
  characterSize: { w: number; h: number };
  maxJumps: number;
  failY: number;
}

const JUMP_Y_FORCE = -0.45;
const characterFixedX = 300;

export class Character extends StandardContainer<CharacterConfig> {
  public readonly failSignal = new Signal();
  public readonly animationComplete = new Signal();

  private _body!: IPhysicBody;
  private _physicEngine!: PhysicEngine;
  private _fixedX = characterFixedX;
  private _jumps = 0;
  private _firstCollide = true;

  public build(): void {
    super.build();

    const { physicEngine, characterSize, x } = this._config;
    this._physicEngine = physicEngine;
    this._fixedX = x || characterFixedX;

    const playerW = characterSize.w;
    const playerH = characterSize.h;
    const playerView = new Graphics();
    playerView.beginFill(0x00ff00).drawRect(0, 0, playerW, playerH).endFill();
    playerView.pivot.x = playerW / 2;
    playerView.pivot.y = playerH / 2;
    this.addChild(playerView);

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

    physicEngine.disableInertia(body);

    body.collideSignal.add(this._onCollide, this);
  }

  private _onCollide(): void {
    if (this._firstCollide) {
      this._firstCollide = false;
      this.animationComplete.dispatch();
    }
    this._jumps = 0;
  }

  public switchStaticBody(isStatic: boolean): void {
    this._body.isStatic = isStatic;
  }

  public jump(): void {
    if (this._jumps < this._config.maxJumps) {
      this._jumps++;
      this._physicEngine.applyForce(this._body, { x: 0, y: JUMP_Y_FORCE });
    }
  }

  public update(dt: number): void {
    super.update(dt);

    this._physicEngine.correctionBodyX(this._body, this._fixedX);
    this.x = this._body.position.x;
    this.y = this._body.position.y;
    this.rotation = this._body.angle;

    if (this.y > this._config.failY) {
      this.failSignal.dispatch();
    }
  }

  public setPosition(x: number, y: number): void {
    const body = this._body;

    this._physicEngine.setPosition(body, x, y);

    this.x = body.position.x;
    this.y = body.position.y;

    // console.log("SET!!!!!!!!", this.x, this.y);
  }

  public reset(): void {
    this._jumps = 0;
    this._firstCollide = true;
  }
}
