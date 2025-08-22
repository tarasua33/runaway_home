import { AbstractBaseFactory } from "../libs/factories/AbstractBaseFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../libs/utils/PhysicEngine";
import { CharacterContainer } from "../view/character/CharacterContainer";

import { IPlatforms } from "../view/platforms/Platform";
import { PlatformMoveContainer } from "../view/platforms/PlatformMoveContainer";
import { CharacterContainerFactory } from "./CharacterContainerFactory";
import { PlatformMoveContainerFactory } from "./PlatformMoveContainerFactory";
import { PlatformsFactory } from "./PlatformsFactory";

interface IBuildConfig {
  mainScene: StandardContainer;
  physicEngine: PhysicEngine;
}

export interface IGameView {
  platforms: IPlatforms;
  platformMoveContainer: PlatformMoveContainer;
  characterContainer: CharacterContainer;
}

export class GameViewFactory extends AbstractBaseFactory {
  public buildUi(params: IBuildConfig): IGameView {
    const { mainScene, physicEngine } = params;

    const platformFactory = new PlatformsFactory();
    const platformMoveContainerFactory = new PlatformMoveContainerFactory();
    const characterContainerFactory = new CharacterContainerFactory();

    const platformMoveContainer = platformMoveContainerFactory.buildUi({
      parent: mainScene,
    });

    const view: IGameView = {
      platforms: platformFactory.buildUi({ physicEngine }),
      platformMoveContainer: platformMoveContainer,
      // eslint-disable-next-line prettier/prettier
      characterContainer: characterContainerFactory.buildUi({ parent: mainScene, physicEngine })
    };

    return view;
  }
}
