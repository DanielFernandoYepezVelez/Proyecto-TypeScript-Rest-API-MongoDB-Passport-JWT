import { app } from "./app";

class Main {
  constructor() {
    this.init();
  }

  init() {
    app.settings();
    app.middlewares();
    app.routes();
    app.start();
  }
}

new Main();
