import Matter from "matter-js";
import { IPhysicBody } from "./IPhysicBody";
import { Signal } from "../utils/Signal";

export function onCollide(ctx: IPhysicBody): void {
  ctx.collideSignal.dispatch();
}

export function injectPhysicBodyAll(): void {
  const oldCreate = Matter.Body.create;
  Matter.Body.create = function (options) {
    const body = oldCreate.call(this, options) as unknown as IPhysicBody;
    body.collideSignal = new Signal();
    body.onCollide = onCollide;

    return body;
  };
}
