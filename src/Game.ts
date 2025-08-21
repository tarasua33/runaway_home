import { Container, Text } from "pixi.js";
import { MainScene } from "./view/MainScene";
// import { Hero } from "./view/Hero";
// import { StandardSprite } from "./libs/gameObjects/StandardSprite";
import { AssetsLoader } from "./libs/utils/AssetsLoader";
import { GameViewFactory } from "./factories/GameViewFactory";
import { PlatformsModel } from "./models/PlatformsModel";

export const GAME_DIMENSIONS = {
  width: 1280,
  height: 720,
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

    // const heroTexture = assetsLoader.getTexture("hero", false);
    // const hero = new Hero({ texture: heroTexture, anchor: { x: 0.5, y: 0.5 } });
    // hero.position.set(GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2);
    // mainScene.addChild(hero);

    // const treeTexture = assetsLoader.getTexture("tree_bid");
    // const tree = new StandardSprite({
    //   texture: treeTexture,
    //   anchor: { x: 0.5, y: 1 },
    // });
    // tree.x = hero.x;
    // tree.y = GAME_DIMENSIONS.height;
    // mainScene.addChild(tree);

    const gameViewFactory = new GameViewFactory();
    gameViewFactory.buildUi({ mainScene });

    return true;
  }

  public update(dt: number): void {
    this._mainScene.update(dt);
  }

  public resize(): void {
    this._mainScene.resize();
  }
}
