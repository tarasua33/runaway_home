import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../libs/utils/PhysicEngine";
import { Character } from "../view/character/Character";

interface IBuildConfig {
  parent: StandardContainer;
  physicEngine: PhysicEngine;
}

export class CharacterFactory extends AbstractStandardFactory<Character> {
  public buildUi({ parent, physicEngine }: IBuildConfig): Character {
    const character = new Character({
      physicEngine,
      characterSize: this._models.characterModel.characterSize,
    });
    character.build();
    parent.addChild(character);

    return character;
  }
}
