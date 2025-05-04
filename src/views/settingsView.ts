import { Layout, SKButton, SKContainer } from "simplekit/imperative-mode";

// local imports
import { Model } from "../model";
import { StackColLayout } from "../layouts/stackCol";
import { SKColumnCountWidget } from "../widgets/columnCount";
import { SettingsItemView } from "./settingItemView";

export class SettingsView extends SKContainer {
  returnButton: SKButton;
  headerContainer: SKContainer;
  rowCountWidget: SKColumnCountWidget;
  settingsContainer: SKContainer;
  
  constructor(private model: Model) {
    super();

    this.layoutMethod = new StackColLayout(20);

    // HEADER Section
    this.headerContainer = new SKContainer();
    this.headerContainer.layoutMethod = new Layout.FillRowLayout();

    this.returnButton = new SKButton({ text: "Return", width: 125 });
    this.returnButton.addEventListener("click", () => {
      this.model.toggleViewMode();
    });
    this.headerContainer.addChild(this.returnButton);

    this.rowCountWidget = new SKColumnCountWidget(this.model, { width: 125 });
    this.headerContainer.addChild(this.rowCountWidget);

    this.addChild(this.headerContainer);

    // SETTINGS Section
    // for each item, create a settingItemView
    this.settingsContainer = new SKContainer();
    this.settingsContainer.layoutMethod = new StackColLayout(10);

    var settingsContainerRow = new SKContainer();
    settingsContainerRow.layoutMethod = new Layout.FillRowLayout();

    let index = 1;
    this.model.getShoppingItems().sort((a, b) => a.name.localeCompare(b.name)).forEach((item) => {
      if (index == this.model.settingsColumnCount) {
        const settingItemView = new SettingsItemView(this.model, item);
        settingsContainerRow.addChild(settingItemView);
        this.settingsContainer.addChild(settingsContainerRow);
        settingsContainerRow = new SKContainer();
        settingsContainerRow.layoutMethod = new Layout.FillRowLayout();
        index = 1;
      } else {
        const settingItemView = new SettingsItemView(this.model, item);
        settingsContainerRow.addChild(settingItemView);
        index++;
      }
    });

    if (index != 1) {
      // add final row
      this.settingsContainer.addChild(settingsContainerRow);
    }

    this.addChild(this.settingsContainer);
  }
}
