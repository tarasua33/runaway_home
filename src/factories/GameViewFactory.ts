import { AbstractBaseFactory } from "../libs/factories/AbstractBaseFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../libs/physic/PhysicEngine";
import { IPlatforms } from "../models/PlatformsModel";
import { Character } from "../view/character/Character";

import { PlatformMoveContainer } from "../view/platforms/PlatformMoveContainer";
import { TransitionsScreen } from "../view/TransitionsScreen";
import { CharacterContainerFactory } from "./CharacterContainerFactory";
import { CharacterFactory } from "./CharacterFactory";
import { PlatformMoveContainerFactory } from "./PlatformMoveContainerFactory";
import { PlatformsFactory } from "./PlatformsFactory";
import { TransitionsScreenFactory } from "./TransitionsScreenFactory";

interface IBuildConfig {
  mainScene: StandardContainer;
  physicEngine: PhysicEngine;
}

export interface IGameView {
  platforms: IPlatforms;
  platformMoveContainer: PlatformMoveContainer;
  characterContainer: StandardContainer;
  character: Character;
  transitionsScreen: TransitionsScreen;
}

export class GameViewFactory extends AbstractBaseFactory {
  public buildUi(params: IBuildConfig): IGameView {
    const { mainScene, physicEngine } = params;

    const platformFactory = new PlatformsFactory();
    const platformMoveContainerFactory = new PlatformMoveContainerFactory();
    const characterContainerFactory = new CharacterContainerFactory();
    const characterFactory = new CharacterFactory();
    const transitionsScreenFactory = new TransitionsScreenFactory();

    const platformMoveContainer = platformMoveContainerFactory.buildUi({
      parent: mainScene,
    });
    const characterContainer = characterContainerFactory.buildUi({
      parent: mainScene,
    });

    const view: IGameView = {
      platforms: platformFactory.buildUi({ physicEngine }),
      platformMoveContainer: platformMoveContainer,
      characterContainer,
      character: characterFactory.buildUi({
        parent: characterContainer,
        physicEngine,
      }),
      transitionsScreen: transitionsScreenFactory.buildUi({
        parent: mainScene,
      }),
    };

    return view;
  }
}
