import {
  startSimpleKit,
  setSKRoot,
  SKContainer
} from "simplekit/imperative-mode";

// local imports
import { Model } from "./model";
import { ListView } from "./views/listView";
import { StackColLayout } from "./layouts/stackCol";
import { HeaderView } from "./views/headerView";
import { MainView } from "./views/mainView";

// Data
const model = new Model();

// UI
const root = new SKContainer({
  id: "root",
  layoutMethod: new StackColLayout(),
});

root.addChild(new MainView(model));

setSKRoot(root);

startSimpleKit();
