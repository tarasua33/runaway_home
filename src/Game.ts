import { Container, Text } from "pixi.js";
import { MainScene } from "./view/MainScene";
// import { Hero } from "./view/Hero";
// import { StandardSprite } from "./libs/gameObjects/StandardSprite";
import { AssetsLoader } from "./libs/utils/AssetsLoader";
import { GameViewFactory } from "./factories/GameViewFactory";
import { PlatformsModel } from "./models/PlatformsModel";
import { BaseGameController } from "./controllers/BaseGameController";

const widthGame = 1280;
const heightGame = 720;

export const GAME_DIMENSIONS = {
  width: widthGame,
  height: heightGame,
  halfWidth: widthGame / 2,
};

export interface IModels {
  platformsModel: PlatformsModel;
}

export class Game {
  private _stage: Container;
  private _mainScene!: MainScene;

  constructor(stage: Container) {
    this._stage = stage;

    const mainScene = (this._mainScene = new MainScene({}));
    mainScene.build();
    stage.addChild(mainScene);
  }

  public async init(): Promise<boolean> {
    const stage = this._stage;
    const mainScene = this._mainScene;

    const assetsLoader = AssetsLoader.getLoader();
    await assetsLoader.initAssets();

    const loadingText = new Text("Loading...", { fill: "white" });
    loadingText.x = GAME_DIMENSIONS.width / 2;
    loadingText.y = GAME_DIMENSIONS.height / 2;
    stage.addChild(loadingText);

    await assetsLoader.loadBundle("preload");

    loadingText.renderable = false;
    stage.removeChild(loadingText);
    loadingText.destroy({ style: true, texture: true, textureSource: true });

    const gameViewFactory = new GameViewFactory();
    const gameView = gameViewFactory.buildUi({ mainScene });

    const baseGameController = new BaseGameController();
    baseGameController.start({
      gameView,
    });

    return true;
  }

  public update(dt: number): void {
    this._mainScene.update(dt);
  }

  public resize(): void {
    this._mainScene.resize();
  }
}
