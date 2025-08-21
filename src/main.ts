import { Application } from "pixi.js";
import { Game, GAME_DIMENSIONS } from "./Game";

(async () => {
  // Create a new application
  const app = new Application({
    width: GAME_DIMENSIONS.width,
    height: GAME_DIMENSIONS.width,
    resolution: Math.min(window.devicePixelRatio ?? 1, 2),
    autoDensity: true,
    antialias: false,
    powerPreference: "high-performance",
    backgroundAlpha: 1,
  });

  await app.init({ background: "#1099bb" });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const game = new Game(app.stage);

  const resize = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    app.renderer.resize(vw, vh);

    const scale = Math.min(
      vw / GAME_DIMENSIONS.width,
      vh / GAME_DIMENSIONS.height,
    );
    app.stage.scale.set(scale);
    app.stage.position.set(
      (vw - GAME_DIMENSIONS.width * scale) / 2,
      (vh - GAME_DIMENSIONS.height * scale) / 2,
    );

    game.resize();
  };

  resize();

  window.addEventListener("resize", resize);

  const success = await game.init();
  // Listen for animate update

  if (success) {
    app.ticker.add((time) => {
      game.update(time.deltaTime);
    });
  }
})();
