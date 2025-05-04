import {
    SKContainer,
    Layout,
    SKLabel,
} from "simplekit/imperative-mode";


import { Item, Model } from "../model";
import { SKCategoryRadioWidget } from "../widgets/categoryRadio";

export class SettingsItemView extends SKContainer {
    constructor(private model: Model, private item: Item) {
        super();

        this.layoutMethod = new Layout.FillRowLayout();
        this.padding = 5;
        this.margin = 5;
        
        const itemName = new SKLabel({
            text: item.name.length > 150 / 10 ? item.name.substring(0, 150 / 10 - 3) + "..." : item.name,
            width: 150,
            align: "right",
            margin: 10,
        });
        this.addChild(itemName);

        const radioContainer = new SKCategoryRadioWidget(this.model, this.item);

        this.addChild(radioContainer);
    }
}
