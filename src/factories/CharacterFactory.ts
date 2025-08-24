import { GAME_DIMENSIONS } from "../Game";
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
    const assetsLoader = this._assetsLoader;

    const runTextures = [];
    for (let i = 0; i <= 9; i++) {
      runTextures.push(assetsLoader.getTexture(`03-Run/frame_${i}`));
    }

    const idleTextures = [];
    for (let i = 0; i <= 11; i++) {
      idleTextures.push(assetsLoader.getTexture(`04-Idle_Blink/frame_${i}`));
    }

    const jumpTextures = [];
    for (let i = 0; i <= 4; i++) {
      jumpTextures.push(assetsLoader.getTexture(`01-Jump_Up/frame_${i}`));
    }

    // const fallTextures = [];
    // for (let i = 0; i <= 4; i++) {
    //   fallTextures.push(assetsLoader.getTexture(`02-Jump_Fall/frame_${i}`));
    // }

    const character = new Character({
      visible: false,
      physicEngine,
      characterSize: characterSize,
      x: startPosition.x,
      y: startPosition.y,
      maxJumps: maxJumps,
      failY: GAME_DIMENSIONS.height + characterSize.h * 2,
      playerConfig: {
        animations: [
          {
            name: "run",
            animation: {
              textures: runTextures,
              anchor: { x: 0.5, y: 0.45 },
              scale: { x: -1, y: 1 },
              autoPlay: false,
              animationSpeed: 0.22,
            },
          },
          {
            name: "idle",
            animation: {
              textures: idleTextures,
              anchor: { x: 0.5, y: 0.45 },
              scale: { x: -1, y: 1 },
              autoPlay: false,
              animationSpeed: 0.2,
            },
          },
          {
            name: "jump",
            animation: {
              textures: jumpTextures,
              anchor: { x: 0.5, y: 0.45 },
              scale: { x: -1, y: 1 },
              autoPlay: false,
              animationSpeed: 0.15,
            },
          },
          // {
          //   name: "fall",
          //   animation: {
          //     textures: fallTextures,
          //     anchor: { x: 0.5, y: 0.45 },
          //     scale: { x: -1, y: 1 },
          //     autoPlay: false,
          //     animationSpeed: 0.15,
          //   },
          // },
        ],
      },
    });
    character.build();
    parent.addChild(character);

    return character;
  }
}
