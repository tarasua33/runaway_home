export abstract class BaseModel {
  static instance: BaseModel;
  static getModel<T extends BaseModel = BaseModel>(
    classConstructor: new () => T,
  ): T {
    if (!BaseModel.instance) {
      BaseModel.instance = new classConstructor();
    }

    return BaseModel.instance as T;
  }
}
