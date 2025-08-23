import { GAME_DIMENSIONS } from "../../Game";

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
