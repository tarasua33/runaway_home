import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { PlatformMoveContainer } from "../view/platforms/PlatformMoveContainer";

interface IBuildConfig {
  parent: StandardContainer;
}

export class PlatformMoveContainerFactory extends AbstractStandardFactory<PlatformMoveContainer> {
  public buildUi({ parent }: IBuildConfig): PlatformMoveContainer {
    const platformMoveContainer = new PlatformMoveContainer({});
    platformMoveContainer.build();
    parent.addChild(platformMoveContainer);

    return platformMoveContainer;
  }
}
