import { GAME_DIMENSIONS } from "../Game";

interface IMechanicSettings {
  speed: number;
  mountSpeed: number;
  shadowSpeed: number;
  treesSpeed: number;
  characterAnimationSpeed: number;
  finalDistance: number;
}

export const MAX_LVL = 5;

export class LevelModel {
  // *** STATIC PROPERTIES *** //
  static instance: LevelModel;

  static getModel(): LevelModel {
    if (!LevelModel.instance) {
      LevelModel.instance = new LevelModel();
    }

    return LevelModel.instance;
  }
  // *** STATIC PROPERTIES *** //

  public setUpLvl(newLvl: number): void {
    this._lvl = newLvl;
  }

  private _lvl = 1;
  private _lvlMechanicSettings: IMechanicSettings[] = [
    {
      speed: 3,
      mountSpeed: 0.35,
      shadowSpeed: 1,
      treesSpeed: 9,
      characterAnimationSpeed: 1,
      finalDistance: GAME_DIMENSIONS.width * 3,
    },
    {
      speed: 3.3,
      characterAnimationSpeed: 1.3,
      mountSpeed: 0.39,
      shadowSpeed: 1.1,
      treesSpeed: 9.9,
      finalDistance: GAME_DIMENSIONS.width * 4,
    },
    {
      speed: 3.6,
      characterAnimationSpeed: 1.6,
      mountSpeed: 0.42,
      shadowSpeed: 1.2,
      treesSpeed: 11.8,
      finalDistance: GAME_DIMENSIONS.width * 5,
    },
    {
      speed: 3.9,
      characterAnimationSpeed: 1.9,
      mountSpeed: 0.45,
      shadowSpeed: 1.3,
      treesSpeed: 12.7,
      finalDistance: GAME_DIMENSIONS.width * 6,
    },
    {
      speed: 4.2,
      characterAnimationSpeed: 2.2,
      mountSpeed: 0.48,
      shadowSpeed: 1.4,
      treesSpeed: 13.6,
      finalDistance: GAME_DIMENSIONS.width * 6,
    },
    {
      speed: 4.5,
      characterAnimationSpeed: 2.5,
      mountSpeed: 0.52,
      shadowSpeed: 1.7,
      treesSpeed: 14.5,
      finalDistance: GAME_DIMENSIONS.width * 6,
    },
  ];

  public get lvl(): number {
    return this._lvl;
  }

  public getLvlMechanicSettings(): IMechanicSettings {
    // eslint-disable-next-line prettier/prettier
    const set = this._lvlMechanicSettings[this._lvl > MAX_LVL ? MAX_LVL - 1 : this._lvl - 1];

    return set;
  }
}
