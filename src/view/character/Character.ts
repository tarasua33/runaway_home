import {
  StandardContainer,
  StandardContainerConfig,
} from "../../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../../libs/physic/PhysicEngine";
import { IPhysicBody } from "../../libs/physic/IPhysicBody";
import { Signal } from "../../libs/utils/Signal";
import { ITicker } from "../../libs/utils/ITicker";
import {
  StandardFramesAnimations,
  StandardFramesAnimationsConfig,
} from "../../libs/gameObjects/StandardFramesAnimations";
// import { Body } from "matter-js";

interface CharacterConfig extends StandardContainerConfig {
  physicEngine: PhysicEngine;
  characterSize: { w: number; h: number };
  maxJumps: number;
  failY: number;
  playerConfig: StandardFramesAnimationsConfig;
}

const JUMP_Y_FORCE = -0.45;
const characterFixedX = 300;

export class Character extends StandardContainer<CharacterConfig> {
  public readonly failSignal = new Signal();
  public readonly animationComplete = new Signal();
  private _player!: StandardFramesAnimations;
  private _body!: IPhysicBody;
  private _physicEngine!: PhysicEngine;
  private _fixedX = characterFixedX;
  private _jumps = 0;
  private _firstCollide = true;
  private _isFinish = false;

  public build(): void {
    super.build();

    const { physicEngine, characterSize, x, playerConfig } = this._config;
    this._physicEngine = physicEngine;
    this._fixedX = x || characterFixedX;

    const player = (this._player = new StandardFramesAnimations(playerConfig));
    player.build();
    this.addChild(player);

    player.playAnimation("idle", true);

    this._applyPhysic(characterSize, physicEngine);
  }

  public start(): void {
    this._player.playAnimation("run", true);
  }

  private _applyPhysic(
    playerView: { w: number; h: number },
    physicEngine: PhysicEngine,
  ): void {
    const body = (this._body = physicEngine.createRectangleBody({
      x: this.x,
      y: this.y,
      w: playerView.w,
      h: playerView.h,
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
    } else if (this._isFinish) {
      this._player.playAnimation("idle", true);
    } else {
      this._player.playAnimation("run", true);
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

      this._player.playAnimation("jump", true);
    }
  }

  public update(ticker: ITicker): void {
    super.update(ticker);

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
  }

  public reset(): void {
    this._player.playAnimation("idle", true);
    this._jumps = 0;
    this._isFinish = false;
    this._firstCollide = true;
    this._body.isStatic = true;
  }

  public celebration(): void {
    this._isFinish = true;
    this._player.playAnimation("idle", true);
  }
}
