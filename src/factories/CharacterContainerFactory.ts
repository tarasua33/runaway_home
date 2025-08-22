import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../libs/utils/PhysicEngine";
import { CharacterContainer } from "../view/character/CharacterContainer";

interface IBuildConfig {
  parent: StandardContainer;
  physicEngine: PhysicEngine;
}

export class CharacterContainerFactory extends AbstractStandardFactory<CharacterContainer> {
  public buildUi({ parent, physicEngine }: IBuildConfig): CharacterContainer {
    const characterContainer = new CharacterContainer({ physicEngine });
    characterContainer.build();
    parent.addChild(characterContainer);

    return characterContainer;
  }
}
