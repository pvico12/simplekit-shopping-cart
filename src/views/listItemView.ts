import {
    SKContainer,
    SKLabel,
    Layout,
    SKButton,
} from "simplekit/imperative-mode";

import { Model } from "../model";
import { SKQuantityWidget } from "../widgets/quantity";

export class ListItemView extends SKContainer {
    constructor(private model: Model, id: number) {
        super();

        this.fillWidth = 1;
        this.padding = 10;

        var item = this.model.getItem(id);

        if (item) {
            this.layoutMethod = new Layout.FillRowLayout();
            this.margin = 2;

            const itemName = new SKLabel({
                text: item.name.length > 150 / 10 ? item.name.substring(0, 150 / 10 - 3) + "..." : item.name,
                width: 150,
            });
            this.addChild(itemName);

            if (!item.bought) {
                const quantityWidget = new SKQuantityWidget(model, item);
                this.addChild(quantityWidget);
            } else {
                const emptyContainer = new SKContainer();
                emptyContainer.width = 90;
                this.addChild(emptyContainer);
            }

            const removeButton = new SKButton({ text: "X", width: 30 });
            this.addChild(removeButton);

            removeButton.addEventListener("click", () => {
                this.model.removeItem(id);
            });
        }
    }
}
