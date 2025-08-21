import { IModels } from "../../Game";
import { PlatformsModel } from "../../models/PlatformsModel";
import { AssetsLoader } from "../utils/AssetsLoader";

export abstract class AbstractBaseFactory {
  protected _assetsLoader: AssetsLoader;
  protected _models: IModels;

  constructor() {
    this._assetsLoader = AssetsLoader.getLoader();
    this._models = {
      platformsModel: PlatformsModel.getModel(PlatformsModel) as PlatformsModel,
    };
  }
}
