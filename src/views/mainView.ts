import { SKContainer } from "simplekit/imperative-mode";
import { Observer } from "../observer";
import { Model, ViewMode } from "../model";
import { StackColLayout } from "../layouts/stackCol";
import { ListView } from "./listView";
import { SettingsView } from "./settingsView";

export class MainView extends SKContainer implements Observer {
    constructor(private model: Model) {
        super();

        this.padding = 15;

        this.setViewByMode();

        this.model.addObserver(this);
    }

    private setViewByMode(): void {
        this.removeAllChildren();
        if (this.model.viewMode === ViewMode.Main) {
            this.addChild(new ListView(this.model));
        } else {
            this.addChild(new SettingsView(this.model));
        }
    }

    update(): void {
        this.setViewByMode();
    }

    private removeAllChildren(): void {
        while (this.children.length > 0) {
            this.removeChild(this.children[0]);
        }
    }
}