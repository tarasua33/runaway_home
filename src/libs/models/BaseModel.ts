export abstract class BaseModel {
  static instance: BaseModel;
  static getModel(classConstructor: new () => BaseModel): BaseModel {
    if (!BaseModel.instance) {
      BaseModel.instance = new classConstructor();
    }

    return BaseModel.instance;
  }
}
