import { Layout, SKButton, SKContainer, SKElementProps } from "simplekit/imperative-mode";
import { Model, Item } from "../model";

type SKContainerProps = SKElementProps & { fill?: string };
type SKQuanityWidgetProps = SKContainerProps & { model?: Model, item?: Item };

export class SKQuantityWidget extends SKContainer {

    quantity: number;

    minusButton: SKButton;
    plusButton: SKButton;
    quantityButton: SKButton;

    constructor(private model: Model, private item: Item, { ...elementProps }: SKQuanityWidgetProps = {}) {
        super(elementProps);
        this.quantity = item.quantity || 0;

        this.layoutMethod = new Layout.FillRowLayout();

        this.minusButton = new SKButton({ text: "-", width: 30 });
        this.plusButton = new SKButton({ text: "+", width: 30 });
        this.quantityButton = new SKButton({ text: this.quantity.toString(), width: 30 });

        this.addChild(this.minusButton);
        this.addChild(this.quantityButton);
        this.addChild(this.plusButton);

        this.quantityButton.addEventListener("action", () => this.resetQuantity());
        this.minusButton.addEventListener("action", () => this.decrementQuantity());
        this.plusButton.addEventListener("action", () => this.incrementQuantity());
    }

    private decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
            this.updateQuantityButton();
        }
    }

    private incrementQuantity() {
        if (this.quantity < 99) {
            this.quantity++;
            this.updateQuantityButton();
        }
    }

    resetQuantity() {
        this.quantity = 1;
        this.updateQuantityButton();
    }

    private updateQuantityButton() {
        this.quantityButton.text = this.quantity.toString();
        this.model.updateQuantity(this.item.id, this.quantity);
    }

    public toString(): string {
        return `SKContainer`;
    }
}