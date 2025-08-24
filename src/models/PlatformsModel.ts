import { GAME_DIMENSIONS } from "../Game";
import { Platform } from "../view/platforms/Platform";

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
}

// const { ONE, TWO, FOUR, SIX, EIGHT, TEN, HEX } = BigPlatformSizes;

// const sizes = [ONE, TWO, FOUR, SIX, EIGHT, TEN, HEX];

export interface IPlatformSetting {
  type: PlatformTypes;
  size: number;
  number: BigPlatformSizes;
}

interface IMechanicSettings {
  speed: number;
}

export type IPlatformsSizes = Map<BigPlatformSizes, Platform[]>;

export type IPlatforms = Map<PlatformTypes, IPlatformsSizes>;

const MAX_LVL = 5;
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

  public readonly platformStartX = 300;
  public readonly platformStartY = Math.round(
    GAME_DIMENSIONS.height * (3 / 4) + sizePlatformTile / 2,
  );
  public readonly sizePlatformTile = sizePlatformTile;
  // public readonly sizes = [
  //   BigPlatformSizes.ONE,
  //   BigPlatformSizes.TWO,
  //   BigPlatformSizes.FOUR,
  //   BigPlatformSizes.SIX,
  //   BigPlatformSizes.EIGHT,
  //   BigPlatformSizes.TEN,
  // ];
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

  private _currentLvlPlatformsMap!: IPlatforms;
  private _lvlPlatformSettings = [
    // LVL 1
    [
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
        number: 4,
      },
      {
        type: PlatformTypes.big,
        size: 4,
        number: 4,
      },
    ],
    // LVL 2
    [
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
        number: 6,
      },
    ],
    // LVL 3
    [
      {
        type: PlatformTypes.big,
        size: 8,
        number: 2,
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
        number: 8,
      },
    ],
    // LVL 4
    [
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
  private _lvl = 1;
  private _lvlMechanicSettings: IMechanicSettings[] = [
    {
      speed: 3,
    },
    {
      speed: 3.2,
    },
    {
      speed: 3.4,
    },
    {
      speed: 3.6,
    },
    {
      speed: 3.8,
    },
    {
      speed: 4,
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

  public getPlatforms(): IPlatforms {
    return this._currentLvlPlatformsMap;
  }

  public setUpLvl(newLvl: number, platformsAll: IPlatforms): void {
    this._lvl = newLvl;

    const settings =
      newLvl > MAX_LVL
        ? this._lvlPlatformSettings[MAX_LVL - 1]
        : this._lvlPlatformSettings[newLvl - 1];

    const platforms: IPlatforms = new Map();
    // const typeMap: IPlatformsSizes = ;
    platforms.set(
      PlatformTypes.big,
      new Map([
        [BigPlatformSizes.ONE, []],
        [BigPlatformSizes.TWO, []],
        [BigPlatformSizes.FOUR, []],
        [BigPlatformSizes.SIX, []],
        [BigPlatformSizes.EIGHT, []],
        [BigPlatformSizes.TEN, []],
      ]),
    );
    platforms.set(
      PlatformTypes.small,
      new Map([
        [BigPlatformSizes.ONE, []],
        [BigPlatformSizes.TWO, []],
        [BigPlatformSizes.FOUR, []],
        [BigPlatformSizes.SIX, []],
        [BigPlatformSizes.EIGHT, []],
        [BigPlatformSizes.TEN, []],
      ]),
    );

    for (const set of settings) {
      for (let i = 0; i < set.number; i++) {
        const plt = platformsAll.get(set.type)!.get(set.size)![i];

        platforms.get(set.type)!.get(set.size)!.push(plt);
      }
    }

    this._currentLvlPlatformsMap = platforms;
  }
}
