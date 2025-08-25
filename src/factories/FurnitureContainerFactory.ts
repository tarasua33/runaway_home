import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";

interface IBuildConfig {
  parent: StandardContainer;
}

export class FurnitureContainerFactory extends AbstractStandardFactory<StandardContainer> {
  public buildUi({ parent }: IBuildConfig): StandardContainer {
    const characterContainer = new StandardContainer({});
    characterContainer.build();
    parent.addChild(characterContainer);

    return characterContainer;
  }
}
