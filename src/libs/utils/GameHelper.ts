import { GAME_DIMENSIONS } from "../../Game";

interface IPoint {
  x: number;
  y: number;
}

export function getPositionY(
  previousPlt: IPoint,
  sizeBetween: number,
  height: number,
): number {
  // eslint-disable-next-line prettier/prettier
  const potentialY = previousPlt.y - sizeBetween * 2 + Math.random() * sizeBetween * 4;
  const newY = Math.max(
    Math.min(potentialY, GAME_DIMENSIONS.height - height),
    GAME_DIMENSIONS.height / 4,
  );

  return newY;
}
