import { GAME_DIMENSIONS } from "../../Game";
import {
  BigPlatformSizes,
  IPlatforms,
  PlatformTypes,
} from "../../models/PlatformsModel";
import { Signal } from "./Signal";

export interface IFadeIn {
  show(): void;
  animationComplete: Signal;
  setText(txt: string): void;
}

export interface IFadeOut {
  hide(): void;
  animationComplete: Signal;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface IPlatformData {
  size: number;
  number: number;
}

export function getPositionY(
  previousPlt: IPoint,
  sizeBetween: number,
  height: number,
): number {
  // eslint-disable-next-line prettier/prettier
  const potentialY = previousPlt.y + height / 2 - sizeBetween * 2 + Math.random() * sizeBetween * 4;
  const newY = Math.max(
    Math.min(potentialY, GAME_DIMENSIONS.height - height / 2),
    GAME_DIMENSIONS.height / 4,
  );

  return newY;
}

export function getPlatformData(
  platforms: IPlatforms,
  type: PlatformTypes,
): IPlatformData[] {
  const data = [];
  for (const [key, value] of platforms.get(type)!.entries()) {
    if (key !== BigPlatformSizes.WIN && value.length > 0) {
      data.push({
        size: key,
        number: value.length,
      });
    }
  }

  return data;
}
