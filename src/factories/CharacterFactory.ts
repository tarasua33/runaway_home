import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { PhysicEngine } from "../libs/physic/PhysicEngine";
import { Character } from "../view/character/Character";

interface IBuildConfig {
  parent: StandardContainer;
  physicEngine: PhysicEngine;
}

export class CharacterFactory extends AbstractStandardFactory<Character> {
  public buildUi({ parent, physicEngine }: IBuildConfig): Character {
    const { characterSize, startPosition, maxJumps } =
      this._models.characterModel;
    const character = new Character({
      physicEngine,
      characterSize: characterSize,
      x: startPosition.x,
      y: startPosition.y,
      maxJumps: maxJumps,
    });
    character.build();
    parent.addChild(character);

    return character;
  }
}
