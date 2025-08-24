const characterX = 450;

export class CharacterModel {
  static instance: CharacterModel;

  static getModel(): CharacterModel {
    if (!CharacterModel.instance) {
      CharacterModel.instance = new CharacterModel();
    }

    return CharacterModel.instance;
  }

  public readonly maxJumps = 2;
  public readonly characterSize = {
    w: 50,
    h: 120,
  };

  public readonly characterX = characterX;
  public readonly startPosition = { x: characterX, y: 0 };
}
