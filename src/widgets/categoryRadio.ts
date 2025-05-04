import { Layout, SKButton, SKContainer, SKElementProps, SKLabel } from "simplekit/imperative-mode";
import { Model, Item } from "../model";
import { StackColLayout } from "../layouts/stackCol";
import { SKRadio } from "./radio";

type SKContainerProps = SKElementProps & { fill?: string };
type SKColumnCountWidgetProps = SKContainerProps & { model?: Model, item?: Item };

export class SKCategoryRadioWidget extends SKContainer {
    constructor(private model: Model, private item: Item, { ...elementProps }: SKColumnCountWidgetProps = {}) {
        super(elementProps);

        this.layoutMethod = new StackColLayout(5);
        this.border = "1px solid black";
        this.padding = 10;
        this.margin = 10;

        this.model.getCategories().sort((a, b) => a.name.localeCompare(b.name)).forEach(category => {
            const rowContainer = new SKContainer({
                layoutMethod: new Layout.FillRowLayout(),
            });
            const checkbox = new SKRadio({ checked: this.item.categoryId === category.id });
            const label = new SKLabel({ text: category.name });
            rowContainer.addChild(checkbox);
            rowContainer.addChild(label);

            checkbox.addEventListener("action", () => {
                if (checkbox.checked) {
                    this.model.updateItemCategory(this.item.id, category.id);
                }
            });

            this.addChild(rowContainer);
        });
    }
}