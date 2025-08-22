import { AbstractBaseFactory } from "../libs/factories/AbstractBaseFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";

import { IPlatforms } from "../view/platforms/Platform";
import { PlatformMoveContainer } from "../view/platforms/PlatformMoveContainer";
import { PlatformMoveContainerFactory } from "./PlatformMoveContainerFactory";
import { PlatformsFactory } from "./PlatformsFactory";

interface IBuildConfig {
  mainScene: StandardContainer;
}

export interface IGameView {
  platforms: IPlatforms;
  platformMoveContainer: PlatformMoveContainer;
}

export class GameViewFactory extends AbstractBaseFactory {
  public buildUi(params: IBuildConfig): IGameView {
    const { mainScene } = params;

    const platformFactory = new PlatformsFactory();
    const platformMoveContainerFactory = new PlatformMoveContainerFactory();

    const platformMoveContainer = platformMoveContainerFactory.buildUi({
      parent: mainScene,
    });

    const view: IGameView = {
      platforms: platformFactory.buildUi(),
      platformMoveContainer: platformMoveContainer,
    };

    return view;
  }
}
