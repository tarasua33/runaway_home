import { Signal } from "../utils/Signal";
import { Body } from "matter-js";

export interface IPhysicBody extends Body {
  collideSignal: Signal;
  onCollide(ctx: IPhysicBody): void;
}
