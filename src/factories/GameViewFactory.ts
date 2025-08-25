import { AbstractBaseFactory } from "../libs/factories/AbstractBaseFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { StandardSprite } from "../libs/gameObjects/StandardSprite";
// import { StandardTilingSprite } from "../libs/gameObjects/StandardTillingSprite";
import { PhysicEngine } from "../libs/physic/PhysicEngine";
import { IPlatforms } from "../models/PlatformsModel";
import { Character } from "../view/character/Character";
import { CloudsContainer } from "../view/env/Clouds";
import { Mountains } from "../view/env/Mountains";
import { PlatformMoveContainer } from "../view/platforms/PlatformMoveContainer";
import { TransitionsScreen } from "../view/TransitionsScreen";
import { BgSkyFactory } from "./BgSkyFactory";
import { CharacterContainerFactory } from "./CharacterContainerFactory";
import { CharacterFactory } from "./CharacterFactory";
import { CloudsFactory } from "./CloudsFactory";
import { FurnitureContainerFactory } from "./FurnitureContainerFactory";
import { FurnitureFactory, IFurniture } from "./FurnitureFactory";
import { MountainsFactory } from "./MountainsFactory";
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
  furnitureContainer: StandardContainer;
  character: Character;
  transitionsScreen: TransitionsScreen;
  furniture: IFurniture;
  // bgSky: StandardTilingSprite;
  bgSky: StandardSprite;
  clouds: CloudsContainer;
  mountains: Mountains;
}

export class GameViewFactory extends AbstractBaseFactory {
  public buildUi(params: IBuildConfig): IGameView {
    const { mainScene, physicEngine } = params;

    const platformFactory = new PlatformsFactory();
    const platformMoveContainerFactory = new PlatformMoveContainerFactory();
    const characterContainerFactory = new CharacterContainerFactory();
    const characterFactory = new CharacterFactory();
    const transitionsScreenFactory = new TransitionsScreenFactory();
    const furnitureContainerFactory = new FurnitureContainerFactory();
    const furnitureFactory = new FurnitureFactory();
    const bgSkyFactory = new BgSkyFactory();
    const cloudsFactory = new CloudsFactory();
    const mountainsFactory = new MountainsFactory();

    const bgSky = bgSkyFactory.buildUi({
      parent: mainScene,
    });

    const mountains = mountainsFactory.buildUi({
      parent: mainScene,
    });

    const furnitureContainer = furnitureContainerFactory.buildUi({
      parent: mainScene,
    });
    const platformMoveContainer = platformMoveContainerFactory.buildUi({
      parent: mainScene,
    });
    const characterContainer = characterContainerFactory.buildUi({
      parent: mainScene,
    });

    const view: IGameView = {
      bgSky,
      mountains,
      platforms: platformFactory.buildUi({ physicEngine }),
      furnitureContainer: furnitureContainer,
      furniture: furnitureFactory.buildUi({ parent: furnitureContainer }),
      platformMoveContainer: platformMoveContainer,
      characterContainer,
      character: characterFactory.buildUi({
        parent: characterContainer,
        physicEngine,
      }),
      clouds: cloudsFactory.buildUi({
        parent: mainScene,
      }),
      transitionsScreen: transitionsScreenFactory.buildUi({
        parent: mainScene,
      }),
    };

    return view;
  }
}
