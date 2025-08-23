import Matter, { Engine, World, Body, Bodies } from "matter-js";
import { IPoint, IRect } from "./GameHelper";

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
    const engine = (this.engine = Engine.create());
    this.world = engine.world;
    engine.world.gravity.scale = 0.004;

    Matter.Events.on(engine, "collisionStart", (event) => {
      // eslint-disable-next-line prettier/prettier
      event.pairs.forEach(pair => {
        console.log("Collision between:", pair.bodyA.label, pair.bodyB.label);
      });
    });
  }

  public addBody(body: Body): void {
    World.add(this.world, body);
  }

  public disableInertia(body: Body): void {
    Body.setInertia(body, Infinity);
  }

  public createRectangleBody({ x, y, w, h }: IRect): Body {
    return Bodies.rectangle(x, y, w, h);
  }

  public setPosition(body: Body, x: number, y: number): void {
    Body.setPosition(body, { x: x, y: y });
    Body.setVelocity(body, { x: 0, y: 0 });
  }

  public applyForce(body: Body, force: IPoint): void {
    Matter.Body.applyForce(body, body.position, force);
  }

  public update(deltaMS: number): void {
    // console.debug(deltaMS);
    // const fixedDelta = 1000 / 60;
    // const correction = deltaMS / fixedDelta;
    Engine.update(this.engine, deltaMS, 3);
  }
}
