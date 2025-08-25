// import { GAME_DIMENSIONS } from "../../Game";
import {
  StandardContainer,
  StandardContainerConfig,
} from "../../libs/gameObjects/StandardContainer";
import {
  StandardTilingSprite,
  StandardTilingSpriteConfig,
} from "../../libs/gameObjects/StandardTillingSprite";

export interface CloudsContainerConfig extends StandardContainerConfig {
  topCloudConf: StandardTilingSpriteConfig;
  bottomCloudConf: StandardTilingSpriteConfig;
  topTileConf: StandardTilingSpriteConfig;
  bottomTileConf: StandardTilingSpriteConfig;
}

export class CloudsContainer extends StandardContainer<CloudsContainerConfig> {
  public build(): void {
    const { topCloudConf, bottomCloudConf, topTileConf, bottomTileConf } =
      this._config;

    const topTile = new StandardTilingSprite(topTileConf);
    topTile.build();
    this.addChild(topTile);

    const bottomTile = new StandardTilingSprite(bottomTileConf);
    bottomTile.build();
    this.addChild(bottomTile);

    const topCloud = new StandardTilingSprite(topCloudConf);
    topCloud.build();
    this.addChild(topCloud);

    const bottomCloud = new StandardTilingSprite(bottomCloudConf);
    bottomCloud.build();
    this.addChild(bottomCloud);
  }
}
