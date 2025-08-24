import Matter, { Engine, World, Body, Bodies } from "matter-js";
import { IPoint, IRect } from "../utils/GameHelper";
import { injectPhysicBodyAll } from "./PhysicBodyInject";
import { IPhysicBody } from "./IPhysicBody";

interface IMatterPair extends Matter.Pair {
  bodyA: IPhysicBody;
  bodyB: IPhysicBody;
}

export class PhysicEngine {
  static instance: PhysicEngine;
  static getEngine(): PhysicEngine {
    if (!PhysicEngine.instance) {
      PhysicEngine.instance = new PhysicEngine();
    }
    return PhysicEngine.instance;
  }

  public readonly engine: Engine;
  private readonly world: World;

  constructor() {
    injectPhysicBodyAll();

    const engine = (this.engine = Engine.create());
    this.world = engine.world;
    engine.world.gravity.scale = 0.004;

    Matter.Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        console.log("Collision between:", pair.bodyA.label, pair.bodyB.label);

        (pair as IMatterPair).bodyA.onCollide((pair as IMatterPair).bodyA);
        (pair as IMatterPair).bodyB.onCollide((pair as IMatterPair).bodyB);
      });
    });
  }

  public addBody(body: Body): void {
    World.add(this.world, body);
  }

  public disableInertia(body: Body): void {
    Body.setInertia(body, Infinity);
  }

  public createRectangleBody({ x, y, w, h }: IRect): IPhysicBody {
    return Bodies.rectangle(x, y, w, h) as IPhysicBody;
  }

  public correctionBodyX(body: Body, fixedX: number): void {
    Body.setVelocity(body, { x: 0, y: body.velocity.y });
    Body.setPosition(body, { x: fixedX, y: body.position.y });
  }

  public setPosition(body: Body, x: number, y: number): void {
    Body.setPosition(body, { x: x, y: y });
    Body.setVelocity(body, { x: 0, y: 0 });
  }

  public applyForce(body: Body, force: IPoint): void {
    Matter.Body.applyForce(body, body.position, force);
  }

  public update(deltaMS: number): void {
    // const fixedDelta = 1000 / 60;
    // const correction = deltaMS / fixedDelta;
    Engine.update(this.engine, deltaMS, 3);
  }
}
