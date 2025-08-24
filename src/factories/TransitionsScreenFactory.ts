import { FillGradient } from "pixi.js";
import { GAME_DIMENSIONS } from "../Game";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { StandardContainer } from "../libs/gameObjects/StandardContainer";
import { TransitionsScreen } from "../view/TransitionsScreen";

interface IBuildConfig {
  parent: StandardContainer;
}

export class TransitionsScreenFactory extends AbstractStandardFactory<TransitionsScreen> {
  public buildUi({ parent }: IBuildConfig): TransitionsScreen {
    const characterContainer = new TransitionsScreen({
      visible: false,
      bgX: -GAME_DIMENSIONS.width / 4,
      bgY: -GAME_DIMENSIONS.height / 4,
      bgW: GAME_DIMENSIONS.width + GAME_DIMENSIONS.halfWidth,
      bgH: GAME_DIMENSIONS.height + GAME_DIMENSIONS.height / 2,
      textY: GAME_DIMENSIONS.height / 3,
      textX: GAME_DIMENSIONS.width / 2,
      textConfig: {
        text: "Try Again!",
        styleOptions: {
          fontFamily: "Verdana, sans-serif",
          fontSize: 120,
          fontWeight: "bolder",
          fill: new FillGradient({
            type: "linear",
            start: { x: 0, y: 0 },
            end: { x: 0, y: 1 },
            colorStops: [
              { offset: 0, color: "#f6f673ff" },
              { offset: 0.5, color: "#ca8102ff" },
              { offset: 1, color: "#f6f673ff" },
            ],
            textureSpace: "local",
          }),
          dropShadow: {
            distance: 10,
            color: "#f6f673ff",
            blur: 1,
            alpha: 0.25,
            angle: Math.PI * 0.75,
          },
        },
      },
    });
    characterContainer.build();
    parent.addChild(characterContainer);

    return characterContainer;
  }
}
