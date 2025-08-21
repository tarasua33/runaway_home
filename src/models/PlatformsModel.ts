import { BaseModel } from "../libs/models/BaseModel";

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
}

export interface IPlatformSetting {
  type: PlatformTypes;
  size: number;
  number: BigPlatformSizes;
}

export class PlatformsModel extends BaseModel {
  public platformSettings: IPlatformSetting[] = [
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
      number: 8,
    },
    {
      type: PlatformTypes.big,
      size: 1,
      number: 8,
    },
  ];
}
