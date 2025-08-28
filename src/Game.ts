import { Container, Text, Ticker } from "pixi.js";
import { MainScene } from "./view/MainScene";
import { AssetsLoader } from "./libs/utils/AssetsLoader";
import { PhysicEngine } from "./libs/physic/PhysicEngine";
import { BaseGameState } from "./controllers/BaseGameState";
import { UserInteractionDispatcher } from "./libs/utils/UserInteractionDispatcher";
import { ITicker } from "./libs/utils/ITicker";
import { StandardContainer } from "./libs/gameObjects/StandardContainer";
import { ViewPort } from "./libs/gameObjects/IGameObject";

const widthGame = 1280;
const heightGame = 720;

export const GAME_DIMENSIONS = {
  width: widthGame,
  height: heightGame,
  halfWidth: widthGame / 2,
};

export class Game {
  private _stage: Container;
  private _view: HTMLCanvasElement;
  private _mainScene!: MainScene;
  private _uiContainer!: StandardContainer;
  private _physicEngine!: PhysicEngine;

  constructor(stage: Container, view: HTMLCanvasElement) {
    this._stage = stage;
    this._view = view;

    const mainScene = (this._mainScene = new MainScene({}));
    mainScene.build();
    stage.addChild(mainScene);

    const uiContainer = (this._uiContainer = new StandardContainer({}));
    uiContainer.build();
    stage.addChild(uiContainer);
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

    const physicEngine = PhysicEngine.getEngine();
    this._physicEngine = physicEngine;

    const userInteractionDispatcher = new UserInteractionDispatcher(this._view);

    const baseGame = new BaseGameState();
    baseGame.start({
      userInteractionDispatcher,
      mainScene,
      physicEngine,
      uiContainer: this._uiContainer,
    });

    return true;
  }

  public update(ticker: Ticker, deltaMS: number): void {
    this._mainScene.update(ticker as ITicker);
    if (this._physicEngine) this._physicEngine.update(deltaMS);
  }

  public resize(viewPort: ViewPort): void {
    this._mainScene.resize(viewPort);
    this._uiContainer.resize(viewPort);
  }
}
