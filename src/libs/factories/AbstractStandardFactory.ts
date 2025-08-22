import { IGameObject } from "../gameObjects/IGameObject";
import { AbstractBaseFactory } from "./AbstractBaseFactory";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IBuildConfig {
  // parent: IGameObject;
}

export abstract class AbstractStandardFactory<
  // eslint-disable-next-line prettier/prettier
  T extends | IGameObject | IGameObject[] | Map<string | number, IGameObject> | Map<string | number, Map<string | number, IGameObject[]>> = IGameObject,
> extends AbstractBaseFactory {
  public abstract buildUi(params: IBuildConfig): T;
}
