import { Assets, Container, Text } from "pixi.js";
import { MainScene } from "./view/MainScene";
import { Hero } from "./view/Hero";

export const GAME_DIMENSIONS = {
  width: 1280,
  height: 720,
};

export class Game {
  private _stage: Container;
  private _mainScene!: MainScene;

  constructor(stage: Container) {
    this._stage = stage;

    const mainScene = (this._mainScene = new MainScene({}));
    mainScene.buildObject();
    stage.addChild(mainScene);
  }

  public async init(): Promise<boolean> {
    const stage = this._stage;
    const mainScene = this._mainScene;

    const manifest = await fetch("/assets/manifest.json").then((res) =>
      res.json(),
    );

    await Assets.init({ manifest, basePath: "/assets" });

    const loadingText = new Text("Loading...", { fill: "white" });
    loadingText.x = GAME_DIMENSIONS.width / 2;
    loadingText.y = GAME_DIMENSIONS.height / 2;
    stage.addChild(loadingText);

    await Assets.loadBundle("preload");

    loadingText.renderable = false;
    stage.removeChild(loadingText);
    loadingText.destroy({ style: true, texture: true, textureSource: true });

    const heroTexture = Assets.get("hero");
    const hero = new Hero({ texture: heroTexture, anchor: { x: 0.5, y: 0.5 } });
    hero.position.set(GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2);
    mainScene.addChild(hero);

    return true;
  }

  public update(dt: number): void {
    this._mainScene.update(dt);
  }

  public resize(): void {
    this._mainScene.resize();
  }
}
