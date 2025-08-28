import { GAME_DIMENSIONS } from "../Game";
import { Platform } from "../view/platforms/Platform";
import { MAX_LVL } from "./LevelModel";

export enum PlatformTypes {
  big = "big",
  small = "small",
}

export enum BigPlatformSizes {
  ONE = 1,
  TWO = 2,
  FOUR = 4,
  SIX = 6,
  EIGHT = 8,
  TEN = 10,
  HEX = 16,
  WIN = 0,
}

// const { ONE, TWO, FOUR, SIX, EIGHT, TEN, HEX } = BigPlatformSizes;

// const sizes = [ONE, TWO, FOUR, SIX, EIGHT, TEN, HEX];

export interface IPlatformSetting {
  type: PlatformTypes;
  size: number;
  number: BigPlatformSizes;
}

export type IPlatformsSizes = Map<BigPlatformSizes, Platform[]>;

export type IPlatforms = Map<PlatformTypes, IPlatformsSizes>;

const sizePlatformTile = 96;

export class PlatformsModel {
  // *** STATIC PROPERTIES *** //
  static instance: PlatformsModel;

  static getModel(): PlatformsModel {
    if (!PlatformsModel.instance) {
      PlatformsModel.instance = new PlatformsModel();
    }

    return PlatformsModel.instance;
  }
  // *** STATIC PROPERTIES *** //

  public readonly platformStartX = 450;
  public readonly platformStartY = Math.round(
    GAME_DIMENSIONS.height * (3 / 4) + sizePlatformTile / 2,
  );
  public readonly sizePlatformTile = sizePlatformTile;
  public readonly winPlatformSettings: IPlatformSetting = {
    type: PlatformTypes.big,
    size: 10,
    number: 1,
  };
  public readonly platformStartSettings: IPlatformSetting[] = [
    {
      type: PlatformTypes.big,
      size: 10,
      number: 2,
    },
    {
      type: PlatformTypes.big,
      size: 8,
      number: 4,
    },
    {
      type: PlatformTypes.big,
      size: 6,
      number: 6,
    },
    {
      type: PlatformTypes.big,
      size: 4,
      number: 8,
    },
    {
      type: PlatformTypes.big,
      size: 2,
      number: 16,
    },
    {
      type: PlatformTypes.big,
      size: 1,
      number: 16,
    },
  ];
  // private _lvl = 1;
  private _currentLvlPlatformsMap!: IPlatforms;
  private _lvlPlatformSettings = [
    // LVL 1
    [
      {
        type: PlatformTypes.big,
        size: 10,
        number: 1,
      },
      {
        type: PlatformTypes.big,
        size: 8,
        number: 2,
      },
      {
        type: PlatformTypes.big,
        size: 6,
        number: 6,
      },
      {
        type: PlatformTypes.big,
        size: 4,
        number: 6,
      },
    ],
    // LVL 2
    [
      {
        type: PlatformTypes.big,
        size: 8,
        number: 2,
      },
      {
        type: PlatformTypes.big,
        size: 6,
        number: 6,
      },
      {
        type: PlatformTypes.big,
        size: 4,
        number: 8,
      },
    ],
    // LVL 3
    [
      {
        type: PlatformTypes.big,
        size: 8,
        number: 1,
      },
      {
        type: PlatformTypes.big,
        size: 6,
        number: 4,
      },
      {
        type: PlatformTypes.big,
        size: 4,
        number: 6,
      },
      {
        type: PlatformTypes.big,
        size: 2,
        number: 10,
      },
    ],
    // LVL 4
    [
      {
        type: PlatformTypes.big,
        size: 6,
        number: 2,
      },
      {
        type: PlatformTypes.big,
        size: 4,
        number: 6,
      },
      {
        type: PlatformTypes.big,
        size: 2,
        number: 10,
      },
      {
        type: PlatformTypes.big,
        size: 1,
        number: 8,
      },
    ],
    // LVL 5
    [
      {
        type: PlatformTypes.big,
        size: 4,
        number: 6,
      },
      {
        type: PlatformTypes.big,
        size: 2,
        number: 16,
      },
      {
        type: PlatformTypes.big,
        size: 1,
        number: 16,
      },
    ],
  ];

  public getPlatforms(): IPlatforms {
    return this._currentLvlPlatformsMap;
  }

  public setUpLvl(newLvl: number, platformsAll: IPlatforms): void {
    // this._lvl = newLvl;
    const settings =
      newLvl > MAX_LVL
        ? this._lvlPlatformSettings[MAX_LVL - 1]
        : this._lvlPlatformSettings[newLvl - 1];

    const platforms: IPlatforms = new Map();
    // const typeMap: IPlatformsSizes = ;
    platforms.set(
      PlatformTypes.big,
      new Map([
        [BigPlatformSizes.WIN, []],
        [BigPlatformSizes.ONE, []],
        [BigPlatformSizes.TWO, []],
        [BigPlatformSizes.FOUR, []],
        [BigPlatformSizes.SIX, []],
        [BigPlatformSizes.EIGHT, []],
        [BigPlatformSizes.TEN, []],
      ]),
    );
    platforms.set(PlatformTypes.small, new Map([]));

    for (const set of settings) {
      for (let i = 0; i < set.number; i++) {
        const plt = platformsAll.get(set.type)!.get(set.size)![i];

        platforms.get(set.type)!.get(set.size)!.push(plt);
      }
    }

    const plt = platformsAll
      .get(PlatformTypes.big)!
      .get(BigPlatformSizes.WIN)![0];
    platforms.get(PlatformTypes.big)!.get(BigPlatformSizes.WIN)!.push(plt);

    this._currentLvlPlatformsMap = platforms;
  }
}
